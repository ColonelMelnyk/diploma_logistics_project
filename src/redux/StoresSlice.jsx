import { createSlice } from "@reduxjs/toolkit";
import storeList from "../data_storage/StoreData";
import { STORE_CAPACITY } from "../data_storage/Capacities";

function initStore(store) {
  return {
    ...store,
    computers: Math.floor(STORE_CAPACITY.computers * 0.6),
    phones_tablets: Math.floor(STORE_CAPACITY.phones_tablets * 0.6),
    accessories: Math.floor(STORE_CAPACITY.accessories * 0.6),
    lastSale: null,
    lastRefill: null
  };
}

const initialState = {
  stores: [],
};

const storesSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    initializeStores(state) {
      state.stores = storeList.map(initStore);
    },

    updateStores(state, action) {
      state.stores = action.payload;
    },

    refillSingle(state, action) {
      const { storeId, category, amount } = action.payload;
      const store = state.stores.find(s => s.id === storeId);
      if (!store) return;
      store[category] += amount;
      store.lastRefill = new Date().toLocaleTimeString();
    },

    refillAll(state, action) {
      const { storeId, amounts } = action.payload;
      const store = state.stores.find(s => s.id === storeId);
      if (!store) return;
      store.computers = amounts.computers;
      store.phones_tablets = amounts.phones_tablets;
      store.accessories = amounts.accessories;
      store.lastRefill = new Date().toLocaleTimeString();
    }
  },
});

export const {
  initializeStores,
  updateStores,
  refillAll,
  refillSingle
} = storesSlice.actions;

export default storesSlice.reducer;
