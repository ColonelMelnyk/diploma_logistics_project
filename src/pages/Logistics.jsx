import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateStoresForUser } from "../redux/StoresSlice";
import { setWarehouseState } from "../redux/WarehouseSlice";
import { addStoreRefill } from "../redux/LogisticsHistorySlice";

import { STORE_CAPACITY } from "../data_storage/Capacities";

import AccessDenied from "../components/AccessDenied";
import LogisticsInfo from "../components/LogisticsInfo";
import LogisticsGrid from "../components/LogisticsGrid";
import LogisticsCardSidebar from "../components/LogisticsCardSidebar";

import Toast from "../components/Toast";

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
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const selectedStore = stores.find((s) => s.id === selectedStoreId) ?? null;

  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);

  useEffect(() => {
    document.title = "TechSpeed — Logistics";
  }, []);

  const showToast = (message, variant = "error") => {
    setToast({ message, variant });
    window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(null), 2500);
  };

  useEffect(() => {
    const onToast = (e) => {
      const { message, variant } = e.detail || {};
      if (!message) return;
      showToast(message, variant || "error");
    };

    window.addEventListener("ts:toast", onToast);
    return () => window.removeEventListener("ts:toast", onToast);
  }, []);

  const handleOpenSidebar = (storeId) => {
    try {
      setSelectedStoreId(storeId);
      setSidebarOpen(true);
    } catch (e) {
      console.error("handleOpenSidebar error:", e);
      showToast("Помилка відкриття картки магазину", "error");
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
        showToast("Дію скасовано: магазин заповнений на 100%", "warning");
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
        showToast("Недостатньо товарів на складі", "error");
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
    
      showToast("Магазин успішно поповнено", "success");
    } catch (e) {
      console.error("handleRefillAll error:", e);
      showToast("Помилка під час поповнення магазину", "error");
    }
  };

  const handleRefillSingle = (storeId, category) => {
    try {
      if (!userKey) return;
      if (!warehouse) return;

      const store = stores.find((s) => s.id === storeId);
      if (!store) return;

      if (store[category] >= STORE_CAPACITY[category]) {
        showToast("Цей товар вже заповнений", "warning");
        return;
      }

      const need = STORE_CAPACITY[category] - store[category];

      if (warehouse[category] < need) {
        showToast("Недостатньо товару на складі", "error");
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

      showToast("Товар успішно поповнено", "success");
    } catch (e) {
      console.error("handleRefillSingle error:", e);
      showToast("Помилка під час поповнення товару", "error");
    }
  };

 if (!isLoggedIn) {
    return (
      <AccessDenied
        title="Доступ заборонено"
        subtitle="Будь ласка, увійдіть у систему, щоб отримати доступ до центру керування логістикою"
      />
    );
  }

  return (
    <section>
      <Toast
        message={toast?.message || ""}
        variant={toast?.variant || "error"}
        onClose={() => setToast(null)}
      />

      <LogisticsInfo warehouse={warehouse} stores={stores} />

      <LogisticsGrid
        stores={stores}
        onOpen={handleOpenSidebar}
        onRefill={handleRefillAll}
      />

      <LogisticsCardSidebar
        isOpen={isSidebarOpen}
        store={selectedStore}
        onClose={() => {
          setSidebarOpen(false);
          setSelectedStoreId(null);
        }}
        onRefillAll={handleRefillAll}
        onRefillSingle={handleRefillSingle}
      />
    </section>
  );
};

export default Logistics;
