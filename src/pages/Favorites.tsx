/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPlayers,
  getTeams,
  getUsers,
  removePlayerFromFav,
  removeTeamFromFav,
} from "../services";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type { Player, Team, User } from "../types";
import { useState } from "react";
import { showSuccessToast } from "../components/Toast";

function Favorites() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");

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

  // Patch method, remove fav player from user obj
  const { mutate: removeFavPlayer } = useMutation({
    mutationFn: async ({
      userId,
      updatedFavPlayersArr,
    }: {
      userId: number;
      updatedFavPlayersArr: number[];
    }) => await removePlayerFromFav(userId, updatedFavPlayersArr),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // Patch method, remove fav player from user obj
  const { mutate: removeFavTeam } = useMutation({
    mutationFn: async ({
      userId,
      updatedFavTeamsArr,
    }: {
      userId: number;
      updatedFavTeamsArr: number[];
    }) => await removeTeamFromFav(userId, updatedFavTeamsArr),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
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
  const favoriteTeams = teams.filter((team) => favTeamsIds.includes(team.id));

  // Find mathcing IDs for selected players
  const favPlayersIds = currentUser.favoritesPlayers;
  const favoritePlayers = players.filter((player) =>
    favPlayersIds.includes(player.id)
  );

  // Remove player from fav
  function handleRemovePlayerFromFav(player: Player) {
    const updatedFavPlayersArr = currentUser.favoritesPlayers.filter(
      (id: number) => Number(id) !== Number(player.id)
    );

    removeFavPlayer({
      userId: currentUser.id,
      updatedFavPlayersArr,
    });
    showSuccessToast("Player removed!");
  }

  // Remove team from fav
  function handleRemoveTeamFromFav(team: Team) {
    const updatedFavTeamsArr = currentUser.favoritesTeams.filter(
      (id: number) => Number(id) !== Number(team.id)
    );

    removeFavTeam({
      userId: currentUser.id,
      updatedFavTeamsArr,
    });
    showSuccessToast("Team removed!");
  }

  // Search players
  const searchFavPlayers = favoritePlayers.filter((player: Player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Search teams
  const searchFavTeams = favoriteTeams.filter((team: Team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="favorites-page">
      <h1 className="favorites-title">Your Favorites</h1>

      <div className="favorites-controls">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          className="favorites-search"
          placeholder="Search favorites..."
        />
        <select
          onChange={(e) => setSelectedValue(e.target.value)}
          className="favorites-filter"
        >
          <option value="">All</option>
          <option value="players">Players</option>
          <option value="teams">Teams</option>
        </select>
      </div>
      <h2>Players</h2>
      {selectedValue === "players" || selectedValue === "" ? (
        <div className="favorites-grid">
          {/* <!-- Example favorite item card --> */}

          {searchFavPlayers.map((player) => (
            <div key={player.id} className="favorite-card">
              <div className="favorite-info">
                <h3 className="favorite-name">{player.name}</h3>
                <p className="favorite-subinfo">{player.team}</p>
                <p className="favorite-subinfo">{player.position}</p>
              </div>
              <button
                onClick={() => handleRemovePlayerFromFav(player)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}

      <h2>Teams</h2>
      {selectedValue === "teams" || selectedValue === "" ? (
        <div className="favorites-grid">
          {searchFavTeams.map((team) => (
            <div key={team.id} className="favorite-card">
              <div className="favorite-info">
                <h3 className="favorite-name">{team.name}</h3>
                <p className="favorite-subinfo">{team.conference}</p>
                <p className="favorite-subinfo">{team.division}</p>
              </div>
              <button
                onClick={() => handleRemoveTeamFromFav(team)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Favorites;
