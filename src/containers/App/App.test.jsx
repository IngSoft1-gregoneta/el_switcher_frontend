import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AppLayout from "./components/AppLayout";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App from "./App";
import useWebSocket, { ReadyState } from "react-use-websocket";

const updateListMock = vi.fn();
const updateRoomMock = vi.fn();
const updateMatchMock = vi.fn();
const setMatchStartedMock = vi.fn();
vi.mock("react-use-websocket");
vi.mock("../../zustand/store.js", async (importOriginal) => {
  return {
    ...(await importOriginal()),
    useMatchStore: (state) => {
      const data = {
        matchStarted: false,
        setMatchStarted: setMatchStartedMock,
      };
      return state(data);
    },
    useUpdateStore: (state) => {
      const data = {
        updateList: false,
        updateRoom: false,
        updateMatch: false,
        setUpdateList: updateListMock,
        setUpdateRoom: updateRoomMock,
        setUpdateMatch: updateMatchMock,
      };
      return state(data);
    },
  };
});

const uuid = crypto.randomUUID();
describe("App testing", () => {
  let originalFetch;
  beforeAll(() => {
    originalFetch = global.fetch;
    global.fetch = vi.fn(() => {
      return {
        ok: true,
        json: () => new Promise((resolve) => resolve(uuid)),
      };
    });
  });
  afterAll(() => {
    global.fetch = originalFetch;
  });

  it("should render /create_room on Crear Partida button", () => {
    render(
      <MemoryRouter>
        <AppLayout />
      </MemoryRouter>,
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/crear/i);
  });

  it("get the id from GetId, saves it to the store and call webScoket with that id", async () => {
    vi.mocked(useWebSocket).mockReturnValue({
      sendMessage: null,
      lastMessage: null,
      readyState: null,
    });

    render(<App />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("http://127.0.0.1:8000/get_id", {
        method: "GET",
      });
      expect(useWebSocket).toHaveBeenCalledWith(
        `ws://localhost:8000/ws/${uuid}`,
      );
    });
  });
  it("test updateList is called on lastMessage == LISTA ", async () => {
    vi.mocked(useWebSocket).mockReturnValue({
      sendMessage: null,
      lastMessage: { data: "LISTA" },
      readyState: ReadyState.OPEN,
    });

    render(<App />);

    await waitFor(() => {
      expect(updateListMock).toHaveBeenCalled();
    });
  });
  it("test updateRoom is called on lastMessage == ROOM ", async () => {
    vi.mocked(useWebSocket).mockReturnValue({
      sendMessage: null,
      lastMessage: { data: "ROOM" },
      readyState: ReadyState.OPEN,
    });

    render(<App />);

    await waitFor(() => {
      expect(updateRoomMock).toHaveBeenCalled();
    });
  });
  it("test updateMatch is called on lastMessage == MATCH ", async () => {
    vi.mocked(useWebSocket).mockReturnValue({
      sendMessage: null,
      lastMessage: { data: "MATCH" },
      readyState: ReadyState.OPEN,
    });

    render(<App />);

    await waitFor(() => {
      expect(updateMatchMock).toHaveBeenCalled();
      expect(setMatchStartedMock).toHaveBeenCalledWith(true);
    });
  });
});
