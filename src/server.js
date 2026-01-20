import "dotenv/config";
import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

const PORT = Number(process.env.PORT || 3001);
const TOKEN = process.env.REPLICATE_API_TOKEN;

if (!TOKEN) {
  console.error("Missing REPLICATE_API_TOKEN in .env");
  process.exit(1);
}

const GENERATED_DIR = path.join(process.cwd(), "generated");
app.use("/generated", express.static(GENERATED_DIR));

const safe = (s) =>
  String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "_")
    .slice(0, 80);

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

function buildPrompt(store) {
  return `photo, modern electronics store facade, minimalistic design, clean storefront, daytime lighting,
store name: ${store.name}, city/address: ${store.address},
no real brand logos, no readable text, high quality, wide angle`;
}

let SDXL_VERSION_CACHE = null;

async function getSdxlVersionId() {
  if (SDXL_VERSION_CACHE) return SDXL_VERSION_CACHE;

  const rr = await fetch("https://api.replicate.com/v1/models/stability-ai/sdxl", {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });

  if (!rr.ok) {
    const text = await rr.text();
    throw new Error(`Replicate models.get failed: ${rr.status} ${text}`);
  }

  const model = await rr.json();
  const vid = model?.latest_version?.id;
  if (!vid) throw new Error("No latest_version.id in models.get response");

  SDXL_VERSION_CACHE = vid;
  return vid;
}

async function createSdxlPrediction(prompt) {
  const version = await getSdxlVersionId();

  const r = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version,
      input: {
        prompt,
        width: 768,
        height: 768,
        num_outputs: 1,
        num_inference_steps: 20,
        guidance_scale: 7,
      },
    }),
  });

  if (!r.ok) {
    const text = await r.text();
    throw new Error(`Replicate create prediction failed: ${r.status} ${text}`);
  }
  return r.json();
}

async function waitPrediction(prediction) {
  let p = prediction;
  while (p.status !== "succeeded" && p.status !== "failed" && p.status !== "canceled") {
    await new Promise((r) => setTimeout(r, 1000));
    const rr = await fetch(`https://api.replicate.com/v1/predictions/${p.id}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    p = await rr.json();
  }
  if (p.status !== "succeeded") {
    throw new Error(`Replicate prediction ${p.id} ended with status=${p.status}`);
  }
  return p;
}

async function cleanupOldStoreImages(userFolder, storeId) {
  try {
    const files = await fs.readdir(userFolder);
    const prefix = `store_${storeId}`;
    const toDelete = files.filter(
      (f) =>
        (f === `${prefix}.png` || (f.startsWith(`${prefix}_`) && f.endsWith(".png"))) &&
        !f.includes("..")
    );
    await Promise.allSettled(toDelete.map((f) => fs.unlink(path.join(userFolder, f))));
  } catch {
  }
}

app.post("/api/init-store-images", async (req, res) => {
  try {
    const { userKey, stores, force } = req.body || {};
    if (!userKey || !Array.isArray(stores) || stores.length === 0) {
      return res.status(400).json({ error: "userKey and stores[] required" });
    }

    const userFolderName = safe(userKey);
    const userFolder = path.join(GENERATED_DIR, userFolderName);
    await fs.mkdir(userFolder, { recursive: true });

    const images = {};
    let generated = 0;
    let cached = 0;

    for (const store of stores) {
      const stamp = Date.now();
      const fileName = force ? `store_${store.id}_${stamp}.png` : `store_${store.id}.png`;
      const outPath = path.join(userFolder, fileName);

      if (!force) {
        const fixedPath = path.join(userFolder, `store_${store.id}.png`);
        if (await exists(fixedPath)) {
          images[store.id] = `/generated/${userFolderName}/store_${store.id}.png`;
          cached++;
          continue;
        }
      } else {
        await cleanupOldStoreImages(userFolder, store.id);
      }

      const prompt = buildPrompt(store);

      const created = await createSdxlPrediction(prompt);
      const done = await waitPrediction(created);
      const out = done.output;
      const url = Array.isArray(out) ? out[0] : out;

      if (!url) throw new Error("No output URL from Replicate");

      const imgResp = await fetch(url);
      if (!imgResp.ok) throw new Error(`Failed to download image: ${imgResp.status}`);

      const buf = Buffer.from(await imgResp.arrayBuffer());
      await fs.writeFile(outPath, buf);

      images[store.id] = `/generated/${userFolderName}/${fileName}`;
      generated++;
    }

    return res.json({ images, meta: { generated, cached, force: !!force } });
  } catch (e) {
    console.error("init-store-images error:", e);
    return res
      .status(500)
      .json({ error: "Image init failed", details: String(e.message || e) });
  }
});

app.get("/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Replicate image server running on http://localhost:${PORT}`);
});
