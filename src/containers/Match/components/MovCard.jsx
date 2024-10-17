import React from "react";
import { useAnimate, stagger,motion } from "framer-motion";
import images from "../logic/bindImage";
import { useMovCardStore } from "../../../zustand/store";
import entersound from "../../assets/entersound.wav"
import clicksound from "../../assets/cardsound.wav"


export default function MovCard({ card, index }) {
    const [scope, animate] = useAnimate()
    const selectedMovCard = useMovCardStore((state) => state.selectedMovCard);
    const setSelectedMovCard = useMovCardStore((state) => state.setSelectedMovCard);
    const handleClick = () => {
        const new_card = { ...card, index };
        if (new_card == selectedMovCard) selectedMovCard(null);
        setSelectedMovCard(new_card);
    }

    function clickplay() {
        new Audio(clicksound).play()
        animate(scope.current, {scale: 1.3})
      }
    function enterplay() {
        new Audio(entersound).play()
    }

    return (
        <motion.img 
        whileHover={{scale: 1.2, y: -30}}
        onClick={() => {handleClick();clickplay();}}
        onMouseOver={enterplay}
        ref = {scope}
        src={images[`${card.mov_type}`]}
        key={index}
        data-testid="me-mov-cards"
        transition={{bounceDamping: 10}}
        className="mov_card aspect-[3/5] h-12 rounded-sm md:h-32 lg:h-36"></motion.img>
    );
};