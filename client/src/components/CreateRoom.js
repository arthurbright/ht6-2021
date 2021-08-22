import React, { useState } from "react";
import { validator } from "sequelize/types/lib/utils/validator-extras";
import Tags from "./Tags";

const CreateRoom = (props) => {
  const [value, setValue] = useState(null);

  async function sendOptions() {
    
    var userLatitude;
    var userLongitude;
    navigator.geolocation.getCurrentPosition((position) => {
      userLatitude = position.coords.latitude;
      userLongitude = position.coords.longitude;
    })

    let activityTypes = value.map((activity) => {
      return activity.val;
    });

    let data = {
      expected_users: 2,
      email: "lavanpie@gmail.com",
      location_parameters: {
        latitude: "",
        longitude: "",
        radius: 5000,
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
    // let res = await fetch(url, options);
    // let resJson = await res.json();
  }

  return (
    <div>
      <div className="box"></div>
      <Tags value={value} setValue={setValue} />
      <button
        className="button"
        style={{
          top: "704px",
          background: "rgba(26, 147, 111, 0.6)",
          color: "#ffffff",
        }}
        onClick={() => {
          sendOptions();
        }}
      >
        CREATE ROOM
      </button>
    </div>
  );
};

export default CreateRoom;
