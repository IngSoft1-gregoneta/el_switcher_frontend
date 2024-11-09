import { PlayerLeft, PlayerMe, PlayerRight, PlayerTop } from "./PlayerViews";
import { useState, useEffect } from "react";
import images from "../logic/bindImage";
import Board from "./Board";
import { ButtonFilled, ButtonUnfilled } from "../../../components/Buttons";
import PropTypes from "prop-types";
import color_proh from "../assets/prohib.svg";
import clicksound from "../../assets/clicksound.wav"
import entersound from "../../assets/entersound.wav"
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
  const dispatchFigCards = useFigCardStore(state => state.selectedFigCardsDispatch);
  const timerValue = useTimerStore((state) => state.Timer);
  const savedTimer = localStorage.getItem("timer");
  const initialTimer = savedTimer ? parseInt(savedTimer, 10) : 0;
  const [currentTimer, setCurrentTimer] = useState(initialTimer);

  
  function clickplay() {
    new Audio(clicksound).play()
  }
  function enterplay() {
    new Audio(entersound).play()
  }

  useEffect(() => {
    if (timerValue && timerValue.startsWith("TIMER: STARTS")) {
      const totalTime = parseInt(timerValue.split(" ")[2], 10); 
      localStorage.setItem("timer", totalTime.toString());
      setCurrentTimer(totalTime);
    }
  }, [timerValue]);

  useEffect(() => {
    // Sincronizar el temporizador en localStorage cuando cambie el valor
    localStorage.setItem("timer", currentTimer.toString());

    // Iniciar el temporizador
    if (currentTimer > 0) {
      const intervalId = setInterval(() => {
        setCurrentTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(intervalId);
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [currentTimer]); 

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
      "Red": images[`A`],
      "Yellow": images[`B`],
      "Green": images[`C`],
      "Blue": images[`D`],
    };
    console.log("Blocked color image path:", colorImages[blockedColor]);
    return colorImages[blockedColor]; 
  };

  return (
    <div className="grid h-screen w-screen grid-cols-4 grid-rows-4">
      <div className="container col-span-1 row-span-1 flex flex-col items-center justify-center text-center">
        <div className="rounded-lg bg-[#2f4550] bg-opacity-90 p-4 shadow-lg text-[#e8e5da]">
          <h3 className="font-bold md:text-2xl">Tiempo restante</h3>
          <p className="m-2 text-2xl md:text-5xl">{currentTimer > 0 ? `${currentTimer} segundos` : "Tiempo agotado"}</p>
          <h3 className="m-4 font-bold text-2xl md:text-2x1">Color prohibido:</h3>
          <div className="relative flex items-center justify-center object-center">
            {(blockedColor && blockedColor !== "None") ? 
              <div className="relative h-20 w-20">
                <img src={displayBlockedColor(blockedColor)} className="md:absolute z-0 h-9/12 w-9/12 top-2 left-2" />
              </div>
            :
              <div className="m-2 font-bold text-2xl">Ninguno</div>
            }
          </div>
        </div>
      </div>

      <div className="align-center col-span-2 row-span-1 mb-2 flex flex-row items-center justify-center text-center">
        <div className="rounded-lg bg-[#2f4550] bg-opacity-90 p-4 shadow-lg text-[#e8e5da]">
          <PlayerTop
            player={playerTop}
            />
        </div>
      </div>

      <div className="container col-span-1 row-span-1">
        <div className="rounded-lg bg-[#2f4550] bg-opacity-90 p-2 shadow-lg text-[#e8e5da]">
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
        <div className="rounded-lg bg-[#2f4550] bg-opacity-90 p-4 shadow-lg text-white">
            <PlayerLeft
            player={playerLeft}
            />
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
          <div className="rounded-lg bg-[#2f4550] bg-opacity-90 p-4 shadow-lg text-white">
          <PlayerRight
            player={playerRight}
          />
        </div>
        )}
      </div>

      <div className="container col-span-1 row-span-1 overflow-hidden">
        <div className="rounded-lg bg-[#2f4550] bg-opacity-90 p-1 shadow-lg text-white">
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
        <div className="rounded-lg bg-[#d0ceba] bg-opacity-90 p-4 shadow-lg text-slate-900">
          <PlayerMe
            player={playerMe}
            />
        </div>
      </div>

      <div className="align-center col-span-1 row-span-1 mb-2 flex flex-row items-center justify-center text-center">
        <div className="flex flex-col items-center justify-items-center">
          {hasTurn && (
            <ButtonUnfilled
              onmouseenter={enterplay}
              className="mx-0 text-wrap px-1 py-2 text-slate-900 bold"
              onClick={() => {handleRevertMove(); clickplay();}}
            >
              Revertir Movimiento
            </ButtonUnfilled>
          )}
          {hasTurn && (
           <ButtonUnfilled
              onmouseenter={enterplay}
              className="mx-0 text-wrap px-1 text-slate-900 py-2 bold"
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
            className="mx-0 text-wrap px-1 py-2 text-[#D0CEBA] bold]"
            onClick={() => {handleLeaveMatch(); clickplay();}}
          >
            Abandonar
          </ButtonFilled>
        </div>
      </div>
    </div>
  );
}
