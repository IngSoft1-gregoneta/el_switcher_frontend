import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import ListGames from "./ListGames";
import ListGamesLayout from "./components/ListGamesLayout";

describe("ListGames Test", () => {
  let originalFetch;

  beforeAll(() => {
    originalFetch = global.fetch;
  });
  afterAll(() => {
    global.fetch = originalFetch;
  });

  beforeEach(() => {
    vi.resetAllMocks();
  });
  test("test correct username of table is render", () => {
    let games = [
      { id: 1, name: "estenombredeusuario" },
      { id: 2, name: "Juego de pepe" },
    ];
    render(<ListGamesLayout games={games} />);
    expect(screen.getByText(/estenombredeusuario/i)).toBeDefined();
    expect(screen.getByText(/juego de pepe/i)).toBeDefined();
  });

  test("renders the list of games after fetching", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json() {
          return [{ id: 1, name: "grego" }];
        },
      }),
    );
    render(<ListGames />);
    // aca podes chequear fuera del await si antes de tener la data feched hay algun tipo de msj
    // like loading...
    await waitFor(() => {
      expect(screen.getByText(/grego/i)).toBeDefined();
    });
    // screen.debug();
  });

  test("if get wrong data", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json() {
          // que pasa si fetchamos basura?
          return { data: "wrong data" };
        },
      }),
    );
    render(<ListGames />);
    await waitFor(() => {
      expect(screen.getByText(/grego/i)).toBeDefined();
    });
    // screen.debug();
  });
});
