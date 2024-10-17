import { useEffect, useState } from "react";
import images from "../logic/bindImage";
import PropTypes from "prop-types";

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

  useEffect(() => {
    if (isSelected) {
      setSelectedStyle("bg-black");
    } else {
      setSelectedStyle("");
    }
  }, [isSelected]);

  return (
    <img
      onClick={onSelected}
      src={images[`${figType}`]}
      key={index}
      data-testid="me-mov-cards"
      className={`${className} ${selectedStyle}`}
    />
  );
}
