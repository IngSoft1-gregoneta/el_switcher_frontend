import React from "react";
import useMatchData from "../hooks/useMatchData";
import { ButtonFilled } from "../../../components/Buttons";
import { useNavigate, useParams } from "react-router-dom";

export default function Winner() {
  const { room_id, user_name} = useParams();
  const winner = useMatchData(room_id, user_name).stateWinner;
  const navigate = useNavigate();
  const handleLeave = () => {
    navigate("/");
  };

  const isWinner = winner === user_name; 
  
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {isWinner ? (
        <>
          <h1 className="text-4xl font-bold">¡Felicitaciones!</h1>
          <h2 className="mt-4 text-2xl font-semibold">
            ¡Eres el ganador de la partida!
          </h2>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold">Lo siento...</h1>
          <h2 className="mt-4 text-2xl font-semibold">
            {`El ganador fue ${winner}. Mejor suerte la próxima vez.`}
          </h2>
        </>
      )}
      <ButtonFilled onClick={handleLeave}>Volver al inicio</ButtonFilled>
    </div>
  );
}

