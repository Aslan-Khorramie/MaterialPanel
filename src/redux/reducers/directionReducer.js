import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  direction: "rtl",
};

export const directionSlice = createSlice({
  name: "direction",
  initialState,
  reducers: {
    toggle_dir: (state, action) => {
      state.direction = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggle_dir } = directionSlice.actions;

export default directionSlice.reducer;
