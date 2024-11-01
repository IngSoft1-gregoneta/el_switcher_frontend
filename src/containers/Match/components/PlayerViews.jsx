import { useEffect, useState } from "react";
import FigCard from "./FigCard";
import PropTypes from "prop-types";
import { useFigCardStore } from "../../../zustand/store";

const mapCards = (
  cards,
  name,
  isRotated,
  selectedFigCards,
  dispatchFigCards,
) => {
  const rotationA = "aspect-[5/3] w-24 rounded-sm   md:w-32 lg:w-44";
  const rotationB = "aspect-[3/5] h-24 rounded-sm   md:h-32 lg:h-44";
  const className = isRotated ? rotationA : rotationB;
  return cards.map((card, i) => {
    return (
      <FigCard
        key={i}
        className={className}
        figType={card.fig_type}
        index={i}
        isSelected={
          card.canBeSelected &&
          selectedFigCards &&
          selectedFigCards.index === i &&
          selectedFigCards.player === name
        }
        onSelected={() =>
          card.canBeSelected &&
          dispatchFigCards({
            type: "select_fig_card",
            player: name,
            index: i,
          })
        }
      />
    );
  });
};

export function PlayerMe({ player }) {
  PlayerMe.propTypes = {
    player: PropTypes.object,
    selectedFigCards: PropTypes.object,
    dispatchFigCards: PropTypes.func,
  };

  const [figCards, setFigCards] = useState(null);
  const selectedFigCards = useFigCardStore(state => state.selectedFigCards);
  const dispatchFigCards = useFigCardStore(state => state.selectedFigCardsDispatch);
  useEffect(() => {
    setFigCards(
      mapCards(
        player.visible_fig_cards,
        player.player_name,
        false,
        selectedFigCards,
        dispatchFigCards,
      ),
    );
  }, [selectedFigCards, dispatchFigCards, player]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex basis-1/12 flex-col md:flex-row">
        <div className="basis-1/6 font-bold">{player.player_name}</div>
        <div className="basis-4/6" id="separator"></div>
        <div className="basis-1/6 md:shrink-0 md:whitespace-nowrap">
          Tarjetas Figura: {player.deck_len}
        </div>
      </div>
      <div className="flex h-fit flex-row items-center justify-center gap-2">
        {figCards}
      </div>
    </div>
  );
}

export function PlayerTop({ player }) {
  PlayerTop.propTypes = {
    player: PropTypes.object,
    selectedFigCards: PropTypes.object,
    dispatchFigCards: PropTypes.func,
  };
  const [figCards, setFigCards] = useState(null);
  const selectedFigCards = useFigCardStore(state => state.selectedFigCards);
  const dispatchFigCards = useFigCardStore(state => state.selectedFigCardsDispatch);
  useEffect(() => {
    setFigCards(
      mapCards(
        player.visible_fig_cards,
        player.player_name,
        false,
        selectedFigCards,
        dispatchFigCards,
      ),
    );
  }, [selectedFigCards, dispatchFigCards, player]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex h-fit flex-row items-center justify-center gap-2">
        {figCards}
      </div>
      <div className="flex flex-grow basis-1/12 flex-col justify-between md:flex-row">
        <div className="basis-1/6 font-bold">{player.player_name}</div>
        <div className="basis-1/6 md:shrink-0 md:whitespace-nowrap">
          Tarjetas Figura: {player.deck_len}
        </div>
      </div>
    </div>
  );
}

export function PlayerLeft({ player }) {
  PlayerLeft.propTypes = {
    player: PropTypes.object,
    selectedFigCards: PropTypes.object,
    dispatchFigCards: PropTypes.func,
  };
  const [figCards, setFigCards] = useState(null);
  const selectedFigCards = useFigCardStore(state => state.selectedFigCards);
  const dispatchFigCards = useFigCardStore(state => state.selectedFigCardsDispatch);
  useEffect(() => {
    setFigCards(
      mapCards(
        player.visible_fig_cards,
        player.player_name,
        true,
        selectedFigCards,
        dispatchFigCards,
      ),
    );
  }, [selectedFigCards, dispatchFigCards, player]);

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
        <div className="basis-1/6 font-bold">{player.player_name}</div>
        <div className="basis-1/6 md:shrink-0 md:whitespace-nowrap">
          Tarjetas Figura: {player.deck_len}
        </div>
      </div>
    </div>
  );
}

export function PlayerRight({ player }) {
  PlayerRight.propTypes = {
    player: PropTypes.object,
    selectedFigCards: PropTypes.object,
    dispatchFigCards: PropTypes.func,
  };
  const [figCards, setFigCards] = useState(null);
  const selectedFigCards = useFigCardStore(state => state.selectedFigCards);
  const dispatchFigCards = useFigCardStore(state => state.selectedFigCardsDispatch);
  useEffect(() => {
    setFigCards(
      mapCards(
        player.visible_fig_cards,
        player.player_name,
        true,
        selectedFigCards,
        dispatchFigCards,
      ),
    );
  }, [selectedFigCards, dispatchFigCards, player]);

  return (
    <div
      data-testid="player-right"
      className="flex flex-col items-center gap-2 md:flex-row md:gap-6"
    >
      <div className="flex basis-1/12 flex-col md:flex-row md:gap-14 md:[writing-mode:vertical-lr] lg:gap-32">
        <div className="basis-1/6 font-bold">{player.player_name}</div>
        <div className="basis-1/6 md:shrink-0 md:whitespace-nowrap">
          Tarjetas Figura: {player.deck_len}
        </div>
      </div>
      <div className="flex h-fit flex-col items-center justify-center gap-2">
        {figCards}
      </div>
    </div>
  );
}
