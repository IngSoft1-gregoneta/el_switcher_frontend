import React from "react";
import { useWinnerStore } from "../../../zustand/store";
import { ButtonFilled } from "../../../components/Buttons";
import { useNavigate } from "react-router-dom";
import winnersound from "../../assets/winsound.mp3"

export default function Winner() {
  const winner = useWinnerStore((state) => state.stateWinner);
  const navigate = useNavigate();
  const audio = new Audio(winnersound);
  const handleLeave = () => {
    navigate("/");
  };

  function clickplay(){
    if (audio.paused){
      audio.play()
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold" onClick={clickplay}>
        Felicitaciones{winner ? `: ${winner}` : ""}
      </h1>
      <h2 className="mt-4 text-2xl font-semibold">
        ¡Eres el ganador de la partida!
      </h2>
      <ButtonFilled onClick={handleLeave}>Volver al inicio</ButtonFilled>
    </div>
  );
}

