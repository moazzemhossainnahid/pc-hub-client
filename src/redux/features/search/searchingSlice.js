import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchField: "",
  searchValue: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchingField: (state, action) => {
      state.searchField = action.payload;
    },
    setSearchingValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const {setSearchingField ,setSearchingValue } = searchSlice.actions;
export default searchSlice.reducer;
