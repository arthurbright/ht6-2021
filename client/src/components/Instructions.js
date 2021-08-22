import React from "react";
import { Icon } from "@iconify/react";

const Instructions = (props) => {
  return (
    <div style={{ position: "relative" }}>
      <div className="background">
        <div className="poly1"></div>
        <div className="poly2"></div>
        <div className="poly3"></div>
      </div>
      <div className="instructionBackground"></div>
      <p className="instructionTitle">APP NAME</p>
      <p className="instructionText">INSTRUCTIONS</p>
      <div className="instructionIcon" style={{ top: "285px" }}></div>
      <Icon icon="ant-design:heart-outlined" className="heartIcon" />
      <div className="instructionIcon" style={{ top: "404px" }}></div>
      <div className="instructionIcon" style={{ top: "523px" }}></div>
      <button
        className="button"
        style={{
          top: "704px",
          background: "rgba(26, 147, 111, 0.6)",
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
