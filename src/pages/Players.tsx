/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addFavPlayer, getPlayers, getTeams, getUsers } from "../services";
import { useState } from "react";
import type { Player, User } from "../types";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Players() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  const queryClient = useQueryClient();

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
    isLoading,
    error,
  } = useQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
  });

  // Get teams from services with reactQuery
  const {
    data: players,
    isLoading: playersLoading,
    error: playersError,
  } = useQuery({
    queryKey: ["players"],
    queryFn: getPlayers,
  });

  // Patch userObj, add fav player
  const { mutate: addFavPlayerMutation } = useMutation({
    mutationFn: async ({
      userId,
      updatedFavPlayersArr,
    }: {
      userId: number;
      updatedFavPlayersArr: number[];
    }) => await addFavPlayer(userId, updatedFavPlayersArr),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // Find current logged user
  const loggedUser = useSelector((state) => state.auth.loggedInUser);

  if (isLoading || playersLoading || isLoadingUsers) return <p>Loading...</p>;
  if (error || playersError || usersError) return <p>{error.message}</p>;
  if (!teams || !players || !users) return <p>No data found.</p>;

  // Find current user on Backend
  const currentUser = users.find(
    (user: User) => Number(user.id) === Number(loggedUser.id)
  );

  // Filter existing by search name
  const searchPlayers = players.filter((player: Player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter by category (team)
  const filteredPlayers = searchPlayers.filter((player: Player) =>
    selectedFilter ? player.team === selectedFilter : true
  );

  // Add to user favorites
  function handleAddToFav(player: Player) {
    // console.log("Player:", player);
    // console.log("User", currentUser);
    // console.log("Logged user", loggedUser);

    const updatedFavPlayersArr = [...currentUser.favoritesPlayers, player.id];

    // Check for duplicates
    if (currentUser.favoritesPlayers.includes(player.id)) {
      alert("You already added this player to favorites!");
      return;
    }

    addFavPlayerMutation({
      userId: currentUser.id,
      updatedFavPlayersArr,
    });
    alert("Player added to favorites!");
  }

  // Filter reset
  function handleResetFilters() {
    setSearchTerm("");
    setSelectedFilter("");
  }

  return (
    <div className="players-page">
      <h1 className="players-title">All NBA Players</h1>

      <div className="players-controls">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          type="text"
          placeholder="Search players..."
          className="players-search"
        />

        <select
          onChange={(e) => setSelectedFilter(e.target.value)}
          value={selectedFilter}
          className="players-filter"
        >
          {teams.map((team) => (
            <option key={team.id}>{team.name}</option>
          ))}
        </select>

        <button onClick={handleResetFilters}>Reset</button>
      </div>

      <div className="players-grid">
        {/* Primer jednog igrača */}
        {filteredPlayers.map((player) => (
          <div key={player.id} className="player-card">
            <img src={`${player.photo}`} className="player-photo" />
            <div className="player-info">
              <h3 className="player-name">{player.name}</h3>
              <p className="player-team">team</p>
              <p className="player-position">{player.position}</p>
              <button
                onClick={() => handleAddToFav(player)}
                className="favorite-btn"
              >
                ⭐
              </button>

              <NavLink to={`/players/${player.id}`}>
                <button>More</button>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Players;
