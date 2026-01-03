import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  byUser: {}, // { [email]: { history: [...] } }
};

function ensureBucket(state, userKey) {
  if (!state.byUser[userKey]) state.byUser[userKey] = { history: [] };
  return state.byUser[userKey];
}

const logisticsHistorySlice = createSlice({
  name: "logisticsHistory",
  initialState,
  reducers: {
    ensureHistoryForUser(state, action) {
      const { userKey } = action.payload;
      if (!userKey) return;
      ensureBucket(state, userKey);
    },

    addWarehouseRefill(state, action) {
      const { userKey, details } = action.payload;
      if (!userKey) return;

      const bucket = ensureBucket(state, userKey);
      bucket.history.push({
        type: "warehouse",
        time: Date.now(),
        details,
      });
    },

    addStoreRefill(state, action) {
      const { userKey, store, details } = action.payload;
      if (!userKey) return;

      const bucket = ensureBucket(state, userKey);
      bucket.history.push({
        type: "store",
        store,
        time: Date.now(),
        details,
      });
    },
  },
});

export const { ensureHistoryForUser, addWarehouseRefill, addStoreRefill } =
  logisticsHistorySlice.actions;

export default logisticsHistorySlice.reducer;
