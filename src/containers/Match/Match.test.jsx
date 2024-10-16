import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import testResponses from "./testResponses.json";
import MatchLayout from "./components/MatchLayout";
import { useBoardStore } from "../../zustand/store";

const mockBoard = {
  tiles: [
    [{ color: "YELLOW", figure: "fig" }, { color: "GREEN", figure: "fig" }, { color: "RED", figure: "fig" }, { color: "BLUE", figure: "fig" }, { color: "YELLOW", figure: "None" }, { color: "GREEN", figure: "None" }],
    [{ color: "RED", figure: "None" }, { color: "BLUE", figure: "None" }, { color: "YELLOW", figure: "None" }, { color: "GREEN", figure: "None" }, { color: "RED", figure: "None" }, { color: "BLUE", figure: "None" }],
    [{ color: "YELLOW", figure: "None" }, { color: "GREEN", figure: "None" }, { color: "RED", figure: "None" }, { color: "BLUE", figure: "None" }, { color: "YELLOW", figure: "None" }, { color: "GREEN", figure: "None" }],
    [{ color: "RED", figure: "None" }, { color: "BLUE", figure: "None" }, { color: "YELLOW", figure: "None" }, { color: "GREEN", figure: "None" }, { color: "RED", figure: "None" }, { color: "BLUE", figure: "None" }],
    [{ color: "YELLOW", figure: "None" }, { color: "GREEN", figure: "None" }, { color: "RED", figure: "None" }, { color: "BLUE", figure: "None" }, { color: "YELLOW", figure: "None" }, { color: "GREEN", figure: "None" }],
    [{ color: "RED", figure: "None" }, { color: "BLUE", figure: "None" }, { color: "YELLOW", figure: "None" }, { color: "GREEN", figure: "None" }, { color: "RED", figure: "None" }, { color: "BLUE", figure: "None" }]
  ]
};

describe("Match testing", () => {
  beforeEach(()=>{
    useBoardStore.setState({
      board: mockBoard,
    })
  });

  afterEach(()=>{
    vi.clearAllMocks();
  });

  it("names of players appears", () => {
    const mockRes = testResponses;
    render(
      <MemoryRouter>
        <MatchLayout
          statePlayerMe={mockRes.me}
          stateOtherPlayers={mockRes.other_players}
          usedMovCards={mockRes.visible_mov_cards}
          handleLeaveMatch={() => void 0}
          handlePassTurn={() => void 0}
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
          handleLeaveMatch={() => void 0}
          handlePassTurn={() => void 0}
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
        />
      </MemoryRouter>,
    );
    const tiles = screen.getAllByTestId("tile");
    const numberOfHighlightedTiles = tiles.filter((tile) =>
      tile.className.split(" ").includes("blur"),
    ).length;
    expect(numberOfHighlightedTiles).toBe(4);
  });
});
