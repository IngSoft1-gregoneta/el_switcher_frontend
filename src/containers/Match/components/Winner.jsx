import React from "react";
import { ButtonFilled } from "../../../components/Buttons";
import { useNavigate, useParams } from "react-router-dom";
import { useMatchStore } from "../../../zustand/store";

export default function Winner({ winner }) {
  const { user_name } = useParams();
  const navigate = useNavigate();
  const handleLeave = () => {
    navigate("/");
  };
  const winnerName = winner.player_name;
  const isWinner = winnerName === user_name;
  const winByDiscardingDeck = winner.mov_cards == 0;
  const setMatchStarted = useMatchStore((state) => state.setMatchStarted);

  setMatchStarted(false);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {isWinner ? (
        <>
          <h1 className="text-4xl font-bold">{`¡Felicitaciones ${winnerName}!`}</h1>
          {winByDiscardingDeck ? (
            <h2 className="mt-4 text-2xl font-semibold">
              {`Victoria por finalizar mazo de figuras`}
            </h2>
          ) : (
            <h2 className="m-4 text-2xl font-semibold">
              {`Victoria por abandono`}
            </h2>
          )}
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold">
            {`El ganador fue ${winnerName}. Mejor suerte la próxima vez.`}
          </h1>
          <h2 className="m-4 text-2xl font-semibold">
            {`Derrota por finalizar mazo de figuras`}
          </h2>
        </>
      )}
      <ButtonFilled onClick={handleLeave}>Volver al inicio</ButtonFilled>
    </div>
  );
}
