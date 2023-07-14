import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import authReducer from "./slices/authSlice";
import favoritesReducer from "./slices/favoritesSlice";
import publicListingsReducer from "./slices/publicListingsSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favorites: favoritesReducer,
    publicListings: publicListingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
