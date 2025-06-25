/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addFavPlayer, addFavTeam, getTeams, getUsers } from "../services";
import type { Team, User } from "../types";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { showInfoToast, showSuccessToast } from "../components/Toast";

function Teams() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  const queryClient = useQueryClient();

  // Getting teams from services with reactQuery
  const { data, isLoading, error } = useQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
  });

  // Get users from services with reactQuery
  const {
    data: users,
    isLoading: isLoadingUsers,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // Patch userObj, add fav team
  const { mutate: addFavTeamMutation } = useMutation({
    mutationFn: async ({
      userId,
      updatedFavTeamsArr,
    }: {
      userId: number;
      updatedFavTeamsArr: number[];
    }) => await addFavTeam(userId, updatedFavTeamsArr),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // Find current logged user
  const loggedUser = useSelector((state: RootState) => state.auth.loggedInUser);

  if (!loggedUser) return <p>No logged user.</p>;
  if (isLoading || isLoadingUsers) return <p>Loading...</p>;
  if (error || usersError) return <p>{error.message}</p>;
  if (!data || !users) return <p>No data found.</p>; // 👈 dodaj ovo

  // Find current user on Backend
  const currentUser = users.find(
    (user: User) => Number(user.id) === Number(loggedUser.id)
  );

  // Filter existing by search name
  const searchTeams = data.filter((team: Team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter by category (conference)
  const filteredTeams = searchTeams.filter((team: Team) =>
    selectedFilter ? team.conference === selectedFilter : true
  );

  // Add team to fav
  function handleAddToFav(team: Team) {
    const updatedFavTeamsArr = [...currentUser.favoritesTeams, team.id];

    // Check for duplicates
    if (currentUser.favoritesTeams.includes(team.id)) {
      showInfoToast("You already added this team to favorites!");
      return;
    }

    addFavTeamMutation({
      userId: currentUser.id,
      updatedFavTeamsArr,
    });
    showSuccessToast("Team added to favorites!");
  }

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
            <div className="team-info ">
              <h3 className="team-name">{team.name}</h3>
              <p className="team-conference">{team.conference}</p>
              <p className="team-conference">{team.division}</p>
              <p className="team-conference">{team.abbreviation}</p>

              <NavLink to={`/teams/${team.id}`}>
                <button>More</button>
              </NavLink>

              <button
                onClick={() => handleAddToFav(team)}
                className="favorite-btn"
              >
                ⭐
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
