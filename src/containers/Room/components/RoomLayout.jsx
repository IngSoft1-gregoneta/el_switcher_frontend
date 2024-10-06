import Spinner from "../../../components/Spinner";
import { ButtonFilled, ButtonUnfilled } from "../../../components/Buttons.jsx";
import propTypes from "prop-types";

export default function RoomLayout({
  roomData,
  isOwner,
  handleLeaveRoom,
  handleStartMatch,
}) {
  RoomLayout.propTypes = {
    roomData: propTypes.object,
    isOwner: propTypes.bool,
    handleLeaveRoom: propTypes.func,
    handleStartMatch: propTypes.func,
  };
  if (!roomData) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 flex max-w-screen-lg flex-col items-center justify-center p-4">
      <div className="center mx-auto w-full max-w-md items-center justify-center bg-lime-200 p-4 shadow-md">
        <h1 className="mb-6 text-center font-serif text-3xl font-bold">Sala</h1>
        <div className="mb-4 border-b pb-4">
          <h2 className="text-x2 font-semibold">
            Nombre de la sala: {roomData.room_name}
          </h2>
          <h4 className="text=x2">Creador de la sala: {roomData.owner_name}</h4>
          <span className="block">
            Jugadores esperados: {roomData.players_expected}
          </span>
        </div>
        <div>
          <h4 className="mb-4 text-lg font-medium">Jugadores en la sala</h4>
          <ul className="list-disc rounded bg-lime-100 p-4 pl-5">
            {roomData.players_names.map((player, index) => (
              <li key={index} className="mb-2">
                {player}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <ButtonUnfilled
            type="button"
            onClick={() => handleLeaveRoom()}
            className="w-full"
          >
            Salir
          </ButtonUnfilled>
          {isOwner && (
            <ButtonFilled
              type="button"
              onClick={() => handleStartMatch()}
              className="w-full"
            >
              Empezar
            </ButtonFilled>
          )}
        </div>
      </div>
    </div>
  );
}
