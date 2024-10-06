import { useIdStore, useWinnerStore } from "../../zustand/store.js";
import Board from "./components/Board.jsx";
import { leaveMatch, passTurn } from "./services/MatchService.js";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner.jsx";
import images from "./logic/bindImage.js";
import { ButtonFilled, ButtonUnfilled } from "../../components/Buttons.jsx";
import Winner from "./components/Winner.jsx";
import useMatchData from "./hooks/useMatchData.jsx";

export default function Match() {
  const setStateWinner = useWinnerStore((state) => state.setStateWinner);
  const userId = useIdStore((state) => state.userId);
  const setUserId = useIdStore((state) => state.setUserId);
  const { room_id, user_name, user_id } = useParams();
  const { stateBoard, statePlayerMe, stateOtherPlayers } = useMatchData(
    room_id,
    user_name,
  );
  if (!userId) setUserId(user_id);

  const navigate = useNavigate();

  const handlePassTurn = async () => {
    try {
      const response = await passTurn(room_id, user_name);
      console.log(response);
    } catch (error) {
      console.error(error);
      console.log("No es el turno de este jugador.");
    }
  };

  const handleLeaveMatch = async () => {
    try {
      const response = await leaveMatch(room_id, user_name, user_id);
      navigate("/");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

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
        <div className="flex flex-grow justify-between basis-1/12 flex-col md:flex-row">
          <div className="basis-1/6 font-bold">{name}</div>
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
      <div className="flex [writing-mode:vertical-lr] flex-row sm:flex-col gap-2">
        <div className="flex h-fit flex-row items-center justify-center gap-2">
          {cardsDiv}
        </div>
        {/* falta que sea responsive en mobile */}
        <div className="rotate-180  flex flex-grow justify-between basis-1/12 flex-col md:flex-row">
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

  if (stateOtherPlayers && stateOtherPlayers[0] == undefined) {
    setStateWinner(user_name);
    return <Winner />;
  } else if (!stateBoard) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  } else {
    const hasTurn = statePlayerMe.has_turn;
    const playerMe = statePlayerMe;
    const playerTop = stateOtherPlayers[0];
    const playerRight = stateOtherPlayers.length > 1 && stateOtherPlayers[1];
    const playerLeft = stateOtherPlayers.length > 2 && stateOtherPlayers[2];

    const movCards = playerMe.mov_cards.map((card, i) => {
      return (
        <img
          src={images[`${card.mov_type}`]}
          key={i}
          className="aspect-[3/5] h-16 rounded-sm md:h-32 lg:h-36"
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
          <div className="aspect-square h-full max-h-[100%] w-full max-w-[100%] bg-gray-300 md:max-h-[90%] md:max-w-[90%]">
            {/* <Board stateBoard={stateBoard} /> */}
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

        <div className="align-center col-span-1 row-span-1 mb-2 flex flex-row items-center justify-center text-center">
          <div className="flex h-fit w-full flex-col flex-wrap items-center justify-center gap-2 md:flex-row">
            {movCards}
          </div>
        </div>

        <div className="align-center col-span-2 row-span-1 mb-2 flex flex-row items-center justify-center text-center">
          <PlayerMe
            name={statePlayerMe.player_name}
            cards={statePlayerMe.visible_fig_cards}
            deckLen={statePlayerMe.deck_len}
          />
        </div>

        <div className="align-center col-span-1 row-span-1 mb-2 flex flex-row items-center justify-center text-center">
          <div className="flex flex-col items-center justify-items-center">
            {hasTurn && (
              <ButtonFilled
                className="mr-0 w-20 text-wrap px-0 sm:mr-2 sm:w-full sm:text-nowrap sm:px-4"
                onClick={handlePassTurn}
              >
                Pasar turno
              </ButtonFilled>
            )}
            <ButtonUnfilled
              className="mr-0 w-20 text-wrap px-0 sm:mr-2 sm:w-full sm:text-nowrap sm:px-4"
              onClick={handleLeaveMatch}
            >
              Abandonar
            </ButtonUnfilled>
          </div>
        </div>
      </div>
    );
  }
}
