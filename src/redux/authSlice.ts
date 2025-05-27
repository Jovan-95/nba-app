/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types"; // pretpostavka da imaš User type

type AuthState = {
  loggedInUser: User | null;
};

const initialState: AuthState = {
  loggedInUser:
    JSON.parse(localStorage.getItem("loggedInUser") as string) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addLoggedUser: (state, action: PayloadAction<User>) => {
      state.loggedInUser = action.payload;
      localStorage.setItem("loggedInUser", JSON.stringify(state.loggedInUser));
    },
    logoutUser: (state) => {
      state.loggedInUser = null;
      localStorage.removeItem("loggedInUser");
    },
  },
});

export const { addLoggedUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
