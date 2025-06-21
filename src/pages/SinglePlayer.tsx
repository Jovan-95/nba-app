/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import { getComments, getPlayers, getUsers, postComment } from "../services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Comment, Player, User } from "../types";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useState } from "react";

function SinglePlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [commentContent, setCommentContent] = useState<string>("");

  // Get users from services with reactQuery
  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // Getting players from services with reactQuery
  const {
    data: players,
    isLoading: playersLoading,
    error: playersError,
  } = useQuery<Player[]>({
    queryKey: ["players"],
    queryFn: getPlayers,
  });

  // Get all comments
  const {
    data: commentsData,
    isLoading: commentsLoading,
    error: commentsError,
  } = useQuery<Comment[]>({
    queryKey: ["comments"],
    queryFn: getComments,
  });

  // HTTP POST COMMENT
  const addCommentMut = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: (err) => {
      alert("Registration failed!");
    },
  });

  // Find current logged user
  const loggedUser = useSelector((state: RootState) => state.auth.loggedInUser);

  if (!loggedUser) return <p>No logged user.</p>;
  if (playersLoading || commentsLoading || usersLoading)
    return <p>Loading...</p>;
  if (playersError || commentsError || usersError)
    return (
      <p>
        {playersError?.message || commentsError?.message || usersError?.message}
      </p>
    );
  if (!players || !commentsData || !users) return <p>No data found.</p>;

  // Find current user on BE
  const currentUser = users.find(
    (user: User) => Number(user.id) === Number(loggedUser.id)
  );

  const playerId = Number(id);
  if (isNaN(playerId)) return <p>Invalid player ID</p>;

  // Find the player with ID
  const player = players.find((p) => String(p.id) === id);
  if (!player) return <p>Player not found.</p>;

  // Find the comment for the specific player
  const comments = commentsData.filter(
    (comment) => Number(comment.entityId) === Number(player.id)
  );
  const sortComments = [...comments].reverse();

  // Post comment
  function handleCommentPosting(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // console.log("USER:", currentUser, "PLAYER:", player);

    const timestamp = Date.now();
    const formattedDate = new Date(timestamp).toLocaleString("en-GB");

    if (commentContent === "") {
      return alert("Your comment is empty!");
    }

    const newComment: Comment = {
      id: Date.now(),
      userId: currentUser.id,
      entityId: player.id,
      content: commentContent,
      timestamp: formattedDate,
    };

    addCommentMut.mutate(newComment);

    setCommentContent("");
  }

  function goBack() {
    navigate("/players");
  }
  return (
    <>
      {" "}
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
      {/* --- COMMENTS SECTION --- */}
      <div className="comments-wrapper">
        <div className="comments-section">
          <h2 className="comments-title">Comments</h2>

          <form className="comment-form">
            <textarea
              onChange={(e) => setCommentContent(e.target.value)}
              value={commentContent}
              className="comment-input"
              placeholder="Write your comment here..."
              required
            ></textarea>
            <button
              onClick={handleCommentPosting}
              type="submit"
              className="comment-submit"
            >
              Post Comment
            </button>
          </form>

          <div className="comments-list">
            {sortComments.map((comment) => {
              const author = users.find(
                (user: User) => user.id === comment.userId
              );

              return (
                <div key={comment.id} className="comment-card">
                  <div className="comment-author">{author?.username}</div>
                  <div className="comment-text">{comment.content}</div>
                  <div className="comment-date">{comment.timestamp}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default SinglePlayer;
