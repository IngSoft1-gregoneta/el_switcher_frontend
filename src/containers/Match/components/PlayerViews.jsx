import React from "react";
import images from "../logic/bindImage";

const mapCard = (cards, is_rotated) => {
  const className = is_rotated
    ? "aspect-[5/3] w-24 rounded-sm   md:w-32 lg:w-44"
    : "aspect-[3/5] h-24 rounded-sm   md:h-32 lg:h-44";
  return cards.map((card, i) => {
    return (
      <img key={i} className={className} src={images[`${card.fig_type}`]} />
    );
  });
};

export function PlayerMe({ name, cards, deckLen }) {
  const cardsDiv = mapCard(cards, false);
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
        {cardsDiv}
      </div>
    </div>
  );
}

export function PlayerTop({ name, cards, deckLen }) {
  const cardsDiv = mapCard(cards, false);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex h-fit flex-row items-center justify-center gap-2">
        {cardsDiv}
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

export function PlayerLeft({ name, cards, deckLen }) {
  const cardsDiv = mapCard(cards, true);
  return (
    <div
      className="flex flex-row gap-2 [writing-mode:vertical-lr] sm:flex-col"
      data-testid="player-left"
    >
      <div className="flex h-fit flex-row items-center justify-center gap-2">
        {cardsDiv}
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

export function PlayerRight({ name, cards, deckLen }) {
  const cardsDiv = mapCard(cards, true);
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
        {cardsDiv}
      </div>
    </div>
  );
}

