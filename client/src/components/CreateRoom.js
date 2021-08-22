import React from "react";
import Tags from "./Tags";

const CreateRoom = (props) => {
  return (
    <div>
      <div className="box"></div>
      <Tags />
      <button
        className="button"
        style={{
          top: "704px",
          background: "rgba(26, 147, 111, 0.6)",
          color: "#ffffff",
        }}
      >
        CREATE ROOM
      </button>
    </div>
  );
};

export default CreateRoom;
