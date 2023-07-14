import { createSlice, current } from "@reduxjs/toolkit";

const initialState = { favList: [] || null };

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorite: (state, action) => {
      state.favList = action.payload;
    },
  },
});

export const { setFavorite, removeFromFav, clearFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
