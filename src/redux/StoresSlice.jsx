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
    lastRefill: null,
  };
}

const initialState = {
  byUser: {},
};

const storesSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    initializeStoresForUser(state, action) {
      const { userKey } = action.payload;
      if (!userKey) return;

      if (!state.byUser[userKey]) {
        state.byUser[userKey] = { stores: storeList.map(initStore) };
      }
    },

    updateStoresForUser(state, action) {
      const { userKey, stores } = action.payload;
      if (!userKey) return;

      if (!state.byUser[userKey]) state.byUser[userKey] = { stores: [] };
      state.byUser[userKey].stores = Array.isArray(stores) ? stores : [];
    },

    refillSingleForUser(state, action) {
      const { userKey, storeId, category, amount } = action.payload;
      if (!userKey) return;

      const bucket = state.byUser[userKey];
      if (!bucket?.stores?.length) return;

      const store = bucket.stores.find((s) => s.id === storeId);
      if (!store) return;

      store[category] += amount;
      store.lastRefill = new Date().toLocaleTimeString();
    },

    refillAllForUser(state, action) {
      const { userKey, storeId, amounts } = action.payload;
      if (!userKey) return;

      const bucket = state.byUser[userKey];
      if (!bucket?.stores?.length) return;

      const store = bucket.stores.find((s) => s.id === storeId);
      if (!store) return;

      store.computers = amounts.computers;
      store.phones_tablets = amounts.phones_tablets;
      store.accessories = amounts.accessories;
      store.lastRefill = new Date().toLocaleTimeString();
    },
    setStoreImagesForUser(state, action) {
      const { userKey, images, baseUrl } = action.payload;
      if (!userKey || !images) return;

      const bucket = state.byUser[userKey];
      if (!bucket?.stores?.length) return;

      bucket.stores = bucket.stores.map((s) => {
        const rel = images[s.id];
        if (!rel) return s;

        const isAbs = typeof rel === "string" && /^https?:\/\//i.test(rel);
        return { ...s, image: isAbs ? rel : `${baseUrl}${rel}` };
      });
    },
  },
});

export const {
  initializeStoresForUser,
  updateStoresForUser,
  refillAllForUser,
  refillSingleForUser,
  setStoreImagesForUser,
} = storesSlice.actions;

export default storesSlice.reducer;
