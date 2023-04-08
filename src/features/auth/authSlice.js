import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: undefined,
  accessToken: undefined,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    logoutUser: (state, action) => {
      state.user = undefined;
      state.accessToken = undefined;
    },
  },
});

export default authSlice.reducer;
export const { loginUser, logoutUser } = authSlice.actions;
