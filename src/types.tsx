/* eslint-disable @typescript-eslint/no-unused-vars */

export type RegisterFormUser = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type User = {
  username: string;
  email: string;
  password: string;
  id: number;
  role: "user" | "admin";
};
