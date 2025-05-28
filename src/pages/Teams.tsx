/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { getTeams } from "../services";
import type { Team } from "../types";
import { useState } from "react";

function Teams() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  // Getting teams from services with reactQuery
  const { data, isLoading, error } = useQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!data) return <p>No data found.</p>; // 👈 dodaj ovo

  // Filter existing by search name
  const searchTeams = data.filter((team: Team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter by category (conference)
  const filteredTeams = searchTeams.filter((team: Team) =>
    selectedFilter ? team.conference === selectedFilter : true
  );

  return (
    <div className="teams-page">
      <h1 className="teams-title">All NBA Teams</h1>

      <div className="teams-controls">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          className="teams-search"
          placeholder="Search teams..."
        />

        <select
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="teams-filter"
        >
          <option value="">All Conferences</option>
          <option value="East">Eastern Conference</option>
          <option value="West">Western Conference</option>
        </select>
      </div>

      <div className="teams-grid">
        {filteredTeams.map((team: Team) => (
          <div key={team.id} className="team-card">
            {/* <img className="team-logo" /> */}
            <div className="team-info">
              <h3 className="team-name">{team.name}</h3>
              <p className="team-conference">{team.conference}</p>
              <p className="team-conference">{team.division}</p>
              <p className="team-conference">{team.abbreviation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
