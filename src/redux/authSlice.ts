/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //   loggedInUser: JSON.parse(localStorage.getItem("loggedInUser")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

// export const { } = authSlice.actions;

export default authSlice.reducer;
