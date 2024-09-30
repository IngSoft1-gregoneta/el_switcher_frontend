import { useEffect, useState } from "react";
import { useMatchStore } from "../../services/state.js";
import Board from "./components/Board.jsx";
import { Button } from "@headlessui/react";
import { fetchMatch } from "./services/MatchService.js";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner.jsx";
import images from "./logic/bindImage.js";
import { ButtonFilled, ButtonUnfilled } from "../../components/Buttons.jsx";

export default function Match() {
  const stateBoard = useMatchStore((state) => state.stateBoard);
  const setStateBoard = useMatchStore((state) => state.setStateBoard);
  const [stateMatch, setStateMatch] = useState(null);
  const updateMatch = useMatchStore((state) => state.updateMatch);
  const { room_id, user_name, user_id } = useParams();

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

  function PlayerMe({ name, cards, deckLen }) {
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

  function PlayerTop({ name, cards, deckLen }) {
    const cardsDiv = mapCard(cards, false);
    return (
      <div className="flex flex-col gap-2">
        <div className="flex h-fit flex-row items-center justify-center gap-2">
          {cardsDiv}
        </div>
        <div className="flex basis-1/12 flex-col md:flex-row">
          <div className="basis-1/6 font-bold">{name}</div>
          <div className="basis-4/6" id="separator"></div>
          <div className="basis-1/6 md:shrink-0 md:whitespace-nowrap">
            Tarjetas Figura: {deckLen}
          </div>
        </div>
      </div>
    );
  }
  function PlayerLeft({ name, cards, deckLen }) {
    const cardsDiv = mapCard(cards, true);
    return (
      <div className="flex flex-col items-center gap-2 md:flex-row md:gap-6">
        <div className="flex h-fit flex-col items-center justify-center gap-2">
          {cardsDiv}
        </div>
        <div className="flex basis-1/12 flex-col md:rotate-180 md:flex-row md:gap-14 md:[writing-mode:vertical-lr] lg:gap-32">
          <div className="basis-1/6 font-bold">{name}</div>
          <div className="basis-1/6 md:shrink-0 md:whitespace-nowrap">
            Tarjetas Figura: {deckLen}
          </div>
        </div>
      </div>
    );
  }

  function PlayerRight({ name, cards, deckLen }) {
    const cardsDiv = mapCard(cards, true);
    return (
      <div className="flex flex-col items-center gap-2 md:flex-row md:gap-6">
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const matchData = await fetchMatch(room_id, user_name);
        console.log(matchData);
        setStateMatch(matchData);
        // TODO: hacer esto por id :SSSS
        setStateBoard(matchData.board.tiles);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [
    setStateMatch,
    user_name,
    setStateBoard,
    room_id,
    user_id,
    updateMatch, // este hace q se actualice con ws
  ]);

  if (stateMatch) {
    const playerMe = stateMatch.me;
    const playerTop = stateMatch.other_players[0];
    const playerRight =
      stateMatch.other_players.length > 1 && stateMatch.other_players[1];
    const playerLeft =
      stateMatch.other_players.length > 2 && stateMatch.other_players[2];

    const movCards = playerMe.mov_cards.map((card, i) => {
      return (
        <img
          src={images[`${card.mov_type}`]}
          key={i}
          className="aspect-[3/5] h-16 rounded-sm md:h-32 lg:h-44"
        />
      );
    });
    return (
      <div className="grid h-screen w-screen grid-cols-4 grid-rows-4">
        <div className="container col-span-1 row-span-1 flex flex-col items-center justify-center text-center">
          <h3 className="font-bold md:text-2xl">Tiempo restante</h3>
          <p className="text-2xl md:text-7xl">00:42</p>
        </div>

        <div className="align-center col-span-2 row-span-1 mb-2 flex flex-row items-center justify-center text-center">
          <PlayerTop
            name={playerTop.player_name}
            cards={playerTop.visible_fig_cards}
            deckLen={playerTop.deck_len}
          />
        </div>

        <div className="container col-span-1 row-span-1">COLOR PROHIBIDO</div>

        <div className="align-center col-span-1 row-span-2 mb-2 flex flex-row items-center justify-center text-center">
          {playerLeft && (
            <PlayerLeft
              name={playerLeft.player_name}
              cards={playerLeft.visible_fig_cards}
              deckLen={playerLeft.deck_len}
            />
          )}
        </div>

        <div className="align-center col-span-2 row-span-2 flex items-center justify-center">
          <div className="aspect-square h-full max-h-[100%] w-full max-w-[100%] md:max-h-[90%] md:max-w-[90%]">
            <Board />
          </div>
        </div>

        <div className="align-center col-span-1 row-span-2 mb-2 flex flex-row items-center justify-center text-center">
          {playerRight && (
            <PlayerRight
              name={playerRight.player_name}
              cards={playerRight.visible_fig_cards}
              deckLen={playerRight.deck_len}
            />
          )}
        </div>

        {/* MOVIMIENTO */}
        <div className="align-center col-span-1 row-span-1 mb-2 flex flex-row items-center justify-center text-center">
          <div className="flex h-fit w-full flex-col flex-wrap items-center justify-center gap-2 md:flex-row">
            {movCards}
          </div>
        </div>

        <div className="align-center col-span-2 row-span-1 mb-2 flex flex-row items-center justify-center text-center">
          <PlayerMe
            name={playerMe.player_name}
            cards={playerMe.visible_fig_cards}
            deckLen={playerMe.deck_len}
          />
        </div>

        <div className="align-center col-span-1 row-span-1 mb-2 flex flex-row items-center justify-center text-center">
          <div className="flex flex-col">
            <ButtonFilled>Pasar turno</ButtonFilled>
            <ButtonUnfilled>Abandonar</ButtonUnfilled>
          </div>
        </div>
      </div>
    );
  } else {
    return <Spinner />;
  }
}
