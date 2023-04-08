import { apiSlice } from "../api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => "/users?role_like=student",
    }),
  }),
});

export const { useGetStudentsQuery } = usersApi;
