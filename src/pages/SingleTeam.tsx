/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import { getTeams } from "../services";
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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!teams) return <p>No data found.</p>;

  const team = teams?.find((team) => String(team.id) === id);

  if (!team) return <p>Team not found.</p>;

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
          <button onClick={goBack}>Back</button>
        </div>
      </div>

      {/* <div className="single-team__players">
        <h2>Roster</h2>
        <ul className="single-team__player-list">
          <li className="single-team__player">LeBron James - SF</li>
          <li className="single-team__player">Anthony Davis - PF</li>
          <li className="single-team__player">D’Angelo Russell - PG</li>
        </ul>
      </div> */}
    </div>
  );
}

export default SingleTeam;
