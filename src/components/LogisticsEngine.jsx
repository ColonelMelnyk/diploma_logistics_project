import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initStoreImagesForUser } from "../redux/AuthLogic";
import { initializeStoresForUser, updateStoresForUser } from "../redux/StoresSlice";
import { ensureWarehouseForUser, setWarehouseState } from "../redux/WarehouseSlice";
import { ensureHistoryForUser, addWarehouseRefill } from "../redux/LogisticsHistorySlice";
import { WAREHOUSE_CAPACITY, STORE_CAPACITY } from "../data_storage/Capacities";

const WAREHOUSE_CYCLE_MS = 4 * 60 * 1000; // 5 хв
const SALES_CYCLE_MS = 3 * 60 * 1000; // 2 хв

function initWarehouse() {
  return {
    computers: Math.floor(WAREHOUSE_CAPACITY.computers * 0.6),
    phones_tablets: Math.floor(WAREHOUSE_CAPACITY.phones_tablets * 0.6),
    accessories: Math.floor(WAREHOUSE_CAPACITY.accessories * 0.6),
    lastArrival: null,
    nextArrival: Date.now() + WAREHOUSE_CYCLE_MS,
  };
}

function randomPercent(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function emitToast(detail) {
  window.dispatchEvent(new CustomEvent("ts:toast", { detail }));
}

const LogisticsEngine = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userKey = useSelector((state) => state.auth?.user?.email || null);

  const warehouse = useSelector((state) =>
    userKey ? state.warehouse?.byUser?.[userKey] ?? null : null
  );
  const stores = useSelector((state) =>
    userKey ? state.stores?.byUser?.[userKey]?.stores ?? [] : []
  );

  const warehouseRef = useRef(warehouse);
  const storesRef = useRef(stores);

  const whTimerRef = useRef(null);
  const salesTimerRef = useRef(null);
  const imageInitRef = useRef(false);


  useEffect(() => {
    warehouseRef.current = warehouse;
  }, [warehouse]);

  useEffect(() => {
    storesRef.current = stores;
  }, [stores]);

  useEffect(() => {
    if (!isLoggedIn || !userKey) return;

    try {
      dispatch(ensureHistoryForUser({ userKey }));
      dispatch(initializeStoresForUser({ userKey }));
      dispatch(ensureWarehouseForUser({ userKey, initial: initWarehouse() }));
    } catch (e) {
      console.error("LogisticsEngine init error:", e);
    }
  }, [dispatch, isLoggedIn, userKey]);

  useEffect(() => {
  if (!isLoggedIn || !userKey) return;

  const currentStores = storesRef.current;
  if (!currentStores || currentStores.length === 0) return;

  const alreadyHasImages = currentStores.every((s) => s.image);
  if (alreadyHasImages) return;

  if (imageInitRef.current) return;
  imageInitRef.current = true;

  dispatch(initStoreImagesForUser({ userKey }))
    .unwrap()
    .catch((err) => {
      console.error("Init store images failed:", err);
      imageInitRef.current = false;
    });
}, [dispatch, isLoggedIn, userKey]);

  const refillWarehouse = () => {
    try {
      const wh = warehouseRef.current;
      if (!wh || !userKey) return;

      const now = Date.now();
      if (wh.nextArrival && now < wh.nextArrival) return;

      const warehouseFull =
        wh.computers >= WAREHOUSE_CAPACITY.computers &&
        wh.phones_tablets >= WAREHOUSE_CAPACITY.phones_tablets &&
        wh.accessories >= WAREHOUSE_CAPACITY.accessories;

      if (warehouseFull) {
        dispatch(
          setWarehouseState({
            userKey,
            patch: {
              ...wh,
              lastArrival: new Date().toLocaleTimeString(),
              nextArrival: now + WAREHOUSE_CYCLE_MS,
            },
          })
        );
        return;
      }

      const newWarehouse = { ...wh };
      const added = { computers: 0, phones_tablets: 0, accessories: 0 };

      for (let key of ["computers", "phones_tablets", "accessories"]) {
        const cap = WAREHOUSE_CAPACITY[key];
        const inc = Math.floor(cap * (randomPercent(20, 35) / 100));

        const before = newWarehouse[key];
        newWarehouse[key] = Math.min(before + inc, cap);
        added[key] = newWarehouse[key] - before;
      }

      const nothingAdded =
        added.computers === 0 &&
        added.phones_tablets === 0 &&
        added.accessories === 0;

      newWarehouse.lastArrival = new Date().toLocaleTimeString();
      newWarehouse.nextArrival = now + WAREHOUSE_CYCLE_MS;

      if (!nothingAdded) {
        dispatch(addWarehouseRefill({ userKey, details: added }));

        emitToast({
          variant: "success",
          message: `Склад поповнено (+${added.computers} / +${added.phones_tablets} / +${added.accessories})`,
        });
      }

      dispatch(setWarehouseState({ userKey, patch: newWarehouse }));
    } catch (e) {
      console.error("LogisticsEngine refillWarehouse error:", e);
    }
  };

  const simulateSales = () => {
    try {
      const currentStores = storesRef.current;
      if (!userKey || !currentStores || currentStores.length === 0) return;

      const updated = currentStores.map((s) => ({
        ...s,
        computers: Math.max(
          0,
          s.computers -
            Math.floor(STORE_CAPACITY.computers * (randomPercent(5, 10) / 100))
        ),
        phones_tablets: Math.max(
          0,
          s.phones_tablets -
            Math.floor(STORE_CAPACITY.phones_tablets * (randomPercent(5, 10) / 100))
        ),
        accessories: Math.max(
          0,
          s.accessories -
            Math.floor(STORE_CAPACITY.accessories * (randomPercent(5, 10) / 100))
        ),
        lastSale: new Date().toLocaleTimeString(),
      }));

      dispatch(updateStoresForUser({ userKey, stores: updated }));

      emitToast({
        variant: "warning",
        message: "Цикл продажів виконано (товари в магазинах зменшились)",
      });
    } catch (e) {
      console.error("LogisticsEngine simulateSales error:", e);
    }
  };

  useEffect(() => {
    if (!isLoggedIn || !userKey) return;

    const schedule = () => {
      const wh = warehouseRef.current;
      if (!wh) return;

      const now = Date.now();
      const next = wh.nextArrival ?? now + WAREHOUSE_CYCLE_MS;
      const delay = Math.max(0, next - now);

      window.clearTimeout(whTimerRef.current);
      whTimerRef.current = window.setTimeout(() => {
        refillWarehouse();
        schedule();
      }, delay + 50);
    };

    if (warehouseRef.current?.nextArrival && Date.now() >= warehouseRef.current.nextArrival) {
      refillWarehouse();
    }

    schedule();

    return () => {
      window.clearTimeout(whTimerRef.current);
    };
  }, [isLoggedIn, userKey]);

  useEffect(() => {
    if (!isLoggedIn || !userKey) return;

    const tick = () => {
      simulateSales();
      window.clearTimeout(salesTimerRef.current);
      salesTimerRef.current = window.setTimeout(tick, SALES_CYCLE_MS);
    };

    tick();
    return () => {
      window.clearTimeout(salesTimerRef.current);
    };
  }, [isLoggedIn, userKey]);

  return null;
};

export default LogisticsEngine;
