const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  publicListings: JSON.parse(localStorage.getItem("publicListings")) || [],
};

const publicListingsSlice = createSlice({
  name: "publicListings",
  initialState,
  reducers: {
    setPublicListings: (state, action) => {
      localStorage.removeItem("publicListings");
      state.publicListings = action.payload;
      localStorage.setItem("publicListings", JSON.stringify(action.payload));
    },
  },
});

export const { setPublicListings } = publicListingsSlice.actions;

export default publicListingsSlice.reducer;
