import express from "express";
import OpenAI from "openai";

const app = express();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get("/api/store-image", async (req, res) => {
  try {
    const name = (req.query.name || "Store").toString();

    const prompt = `A modern electronics retail storefront in Kyiv, photorealistic, daytime, clean branding sign "${name}", no people, wide shot, high quality`;

    const result = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "512x512",
    });

    const first = result.data?.[0];
    if (first?.url) return res.json({ url: first.url });
    if (first?.b64_json) {
      return res.json({ dataUrl: `data:image/png;base64,${first.b64_json}` });
    }

    res.status(500).json({ error: "No image returned" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Image generation failed" });
  }
});

app.listen(3001, () => console.log("API on http://localhost:3001"));
