import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 1,
};

const videoSlice = createSlice({
  name: "activeVideo",
  initialState,
  reducers: {
    addActiveVideoId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export default videoSlice.reducer;
export const { addActiveVideoId } = videoSlice.actions;
