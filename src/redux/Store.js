import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authReducer } from "./AuthLogicSlice";
import logisticsHistoryReducer from "./LogisticsHistorySlice";
import warehouseReducer from "./WarehouseSlice";
import storesReducer from "./StoresSlice";

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"], 
};
const storesPersistConfig = {
  key: "stores",
  storage,
};
const warehousePersistConfig = {
  key: "warehouse",
  storage,
};
const logisticsHistoryPersistConfig = {
  key: "logisticsHistory",
  storage,
};
export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    stores: persistReducer(storesPersistConfig, storesReducer),
    warehouse: persistReducer(warehousePersistConfig, warehouseReducer),
    logisticsHistory: persistReducer(
      logisticsHistoryPersistConfig,
      logisticsHistoryReducer
    ),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
