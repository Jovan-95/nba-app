/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import Modal from "../components/Modal";
import { getPlayers } from "../services";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function Compare() {
  const [slotOneModal, setSlotOneModal] = useState<boolean>(false);
  const [slotTwoModal, setSlotTwoModal] = useState<boolean>(false);
  // const queryClient = useQueryClient();

  const [slotOne, setSlotOne] = useState<string>("");
  const [slotTwo, setSlotTwo] = useState<string>("");

  // Open slot one modal
  function handleModalSlotOne() {
    setSlotOneModal((prev) => !prev);
  }

  // Open slot two modal
  function handleModalSlotTwo() {
    setSlotTwoModal((prev) => !prev);
  }

  // Get teams from services with reactQuery
  const {
    data: players,
    isLoading: playersLoading,
    error: playersError,
  } = useQuery({
    queryKey: ["players"],
    queryFn: getPlayers,
  });

  if (playersLoading) return <p>Loading...</p>;
  if (playersError) return <p>{error.message}</p>;
  if (!players) return <p>No data found.</p>;

  // Slot ONE save
  function handleSlotOneSave() {
    console.log(slotOne);
    setSlotOneModal(false);
  }

  // Slot TWO save
  function handleSlotTwoSave() {
    console.log(slotTwo);
    setSlotTwoModal(false);
  }

  // Finding player one obj
  const playerOne = players.find((p) => p.name === slotOne);

  // Finding player two obj
  const playerTwo = players.find((p) => p.name === slotTwo);

  return (
    <div className="compare-wrapper">
      <div className="compare-page">
        {/* <!-- Comparison Section --> */}
        <div className="compare-slots">
          <h2>Compare Players</h2>
          <div className="slots-container">
            {/* <!-- Slot 1 --> */}
            {slotOne === "" ? (
              <div
                onClick={handleModalSlotOne}
                className="compare-card empty-slot"
              >
                <p>Select a player</p>
              </div>
            ) : (
              <div onClick={handleModalSlotOne} className="compare-card">
                <div>Name: {playerOne?.name}</div>
                <div>Height: {playerOne?.height}</div>
                <div>Position: {playerOne?.position}</div>
                <div>PPG: {playerOne?.stats.points}</div>
                <div>RPG: {playerOne?.stats.rebounds}</div>
                <div>APG: {playerOne?.stats.assists}</div>
              </div>
            )}

            {/* <!-- Slot 2 --> */}
            {slotTwo === "" ? (
              <div
                onClick={handleModalSlotTwo}
                className="compare-card empty-slot"
              >
                <p>Select a player</p>
              </div>
            ) : (
              <div onClick={handleModalSlotTwo} className="compare-card">
                <div>Name: {playerTwo?.name}</div>
                <div>Height: {playerTwo?.height}</div>
                <div>Position: {playerTwo?.position}</div>
                <div>PPG: {playerTwo?.stats.points}</div>
                <div>RPG: {playerTwo?.stats.rebounds}</div>
                <div>APG: {playerTwo?.stats.assists}</div>
              </div>
            )}
          </div>
        </div>
        {/* Slot ONE modal */}
        <div className={slotOneModal ? "d-block" : "d-none"}>
          <Modal>
            <div
              onClick={() => setSlotOneModal(false)}
              style={{ textAlign: "right", cursor: "pointer" }}
            >
              X
            </div>
            <div>
              <h3>Player ONE slot</h3>

              <select onChange={(e) => setSlotOne(e.target.value)}>
                {players.map((player) => (
                  <option key={player.id}>{player.name}</option>
                ))}
              </select>
              {slotOne ? (
                <button onClick={handleSlotOneSave}>Save player</button>
              ) : (
                ""
              )}
            </div>
          </Modal>
        </div>

        {/* Slot TWO modal */}
        <div className={slotTwoModal ? "d-block" : "d-none"}>
          <Modal>
            <div
              onClick={() => setSlotTwoModal(false)}
              style={{ textAlign: "right", cursor: "pointer" }}
            >
              X
            </div>
            <div>
              <h3>Player TWO slot</h3>
              <select onChange={(e) => setSlotTwo(e.target.value)}>
                {players.map((player) => (
                  <option key={player.id}>{player.name}</option>
                ))}
              </select>
              {slotTwo ? (
                <button onClick={handleSlotTwoSave}>Save player</button>
              ) : (
                ""
              )}
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Compare;
