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
  favoritesPlayers: number[]; // npr. [1, 7, 15]
  favoritesTeams: number[];
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

// Player
export type Player = {
  id: number;
  name: string;
  team: string;
  teamId: number;
  position: string;
  height: string;
  weight: string;
  birthDate: string;
  stats: {
    points: number;
    rebounds: number;
    assists: number;
  };
  photo: string;
};

// Comment
export type Comment = {
  id: number;
  userId: number;
  // entityType: string;
  entityId: number;
  content: string;
  timestamp: string;
};

// Notifications
export type NotificationType = "success" | "error" | "info";

export interface Notification {
  message: string;
  type: NotificationType;
  timestamp: string;
}
