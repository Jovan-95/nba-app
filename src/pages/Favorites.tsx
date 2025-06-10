/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPlayers, getTeams, getUsers } from "../services";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type { User } from "../types";

function Favorites() {
  // const queryClient = useQueryClient();

  // Get users from services with reactQuery
  const {
    data: users,
    isLoading: isLoadingUsers,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // Get teams from services with reactQuery
  const {
    data: teams,
    isLoading: isLoadingTeams,
    error: teamsError,
  } = useQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
  });

  // Get teams from services with reactQuery
  const {
    data: players,
    isLoading: isLoadingPlayers,
    error: playersError,
  } = useQuery({
    queryKey: ["players"],
    queryFn: getPlayers,
  });

  // Find current logged user
  const loggedUser = useSelector((state: RootState) => state.auth.loggedInUser);

  if (!loggedUser) return <p>No logged user.</p>;
  if (isLoadingUsers || isLoadingTeams || isLoadingPlayers)
    return <p>Loading...</p>;
  if (usersError || teamsError || playersError) return <p>ERROR!</p>;
  if (!users || !teams || !players) return <p>No data found.</p>;

  // Find current user on Backend
  const currentUser = users.find(
    (user: User) => Number(user.id) === Number(loggedUser.id)
  );

  // Find mathcing IDs for selected teams
  const favTeamsIds = currentUser.favoritesTeams;

  return (
    <div className="favorites-page">
      <h1 className="favorites-title">Your Favorites</h1>

      <div className="favorites-controls">
        <input
          type="text"
          className="favorites-search"
          placeholder="Search favorites..."
        />
        <select className="favorites-filter">
          <option value="">All</option>
          <option value="players">Players</option>
          <option value="teams">Teams</option>
        </select>
      </div>

      <div className="favorites-grid">
        {/* <!-- Example favorite item card --> */}

        <div className="favorite-card">
          <div className="favorite-info">
            <h3 className="favorite-name">LeBron James</h3>
            <p className="favorite-subinfo">Los Angeles Lakers</p>
            <p className="favorite-subinfo">Position: SF</p>
          </div>
          <button className="remove-btn">Remove</button>
        </div>

        <div className="favorite-card">
          <div className="favorite-info">
            <h3 className="favorite-name">Golden State Warriors</h3>
            <p className="favorite-subinfo">Western Conference</p>
            <p className="favorite-subinfo">Pacific Division</p>
          </div>
          <button className="remove-btn">Remove</button>
        </div>

        {/* <!-- Add more favorite-card elements dynamically --> */}
      </div>
    </div>
  );
}

export default Favorites;
