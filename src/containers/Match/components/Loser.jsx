import React from "react";
import { useNavigate } from "react-router-dom";
import { ButtonFilled } from "../../../components/Buttons";

export default function Loser() {
  const navigate = useNavigate();

  const handleLeave = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Has perdido la partida</h1>
      <h2 className="mt-4 text-2xl font-semibold">Mejor suerte la próxima vez.</h2>
      <ButtonFilled onClick={handleLeave}>Volver al inicio</ButtonFilled>
    </div>
  );
}
