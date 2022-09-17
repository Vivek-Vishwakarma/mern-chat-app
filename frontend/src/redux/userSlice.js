import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("userInfo")),
};

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
});

export const { user } = userSlice.actions;

export default userSlice.reducer;
