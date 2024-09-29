import { useEffect } from "react";
import { useRoom } from "../context/RoomContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@headlessui/react";
import { leaveRoom } from "../services/RoomService";
import Spinner from "../../../components/Spinner";
import { useUpdateStore, useIdStore, useBoardStore, useOwnerStore } from "../../../services/state.js";
import { createMatch, fetchMatch } from "../../Match/services/MatchService.js";

export default function RoomLayout() {
  const { room_id, user_name, user_id } = useParams();
  const navigate = useNavigate();
  const { RoomData, setRoomData } = useRoom();
  const userId = useIdStore((state) => state.userId);
  const setId = useIdStore((state) => state.setId);
  const stateOwner = useOwnerStore((state) => state.stateOwner);

  if (!userId) {
    setId(user_id);
  }
  const stateRoom = useUpdateStore((state) => state.stateRoom);

  useEffect(() => {
    if (stateRoom == "DELETED") {
      navigate(`/id/${userId}`);
    } else if (room_id) {
      fetch(`http://127.0.0.1:8000/room/${encodeURIComponent(room_id)}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          if ("room_id" in data) {
            console.log(data);
            setRoomData(data);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [room_id, setRoomData, stateRoom, userId, navigate]);


  //TODO : handle reconections???? 
  //        if >=2 players are in the same room sometimes not all of them redirect to match
  
  const stateMatch = useUpdateStore((state) => state.stateMatch);
  const stateBoard = useBoardStore((state) => state.stateBoard);
  const setStateBoard = useBoardStore((state) => state.setStateBoard);
  useEffect(() => {
    if (stateMatch) {
      const fetchData = async () => {
        try {
          const matchData = await fetchMatch(room_id);

          if (!stateBoard){
            setStateBoard(matchData.board.tiles);
          }

          navigate(`/match/${matchData.match_id}/${user_id}/${user_id}`);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [stateMatch, room_id, user_id]);

  //TODO : handle destroying lobby on server when owner leaves/lobby is empty.
  //TODO : kick players out of lobby if lobby owner leaves.
  //TODO : handle exceptions
  const handleLeave = () => {
    try {
      leaveRoom(room_id, user_name, user_id);
    } catch (err) {
      console.log(err);
    }
    navigate(`/id/${user_id}`);
  };


  //TODO : handle game validations before routing to /Game
  //        some validation is done within parser and board logic modules
  //        if !stateBoard then Board component reirects to root, maybe handle that case better????
  //TODO : also, why are we using matchservices inside room??
  const handleStartMatch = async () => {
    try{
      const matchData = await createMatch(room_id,user_name);
      setStateBoard(matchData.board.tiles);
      navigate(`/match/${matchData.match_id}/${user_name}/${user_id}`);

    } catch(error){
      console.log(error);
    }
  };

  //TODO : handle waiting for lobby.
  if (!RoomData) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 flex max-w-screen-lg flex-col items-center justify-center p-4">
      <div className="center mx-auto w-full max-w-md items-center justify-center bg-lime-200 p-4 shadow-md">
        <h1 className="mb-6 text-center font-serif text-3xl font-bold">Room</h1>
        <div className="mb-4 border-b pb-4">
          <h2 className="text-x2 font-semibold">
            Room Name: {RoomData.room_name}
          </h2>
          <h4 className="text=x2">
            Room Owner : {RoomData.owner_name}
          </h4>
          <span className="block">
            Expected Players: {RoomData.players_expected}
          </span>
        </div>
        <div>
          <h4 className="mb-4 text-lg font-medium">Players in room</h4>
          <ul className="list-disc rounded bg-lime-100 p-4 pl-5">
            {RoomData.players_names.map((player, index) => (
              <li key={index} className="mb-2">
                {player}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <Button
            type="button"
            onClick={handleLeave}
            className="mb-2 me-2 w-full border border-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-cyan-700 data-[hover]:bg-cyan-800 data-[hover]:data-[active]:bg-cyan-700 data-[hover]:text-cyan-200"
          >
            Leave Room
          </Button>
          {
            stateOwner && 
            <Button
              type="button"
              onClick={handleStartMatch}
              className="mb-2 me-2 w-full border border-cyan-700 bg-cyan-700 px-5 py-2.5 text-center text-sm font-semibold text-white data-[hover]:bg-cyan-800 data-[hover]:data-[active]:bg-cyan-700 data-[hover]:text-cyan-200"
            >
              Start Game
            </Button>
          }
        </div>
      </div>
    </div>
  );
}
