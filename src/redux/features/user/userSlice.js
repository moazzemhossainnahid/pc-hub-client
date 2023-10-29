import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    decodedUser:{}
};

const userSlice = createSlice({
  name: "sorting",
  initialState,
  reducers: {
    setDecodedUser: (state, action) => {
      state.decodedUser = action.payload;
    },
  },
});

export const {setDecodedUser} = userSlice.actions;
export default userSlice.reducer;
