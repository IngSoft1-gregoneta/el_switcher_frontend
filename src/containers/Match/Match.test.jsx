import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  renderHook,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import testResponses from "./testResponses.json";
import MatchLayout from "./components/MatchLayout";
import { useBoardStore } from "../../zustand/store";
import Tile from "./components/Tile";
import BoardClass from "./logic/board";
import useMatchData from "./hooks/useMatchData";
import Match from "./Match";
import useInitBoard from "./hooks/useInitBoard";
import useHighLightTiles from "./hooks/useHighLightTiles";
import ChatComponent from "./components/Chat";

// TODO : mover a test responses?
const mockBoard = {
  tiles: [
    [
      { color: "Yellow", figure: "fig" },
      { color: "Green", figure: "fig" },
      { color: "Red", figure: "fig" },
      { color: "Blue", figure: "fig" },
      { color: "Yellow", figure: "None" },
      { color: "Green", figure: "None" },
    ],
    [
      { color: "Red", figure: "None" },
      { color: "Blue", figure: "None" },
      { color: "Yellow", figure: "None" },
      { color: "Green", figure: "None" },
      { color: "Red", figure: "None" },
      { color: "Blue", figure: "None" },
    ],
    [
      { color: "Yellow", figure: "None" },
      { color: "Green", figure: "None" },
      { color: "Red", figure: "None" },
      { color: "Blue", figure: "None" },
      { color: "Yellow", figure: "None" },
      { color: "Green", figure: "None" },
    ],
    [
      { color: "Red", figure: "None" },
      { color: "Blue", figure: "None" },
      { color: "Yellow", figure: "None" },
      { color: "Green", figure: "None" },
      { color: "Red", figure: "None" },
      { color: "Blue", figure: "None" },
    ],
    [
      { color: "Yellow", figure: "None" },
      { color: "Green", figure: "None" },
      { color: "Red", figure: "None" },
      { color: "Blue", figure: "None" },
      { color: "Yellow", figure: "None" },
      { color: "Green", figure: "None" },
    ],
    [
      { color: "Red", figure: "None" },
      { color: "Blue", figure: "None" },
      { color: "Yellow", figure: "None" },
      { color: "Green", figure: "None" },
      { color: "Red", figure: "None" },
      { color: "Blue", figure: "None" },
    ],
  ],
};

