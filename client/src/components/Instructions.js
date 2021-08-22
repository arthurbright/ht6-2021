import React from "react";
import heartIcon from "../images/heartIcon.png";
import xIcon from "../images/xIcon.png";
import upIcon from "../images/upIcon.png";

const Instructions = (props) => {
  return (
    <div style={{ position: "relative" }}>
      <div className="background">
        <div className="poly1"></div>
        <div className="poly2"></div>
        <div className="poly3"></div>
      </div>
      <div className="instructionBackground"></div>
      <p className="instructionTitle">BONFIRE</p>
      <p className="instructionText">INSTRUCTIONS</p>
      <p className="instructionSubtext">
        You’re going to be presented with numerous outing options. The most
        liked options will be shown at the end. Happy swiping!
      </p>
      <div className="instructionIcon" style={{ top: "305px" }}></div>
      <img className="heartIcon" src={heartIcon} alt="heart" />
      <div className="instructionIcon" style={{ top: "435px" }}></div>
      <img className="xIcon" src={xIcon} alt="x" />
      <div className="instructionIcon" style={{ top: "565px" }}></div>
      <img className="upIcon" src={upIcon} alt="up" />

      <p className="heartIconText">Swipe right if you like</p>
      <p className="xIconText">Swipe left if you dislike</p>
      <p className="upIconText">Swipe up to learn more</p>

      <button
        className="button"
        style={{
          top: "704px",
          background: "rgba(216, 55, 20, 0.83)",
          color: "#ffffff",
        }}
        onClick={() => {
          props.setPage("Room");
        }}
      >
        BEGIN
      </button>
    </div>
  );
};

export default Instructions;
