// http://localhost:3001/users
// http://localhost:3001/teams
// http://localhost:3001/players
// http://localhost:3001/games
// http://localhost:3001/stats
// http://localhost:3001/favorites
// http://localhost:3001/comments
// http://localhost:3001/notifications

import type { User } from "./types";

//// Users
// Post HTTP method
export async function registerUser(user: User) {
  try {
    const res = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Get HTTP method
export async function getUsers() {
  try {
    const res = await fetch("http://localhost:3001/users");
    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}
