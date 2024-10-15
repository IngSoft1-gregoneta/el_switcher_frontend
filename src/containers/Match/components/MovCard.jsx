import React from "react";
import images from "../logic/bindImage";
import { useMovCardStore } from "../../../zustand/store";

export default function MovCard({ card, index }) {
    const selectedMovCard = useMovCardStore((state) => state.selectedMovCard);
    const setSelectedMovCard = useMovCardStore((state) => state.setSelectedMovCard);

    const handleClick = () => {
        const new_card = { ...card, index };
        if (new_card == selectedMovCard) selectedMovCard(null);
        console.log(card);
        setSelectedMovCard(new_card);
    }

    return (
        <img
            onClick={handleClick}
            src={images[`${card.mov_type}`]}
            key={index}
            data-testid="me-mov-cards"
            className="mov_card aspect-[3/5] h-12 rounded-sm md:h-32 lg:h-36"
        />
    );
};