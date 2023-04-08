import { apiSlice } from "../api/apiSlice";

export const quzzesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all quizzes
    getQuizzes: builder.query({
      query: () => `/quizzes`,
    }),

    // Get all quizzes for a particular video
    getVidoeQuizzes: builder.query({
      query: (id) => `/quizzes?video_id_like=${id}`,
    }),

    // Get single quiz
    getSingleQuiz: builder.query({
      query: (id) => `/quizzes/${id}`,
    }),

    //Add a quiz
    addQuiz: builder.mutation({
      query: (data) => ({
        url: "/quizzes",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const { data: quiz } = await queryFulfilled;
        try {
          // Update quizzes cache paseemestically
          if (quiz.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizzes",
                undefined,
                (draft) => {
                  draft.push(quiz);
                }
              )
            );
          }
        } catch (error) {}
      },
    }),

    //update a quiz
    editQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const { data: updatedQuiz } = await queryFulfilled;
        try {
          if (updatedQuiz.id) {
            // Update quizzes cache paseemestically
            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizzes",
                undefined,
                (draft) => {
                  const index = draft.findIndex(
                    (quiz) => +quiz.id === +updatedQuiz.id
                  );
                  draft.splice(index, 1, updatedQuiz);
                }
              )
            );

            // Update single quiz cache paseemestically after edit is completed
            dispatch(
              apiSlice.util.updateQueryData(
                "getSingleQuiz",
                updatedQuiz.id.toString(),
                (draft) => {
                  Object.assign(draft, updatedQuiz);
                }
              )
            );
          }
        } catch (error) {}
      },
    }),

    //Delete quizz based on id and update the cache
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // Remove the video form cache optimistically
        const updatedCache = dispatch(
          apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
            const index = draft.findIndex((quiz) => +quiz.id === +arg);
            draft.splice(index, 1);
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          updatedCache.undo();
        }
      },
    }),
  }),
});

export const {
  useGetQuizzesQuery,
  useGetVidoeQuizzesQuery,
  useGetSingleQuizQuery,
  useAddQuizMutation,
  useEditQuizMutation,
  useDeleteQuizMutation,
} = quzzesApi;
