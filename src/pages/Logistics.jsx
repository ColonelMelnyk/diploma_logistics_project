import React, { useState, useEffect } from "react";
import storeList from "../data_storage/StoreData";
import { useDispatch } from "react-redux";
import { addWarehouseRefill, addStoreRefill } from "../redux/logisticsHistory/LogisticsHistorySlice";
import { WAREHOUSE_CAPACITY, STORE_CAPACITY } from "../data_storage/Capacities";
import  { LogisticsInfo } from "../components/LogisticsInfo";
import { LogisticsGrid } from "../components/LogisticsGrid";
import  { LogisticsCardSidebar } from "../components/LogisticsCardSidebar";

function initStore(store) {
  return {
    ...store,
    computers: Math.floor(STORE_CAPACITY.computers * 0.6),
    phones_tablets: Math.floor(STORE_CAPACITY.phones_tablets * 0.6),
    accessories: Math.floor(STORE_CAPACITY.accessories * 0.6),
  };
}

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
  const [warehouse, setWarehouse] = useState(initWarehouse());
  const [stores, setStores] = useState(storeList.map(initStore));

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  const refillWarehouse = () => {
  const newWarehouse = { ...warehouse };

  const added = {
    computers: 0,
    phones_tablets: 0,
    accessories: 0,
  };

  for (let key of ["computers", "phones_tablets", "accessories"]) {
    const capacity = WAREHOUSE_CAPACITY[key];
    const add = Math.floor(capacity * (randomPercent(10, 20) / 100));
    added[key] = add;

    newWarehouse[key] = Math.min(newWarehouse[key] + add, capacity);
  }
  newWarehouse.lastArrival = new Date().toLocaleTimeString();
  newWarehouse.nextArrival = Date.now() + 5 * 60 * 1000;

 dispatch(addWarehouseRefill(added));


  setWarehouse(newWarehouse);
};


  const simulateSales = () => {
    const newStores = stores.map((s) => {
      return {
        ...s,
        computers: Math.max(
          0,
          s.computers -
            Math.floor(STORE_CAPACITY.computers * (randomPercent(5, 15) / 100))
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
      };
    });

    setStores(newStores);
  };

  
  const handleRefillAll = (storeId) => {
    const newStores = stores.map((s) => {
      if (s.id !== storeId) return s;

      const refill = {
        computers:
          STORE_CAPACITY.computers - s.computers,
        phones_tablets:
          STORE_CAPACITY.phones_tablets - s.phones_tablets,
        accessories:
          STORE_CAPACITY.accessories - s.accessories,
      };
      dispatch(addStoreRefill({
        store: s.name,
        details: refill
      }));

      return {
        ...s,
        computers: STORE_CAPACITY.computers,
        phones_tablets: STORE_CAPACITY.phones_tablets,
        accessories: STORE_CAPACITY.accessories,
        lastRefill: new Date().toLocaleTimeString(),
      };
    });

    setStores(newStores);
  };

  
  const handleRefillSingle = (storeId, category) => {
    const newStores = stores.map((s) => {
      if (s.id !== storeId) return s;
      const refillAmount = STORE_CAPACITY[category] - s[category];
      dispatch(addStoreRefill({
        store: s.name,
        details: { [category]: refillAmount }
      }));
      return {
        ...s,
        [category]: STORE_CAPACITY[category],
        lastRefill: new Date().toLocaleTimeString(),
      };
    });

    setStores(newStores);
  };

  useEffect(() => {
  const interval = setInterval(() => {
    refillWarehouse();
    simulateSales();
  }, 5 * 60 * 1000);

  return () => clearInterval(interval);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


  const handleOpenSidebar = (storeId) => {
    const store = stores.find((s) => s.id === storeId);
    setSelectedStore(store);
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => setSidebarOpen(false);

  return (
    <section>
      <LogisticsInfo warehouse={warehouse} stores={stores} />

      <LogisticsGrid
        onOpen={handleOpenSidebar}
        onRefill={handleRefillAll}
      />
      <LogisticsCardSidebar
        isOpen={isSidebarOpen}
        store={selectedStore}
        onClose={handleCloseSidebar}
        onRefillAll={handleRefillAll}
        onRefillSingle={handleRefillSingle}
      />
    </section>
  );
};

export default Logistics;
