import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  byUser: {}, // { [email]: { computers, phones_tablets, accessories, lastArrival, nextArrival } }
};

const warehouseSlice = createSlice({
  name: "warehouse",
  initialState,
  reducers: {
    ensureWarehouseForUser(state, action) {
      const { userKey, initial } = action.payload;
      if (!userKey) return;
      if (!state.byUser[userKey]) {
        state.byUser[userKey] = initial;
      }
    },

    setWarehouseState(state, action) {
      const { userKey, patch } = action.payload;
      if (!userKey) return;
      const prev = state.byUser[userKey] ?? null;
      state.byUser[userKey] = { ...(prev || {}), ...(patch || {}) };
    },

    updateWarehouseField(state, action) {
      const { userKey, key, value } = action.payload;
      if (!userKey || !key) return;
      if (!state.byUser[userKey]) state.byUser[userKey] = {};
      state.byUser[userKey][key] = value;
    },
  },
});

export const { ensureWarehouseForUser, setWarehouseState, updateWarehouseField } =
  warehouseSlice.actions;

export default warehouseSlice.reducer;
