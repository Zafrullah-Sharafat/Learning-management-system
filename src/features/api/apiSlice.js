import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logoutUser } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: async (headers, { getState, endpoints }) => {
    const accessToken = getState()?.auth?.accessToken;
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOption) => {
    let result = await baseQuery(args, api, extraOption);
    if (result?.error?.status === 401) {
      api.dispatch(logoutUser());
      localStorage.clear();
    }
    return result;
  },
  tagTypes: ["singleVideo", "particularUsersQuiz", "particularUserAss"],
  endpoints: (builder) => ({}),
});
