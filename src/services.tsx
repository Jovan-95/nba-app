// http://localhost:3001/users
// http://localhost:3001/teams
// http://localhost:3001/players
// http://localhost:3001/games
// http://localhost:3001/stats
// http://localhost:3001/favorites
// http://localhost:3001/comments
// http://localhost:3001/notifications

import type { Player, Team, User } from "./types";

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

//// Teams
// Get HTTP method
export async function getTeams(): Promise<Team[]> {
  try {
    const res = await fetch("http://localhost:3001/teams");
    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching teams:", err);
    throw err; // 👈 obavezno prosledi grešku
  }
}

//// Players

// Get HTTP method
export async function getPlayers(): Promise<Player[]> {
  try {
    const res = await fetch("http://localhost:3001/players");
    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching teams:", err);
    throw err; // 👈 obavezno prosledi grešku
  }
}
