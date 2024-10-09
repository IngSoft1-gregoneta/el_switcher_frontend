import React from "react";
import { PlayerLeft, PlayerMe, PlayerRight, PlayerTop } from "./PlayerViews";
import images from "../logic/bindImage";
import Board from "./Board";
import { ButtonFilled, ButtonUnfilled } from "../../../components/Buttons";

export default function MatchLayout({ statePlayerMe, stateOtherPlayers, handlePassTurn, handleLeaveMatch}) {

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
                <div className="aspect-square h-full max-h-[100%] w-full max-w-[100%] md:max-h-[90%] md:max-w-[90%]">
                    <Board/>
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