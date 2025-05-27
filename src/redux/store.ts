import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
export default store;

// Tipiziranje state-a
export type RootState = ReturnType<typeof store.getState>;

// Tipiziranje dispatcha
export type AppDispatch = typeof store.dispatch;
