import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeStores, updateStores } from "../redux/StoresSlice";
import { setWarehouseState } from "../redux/WarehouseSlice";
import { addWarehouseRefill, addStoreRefill } from "../redux/LogisticsHistorySlice";

import { WAREHOUSE_CAPACITY, STORE_CAPACITY } from "../data_storage/Capacities";
import LogisticsInfo from "../components/LogisticsInfo";
import LogisticsGrid from "../components/LogisticsGrid";
import LogisticsCardSidebar from "../components/LogisticsCardSidebar";


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

const Logistics = () => {
  const dispatch = useDispatch();

  const warehouse = useSelector((state) => state.warehouse);
  const stores = useSelector((state) => state.stores?.stores || []);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [toast, setToast] = useState(null);


  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(null), 2500);
  };

  async function generateStoreImage(storeName) {
    const res = await fetch(
      `/api/store-image?name=${encodeURIComponent(storeName)}`
    );
    if (!res.ok) throw new Error("Image API failed");
    const data = await res.json();
    return data.url || data.dataUrl;
  }

  useEffect(() => {
    if (!isLoggedIn) return;

    try {
      dispatch(initializeStores());
      dispatch(setWarehouseState(initWarehouse()));
    } catch (e) {
      console.error("Initialization error:", e);
    }
  }, [isLoggedIn, dispatch]);

  useEffect(() => {
    if (!isLoggedIn) return;
    if (!stores.length) return;

    (async () => {
      try {
        const updated = await Promise.all(
          stores.map(async (s) => ({
            ...s,
            image: await generateStoreImage(s.name),
          }))
        );
        dispatch(updateStores(updated));
      } catch (e) {
        console.error("Generate images error:", e);
      }
    })();
  }, [isLoggedIn, stores.length, dispatch]);

  const handleOpenSidebar = (storeId) => {
    try {
      const store = stores.find((s) => s.id === storeId);
      if (!store) return;
      setSelectedStore(store);
      setSidebarOpen(true);
    } catch (e) {
      console.error("handleOpenSidebar error:", e);
      showToast("Помилка відкриття картки магазину");
    }
  };

  const refillWarehouse = () => {
    try {
      if (!warehouse) return;

      const warehouseFull =
        warehouse.computers >= WAREHOUSE_CAPACITY.computers &&
        warehouse.phones_tablets >= WAREHOUSE_CAPACITY.phones_tablets &&
        warehouse.accessories >= WAREHOUSE_CAPACITY.accessories;

      if (warehouseFull) return;

      const newWarehouse = { ...warehouse };
      const added = { computers: 0, phones_tablets: 0, accessories: 0 };

      for (let key of ["computers", "phones_tablets", "accessories"]) {
        const cap = WAREHOUSE_CAPACITY[key];
        const inc = Math.floor(cap * (randomPercent(10, 20) / 100));

        const before = newWarehouse[key];
        newWarehouse[key] = Math.min(before + inc, cap);
        added[key] = newWarehouse[key] - before;
      }

      if (
        added.computers === 0 &&
        added.phones_tablets === 0 &&
        added.accessories === 0
      ) {
        return;
      }

      newWarehouse.lastArrival = new Date().toLocaleTimeString();
      newWarehouse.nextArrival = Date.now() + 5 * 60 * 1000;

      dispatch(addWarehouseRefill(added));
      dispatch(setWarehouseState(newWarehouse));
    } catch (e) {
      console.error("refillWarehouse error:", e);
      showToast("Помилка під час поповнення складу");
    }
  };

  const simulateSales = () => {
    try {
      if (!stores.length) return;

      const updated = stores.map((s) => ({
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
      console.error("simulateSales error:", e);
      showToast("Помилка симуляції продажів");
    }
  };
  useEffect(() => {
    if (!isLoggedIn) return;

    const interval = setInterval(() => {
      try {
        refillWarehouse();
        simulateSales();
      } catch (e) {
        console.error("Interval tick error:", e);
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [isLoggedIn, stores, warehouse]);

  const handleRefillAll = (storeId) => {
    try {
      if (!warehouse) return;

      const store = stores.find((s) => s.id === storeId);
      if (!store) return;

      const storeFull =
        store.computers >= STORE_CAPACITY.computers &&
        store.phones_tablets >= STORE_CAPACITY.phones_tablets &&
        store.accessories >= STORE_CAPACITY.accessories;

      if (storeFull) {
        showToast("Дію скасовано: магазин заповнений на 100%");
        return;
      }

      const need = {
        computers: STORE_CAPACITY.computers - store.computers,
        phones_tablets: STORE_CAPACITY.phones_tablets - store.phones_tablets,
        accessories: STORE_CAPACITY.accessories - store.accessories,
      };

      const enough =
        warehouse.computers >= need.computers &&
        warehouse.phones_tablets >= need.phones_tablets &&
        warehouse.accessories >= need.accessories;

      if (!enough) {
        showToast("Недостатньо товарів на складі");
        return;
      }

      dispatch(
        setWarehouseState({
          ...warehouse,
          computers: warehouse.computers - need.computers,
          phones_tablets: warehouse.phones_tablets - need.phones_tablets,
          accessories: warehouse.accessories - need.accessories,
        })
      );

      const updatedStores = stores.map((s) =>
        s.id !== storeId
          ? s
          : {
              ...s,
              computers: STORE_CAPACITY.computers,
              phones_tablets: STORE_CAPACITY.phones_tablets,
              accessories: STORE_CAPACITY.accessories,
              lastRefill: new Date().toLocaleTimeString(),
            }
      );

      dispatch(updateStores(updatedStores));
      dispatch(addStoreRefill({ store: store.name, details: need }));
      showToast("Магазин успішно поповнено");
    } catch (e) {
      console.error("handleRefillAll error:", e);
      showToast("Помилка під час поповнення магазину");
    }
  };

  const handleRefillSingle = (storeId, category) => {
    try {
      if (!warehouse) return;

      const store = stores.find((s) => s.id === storeId);
      if (!store) return;

      if (store[category] >= STORE_CAPACITY[category]) {
        showToast("Цей товар вже заповнений");
        return;
      }

      const need = STORE_CAPACITY[category] - store[category];

      if (warehouse[category] < need) {
        showToast("Недостатньо товару на складі");
        return;
      }

      dispatch(
        setWarehouseState({
          ...warehouse,
          [category]: warehouse[category] - need,
        })
      );

      const updatedStores = stores.map((s) =>
        s.id !== storeId
          ? s
          : {
              ...s,
              [category]: STORE_CAPACITY[category],
              lastRefill: new Date().toLocaleTimeString(),
            }
      );

      dispatch(updateStores(updatedStores));
      dispatch(
        addStoreRefill({
          store: store.name,
          details: { [category]: need },
        })
      );

      showToast("Товар успішно поповнено");
    } catch (e) {
      console.error("handleRefillSingle error:", e);
      showToast("Помилка під час поповнення товару");
    }
  };

  if (!isLoggedIn) {
    return (
      <section className="p-8 text-center text-xl">
        <h2>Доступ заборонено</h2>
        <p>Будь ласка, увійдіть або зареєструйтесь.</p>
      </section>
    );
  }

  return (
    <section>
      {toast && <div role="status">{toast}</div>}

      <LogisticsInfo warehouse={warehouse} stores={stores} />

      <LogisticsGrid
        stores={stores}
        onOpen={handleOpenSidebar}
        onRefill={handleRefillAll}
      />

      <LogisticsCardSidebar
        isOpen={isSidebarOpen}
        store={selectedStore}
        onClose={() => setSidebarOpen(false)}
        onRefillAll={handleRefillAll}
        onRefillSingle={handleRefillSingle}
      />
    </section>
  );
};

export default Logistics;
