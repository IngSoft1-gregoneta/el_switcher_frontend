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
import { useBoardStore, useMovCardStore } from "../../zustand/store";
import MovCard from "./components/MovCard";
import Tile from "./components/Tile";
import { useBoardInit } from "./hooks/useBoardInit";
import BoardClass from "./logic/board";
import { useMoveHighLights } from "./hooks/useMoveHighLights";
import useMatchData from "./hooks/useMatchData";
import Match from "./Match";

// TODO : mover a test responses?
const mockBoard = {
  tiles: [
    [
      { color: "YELLOW", figure: "fig" },
      { color: "GREEN", figure: "fig" },
      { color: "RED", figure: "fig" },
      { color: "BLUE", figure: "fig" },
      { color: "YELLOW", figure: "None" },
      { color: "GREEN", figure: "None" },
    ],
    [
      { color: "RED", figure: "None" },
      { color: "BLUE", figure: "None" },
      { color: "YELLOW", figure: "None" },
      { color: "GREEN", figure: "None" },
      { color: "RED", figure: "None" },
      { color: "BLUE", figure: "None" },
    ],
    [
      { color: "YELLOW", figure: "None" },
      { color: "GREEN", figure: "None" },
      { color: "RED", figure: "None" },
      { color: "BLUE", figure: "None" },
      { color: "YELLOW", figure: "None" },
      { color: "GREEN", figure: "None" },
    ],
    [
      { color: "RED", figure: "None" },
      { color: "BLUE", figure: "None" },
      { color: "YELLOW", figure: "None" },
      { color: "GREEN", figure: "None" },
      { color: "RED", figure: "None" },
      { color: "BLUE", figure: "None" },
    ],
    [
      { color: "YELLOW", figure: "None" },
      { color: "GREEN", figure: "None" },
      { color: "RED", figure: "None" },
      { color: "BLUE", figure: "None" },
      { color: "YELLOW", figure: "None" },
      { color: "GREEN", figure: "None" },
    ],
    [
      { color: "RED", figure: "None" },
      { color: "BLUE", figure: "None" },
      { color: "YELLOW", figure: "None" },
      { color: "GREEN", figure: "None" },
      { color: "RED", figure: "None" },
      { color: "BLUE", figure: "None" },
    ],
  ],
};

