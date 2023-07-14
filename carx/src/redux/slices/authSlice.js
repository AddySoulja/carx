import { createSlice } from "@reduxjs/toolkit";
import { convertByteArrayToBase64 } from "../../components/screens/user/utils/binaryToBase64";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = {
        ...action.payload,
        photo: {
          ...action.payload.photo,
          data:
            action.payload.photo.data &&
            convertByteArrayToBase64(action.payload.photo.data.data),
        },
      };
      localStorage.removeItem("userInfo");
      const data = {
        ...action.payload,
        photo: {
          ...action.payload.photo,
          data: convertByteArrayToBase64(action.payload?.photo?.data?.data),
        },
      };
      localStorage.setItem("userInfo", JSON.stringify(data));
    },
    logOut: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("publicListings");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
