import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./AuthLogicSlice";
import { logisticsHistoryReducer } from "./LogisticsHistorySlice";
import { warehouseReducer } from "./warehouse/warehouseSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    logisticsHistory: logisticsHistoryReducer,
    warehouse: warehouseReducer,
  },
});

export default store;
