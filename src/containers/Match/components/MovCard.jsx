import React, { useEffect,useState } from "react";
import { useAnimate ,motion } from "framer-motion";
import {useParams } from "react-router-dom";
import useMatchData from "../hooks/useMatchData.jsx";
import images from "../logic/bindImage";
import { useBoardStore } from "../../../zustand/store";
import PropTypes from "prop-types";
import entersound from "../../assets/entersound.wav"
import clicksound from "../../assets/cardsound.wav"

export default function MovCard({ card, index }) {
  MovCard.propTypes = {
    card: PropTypes.object,
    index: PropTypes.number
  }


  const dispatchMovCard = useBoardStore(state => state.dispatchMovCard)

  const [scope, animate] = useAnimate()
  const [canreturn] = useState(false);
  


  const handleClick = () => {
    const new_card = { ...card, index };
    dispatchMovCard({ type : "selectMovCard", card : new_card});
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
  )
}
