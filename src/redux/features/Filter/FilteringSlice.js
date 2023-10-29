import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterField: "",
  filterValue: "",
};

const filterSlice = createSlice({
  name: "filtering",
  initialState,
  reducers: {
    setFilterField: (state, action) => {
      state.filterField = action.payload;
    },
    setFilterValue: (state, action) => {
      state.filterValue = action.payload;
    },
  },
});

export const {setFilterField ,setFilterValue } = filterSlice.actions;
export default filterSlice.reducer;
