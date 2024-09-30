import { beforeEach, afterEach, describe, expect, test, vi } from "vitest";
import { screen, cleanup, render, waitFor } from "@testing-library/react";

import { createMatch, fetchMatch } from "./services/MatchService.js";
import Match from "./Match";
import match_response from "./testResponses.json";
import { MemoryRouter } from "react-router-dom";

describe("MatchService tests", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("createMatch test", async () => {
    const mockResponse = {
      match_id: 1,
      board: { tile: "this is a tile" },
      players: [{ name: "this is a player" }],
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const roomId = 1;
    const owner = "Owner";

    const result = await createMatch(roomId, owner);

    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:8000/matchs/create_match/${owner}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ room_id: roomId }),
      },
    );

    expect(result).toEqual(mockResponse);
  });

  test("fetchMatch test", async () => {
    const response = match_response.match_response;
    vi.doMock("./services/MatchService.js", () => ({
      fetchMatch: vi.fn().mockResolvedValue(response),
    }));

    const { fetchMatch: mockedFetchMatch } = await import(
      "./services/MatchService.js"
    );

    const playerName = response.me.player_name; //this is in the match response

    expect(mockedFetchMatch()).resolves.toBe(response);
    // expect(mockedFetchMatch()).toBe(response);

    render(
      <MemoryRouter>
        <Match />
      </MemoryRouter>
      );

    // await waitFor(() => {
    //   const nameInput = screen.getByText(playerName);
    //   expect(nameInput).toBeInTheDocument();
    // });
    // screen.debug();
  });
});

// Ahora sale un Spinner
// describe("Board test", () => {
//   afterEach(() => {
//     vi.clearAllMocks();
//     cleanup();
//   });
//
//   test("Board test, nav to root on null stateBoard", () => {
//     render(
//       <MemoryRouter>
//         <Board />
//       </MemoryRouter>,
//     );
//     expect(mockedUseNavigate).toHaveBeenCalledWith("/");
//     expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
//   });
// });
