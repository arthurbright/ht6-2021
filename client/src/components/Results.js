import React, { useState } from "react";
import starIcon from "../images/starIcon.png";

const Results = (props) => {
  const [locations, setLocations] = useState([]);

  async function getData() {
    let url = `/api/view_results?room_code=${props.roomCode}`;
    let res = await fetch(url);
    let resJson = await res.json();
    setLocations([...resJson]);
    console.log(locations);
  }

  document.onload = getData();

  return (
    <div>
      <div className="background">
        <div className="poly1"></div>
        <div className="poly2"></div>
        <div className="poly3"></div>
        <div className="resultsTitle">RESULTS</div>
        <div className="resultsPlayerCount"># of people completed: 5</div>
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="star1">
          <img alt="star" src={starIcon} />
        </div>
        <div className="star2">
          <img alt="star" src={starIcon} />
        </div>
        <div className="star3">
          <img alt="star" src={starIcon} />
        </div>
        <div className="star4">
          <img alt="star" src={starIcon} />
        </div>
        <div className="star5">
          <img alt="star" src={starIcon} />
        </div>
        <div className="star6">
          <img alt="star" src={starIcon} />
        </div>
        <div className="runnerOne"></div>
        <div className="runnerTwo"></div>
        <button
          onClick={() => {
            props.setPage("Home");
          }}
          className="findAnother"
        >
          FIND ANOTHER ACTIVITY
        </button>
        <div className="first">
          {(locations[0] && locations[0].options.name) || "Canada's Wonderland"}
        </div>
        <div className="second">
          {(locations[1] && locations[1].options.name) || "CF Markville"}
        </div>
        <div className="third">
          {(locations[2] && locations[2].options.name) || "The Hub"}
        </div>
        <div className="fourth">
          {(locations[3] && locations[3].options.name) || "Boston Pizza"}
        </div>
        <div className="five">
          {(locations[4] && locations[4].options.name) || "Good Catch"}
        </div>
      </div>
    </div>
  );
};

export default Results;