import { useState, useEffect } from "react";
import Home from "./components/Home";
import Instructions from "./components/Instructions";
import Room from "./components/Room";
import Results from "./components/Results";

function App() {
  const [page, setPage] = useState("Home");
  const [roomCode, setRoomCode] = useState("");

  async function getData(url) {
    let res = await fetch(url);
    let resJson = await res.json();
    console.log(resJson);
    return resJson;
  }

  return (
    <div>
      {(page === "Home" || page === "CreateRoom" || page === "JoinRoom") && (
        <Home
          appName="CHANGE THIS"
          page={page}
          setPage={setPage}
          roomCode={roomCode}
          setRoomCode={setRoomCode}
        />
      )}
      {page === "Instructions" && <Instructions setPage={setPage} />}
      {page === "Room" && <Room setPage={setPage} />}
      {page === "Results" && (
        <Results appName="CHANGE THIS" setPage={setPage} />
      )}
    </div>
  );
}

export default App;
