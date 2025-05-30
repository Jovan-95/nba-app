/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import { getPlayers, getTeams } from "../services";
import { useQuery } from "@tanstack/react-query";

function SingleTeam() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Getting teams from services with reactQuery
  const {
    data: teams,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
  });

  //
  const {
    data: players,
    isLoading: playersIsLoading,
    error: playersError,
  } = useQuery({
    queryKey: ["players"],
    queryFn: getPlayers,
  });

  if (isLoading || playersIsLoading) return <p>Loading...</p>;
  if (error || playersError) return <p>{error.message}</p>;
  if (!teams || !players) return <p>No data found.</p>;

  // Find the team with ID
  const team = teams?.find((team) => String(team.id) === id);
  if (!team) return <p>Team not found.</p>;

  const player = players?.find((p) => p.team === team.name);
  if (!player) return <p>Player not found.</p>;

  function goBack() {
    navigate("/teams");
  }

  return (
    <div className="single-team">
      <div className="single-team__header">
        {/* <img
          src="/images/teams/lakers.png"
          alt="Los Angeles Lakers"
          className="single-team__logo"
        /> */}
        <div className="single-team__info">
          <h1 className="single-team__name">{team.name}</h1>
          <p>
            <strong>Conference:</strong>
            {team.conference}
          </p>
          <p>
            <strong>Abbreviation:</strong> {team.abbreviation}
          </p>
          <p>
            <strong>Conference:</strong> {team.conference}
          </p>
          <p>
            <strong>Division:</strong> {team.division}
          </p>
        </div>
      </div>

      <div className="single-team__players">
        <h2>Best player:</h2>
        <ul className="single-team__player-list">
          <li className="single-team__player">
            <div>Name: {player.name}</div>
            <div>Height: {player.height}</div>
            <div>Weight: {player.weight}</div>
            <div>Position: {player.position}</div>
            <div>Birthday: {player.birthDate}</div>
          </li>
          <button onClick={goBack}>Back</button>
        </ul>
      </div>
    </div>
  );
}

export default SingleTeam;
