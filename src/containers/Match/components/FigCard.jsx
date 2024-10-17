import React, { useEffect, useState } from "react";
import images from "../logic/bindImage";
import { useMovCardStore } from "../../../zustand/store";

export default function FigCard({
  className,
  figType,
  index,
  onSelected,
  isSelected,
}) {
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
