import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { initializeStores, updateStores } from "../redux/StoresSlice";
import { setWarehouseState } from "../redux/WarehouseSlice";
import { addWarehouseRefill } from "../redux/LogisticsHistorySlice";

import { WAREHOUSE_CAPACITY, STORE_CAPACITY } from "../data_storage/Capacities";

function initWarehouse() {
  return {
    computers: Math.floor(WAREHOUSE_CAPACITY.computers * 0.6),
    phones_tablets: Math.floor(WAREHOUSE_CAPACITY.phones_tablets * 0.6),
    accessories: Math.floor(WAREHOUSE_CAPACITY.accessories * 0.6),
    lastArrival: null,
    nextArrival: Date.now() + 5 * 60 * 1000,
  };
}

function randomPercent(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const LogisticsEngine = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const warehouse = useSelector((state) => state.warehouse);
  const stores = useSelector((state) => state.stores?.stores || []);

  const warehouseRef = useRef(warehouse);
  const storesRef = useRef(stores);

  useEffect(() => {
    warehouseRef.current = warehouse;
  }, [warehouse]);

  useEffect(() => {
    storesRef.current = stores;
  }, [stores]);

  useEffect(() => {
    if (!isLoggedIn) return;

    try {
      if (!storesRef.current || storesRef.current.length === 0) {
        dispatch(initializeStores());
      }

      const wh = warehouseRef.current;
      if (!wh || !wh.nextArrival) {
        dispatch(setWarehouseState(initWarehouse()));
      }
    } catch (e) {
      console.error("LogisticsEngine init error:", e);
    }
  }, [dispatch, isLoggedIn]);

  const refillWarehouse = () => {
    try {
      const wh = warehouseRef.current;
      if (!wh) return;

      if (Date.now() < wh.nextArrival) return;

      const warehouseFull =
        wh.computers >= WAREHOUSE_CAPACITY.computers &&
        wh.phones_tablets >= WAREHOUSE_CAPACITY.phones_tablets &&
        wh.accessories >= WAREHOUSE_CAPACITY.accessories;

      if (warehouseFull) return;

      const newWarehouse = { ...wh };
      const added = { computers: 0, phones_tablets: 0, accessories: 0 };

      for (let key of ["computers", "phones_tablets", "accessories"]) {
        const cap = WAREHOUSE_CAPACITY[key];
        const inc = Math.floor(cap * (randomPercent(10, 20) / 100));

        const before = newWarehouse[key];
        newWarehouse[key] = Math.min(before + inc, cap);
        added[key] = newWarehouse[key] - before;
      }

      const nothingAdded =
        added.computers === 0 &&
        added.phones_tablets === 0 &&
        added.accessories === 0;

      if (nothingAdded) return;

      newWarehouse.lastArrival = new Date().toLocaleTimeString();
      newWarehouse.nextArrival = Date.now() + 5 * 60 * 1000;

      dispatch(addWarehouseRefill(added));
      dispatch(setWarehouseState(newWarehouse));
    } catch (e) {
      console.error("LogisticsEngine refillWarehouse error:", e);
    }
  };

  const simulateSales = () => {
    try {
      const currentStores = storesRef.current;
      if (!currentStores || currentStores.length === 0) return;

      const updated = currentStores.map((s) => ({
        ...s,
        computers: Math.max(
          0,
          s.computers -
            Math.floor(
              STORE_CAPACITY.computers * (randomPercent(5, 15) / 100)
            )
        ),
        phones_tablets: Math.max(
          0,
          s.phones_tablets -
            Math.floor(
              STORE_CAPACITY.phones_tablets * (randomPercent(5, 15) / 100)
            )
        ),
        accessories: Math.max(
          0,
          s.accessories -
            Math.floor(
              STORE_CAPACITY.accessories * (randomPercent(5, 15) / 100)
            )
        ),
        lastSale: new Date().toLocaleTimeString(),
      }));

      dispatch(updateStores(updated));
    } catch (e) {
      console.error("LogisticsEngine simulateSales error:", e);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;

    const interval = setInterval(() => {
      try {
        refillWarehouse();
        simulateSales();
      } catch (e) {
        console.error("LogisticsEngine interval tick error:", e);
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  return null;
};

export default LogisticsEngine;
