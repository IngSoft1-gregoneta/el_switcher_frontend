import { useEffect, useState } from "react";
import images from "../logic/bindImage";
import PropTypes from "prop-types";
import {useAnimate,motion } from "framer-motion";
import clicksound from "../../assets/clicksound.wav"
import entersound from "../../assets/entersound.wav"

export default function FigCard({
  className,
  figType,
  index,
  onSelected,
  isSelected,
}) {
  FigCard.propTypes = {
    className: PropTypes.string,
    figType: PropTypes.string,
    index: PropTypes.number,
    onSelected: PropTypes.func,
    isSelected: PropTypes.bool,
  };
  const [selectedStyle, setSelectedStyle] = useState("");
  const [canreturn, setCanReturn] = useState(false);
  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (isSelected) {

      setCanReturn(true);
      animate(scope.current, {scale: 1.3,y: -30});
    } else {
      setSelectedStyle("");
      setCanReturn(false);
    }
  }, [isSelected]);

  function clickplay() {
    new Audio(clicksound).play()
    }
function Hoverstart(){
    new Audio(entersound).play()
    if (!canreturn) animate(scope.current, {scale: 1.2, y: -30})
}
function Hoverend(){
    if (!canreturn){
      animate(scope.current, {scale: 1, y: 0})
    }
}


  return (
    <motion.img
      onHoverStart={Hoverstart}
      onHoverEnd={Hoverend}
      ref = {scope}
      onClick={() => {onSelected();clickplay();}}
      src={images[`${figType}`]}
      key={index}
      data-testid="fig-cards"
      className={`${className} ${selectedStyle}`}
    ></motion.img>
  );
}
