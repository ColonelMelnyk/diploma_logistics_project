import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [],
};

const logisticsHistorySlice = createSlice({
  name: "logisticsHistory",
  initialState,
  reducers: {
    addWarehouseRefill(state, action) {
      state.history.push({
        type: "warehouse",
        time: Date.now(),
        details: action.payload,
      });
    },

    addStoreRefill(state, action) {
      state.history.push({
        type: "store",
        store: action.payload.store,
        time: Date.now(),
        details: action.payload.details,
      });
    },
  },
});

export const { addWarehouseRefill, addStoreRefill } = logisticsHistorySlice.actions;
export default logisticsHistorySlice.reducer;
