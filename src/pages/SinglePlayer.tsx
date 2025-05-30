/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import { getPlayers } from "../services";
import { useQuery } from "@tanstack/react-query";
import type { Player } from "../types";

function SinglePlayer() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Getting players from services with reactQuery
  const {
    data: players,
    isLoading: playersLoading,
    error: playersError,
  } = useQuery<Player[]>({
    queryKey: ["players"],
    queryFn: getPlayers,
  });

  if (playersLoading) return <p>Loading...</p>;
  if (playersError) return <p>{playersError.message}</p>;
  if (!players) return <p>No data found.</p>;

  const playerId = Number(id);
  if (isNaN(playerId)) return <p>Invalid player ID</p>;

  const player = players.find((p) => String(p.id) === id);
  if (!player) return <p>Player not found.</p>;

  function goBack() {
    navigate("/players");
  }
  return (
    <div className="single-player">
      <div className="single-player__card">
        <img
          src={player.photo}
          alt={player.name}
          className="single-player__image"
        />
        <div className="single-player__info">
          <h1>{player.name}</h1>
          <p>
            <strong>Team:</strong> {player.team}
          </p>
          <p>
            <strong>Position:</strong> {player.position}
          </p>
          <p>
            <strong>Height:</strong> {player.height}
          </p>
          <p>
            <strong>Weight:</strong> {player.weight}
          </p>
          <p>
            <strong>Birth Date:</strong> {player.birthDate}
          </p>
          <div className="single-player__stats">
            <h3>Stats</h3>
            <p>
              <strong>Points:</strong> {player.stats.points}
            </p>
            <p>
              <strong>Rebounds:</strong> {player.stats.rebounds}
            </p>
            <p>
              <strong>Assists:</strong> {player.stats.assists}
            </p>
          </div>
          <button onClick={goBack}>Back</button>
        </div>
      </div>
    </div>
  );
}

export default SinglePlayer;
