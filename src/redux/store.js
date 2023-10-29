import { configureStore } from "@reduxjs/toolkit";
import paginationReducer from "./features/pagination/paginationSlice";
import sortingReducer from "./features/sorting/sortingSlice";
import { api } from "./api/apiSlice";
import userReducer from "./features/user/userSlice";
import FilteringReducer from "./features/Filter/FilteringSlice";
import searchingReducer from "./features/search/searchingSlice";
// ...

export const store = configureStore({
  reducer: { 

    pagination: paginationReducer,
    sort: sortingReducer,
    search: searchingReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
