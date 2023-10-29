import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortField: "",
  sortValue: "",
};

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSortField: (state, action) => {
      state.sortField = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
  },
});

export const {setSortField ,setSortValue } = sortSlice.actions;
export default sortSlice.reducer;
