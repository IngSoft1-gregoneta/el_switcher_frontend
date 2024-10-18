import { useEffect, useState } from "react";
import { fetchMatch } from "../services/MatchService";
import { useMatchStore, useUpdateStore } from "../../../zustand/store";

const extendCard = (card, hasMeTurn, figsOnBoard) => {
  if (figsOnBoard.includes(card.fig_type) && hasMeTurn) {
    return { ...card, canBeSelected: true };
  } else {
    return { ...card, canBeSelected: false };
  }
};

const useMatchData = (roomId, userName) => {
  const [stateBoard, setStateBoard] = useState(null);
  const [statePlayerMe, setStatePlayerMe] = useState(null);
  const [stateOtherPlayers, setStateOtherPlayers] = useState(null);
  const [usedMovCards, setUsedMovCards] = useState([]);
  const [error, setError] = useState(null);
  const [stateWinner, setStateWinner] = useState(null);

  const updateMatch = useUpdateStore((state) => state.updateMatch);
  const setHaveITurn = useMatchStore((state) => state.setHaveITurn);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const matchData = await fetchMatch(roomId, userName);
        const figsOnBoard = matchData.board.tiles.reduce((acc, tile) => {
          if (
            tile.tile_in_figure != "None" &&
            !acc.includes(tile.tile_in_figure)
          ) {
            return acc.concat(tile.tile_in_figure);
          }
          return acc;
        }, []);

        const meExtendVisibleCards = {
          ...matchData.me,
          visible_fig_cards: matchData.me.visible_fig_cards.map((card) =>
            extendCard(card, matchData.me.has_turn, figsOnBoard),
          ),
        };

        const otherPlayersExtendVisibleCards = matchData.other_players.map(
          (player) => {
            const visibleFigCardsExtended = player.visible_fig_cards.map(
              (card) => extendCard(card, matchData.me.has_turn, figsOnBoard),
            );
            return { ...player, visible_fig_cards: visibleFigCardsExtended };
          },
        );
        console.log(matchData);
        setStateBoard(matchData.board.tiles);
        setStatePlayerMe(meExtendVisibleCards);
        setStateOtherPlayers(otherPlayersExtendVisibleCards);
        setUsedMovCards(matchData.visible_mov_cards);
        matchData.me.has_turn ? setHaveITurn(true) : setHaveITurn(false);
        setStateWinner(matchData.winner != null ? matchData.winner.player_name : null);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [
    setHaveITurn,
    setUsedMovCards,
    setStatePlayerMe,
    setStateOtherPlayers,
    setStateWinner,
    userName,
    roomId,
    updateMatch,
  ]);

  return { stateBoard, statePlayerMe, stateOtherPlayers, stateWinner, usedMovCards, error };
};

export default useMatchData;
