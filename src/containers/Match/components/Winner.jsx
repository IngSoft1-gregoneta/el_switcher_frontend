import React from "react";
import { ButtonFilled } from "../../../components/Buttons";
import { useNavigate, useParams } from "react-router-dom";
import winnersound from "../../assets/winsound.mp3"

export default function Winner({winner}) {
  const { user_name} = useParams();
  const navigate = useNavigate();
  const audio = new Audio(winnersound);
  const handleLeave = () => {
    navigate("/");
  };
  const winnerName = winner.player_name;
  const isWinner = winner.player_name === user_name;
  const winByDiscardingDeck = winner.mov_cards == 0;
  
  function clickplay(){
    if (audio.paused){
      audio.play()
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {isWinner ? (
        <>
          <h1 className="text-4xl font-bold"onClick={clickplay}>{`¡Felicitaciones ${winnerName}!`}</h1>
          {winByDiscardingDeck ? (
            <h2 className="mt-4 text-2xl font-semibold">
            {`Victoria por finalizar mazo de figuras`}
          </h2>
          ) : (
            <h2 className="mt-4 text-2xl font-semibold">
            {`Victoria por abandono`}
          </h2>
          )}
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold">
            {`El ganador fue ${winnerName}. Mejor suerte la próxima vez.`}
          </h1>
          <h2 className="mt-4 text-2xl font-semibold">
            {`Derrota por finalizar mazo de figuras`}
          </h2>
        </>
      )}
      <ButtonFilled onClick={handleLeave}>Volver al inicio</ButtonFilled>
    </div>
  );
}