describe("Match testing", () => {
  beforeEach(() => {
    useBoardStore.setState({
      board: mockBoard,
    });
    useMovCardStore.setState({
      setSelectedMovCard: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("names of players appears", () => {
    const mockRes = testResponses;
    render(
      <MemoryRouter>
        <MatchLayout
          statePlayerMe={mockRes.me}
          stateOtherPlayers={mockRes.other_players}
          usedMovCards={mockRes.visible_mov_cards}
          selectedFigReducer={{
            selectedFigCards: null,
            dispatchFigCards: () => void 0,
          }}
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
          selectedFigReducer={{
            selectedFigCards: null,
            dispatchFigCards: () => void 0,
          }}
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
    expect(buttonTurno).not.toBeInTheDocument();
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
          selectedFigReducer={{
            selectedFigCards: null,
            dispatchFigCards: () => void 0,
          }}
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
          selectedFigReducer={{
            selectedFigCards: null,
            dispatchFigCards: () => void 0,
          }}
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
          selectedFigReducer={{
            selectedFigCards: null,
            dispatchFigCards: () => void 0,
          }}
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
          selectedFigReducer={{
            selectedFigCards: null,
            dispatchFigCards: () => void 0,
          }}
          handleLeaveMatch={() => void 0}
          handlePassTurn={() => void 0}
          handleDiscardFigure={() => void 0}
          handlePartialMove={() => void 0}
          handleRevertMove={() => void 0}
        />
      </MemoryRouter>,
    );
    const tiles = screen.getAllByTestId("tile");
    const numberOfHighlightedTiles = tiles.filter((tile) =>
      tile.className.split(" ").includes("blur"),
    ).length;
    expect(numberOfHighlightedTiles).toBe(4);
  });

  it("Click on movCard should set state", () => {
    const mockCard = { mock: "mockCard" };

    const setMock = vi.fn();
    useMovCardStore.setState({
      setSelectedMovCard: setMock,
    });

    render(<MovCard card={mockCard} index={0} />);

    const img = screen.getByTestId("me-mov-cards");
    fireEvent.click(img);
    expect(setMock).toBeCalledWith(null);
  });

  it("Double click on movCard should set state to null", () => {
    const mockCard = { mock: "mockCard" };
    render(<MovCard card={mockCard} index={0} />);

    const img = screen.getByTestId("me-mov-cards");
    fireEvent.click(img);
    fireEvent.click(img);
    const selectedMovCard = useMovCardStore.getState().selectedMovCard;
    expect(selectedMovCard).toBe(null);
  });

  it("First click on tile should set first position", () => {
    render(
      <Tile
        color={"bg-yellow-600"}
        posx={0}
        posy={0}
        figure={"fig"}
        onClick={() => void 0}
      />,
    );

    const tile = screen.getByTestId("actual-tile");
    fireEvent.click(tile);

    const firstPos = useBoardStore.getState().firstPos;
    expect(firstPos).toStrictEqual({ pos_x: 0, pos_y: 0 });
    useBoardStore.setState({ firstPos: null });
  });

  it("If there is a first position, tile click should set second position", () => {
    useBoardStore.setState({ firstPos: { pos_x: 0, pos_y: 0 } });

    render(
      <Tile
        color={"bg-yellow-600"}
        posx={1}
        posy={1}
        figure={"fig"}
        onClick={() => void 0}
      />,
    );

    const tile = screen.getByTestId("actual-tile");
    fireEvent.click(tile);

    const firstPos = useBoardStore.getState().firstPos;
    const secondPos = useBoardStore.getState().secondPos;
    expect(firstPos).toStrictEqual({ pos_x: 0, pos_y: 0 });
    expect(secondPos).toStrictEqual({ pos_x: 1, pos_y: 1 });

    useBoardStore.setState({
      firstPos: null,
      secondPos: null,
    });
  });

  it("Double click on the same first position tile should reset the move state to null", () => {
    render(
      <Tile
        color={"bg-yellow-600"}
        posx={0}
        posy={0}
        figure={"fig"}
        onClick={() => void 0}
      />,
    );

    const tile = screen.getByTestId("actual-tile");
    fireEvent.click(tile);

    const firstPos1 = useBoardStore.getState().firstPos;
    expect(firstPos1).toStrictEqual({ pos_x: 0, pos_y: 0 });

    fireEvent.click(tile);

    const firstPos2 = useBoardStore.getState().firstPos;
    expect(firstPos2).toStrictEqual(null);

    useBoardStore.setState({
      firstPos: null,
      secondPos: null,
    });
  });

  it("useBoardInit hook should not set the state if board is null", () => {
    const mockSetBoard = vi.fn();

    renderHook(() => useBoardInit(null, mockSetBoard));

    expect(mockSetBoard).toBeCalledTimes(0);
  });

  it("useBoardInit hook should set state if board is instantiated", () => {
    const mockSetBoard = vi.fn();
    const mockBoardFromServer = testResponses.board.tiles;
    const expectedBoard = new BoardClass(mockBoardFromServer);

    renderHook(() => useBoardInit(mockBoardFromServer, mockSetBoard));

    expect(mockSetBoard).toHaveBeenCalledWith(expectedBoard);
  });

  it("useMoveHighLights hook should not set the state if conditions are not met", () => {
    // conditions statePlayerMe?.has_turn && selectedMovCard && firstPos && board,

    const mockSetHighlightedTiles = vi.fn();

    renderHook(() =>
      useMoveHighLights(null, null, null, null, mockSetHighlightedTiles),
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
    const mockSetHighlightedTiles = vi.fn();

    const mockBoard = {
      disableHighlights: mockDisableHighlights,
      highlightTiles: mockHighlightTiles,
    };

    const selectedMovCard = {
      vectors: [
        [1, 0],
        [-1, 0],
      ],
    };
    const firstPos = [0, 0];
    const statePlayerMe = { has_turn: true };

    mockHighlightTiles.mockReturnValue(highlightedTilesMock);

    renderHook(() =>
      useMoveHighLights(
        selectedMovCard,
        mockBoard,
        firstPos,
        statePlayerMe,
        mockSetHighlightedTiles,
      ),
    );

    expect(mockDisableHighlights).toHaveBeenCalled();
    expect(mockHighlightTiles).toHaveBeenCalledWith(
      firstPos,
      selectedMovCard.vectors,
    );
    expect(mockSetHighlightedTiles).toHaveBeenCalledWith(highlightedTilesMock);
  });

  it("useMoveHighLights hook should not do anything if inputs are missing", () => {
    const statePlayerMe = { has_turn: true };
    const mockDisableHighlights = vi.fn();
    const mockHighlightTiles = vi.fn();
    const mockSetHighlightedTiles = vi.fn();
    const mockBoard = {
      disableHighlights: mockDisableHighlights,
      highlightTiles: mockHighlightTiles,
    };
    renderHook(() =>
      useMoveHighLights(
        null,
        mockBoard,
        [0, 0],
        statePlayerMe,
        mockSetHighlightedTiles,
      ),
    );
    expect(mockDisableHighlights).not.toHaveBeenCalled();
    expect(mockHighlightTiles).not.toHaveBeenCalled();
    expect(mockSetHighlightedTiles).not.toHaveBeenCalled();
    renderHook(() =>
      useMoveHighLights(
        {
          vectors: [
            [1, 0],
            [-1, 0],
          ],
        },
        null,
        [0, 0],
        statePlayerMe,
        mockSetHighlightedTiles,
      ),
    );
    expect(mockDisableHighlights).not.toHaveBeenCalled();
    expect(mockHighlightTiles).not.toHaveBeenCalled();
    expect(mockSetHighlightedTiles).not.toHaveBeenCalled();
    renderHook(() =>
      useMoveHighLights(
        {
          vectors: [
            [1, 0],
            [-1, 0],
          ],
        },
        mockBoard,
        null,
        statePlayerMe,
        mockSetHighlightedTiles,
      ),
    );
    expect(mockDisableHighlights).not.toHaveBeenCalled();
    expect(mockHighlightTiles).not.toHaveBeenCalled();
    expect(mockSetHighlightedTiles).not.toHaveBeenCalled();
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

      // expect(result.current.statePlayerMe).toEqual(testResponses.me);
      // expect(result.current.stateOtherPlayers).toEqual(
      //   testResponses.other_players,
      // );
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
