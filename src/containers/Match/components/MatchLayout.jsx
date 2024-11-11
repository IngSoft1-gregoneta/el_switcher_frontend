import { PlayerLeft, PlayerMe, PlayerRight, PlayerTop } from "./PlayerViews";
import images from "../logic/bindImage";
import Board from "./Board";
import { ButtonDangerFilled, ButtonUnfilled } from "../../../components/Buttons";
import PropTypes from "prop-types";
import clicksound from "../../assets/clicksound.wav";
import entersound from "../../assets/entersound.wav";
import MovCard from "./MovCard";
import { useFigCardStore } from "../../../zustand/store";
import Chat from "./Chat"
import Timer from "./Timer";

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
    //userId: PropTypes.string.isRequired,
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
    new Audio(clicksound).play();
  }
  function enterplay() {
    new Audio(entersound).play();
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
    <div className="grid h-screen w-screen grid-cols-5 grid-rows-5">
      <div className="col-span-1 row-span-2 flex flex-col  md:items-center justify-center text-center">
        <div className="md:rounded-br-lg lg:rounded-b-lg bg-gradient-to-br from-blue-400 to-blue-600 bg-opacity-90 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)] text-[#f8f4e8]">
          <Timer />
          <h3 className="m-4 font-bold text-xl md:text-3xl">Color prohibido:</h3>
          <div className="relative flex items-center justify-center">
            {(blockedColor && blockedColor !== "None") ? (
              <div className="relative h-20 w-20">
                <img
                  src={displayBlockedColor(blockedColor)}
                  className="md:absolute z-0 h-full w-full rounded-full border-4 border-yellow-300 shadow-lg"
                  alt="Blocked Color"
                />
              </div>
            ) : (
              <div className="m-2 font-bold text-2xl">Ninguno</div>
            )}
          </div>
        </div>
      </div>
      <div className="align-center col-span-2 lg:col-span-3 row-span-2 mb-2 flex flex-row items-center justify-center text-center">
        <div className="rounded-lg bg-[#2f4550] bg-opacity-90 p-4 shadow-lg text-[#e8e5da]">
          <PlayerTop
            player={playerTop}
          />
        </div>
      </div>
      <div className="rounded-bl-lg bg-white p-4 col-span-2 lg:col-span-1 row-span-2">
        <div className="rounded-lg bg-gradient-to-br w-full h-full from-cyan-400 via-blue-500 to-purple-500 bg-[length:200%_200%] animate-gradient-noticeable">
          <p className="text-xl md:text-2xl p-2 text-center text-white font-bold mb-4">Turno del jugador: {playerWithTurn}</p>
          <div className="align-center col-span-1 row-span-1 mb-2 flex flex-row items-center justify-center text-center">
            <div className="flex h-fit w-fit items-center justify-center gap-2 md:flex-row">
              {movParcialDeck}
            </div>
          </div>
        </div>
      </div>
      <div className="align-center col-span-1 row-span-3 mb-2 flex flex-row items-center justify-center text-center">
        {playerLeft && (
          <div className="rounded-lg bg-[#2f4550] bg-opacity-90 p-4 shadow-lg text-white">
            <PlayerLeft
              player={playerLeft}
            />
          </div>
        )}
      </div>
      <div className="align-center col-span-3 row-span-3 flex items-center justify-center">
        <div className="aspect-square h-full max-h-[100%] w-full max-w-[100%] md:max-h-[90%] md:max-w-[90%]">
          <Board handleDiscardFigure={(tile) => handleDiscardFigure(tile)} />
        </div>
      </div>
      <div className="align-center col-span-1 row-span-3 mb-2 flex flex-row items-center justify-center text-center">
        {playerRight && (
          <div className="rounded-lg bg-[#2f4550] bg-opacity-90 p-4 shadow-lg text-white">
            <PlayerRight
              player={playerRight}
            />
          </div>
        )}
      </div>
      <div className="bg-white p-4 m-0 rounded-tr-lg row-span-1 col-span-2 max-w-[500px]">
        <div
          className="rounded-lg p-4 text-white bg-gradient-to-br from-[#1e79e7] to-[#1966c2] shadow-[20px_20px_60px_rgba(17,69,132,0.3),-20px_-20px_60px_rgba(39,157,255,0.3)]"
        >
          <div className="mb-4 text-left font-extrabold text-xl tracking-wide text-gray-200">
            Tus cartas de movimiento
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            {movCards}
          </div>
        </div>
      </div>
      <div className="align-center rounded-tl-lg lg:rounded-t-lg pl-2 col-span-3 lg:col-span-2 row-span-1 ml-2 flex flex-row items-center justify-left gap-4 text-center">
        <div className="rounded-lg bg-[#d0ceba] p-4 shadow-lg text-slate">
          <PlayerMe player={playerMe} />
        </div>
        <div className="flex flex-col bg-[#d0ceba] p-4 shadow-lg rounded items-center justify-center">
          <ButtonUnfilled
            disabled={!hasTurn}
            onmouseenter={enterplay}
            className="px-1 py-2 text-slate-900 font-bold max-w-[200px]"
            onClick={() => {
              handleRevertMove();
              clickplay();
            }}
          >
            Revertir Movimiento
          </ButtonUnfilled>
          <ButtonUnfilled
            disabled={!hasTurn}
            onmouseenter={enterplay}
            className="px-1 py-2 text-slate-900 font-bold max-w-[200px]"
            onClick={() => {
              handlePassTurn();
              dispatchFigCards({ type: "deselect" });
              clickplay();
            }}
          >
            Pasar turno
          </ButtonUnfilled>
          {/* TODO: Should show modal asking you if you really want to leave the match */}
          <ButtonDangerFilled
            onmouseenter={enterplay}
            className="px-1 py-2 text-[#D0CEBA] font-bold max-w-[200px]"
            onClick={() => { handleLeaveMatch(); clickplay(); }}
          >
            Abandonar
          </ButtonDangerFilled>
        </div>
      </div>
      <div className="col-span-1 p-2 row-span-1 hidden lg:block">
        <Chat/>
      </div>
    </div>
  );
}
