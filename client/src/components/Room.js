import React, { useState, useEffect } from "react";
import heartIcon from "../images/heartIcon.png";
import xIcon from "../images/xIcon.png";
import upIcon from "../images/upIcon.png";

const Room = (props) => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [card, setCard] = useState({});
  const [infoVisible, setInfoVisible] = useState(false);

  // locations the user votes "yes" for
  const [votes, setVotes] = useState([]);

  function getData() {
    let url = `/api/join_room?room_code=${props.roomCode}`;
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((resJson) => {
        console.log("1: get resJson");
        setData(resJson);
        console.log(resJson);
      });
  }

  useEffect(() => {
    console.log("0: run getData on mount");
    getData();
    setIndex(0);
  }, []);

  useEffect(() => {
    console.log("index" + index);
    if (index <= 9) setCard(data[index]);
    else {
      // api call to post voted choices
      async function submitChoices() {
        const reqBody = {
          respondent_name: props.name,
          room_code: props.roomCode,
          votes: votes,
        };
        const url = "/api/submit_choices";
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        };

        let res = await fetch(url, options);
        let resJson = await res.json();
        console.log(resJson);
      }
      submitChoices();
      props.setPage("Results");
    }
  }, [data, index]);

  return (
    <div className="roomBackground">
      {!infoVisible && card && card.name && (
        <p className="placeName">{card.name}</p>
      )}
      {card && card.photo && (
        <img alt="" className="photo" src={card.photo.url} height="auto" />
      )}
      {infoVisible && (
        <div className="infoBackground">
          <div className="flex-row" style={{ width: "270px" }}>
            {card && card.name && <p className="infoPlaceName">{card.name}</p>}
            {card && card.rating && (
              <p className="infoRating">{card.rating}/5</p>
            )}
          </div>
          <div
            style={{
              display: "flex",
              width: "330px",
              justifyContent: "flex-end",
            }}
          >
            {card && card.numRatings && (
              <p className="infoNumRatings">
                <span style={{ color: "#e65527" }}># of ratings: </span>
                {card.numRatings}
              </p>
            )}
          </div>
          <div className="flex-row" style={{ width: "330px" }}>
            {card && card.address && (
              <p className="infoAddressTitle">Address:</p>
            )}
            {card && card.address && (
              <p className="infoAddress">{card.address}</p>
            )}
          </div>
          <div
            className="flex-row"
            style={{ width: "330px", flexWrap: "wrap" }}
          >
            {card && card.tags && (
              <p className="infoAddressTitle">Description:</p>
            )}
            {card && card.tags && (
              <p className="infoAddress">{card.tags.join(", ")}</p>
            )}
          </div>
          {card && card.reviews && (
            <div style={{ overflow: "scroll", width: "330px" }}>
              <p className="infoAddressTitle">Reviews</p>
              {card.reviews.map((review, i) => {
                return (
                  <p key={i} className="infoReview">
                    {review.text}
                    {review.rating}
                  </p>
                );
              })}
            </div>
          )}
        </div>
      )}
      <div
        className="greyCircle"
        style={{ left: "57px" }}
        onClick={() => {
          console.log("liked");
          setIndex(index + 1);
          setVotes([...votes, true]);
        }}
      ></div>
      <div
        className="greyCircle"
        style={{ left: "151.68px" }}
        onClick={() => {
          setInfoVisible(!infoVisible);
        }}
      ></div>
      <div
        className="greyCircle"
        style={{ left: "246.35px" }}
        onClick={() => {
          console.log("disliked");
          setIndex(index + 1);
          setVotes([...votes, false]);
        }}
      ></div>
      <img className="infoHeartIcon" src={heartIcon} alt="heart" />
      <img className="infoXIcon" src={xIcon} alt="x" />
      <img className="infoUpIcon" src={upIcon} alt="up" />
    </div>
  );
};

export default Room;
