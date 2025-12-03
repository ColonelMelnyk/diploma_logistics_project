import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  computers: 0,
  phones_tablets: 0,
  accessories: 0,
  lastArrival: null,
  nextArrival: null
};

const warehouseSlice = createSlice({
  name: "warehouse",
  initialState,
  reducers: {
    setWarehouseState(state, action) {
      return { ...state, ...action.payload };
    },
    updateWarehouseField(state, action) {
      const { key, value } = action.payload;
      state[key] = value;
    }
  }
});

export const { setWarehouseState, updateWarehouseField } = warehouseSlice.actions;
export default warehouseSlice.reducer;
