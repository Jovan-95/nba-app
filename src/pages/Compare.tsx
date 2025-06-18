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

  return (
    <div className="compare-wrapper">
      <div className="compare-page">
        {/* <!-- Comparison Section --> */}
        <div className="compare-slots">
          <h2>Compare Players</h2>
          <div className="slots-container">
            {/* <!-- Slot 1 --> */}
            <div
              onClick={handleModalSlotOne}
              className="compare-card empty-slot"
            >
              <p>Select a player</p>
            </div>

            {/* <!-- Slot 2 --> */}
            <div
              onClick={handleModalSlotTwo}
              className="compare-card empty-slot"
            >
              <p>Select a player</p>
            </div>
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
