import React from "react";

const HomeBody = (props) => {
  return (
    <div>
      <p className="homeText">
        Can't decide on a place to go?
        {`Use ${props.appName} to find your next outing!`}
      </p>
      <button
        className="button"
        style={{
          top: "525px",
          background: "rgba(252, 244, 227, 0.63)",
          color: "#ffffff",
        }}
        onClick={() => {
          props.setPage("CreateRoom");
        }}
      >
        CREATE ROOM
      </button>
      <button
        className="button"
        style={{
          top: "621px",
          background: "rgba(252, 244, 227, 0.63)",
          color: "#ffffff",
        }}
        onClick={() => {
          props.setPage("JoinRoom");
        }}
      >
        JOIN ROOM
      </button>
    </div>
  );
};

export default HomeBody;
