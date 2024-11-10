import { PlayerLeft, PlayerMe, PlayerRight, PlayerTop } from "./PlayerViews";
import { useState, useEffect } from "react";
import images from "../logic/bindImage";
import Board from "./Board";
import { ButtonFilled, ButtonUnfilled } from "../../../components/Buttons";
import PropTypes from "prop-types";
import clicksound from "../../assets/clicksound.wav";
import entersound from "../../assets/entersound.wav";
import MovCard from "./MovCard";
import { useFigCardStore, useTimerStore } from "../../../zustand/store";

export default function MatchLayout({
  statePlayerMe,
  stateOtherPlayers,
  usedMovCards,
  blockedColor,
  handlePassTurn,
  handleLeaveMatch,
  handleDiscardFigure,
  handleRevertMove,
}) {
  MatchLayout.propTypes = {
    statePlayerMe: PropTypes.object,
    stateOtherPlayers: PropTypes.array,
    usedMovCards: PropTypes.array,
    blockedColor: PropTypes.string,
    handlePassTurn: PropTypes.func,
    handleLeaveMatch: PropTypes.func,
    handleRevertMove: PropTypes.func,
    handleDiscardFigure: PropTypes.func,
  };
  const hasTurn = statePlayerMe.has_turn;
  const playerMe = statePlayerMe;
  const playerTop = stateOtherPlayers[0];
  const playerRight = stateOtherPlayers.length > 1 && stateOtherPlayers[1];
  const playerLeft = stateOtherPlayers.length > 2 && stateOtherPlayers[2];
  const playerWithTurn =
    stateOtherPlayers.filter((player) => player.has_turn)[0]?.player_name ||
    statePlayerMe.player_name;
  const dispatchFigCards = useFigCardStore(
    (state) => state.selectedFigCardsDispatch,
  );
  const timerValue = useTimerStore((state) => state.Timer);
  const [currentTimer, setCurrentTimer] = useState();


  function clickplay() {
    new Audio(clicksound).play();
  }
  function enterplay() {
    new Audio(entersound).play();
  }

  useEffect(() => {
    if (timerValue) {
      const countdownInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const formattedDateString = timerValue.replace(" ", "T");
        const timeWhenTurnStart = new Date(formattedDateString).getTime();
        const diference =  currentTime - timeWhenTurnStart;
        const seconds = Math.floor((diference / 1000) % 60);
        var remainingTime = 120 - seconds 
        if (remainingTime <= 0) {
          remainingTime = 0;
          clearInterval(countdownInterval);
        }

        setCurrentTimer(remainingTime);
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [currentTimer, timerValue]);

  const backMovCard = (lengthToFill) => {
    return Array.from({ length: lengthToFill }, (_, i) => (
      <img
        key={3 - lengthToFill + i}
        src={images[`back_mov`]}
        className="aspect-[3/5] h-12 rounded-sm md:h-32 lg:h-36"
      />
    ));
  };

  const movParcialDeck = usedMovCards
    ? [
        ...usedMovCards.map((card, i) => {
          return (
            <img
              src={images[`${card.mov_type}`]}
              key={i}
              className="aspect-[3/5] h-12 rounded-sm md:h-32 lg:h-36"
            />
          );
        }),
        ...backMovCard(3 - usedMovCards.length),
      ]
    : backMovCard(3);

  const movCards = playerMe.mov_cards.map((card, i) => {
    return <MovCard card={card} key={i} index={i} />;
  });

  const displayBlockedColor = (blockedColor) => {
    const colorImages = {
      Red: images[`A`],
      Yellow: images[`B`],
      Green: images[`C`],
      Blue: images[`D`],
    };
    console.log("Blocked color image path:", colorImages[blockedColor]);
    return colorImages[blockedColor];
  };

  return (
    <div className="grid h-screen w-screen grid-cols-4 grid-rows-4">
      <div className="container col-span-1 row-span-1 flex flex-col items-center justify-center text-center">
        <div className="rounded-lg bg-[#2f4550] bg-opacity-90 p-4 text-[#e8e5da] shadow-lg">
          <h3 className="font-bold md:text-2xl">Tiempo restante</h3>
          <p className="m-2 text-2xl md:text-5xl">
            {currentTimer > 0 ? `${currentTimer} segundos` : "Tiempo agotado"}
          </p>
          <h3 className="md:text-2x1 m-4 text-2xl font-bold">
            Color prohibido:
          </h3>
          <div className="relative flex items-center justify-center object-center">
            {blockedColor && blockedColor !== "None" ? (
              <div className="relative h-20 w-20">
                <img
                  src={displayBlockedColor(blockedColor)}
                  className="h-9/12 left-2 top-2 z-0 w-9/12 md:absolute"
                />
              </div>
            ) : (
              <div className="m-2 text-2xl font-bold">Ninguno</div>
            )}
          </div>
        </div>
      </div>

      <div className="align-center col-span-2 row-span-1 mb-2 flex flex-row items-center justify-center text-center">
        <div className="rounded-lg bg-[#2f4550] bg-opacity-90 p-4 text-[#e8e5da] shadow-lg">
          <PlayerTop player={playerTop} />
        </div>
      </div>

      <div className="container col-span-1 row-span-1">
        <div className="rounded-lg bg-[#2f4550] bg-opacity-90 p-2 text-[#e8e5da] shadow-lg">
          Turno del jugador : {playerWithTurn}
          <div className="align-center col-span-1 row-span-1 mb-2 flex flex-row items-center justify-center text-center">
            <div className="flex h-fit w-fit flex-wrap items-center justify-center gap-2 md:flex-row">
              {movParcialDeck}
            </div>
          </div>
        </div>
      </div>

      <div className="align-center col-span-1 row-span-2 mb-2 flex flex-row items-center justify-center text-center">
        {playerLeft && (
          <div className="rounded-lg bg-[#2f4550] bg-opacity-90 p-4 text-white shadow-lg">
            <PlayerLeft player={playerLeft} />
          </div>
        )}
      </div>
      <div className="align-center col-span-2 row-span-2 flex items-center justify-center">
        <div className="aspect-square h-full max-h-[100%] w-full max-w-[100%] md:max-h-[90%] md:max-w-[90%]">
          <Board handleDiscardFigure={(tile) => handleDiscardFigure(tile)} />
        </div>
      </div>
      <div className="align-center col-span-1 row-span-2 mb-2 flex flex-row items-center justify-center text-center">
        {playerRight && (
          <div className="rounded-lg bg-[#2f4550] bg-opacity-90 p-4 text-white shadow-lg">
            <PlayerRight player={playerRight} />
          </div>
        )}
      </div>

      <div className="container col-span-1 row-span-1 overflow-hidden">
        <div className="rounded-lg bg-[#2f4550] bg-opacity-90 p-1 text-white shadow-lg">
          <div className="mt-2 justify-center text-center align-middle">
            Tus cartas de movimiento
          </div>
          <div className="align-center col-span-1 row-span-1 mb-2 flex flex-row items-center justify-center text-center">
            <div className="flex h-fit w-fit flex-wrap items-center justify-center gap-2 md:flex-row">
              {movCards}
            </div>
          </div>
        </div>
      </div>

      <div className="align-center col-span-2 row-span-1 mb-2 flex flex-row items-center justify-center text-center">
        <div className="rounded-lg bg-[#d0ceba] bg-opacity-90 p-4 text-slate-900 shadow-lg">
          <PlayerMe player={playerMe} />
        </div>
      </div>

      <div className="align-center col-span-1 row-span-1 mb-2 flex flex-row items-center justify-center text-center">
        <div className="flex flex-col items-center justify-items-center">
          {hasTurn && (
            <ButtonUnfilled
              onmouseenter={enterplay}
              className="bold mx-0 text-wrap px-1 py-2 text-slate-900"
              onClick={() => {
                handleRevertMove();
                clickplay();
              }}
            >
              Revertir Movimiento
            </ButtonUnfilled>
          )}
          {hasTurn && (
            <ButtonUnfilled
              onmouseenter={enterplay}
              className="bold mx-0 text-wrap px-1 py-2 text-slate-900"
              onClick={() => {
                handlePassTurn();
                dispatchFigCards({ type: "deselect" });
                clickplay();
              }}
            >
              Pasar turno
            </ButtonUnfilled>
          )}
          {/* TODO: Should show modal asking you if you really want leave the match */}
          <ButtonFilled
            onmouseenter={enterplay}
            className="bold] mx-0 text-wrap px-1 py-2 text-[#D0CEBA]"
            onClick={() => {
              handleLeaveMatch();
              clickplay();
            }}
          >
            Abandonar
          </ButtonFilled>
        </div>
      </div>
    </div>
  );
}
