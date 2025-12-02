import React  from "react"
import { useState } from "react";
import { stores } from "../data_storage/StoreData"

const Logistics = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

const handleOpenSidebar = (storeId) => {
  const store = stores.find(s => s.id === storeId);
  setSelectedStore(store);
  setSidebarOpen(true);
};

const handleCloseSidebar = () => {
  setSidebarOpen(false);
};

  return <h2>Logistics</h2>;
};

export default Logistics;