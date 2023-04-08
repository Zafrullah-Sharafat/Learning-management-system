import { apiSlice } from "../api/apiSlice";
import { loginUser } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),

    registration: builder.mutation({
      query: (data) => ({
        url: `/register`,
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: newUser } = await queryFulfilled;
          if (newUser.accessToken) {
            dispatch(loginUser(newUser));
            localStorage.setItem("auth", JSON.stringify(newUser));
          }
        } catch (error) {}
      },
    }),
  }),
});

export const { useLoginMutation, useRegistrationMutation } = authApi;
