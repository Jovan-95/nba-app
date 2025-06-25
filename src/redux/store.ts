import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import notReducer from "./notificationsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: notReducer,
  },
});
export default store;

// Tipiziranje state-a
export type RootState = ReturnType<typeof store.getState>;

// Tipiziranje dispatcha
export type AppDispatch = typeof store.dispatch;
