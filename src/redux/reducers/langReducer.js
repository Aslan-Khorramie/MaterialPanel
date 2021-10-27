import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: "fa",
};

export const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    toggle_lang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggle_lang } = langSlice.actions;

export default langSlice.reducer;
