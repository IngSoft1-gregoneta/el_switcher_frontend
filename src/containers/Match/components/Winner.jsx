import React from "react";
import { useWinnerStore } from "../../../services/state";
import { ButtonFilled } from "../../../components/Buttons";
import { useNavigate } from "react-router-dom";

export default function Winner() {
    const winner = useWinnerStore((state) => state.stateWinner);
    const navigate = useNavigate();
    const handleLeave = () => {
        navigate('/')
    }


    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">
                Felicitaciones{winner ? `: ${winner}` : ""}
            </h1>
            <h2 className="text-2xl font-semibold mt-4">
                ¡Eres el ganador de la partida!
            </h2>
            <ButtonFilled onClick={handleLeave}>Volver al inicio</ButtonFilled>
        </div>
    );
}