import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateStoresForUser } from "../redux/StoresSlice";
import { setWarehouseState } from "../redux/WarehouseSlice";
import { addStoreRefill } from "../redux/LogisticsHistorySlice";

import { STORE_CAPACITY } from "../data_storage/Capacities";

import LogisticsInfo from "../components/LogisticsInfo";
import LogisticsGrid from "../components/LogisticsGrid";
import LogisticsCardSidebar from "../components/LogisticsCardSidebar";

const Logistics = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userKey = useSelector((state) => state.auth?.user?.email || null);

  const warehouse = useSelector((state) =>
    userKey ? state.warehouse?.byUser?.[userKey] ?? null : null
  );
  const stores = useSelector((state) =>
    userKey ? state.stores?.byUser?.[userKey]?.stores ?? [] : []
  );

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    document.title = "TechSpeed — Logistics";
  }, []);

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(null), 2500);
  };

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

  const handleRefillAll = (storeId) => {
    try {
      if (!userKey) return;
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
          userKey,
          patch: {
            ...warehouse,
            computers: warehouse.computers - need.computers,
            phones_tablets: warehouse.phones_tablets - need.phones_tablets,
            accessories: warehouse.accessories - need.accessories,
          },
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

      dispatch(updateStoresForUser({ userKey, stores: updatedStores }));
      dispatch(addStoreRefill({ userKey, store: store.name, details: need }));
      showToast("Магазин успішно поповнено");
    } catch (e) {
      console.error("handleRefillAll error:", e);
      showToast("Помилка під час поповнення магазину");
    }
  };

  const handleRefillSingle = (storeId, category) => {
    try {
      if (!userKey) return;
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
          userKey,
          patch: {
            ...warehouse,
            [category]: warehouse[category] - need,
          },
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

      dispatch(updateStoresForUser({ userKey, stores: updatedStores }));
      dispatch(addStoreRefill({ userKey, store: store.name, details: { [category]: need } }));
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
        <p>
          Будь ласка, увійдіть у систему, щоб отримати доступ до центру керування
          логістикою
        </p>
      </section>
    );
  }

  return (
    <section>
      {toast && <div role="status">{toast}</div>}

      <LogisticsInfo warehouse={warehouse} stores={stores} />
      <LogisticsGrid stores={stores} onOpen={handleOpenSidebar} onRefill={handleRefillAll} />
      <LogisticsCardSidebar
        isOpen={isSidebarOpen}
        store={selectedStore}
        onClose={() => {
          setSidebarOpen(false);
          setSelectedStore(null);
        }}
        onRefillAll={handleRefillAll}
        onRefillSingle={handleRefillSingle}
      />
    </section>
  );
};

export default Logistics;
