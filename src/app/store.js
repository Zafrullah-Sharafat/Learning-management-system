import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSlice from "../features/auth/authSlice";
import videoSlice from "../features/videos/videoSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    activeVideo: videoSlice, //  provide recent or current active video
    auth: authSlice, // provide logged-in user
  },
  devTools: !process.env.NODE_ENV === "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
