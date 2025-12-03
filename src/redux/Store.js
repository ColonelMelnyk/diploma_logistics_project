import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./AuthLogicSlice";
import logisticsHistoryReducer from "./LogisticsHistorySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    logisticsHistory: logisticsHistoryReducer,
  },
});

export default store;
