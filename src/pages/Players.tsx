/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { getPlayers, getTeams } from "../services";
import { useState } from "react";
import type { Player } from "../types";
import { NavLink } from "react-router-dom";

function Players() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  // Getting teams from services with reactQuery
  const {
    data: teams,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
  });

  // Getting teams from services with reactQuery
  const {
    data: players,
    isLoading: playersLoading,
    error: playersError,
  } = useQuery({
    queryKey: ["players"],
    queryFn: getPlayers,
  });

  if (isLoading || playersLoading) return <p>Loading...</p>;
  if (error || playersError) return <p>{error.message}</p>;
  if (!teams || !players) return <p>No data found.</p>;

  // Filter existing by search name
  const searchPlayers = players.filter((player: Player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter by category (team)
  const filteredPlayers = searchPlayers.filter((player: Player) =>
    selectedFilter ? player.team === selectedFilter : true
  );

  return (
    <div className="players-page">
      <h1 className="players-title">All NBA Players</h1>

      <div className="players-controls">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search players..."
          className="players-search"
        />

        <select
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="players-filter"
        >
          {teams.map((team) => (
            <option key={team.id}>{team.name}</option>
          ))}
        </select>

        <button>Reset</button>
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
              <button className="favorite-btn">⭐</button>

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
