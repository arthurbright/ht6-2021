import React, { useState } from "react";

const JoinRoom = (props) => {
  const [roomCodeInput, setRoomCodeInput] = useState("");
  const [name, setName] = useState("");

  async function joinRoomFunc() {
    console.log(roomCodeInput);
    props.setRoomCode(roomCodeInput);
    props.setName(name);
    // let res = await fetch(`/api/join_room?room_code=${code}`);
    // let resJson = await res.json();
    // console.log(resJson);
  }

  return (
    <div>
      <div className="box"></div>
      <div className="joinRoomText">
        <span style={{ fontSize: "30px" }}>
          Ready to find your next outing?
        </span>
        <span style={{ fontSize: "18px" }}>
          Ask your team leader for the room code to get started!
        </span>
      </div>

      <input
        placeholder="ROOM CODE"
        maxLength="4"
        pattern="[A-Z]{4}"
        type="text"
        className="joinCode"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          top: "620px",
        }}
        value={roomCodeInput}
        onChange={(e) => {
          setRoomCodeInput(e.target.value);
        }}
      />
      <input
        placeholder="NAME"
        type="text"
        className="joinCode"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          top: "540px",
        }}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <button
        className="button"
        style={{
          top: "704px",
          background: "rgba(216, 55, 20, 0.83)",
          color: "#ffffff",
        }}
        onClick={() => {
          joinRoomFunc();
          props.setPage("Instructions");
        }}
      >
        JOIN ROOM
      </button>
    </div>
  );
};

export default JoinRoom;
