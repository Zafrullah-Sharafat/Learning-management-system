import { apiSlice } from "../api/apiSlice";

export const assignmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Fetch all assignments
    getAssignments: builder.query({
      query: () => "/assignments",
    }),

    //Fetch single assignment base on assignment id
    getSingleAssignment: builder.query({
      query: (id) => `/assignments/${id}`,
    }),

    //Fetch single assignment based on related video_id
    getAssignmentForVideo: builder.query({
      query: (id) => `/assignments?video_id_like=${id}`,
    }),

    //Add assignment and update the related cache
    addAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignments",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const { data: assignment } = await queryFulfilled;
        try {
          // Updte assignments cache paseemestically
          if (assignment.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignments",
                undefined,
                (draft) => {
                  draft.push(assignment);
                }
              )
            );
          }
        } catch (error) {}
      },
    }),

    //Edit assignment and update the relate cache
    editAssignment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignments/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const { data: updatedAssignment } = await queryFulfilled;
        try {
          if (updatedAssignment.id) {
            // Updte assignment cache paseemestically
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignments",
                undefined,
                (draft) => {
                  const index = draft.findIndex(
                    (assignment) => +assignment.id === +updatedAssignment.id
                  );
                  draft.splice(index, 1, updatedAssignment);
                }
              )
            );

            // Update single assignment cache paseemestically
            dispatch(
              apiSlice.util.updateQueryData(
                "getSingleAssignment",
                updatedAssignment.id.toString(),
                (draft) => {
                  Object.assign(draft, updatedAssignment);
                }
              )
            );
          }
        } catch (error) {}
      },
    }),

    //Delete assignment based on video id and update the cache
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments?${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // Remove the assignment form cache optimistically
        const updatedCache = dispatch(
          apiSlice.util.updateQueryData(
            "getAssignments",
            undefined,
            (draft) => {
              const index = draft.findIndex(
                (assignment) => +assignment.id === +arg
              );
              draft.splice(index, 1);
            }
          )
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
  useGetAssignmentsQuery,
  useGetAssignmentForVideoQuery,
  useGetSingleAssignmentQuery,
  useAddAssignmentMutation,
  useEditAssignmentMutation,
  useDeleteAssignmentMutation,
} = assignmentsApi;
