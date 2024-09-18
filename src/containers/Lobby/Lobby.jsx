import LobbyConfigLayout from "./components/LobbyConfigLayout.jsx";
import { useNavigate } from "react-router-dom";
import { useLobby } from "./context/LobbyContext.jsx";
import createRoom from "./services/lobbyService.js";

export default function Lobby() {
  const { setLobbyData } = useLobby();
  const navigate = useNavigate();

  async function handleSubmit(formData) {
    try {
      const data = await createRoom(formData);

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
