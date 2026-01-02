import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authReducer } from "./AuthLogicSlice";
import logisticsHistoryReducer from "./LogisticsHistorySlice";
import warehouseReducer from "./WarehouseSlice";
import storesReducer from "./StoresSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    logisticsHistory: logisticsHistoryReducer,
    warehouse: warehouseReducer,
    stores: storesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);
