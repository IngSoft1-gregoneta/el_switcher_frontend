import React from "react";
import { useMatchStore } from "../../../zustand/store";
import { ButtonFilled } from "../../../components/Buttons";
import { useNavigate } from "react-router-dom";

export default function Winner() {
  const winner = useMatchStore((state) => state.winner);
  const navigate = useNavigate();
  const handleLeave = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">
        {winner ? `Felicitaciones: ${winner}` : "Esperando ganador..."}
      </h1>
      <h2 className="mt-4 text-2xl font-semibold">
        {winner ? "¡Eres el ganador de la partida" : "Espera a que finalice la partida!"}
      </h2>
      <ButtonFilled onClick={handleLeave}>Volver al inicio</ButtonFilled>
    </div>
  );
}

