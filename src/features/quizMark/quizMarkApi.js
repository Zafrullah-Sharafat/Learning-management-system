import { apiSlice } from "../api/apiSlice";

export const quizMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizMark: builder.query({
      query: () => `quizMark`,
    }),
    getQuizMarkForUser: builder.query({
      query: ({ userId, videoId }) =>
        `quizMark?student_id_like=${userId}&video_id_like=${videoId}`,
      providesTags: ["particularUsersQuiz"],
    }),
    addQuizMark: builder.mutation({
      query: (data) => ({
        url: "/quizMark",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["singleVideo", "particularUsersQuiz"],

      // Update cache of getQuizMark endpoint passemestically
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const { data: newQuizMark } = await queryFulfilled;
        if (newQuizMark.id) {
          dispatch(
            apiSlice.util.updateQueryData("getQuizMark", undefined, (draft) => {
              draft.push(newQuizMark);
            })
          );
        }
      },
    }),
  }),
});

export const {
  useGetQuizMarkQuery,
  useGetQuizMarkForUserQuery,
  useAddQuizMarkMutation,
} = quizMarkApi;
