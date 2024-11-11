import { useEffect, useState } from "react";
import images from "../logic/bindImage";
import PropTypes from "prop-types";
import { useAnimate, motion } from "framer-motion";
import clicksound from "../../assets/clicksound.wav"
import entersound from "../../assets/entersound.wav"

export default function FigCard({
  className,
  figType,
  index,
  onSelected,
  isBlocked,
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
      setSelectedStyle("-translate-y-4 shadow-cyan-500/50")
      setCanReturn(true);
      animate(scope.current, { scale: 1.3, y: -30 });
    } else {
      setSelectedStyle("");
      setCanReturn(false);
    }
    if (isBlocked) {
      animate(scope.current, { rotateY: 180 });
    } else {
      animate(scope.current, { rotateY: 0 });
    }
  }, [isSelected, isBlocked]);

  function clickplay() {
    new Audio(clicksound).play()
  }
  function Hoverstart() {
    new Audio(entersound).play()
    if (!canreturn) animate(scope.current, { scale: 1.2, y: -30 })
  }
  function Hoverend() {
    if (!canreturn) {
      animate(scope.current, { scale: 1, y: 0 })
    }
  }


  return (
    <motion.img
      onHoverStart={Hoverstart}
      onHoverEnd={Hoverend}
      ref={scope}
      onClick={() => { onSelected(); clickplay(); }}
      src={isBlocked ? images[`back`] : images[`${figType}`]}
      key={index}
      data-testid="fig-cards"
      className={`${className} ${selectedStyle}`}
    ></motion.img>
  );
}
