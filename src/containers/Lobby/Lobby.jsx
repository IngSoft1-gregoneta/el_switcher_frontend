import LobbyConfigLayout from "./components/LobbyConfigLayout.jsx";
import { useNavigate } from "react-router-dom";
import { useLobby } from "./context/LobbyContext.jsx";

export default function Lobby() {
  const { setLobbyData } = useLobby();
  const navigate = useNavigate();

  async function handleSubmit(formData) {
    try {
      const response = await fetch("http://localhost:8000/rooms/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Succes :", data);

      setLobbyData({
        name: data.room_name,
        players: data.players || [],
        expected_players : data.players_expected,
      });

      navigate("/Lobby");

    } catch (error) {
      console.log(error);
      navigate("/FailedLobby")
    }
  }

  return <LobbyConfigLayout onSubmit={handleSubmit}></LobbyConfigLayout>;
}
