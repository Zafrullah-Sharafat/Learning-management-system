import { apiSlice } from "../api/apiSlice";

export const assignmentMarksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Fetch all assignmentmarks
    getAssMarks: builder.query({
      query: () => "/assignmentMark?_sort=createdAt&_order=desc",
    }),

    //Fetch single assingmarks of particular user and particular assignment id
    getAssMarkForUser: builder.query({
      query: ({ userId, assId }) =>
        `/assignmentMark?student_id_like=${userId}&assignment_id_like=${assId}`,
      providesTags: ["particularUserAss"],
    }),

    //Provide marks from admin to student
    provideAssignmentMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: "PATCH",
        body: data,
      }),

      // Update assignment mark in "assignments" cache optimistically.
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const updatedCache = dispatch(
          apiSlice.util.updateQueryData("getAssMarks", undefined, (draft) => {
            const index = draft.findIndex((mark) => +mark.id === +arg.id);
            draft.splice(index, 1, arg.data);
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          updatedCache.undo();
        }
      },
    }),

    // Submit assignment from student to admin for marking
    addAssignmentForMark: builder.mutation({
      query: (data) => ({
        url: `/assignmentMark/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["singleVideo", "particularUserAss"],
    }),
  }),
});

export const {
  useGetAssMarksQuery,
  useGetAssMarkForUserQuery,
  useProvideAssignmentMarkMutation,
  useAddAssignmentForMarkMutation,
} = assignmentMarksApi;
