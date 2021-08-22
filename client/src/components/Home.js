import React from "react";
import "../App.css";
import HomeBody from "./HomeBody";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom.js";

const Home = (props) => {
  return (
    <div>
      <div className="background">
        <div className="poly1"></div>
        <div className="poly2"></div>
        <div className="poly3"></div>
      </div>
      <div className="logoBg">
        <img id="logoImg" alt="logo" src=""></img>
      </div>

      {props.page === "Home" && <HomeBody setPage={props.setPage} />}
      {props.page === "CreateRoom" && <CreateRoom setPage={props.setPage} />}
      {props.page === "JoinRoom" && <JoinRoom setPage={props.setPage} />}
    </div>
  );
};

export default Home;
