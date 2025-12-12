import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./AuthLogicSlice";
import logisticsHistoryReducer from "./LogisticsHistorySlice";
import warehouseReducer from "./WarehouseSlice";
import storesReducer from "./StoresSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    logisticsHistory: logisticsHistoryReducer,
    warehouse: warehouseReducer,
    stores: storesReducer,
  },
});

export default store;
