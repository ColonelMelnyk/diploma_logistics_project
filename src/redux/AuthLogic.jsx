import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import storeList from "../data_storage/StoreData";
import { initializeStoresForUser, setStoreImagesForUser } from "./StoresSlice";

axios.defaults.baseURL = 'https://connections-api.goit.global/';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

const REPLICATE_SERVER =
  process.env.REACT_APP_REPLICATE_SERVER || "http://localhost:3001";

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/users/signup", credentials);
      setAuthHeader(res.data.token);

      const userKey = res.data?.user?.email || credentials.email;

      thunkAPI.dispatch(initializeStoresForUser({ userKey }));

      const storesPayload = storeList.map(({ id, name, address }) => ({
        id,
        name,
        address,
      }));

      const r = await fetch(`${REPLICATE_SERVER}/api/init-store-images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userKey, stores: storesPayload }),
      });

      if (r.ok) {
        const { images } = await r.json();

        thunkAPI.dispatch(
          setStoreImagesForUser({
            userKey,
            images,
            baseUrl: REPLICATE_SERVER,
          })
        );
      } else {
        console.warn("[Replicate] init-store-images failed:", await r.text());
      }

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/users/login', credentials);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);
      const response = await axios.get('/users/current');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);