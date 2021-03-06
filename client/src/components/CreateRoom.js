import React, { useState, useEffect } from "react";
import Tags from "./Tags";

const CreateRoom = (props) => {
  // this is an array of the types of locations being requested
  const [value, setValue] = useState(null);
  const [expectedUsers, setExpectedUsers] = useState(1);
  const [maxDist, setMaxDist] = useState(0);
  const [email, setEmail] = useState("");
  const [userLatitude, setUserLatitude] = useState("");
  const [userLongitude, setUserLongitude] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLatitude(position.coords.latitude);
      setUserLongitude(position.coords.longitude);
      console.log(userLatitude + " " + userLongitude);
    });

    return () => {};
  }, []);

  async function sendOptions() {
    if (!(userLongitude && userLatitude)) {
      alert("We couldn't collect your geolocation!");
      return;
    }

    if (!value) {
      alert("Please select an activity!");
      return;
    }

    let activityTypes = value.map((activity) => {
      return activity.val;
    });

    let data = {
      expected_users: parseInt(expectedUsers),
      email: email,
      location_parameters: {
        latitude: parseFloat(userLatitude),
        longitude: parseFloat(userLongitude),
        radius: parseInt(maxDist * 1000),
        types: activityTypes,
        numResults: 10,
      },
    };

    console.log(data);

    let url = "/api/create_room";
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    let res = await fetch(url, options);
    let resJson = await res.json();
    console.log(resJson);
    setCode(resJson["room_code"]);
    console.log(code);
  }

  return (
    <div>
      <div className="box"></div>
      <p className="setUpRoomText">Set up your room</p>
      <Tags value={value} setValue={setValue} />
      <input
        placeholder="# OF PPL"
        maxLength="2"
        pattern="[0-100]{1}"
        type="text"
        className="expectedUsers"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
        }}
        onChange={(e) => {
          setExpectedUsers(e.target.value);
          console.log(expectedUsers);
        }}
      />
      <input
        placeholder="MAX DIST (km)"
        maxLength="4"
        max="25"
        pattern="[0-9]{3}"
        type="text"
        className="maxDist"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
        }}
        onChange={(e) => {
          setMaxDist(e.target.value);
          console.log(maxDist);
        }}
      />
      <input
        placeholder="YOUR EMAIL"
        type="email"
        className="emailInput"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
        }}
        onChange={(e) => {
          setEmail(e.target.value);
          console.log(email);
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
          sendOptions();
          props.setRoomCode(code);
          setTimeout(function () {
            props.setPage("JoinRoom");
          }, 5000);
        }}
      >
        CREATE ROOM
      </button>
      {code && (
        <p className="newLink">
          Your room code is{" "}
          <span
            style={{
              color: "#000000",
              fontWeight: "bold",
            }}
          >
            {code}
          </span>
        </p>
      )}
    </div>
  );
};

export default CreateRoom;
