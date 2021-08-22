import { useState } from "react";
import Home from "./components/Home";
import Instructions from "./components/Instructions";
import Room from "./components/Room";
import Results from "./components/Results";

function App() {
  const [page, setPage] = useState("Home");
  const [roomCode, setRoomCode] = useState("");
  const [name, setName] = useState("");

  return (
    <div>
      {(page === "Home" || page === "CreateRoom" || page === "JoinRoom") && (
        <Home
          appName="Bonfire"
          page={page}
          setPage={setPage}
          roomCode={roomCode}
          setRoomCode={setRoomCode}
          name={name}
          setName={setName}
        />
      )}
      {page === "Instructions" && <Instructions setPage={setPage} />}
      {page === "Room" && (
        <Room setPage={setPage} roomCode={roomCode} name={name} />
      )}
      {page === "Results" && <Results setPage={setPage} roomCode={roomCode} />}
    </div>
  );
}

export default App;