describe("Match testing", () => {
  beforeEach(() => {
    useBoardStore.setState({
      board: mockBoard,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("names of players appears", () => {
    const mockRes = testResponses;
    useBoardStore.setState({selectedMovCard : {card : null }})

    render(
      <MemoryRouter>
        <MatchLayout
          statePlayerMe={mockRes.me}
          stateOtherPlayers={mockRes.other_players}
          usedMovCards={mockRes.visible_mov_cards}
          handleLeaveMatch={() => void 0}
          handlePassTurn={() => void 0}
          handleDiscardFigure={() => void 0}
          handlePartialMove={() => void 0}
          handleRevertMove={() => void 0}
        />
      </MemoryRouter>,
    );

    const playerMe = screen.queryByText(/grego/i);
    const playerOther = screen.queryByText(/nico/);
    expect(playerMe).toBeInTheDocument();
    expect(playerOther).toBeInTheDocument();
  });
  it("given Me dosnt have the turn the button is hidden, abandonar showed always", () => {
    const mockRes = testResponses;
    render(
      <MemoryRouter>
        <MatchLayout
          statePlayerMe={mockRes.me}
          stateOtherPlayers={mockRes.other_players}
          usedMovCards={mockRes.visible_mov_cards}
          handleLeaveMatch={() => void 0}
          handlePassTurn={() => void 0}
          handleDiscardFigure={() => void 0}
          handlePartialMove={() => void 0}
          handleRevertMove={() => void 0}
        />
      </MemoryRouter>,
    );

    const buttonAbandonar = screen.getByRole("button", { name: "Abandonar" });
    expect(buttonAbandonar).toBeInTheDocument();
  });

  it("given Me has the turn the button appears, abandonar showed always", () => {
    testResponses.me.has_turn = true;
    const mockRes = testResponses;
    render(
      <MemoryRouter>
        <MatchLayout
          statePlayerMe={mockRes.me}
          stateOtherPlayers={mockRes.other_players}
          usedMovCards={mockRes.visible_mov_cards}
          handleLeaveMatch={() => void 0}
          handlePassTurn={() => void 0}
          handleDiscardFigure={() => void 0}
          handlePartialMove={() => void 0}
          handleRevertMove={() => void 0}
        />
      </MemoryRouter>,
    );

    const buttonTurno = screen.queryByRole("button", { name: "Pasar turno" });
    const buttonAbandonar = screen.getByRole("button", { name: "Abandonar" });
    expect(buttonAbandonar).toBeInTheDocument();
    expect(buttonTurno).toBeInTheDocument();
  });
  it("show mov cards if are visible", () => {
    testResponses.me.has_turn = true;
    const mockRes = testResponses;
    render(
      <MemoryRouter>
        <MatchLayout
          statePlayerMe={mockRes.me}
          stateOtherPlayers={mockRes.other_players}
          usedMovCards={mockRes.visible_mov_cards}
          handleLeaveMatch={() => void 0}
          handlePassTurn={() => void 0}
          handleDiscardFigure={() => void 0}
          handlePartialMove={() => void 0}
          handleRevertMove={() => void 0}
        />
      </MemoryRouter>,
    );

    const meMovCards = screen.getAllByTestId("me-mov-cards");
    expect(meMovCards.length).toBe(2);
  });

  it("does not render a player that is not in the game", () => {
    testResponses.me.has_turn = true;
    const mockRes = testResponses;
    render(
      <MemoryRouter>
        <MatchLayout
          statePlayerMe={mockRes.me}
          stateOtherPlayers={mockRes.other_players}
          usedMovCards={mockRes.visible_mov_cards}
          handleLeaveMatch={() => void 0}
          handlePassTurn={() => void 0}
          handleDiscardFigure={() => void 0}
          handlePartialMove={() => void 0}
          handleRevertMove={() => void 0}
        />
      </MemoryRouter>,
    );

    const playerLeft = screen.queryByTestId("player-left");
    const playerRight = screen.queryByTestId("player-right");
    // This is not working on coverage... why?
    if (mockRes.other_players.length < 3) {
      expect(playerLeft).not.toBeInTheDocument();
    }
    if (mockRes.other_players.length < 2) {
      expect(playerRight).not.toBeInTheDocument();
    }
  });

  it("highlighted figure on board", () => {
    const mockRes = testResponses;
  
    render(
      <MemoryRouter>
        <MatchLayout
          statePlayerMe={mockRes.me}
          stateOtherPlayers={mockRes.other_players}
          usedMovCards={mockRes.visible_mov_cards}
          handleLeaveMatch={() => void 0}
          handlePassTurn={() => void 0}
          handleDiscardFigure={() => void 0}
          handlePartialMove={() => void 0}
          handleRevertMove={() => void 0}
        />
      </MemoryRouter>,
    );
  
    const tiles = screen.getAllByTestId("tile-background");
  
    const numberOfHighlightedTiles = tiles.filter((tile) =>
      tile.className.split(" ").includes("blur"),
    ).length;
  
    expect(numberOfHighlightedTiles).toBe(4);
  });
  
  it("First click on tile should set first position", () => {
    const mockDispatch = vi.fn()

    useBoardStore.setState({
      dispatchPositions : mockDispatch,
    })

    render(
      <Tile
        color={"bg-yellow-500"}
        posx={0}
        posy={0}
        figure={"fig"}
        onClick={() => void 0}
      />,
    );

    const tile = screen.getByTestId("actual-tile");
    fireEvent.click(tile);

    expect(mockDispatch).toHaveBeenCalledOnce
    expect(mockDispatch).toHaveBeenCalledWith({
      type : "setTilePosition",
      position : {
        pos_x : 0,
        pos_y : 0,
      }
    }) 
  });

  it("useBoardInit hook should not set the state if board is null", () => {
    const mockSetBoard = vi.fn();

    renderHook(() => useInitBoard(null, mockSetBoard));

    expect(mockSetBoard).toBeCalledTimes(0);
  });

  it("useBoardInit hook should set state if board is instantiated", () => {
    const mockSetBoard = vi.fn();
    const mockBoardFromServer = testResponses.board.tiles;
    const expectedBoard = new BoardClass(mockBoardFromServer);

    renderHook(() => useInitBoard(mockBoardFromServer, mockSetBoard));

    const board = useBoardStore.getState().board
    expect(board).toStrictEqual(expectedBoard)
  });

  it("useMoveHighLights hook should not set the state if conditions are not met", () => {
    // conditions statePlayerMe?.has_turn && selectedMovCard && firstPos && board,

    const mockSetHighlightedTiles = vi.fn();

    renderHook(() =>
        useHighLightTiles(null, null, null, null),
    );

    expect(mockSetHighlightedTiles).toBeCalledTimes(0);
  });

  it("useMoveHighLights hook should set the state if conditions are met", () => {
    const highlightedTilesMock = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
    ];
    const mockDisableHighlights = vi.fn();
    const mockHighlightTiles = vi.fn();

    const mockBoard = {
      disableHighlights: mockDisableHighlights,
      highlightTiles: mockHighlightTiles,
    };

    const selectedMovCard = {
      card : {
        vectors: [
          [1, 0],
          [-1, 0],
        ],
      }
    };
    const firstPos = {pos_x : 0, pos_y : 0};
    const statePlayerMe = { has_turn: true };

    mockHighlightTiles.mockReturnValue(highlightedTilesMock);

    renderHook(() =>
      useHighLightTiles(
        {first_position : firstPos},
        selectedMovCard,
        mockBoard,
        statePlayerMe,
      ),
    );

    expect(mockHighlightTiles).toHaveBeenCalledWith(
      firstPos,
      selectedMovCard.card.vectors,
    );
  });

  it("useMoveHighLights hook should not do anything if inputs are missing", () => {
    const statePlayerMe = { has_turn: true };
    const mockDisableHighlights = vi.fn();
    const mockHighlightTiles = vi.fn();
    const mockBoard = {
      disableHighlights: mockDisableHighlights,
      highlightTiles: mockHighlightTiles,
    };
    renderHook(() =>
      useHighLightTiles(
        null,
        mockBoard,
        [0, 0],
        statePlayerMe,
      ),
    );
    expect(mockDisableHighlights).not.toHaveBeenCalled();
    expect(mockHighlightTiles).not.toHaveBeenCalled();
    renderHook(() =>
      useHighLightTiles(
        {
          vectors: [
            [1, 0],
            [-1, 0],
          ],
        },
        null,
        [0, 0],
        statePlayerMe,
      ),
    );
    expect(mockDisableHighlights).not.toHaveBeenCalled();
    expect(mockHighlightTiles).not.toHaveBeenCalled();
    renderHook(() =>
      useHighLightTiles(
        {
          vectors: [
            [1, 0],
            [-1, 0],
          ],
        },
        mockBoard,
        null,
        statePlayerMe,
      ),
    );
    expect(mockDisableHighlights).not.toHaveBeenCalled();
    expect(mockHighlightTiles).not.toHaveBeenCalled();
  });

  it('should render chat', () => {
    render(<ChatComponent />);
    const messagesContainer = screen.getByTestId('chat-container'); // Assuming the container has this test ID
    expect(messagesContainer).toBeInTheDocument();
  });

  

  it("useMatchData hook should return match data", async () => {
    global.fetch = vi.fn();
    const mockMatchId = 0;

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => testResponses,
    });

    const { result } = renderHook(() =>
      useMatchData(mockMatchId, testResponses.me.player_name),
    );
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `http://localhost:8000/matchs/visible_match/${mockMatchId}/${testResponses.me.player_name}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      expect(result.current.stateBoard).toEqual(testResponses.board.tiles);

      expect(result.current.usedMovCards).toEqual(
        testResponses.visible_mov_cards,
      );
      expect(result.current.error).toBe(null);
    });
  });

  it("Match should render Spinner if no matchData is available", () => {
    render(
      <MemoryRouter>
        <Match />
      </MemoryRouter>,
    );
    const spinner = screen.getByTestId("spinner");
    expect(spinner);
  });
});
