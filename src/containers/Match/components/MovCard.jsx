import React, { useEffect,useState } from "react";
import { useAnimate, stagger,motion } from "framer-motion";
import {useParams } from "react-router-dom";
import useMatchData from "../hooks/useMatchData.jsx";
import images from "../logic/bindImage";
import { useMovCardStore } from "../../../zustand/store";
import PropTypes from "prop-types";
import entersound from "../../assets/entersound.wav"
import clicksound from "../../assets/cardsound.wav"

export default function MovCard({ card, index }) {
  MovCard.propTypes = {
    card: PropTypes.object,
    index: PropTypes.number
  }

  const [scope, animate] = useAnimate()
  const {room_id, user_name} = useParams();
  const {statePlayerMe} = useMatchData(room_id, user_name);
  const selectedMovCard = useMovCardStore((state) => state.selectedMovCard);
  const setSelectedMovCard = useMovCardStore(
    (state) => state.setSelectedMovCard,
  );
  const [canreturn, setCanReturn] = useState(false);
  

  useEffect(() => {
    if (card.is_used || statePlayerMe) {
      animate(scope.current,{ scale:1, y:0});
    }
  },[animate, card.is_used, statePlayerMe]);

  useEffect(() => {
    if (selectedMovCard){
      if (selectedMovCard.index != index){
        setCanReturn(false);
      }
    }
},[animate, selectedMovCard]);

  const handleClick = () => {
    const new_card = { ...card, index };

    if (selectedMovCard && new_card.index === selectedMovCard.index) {
      setCanReturn(false);
      animate(scope.current, {scale: 1, y: 0});
      setSelectedMovCard(null);
    } else if(card.is_used == true){
      if (selectedMovCard != null){
        const prev_movCard = document.getElementById("mov_card" + selectedMovCard.index);
          if (prev_movCard) {
              animate(prev_movCard, {scale: 1, y: 0});
            }
      }
      setSelectedMovCard(null);
    } else {
      if (statePlayerMe?.has_turn){
        setCanReturn(true);
        if (selectedMovCard != null){
        const prev_movCard = document.getElementById("mov_card" + selectedMovCard.index);
          if (prev_movCard) {
              animate(prev_movCard, {scale: 1, y: 0});
            }
      }
      animate(scope.current, {scale: 1.3,y: -30});
      setSelectedMovCard(new_card);
      }else setSelectedMovCard(null);
    }
}

    function clickplay() {
        new Audio(clicksound).play()
        }
    function Hoverstart(){
        new Audio(entersound).play()
        if (!canreturn && !card.is_used) animate(scope.current, {scale: 1.2, y: -30})
    }
    function Hoverend(){
        if (!canreturn || card.is_used){
          animate(scope.current, {scale: 1, y: 0})
        }
    }

    return (
        <motion.img 
        onHoverStart={Hoverstart}
        onHoverEnd={Hoverend}
        onClick={() => {handleClick();clickplay();}}
        ref = {scope}
        src={images[`${card.mov_type}`]}
        key={index}
        data-testid="me-mov-cards"
        transition={{bounceDamping: 10}}
        className={`mov_card aspect-[3/5] h-12 rounded-sm md:h-32 lg:h-36
            ${card.is_used ? "unavailable" : ""}
          `}
        title={card.is_used ? "Esta carta ya ha sido usada" : ""}
        id = {"mov_card"+ index}
        ></motion.img>
    )}