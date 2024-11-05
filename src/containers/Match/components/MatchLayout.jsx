import { PlayerLeft, PlayerMe, PlayerRight, PlayerTop } from "./PlayerViews";
import images from "../logic/bindImage";
import Board from "./Board";
import { ButtonFilled, ButtonUnfilled } from "../../../components/Buttons";
import PropTypes from "prop-types";
import color_proh from "../assets/prohib.svg";
import clicksound from "../../assets/clicksound.wav"
import entersound from "../../assets/entersound.wav"
import MovCard from "./MovCard";
import { useFigCardStore } from "../../../zustand/store";

export default function MatchLayout({
  statePlayerMe,
  stateOtherPlayers,
  usedMovCards,
  handlePassTurn,
  handleLeaveMatch,
  handleDiscardFigure,
  handleRevertMove,
}) {
  MatchLayout.propTypes = {
    statePlayerMe: PropTypes.object,
    stateOtherPlayers: PropTypes.array,
    usedMovCards: PropTypes.array,
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

  
  function clickplay() {
    new Audio(clicksound).play()
  }
  function enterplay() {
    new Audio(entersound).play()
  }


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
  

  return (
    <div className="grid h-screen w-screen grid-cols-4 grid-rows-4">
      <div className="container col-span-1 row-span-1 flex flex-col items-center justify-center text-center">
        <div className="rounded-lg bg-[#2f4550] bg-opacity-90 p-4 shadow-lg text-[#e8e5da]">
          <h3 className="font-bold md:text-2xl">Tiempo restante</h3>
          <p className="m-2 text-2xl md:text-5xl">00:42</p>
          <div className="align-center relative flex items-center justify-center object-center">
            <img src={color_proh} className="z-10 h-14 w-14" />
            <div className="absolute z-0 h-8 w-8 rounded bg-blue-600"></div>
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
