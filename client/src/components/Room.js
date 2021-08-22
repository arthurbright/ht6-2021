import React, { useState, useEffect } from "react";

const Room = (props) => {
  const [data, setData] = useState("");

  async function getData() {
    console.log(props.roomCode);
    let url = `/api/join_room?room_code=${props.roomCode}`;
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }
    let res = await fetch(url, options);
    let resJson = await res.json();
    console.log(resJson);
    setData(resJson);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <p>test</p>
      <p>{data}</p>
    </div>
  );
};

export default Room;
