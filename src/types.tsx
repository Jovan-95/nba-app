/* eslint-disable @typescript-eslint/no-unused-vars */

// Regsiter user
export type RegisterFormUser = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// HTTP post
export type User = {
  username: string;
  email: string;
  password: string;
  id: number;
  role: "user" | "admin";
};

// LoggedUserForm
export type LoggedUserForm = {
  username: string;
  password: string;
};

// Team
export type Team = {
  id: number;
  name: string;
  abbreviation: string;
  conference: string;
  division: string;
  logo: string;
};
