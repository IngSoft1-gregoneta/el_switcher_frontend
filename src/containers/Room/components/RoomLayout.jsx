import Spinner from "../../../components/Spinner";
import { ButtonFilled, ButtonUnfilled } from "../../../components/Buttons.jsx";
import entersound from "../../assets/entersound.wav"
import propTypes from "prop-types";
import { useState, useEffect } from "react";
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

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  function enterplay() {
    new Audio(entersound).play()
  }

  const handleMouseMove = (event) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const cardOffset = {
    x: mousePosition.x * 0.04,
    y: mousePosition.y * 0.04,
  };

  return (

    <div className="sala-container">
      <div className="sala-card cursor-follow" style={{
        transform: `translate(${cardOffset.x}px, ${cardOffset.y}px)`,
      }}>
        <h1 className="sala-header">Sala</h1>
        <div className="mb-4 border-b pb-4">
          <h2 className="sala-subheader">
            Nombre de la sala: {roomData.room_name}
          </h2>
          <h4 className="sala-text">Creador de la sala: {roomData.owner_name}</h4>
          <span className="sala-text">
            Jugadores esperados: {roomData.players_expected}
          </span>
        </div>
        <div>
          <h4 className="sala-subheader">Jugadores en la sala</h4>
          <ul className="sala-players">
            {roomData.players_names.map((player, index) => (
              <li key={index}>{player}</li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <ButtonUnfilled
            type="button"
            onMouseEnter={enterplay}
            onClick={() => handleLeaveRoom()}
            className="button-unfilled-sala"
          >
            Salir
          </ButtonUnfilled>
          {isOwner && (
            <ButtonFilled
              type="button"
              onMouseEnter={enterplay}
              onClick={() => handleStartMatch()}
              className="button-filled-sala"
            >
              Empezar
            </ButtonFilled>
          )}
        </div>
      </div>
    </div>
  );
}
