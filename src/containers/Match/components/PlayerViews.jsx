import React, { useEffect, useState } from "react";
import images from "../logic/bindImage";
import FigCard from "./FigCard";

const mapCards = (
  cards,
  name,
  isRotated,
  selectedFigCard,
  setSelectedFigCard,
) => {
  const className = isRotated
    ? "aspect-[5/3] w-24 rounded-sm   md:w-32 lg:w-44"
    : "aspect-[3/5] h-24 rounded-sm   md:h-32 lg:h-44";
  return cards.map((card, i) => {
    return (
      <FigCard
        key={i}
        className={className}
        figType={card.fig_type}
        index={i}
        isSelected={
          selectedFigCard &&
          selectedFigCard.index === i &&
          selectedFigCard.player === name
        }
        onSelected={() =>
          card.canBeSelected &&
          setSelectedFigCard({
            type: "select_fig_card",
            player: name,
            index: i,
          })
        }
      />
    );
  });
};

export function PlayerMe({
  name,
  cards,
  deckLen,
  selectedFigCard,
  setSelectedFigCard,
}) {
  //TODO: deberia ser un useEffect que se fije si el jugador ya no tiene el turno
  //para deseleccionar las seleccionadas ie ver si hasITurn false
  const figCards = mapCards(
    cards,
    name,
    false,
    selectedFigCard,
    setSelectedFigCard,
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex basis-1/12 flex-col md:flex-row">
        <div className="basis-1/6 font-bold">{name}</div>
        <div className="basis-4/6" id="separator"></div>
        <div className="basis-1/6 md:shrink-0 md:whitespace-nowrap">
          Tarjetas Figura: {deckLen}
        </div>
      </div>
      <div className="flex h-fit flex-row items-center justify-center gap-2">
        {figCards}
      </div>
    </div>
  );
}

export function PlayerTop({
  name,
  cards,
  deckLen,
  selectedFigCard,
  setSelectedFigCard,
}) {
  const figCards = mapCards(
    cards,
    name,
    false,
    selectedFigCard,
    setSelectedFigCard,
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex h-fit flex-row items-center justify-center gap-2">
        {figCards}
      </div>
      <div className="flex flex-grow basis-1/12 flex-col justify-between md:flex-row">
        <div className="basis-1/6 font-bold">{name}</div>
        <div className="basis-1/6 md:shrink-0 md:whitespace-nowrap">
          Tarjetas Figura: {deckLen}
        </div>
      </div>
    </div>
  );
}

export function PlayerLeft({
  name,
  cards,
  deckLen,

  selectedFigCard,
  setSelectedFigCard,
}) {
  const figCards = mapCards(
    cards,
    name,
    false,
    selectedFigCard,
    setSelectedFigCard,
  );

  return (
    <div
      className="flex flex-row gap-2 [writing-mode:vertical-lr] sm:flex-col"
      data-testid="player-left"
    >
      <div className="flex h-fit flex-row items-center justify-center gap-2">
        {figCards}
      </div>
      {/* falta que sea responsive en mobile */}
      <div className="flex flex-grow basis-1/12 rotate-180 flex-col justify-between md:flex-row">
        <div className="basis-1/6 font-bold">{name}</div>
        <div className="basis-1/6 md:shrink-0 md:whitespace-nowrap">
          Tarjetas Figura: {deckLen}
        </div>
      </div>
    </div>
  );
}

export function PlayerRight({
  name,
  cards,
  deckLen,
  selectedFigCard,
  setSelectedFigCard,
}) {
  const figCards = mapCards(
    cards,
    name,
    false,
    selectedFigCard,
    setSelectedFigCard,
  );

  return (
    <div
      data-testid="player-right"
      className="flex flex-col items-center gap-2 md:flex-row md:gap-6"
    >
      <div className="flex basis-1/12 flex-col md:flex-row md:gap-14 md:[writing-mode:vertical-lr] lg:gap-32">
        <div className="basis-1/6 font-bold">{name}</div>
        <div className="basis-1/6 md:shrink-0 md:whitespace-nowrap">
          Tarjetas Figura: {deckLen}
        </div>
      </div>
      <div className="flex h-fit flex-col items-center justify-center gap-2">
        {figCards}
      </div>
    </div>
  );
}
