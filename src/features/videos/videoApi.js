import { apiSlice } from "../api/apiSlice";
import { addActiveVideoId } from "./videoSlice";

export const videoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Fetch all videos
    getVideos: builder.query({
      query: () => "/videos",
    }),

    //Fetch single video base on video id
    getSingleVideo: builder.query({
      query: (id) => `/videos/${id}`,
      providesTags: ["singleVideo"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: video } = await queryFulfilled;
          if (video.id) {
            dispatch(addActiveVideoId(video.id));
            localStorage.setItem("activeVideo", video.id);
          }
        } catch (error) {}
      },
    }),

    //Add video and update the related cache
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const { data: video } = await queryFulfilled;
        try {
          // Update videos cache paseemestically
          if (video.id) {
            dispatch(
              apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
                draft.push(video);
              })
            );
          }
        } catch (error) {}
      },
    }),

    //Edit video and update the relate cache
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const { data: updatedVideo } = await queryFulfilled;
        try {
          if (updatedVideo.id) {
            // Updte videos cache paseemestically
            dispatch(
              apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
                const index = draft.findIndex(
                  (video) => +video.id === +updatedVideo.id
                );
                draft.splice(index, 1, updatedVideo);
              })
            );

            // Update single video cache paseemestically
            dispatch(
              apiSlice.util.updateQueryData(
                "getSingleVideo",
                updatedVideo.id.toString(),
                (draft) => {
                  Object.assign(draft, updatedVideo);
                }
              )
            );
          }
        } catch (error) {}
      },
    }),

    //Delete video based on video id and update the cache
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // Remove the video form cache optimistically
        const updatedCache = dispatch(
          apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
            const index = draft.findIndex((video) => +video.id === +arg);
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
  useGetVideosQuery,
  useGetSingleVideoQuery,
  useAddVideoMutation,
  useEditVideoMutation,
  useDeleteVideoMutation,
} = videoApi;
