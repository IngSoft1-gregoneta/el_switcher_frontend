import { describe, expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import AppLayout from "./components/AppLayout";
import useWebSocket, { ReadyState } from "react-use-websocket";
import ListGames from "../ListGames/ListGames";

const mockWebSocket = {
  sendMessage: vi.fn(),
  lastMessage: null,
  readyState: 1,
  setLastMessage: function (message) {
    this.lastMessage = message;
  },
};

vi.mock(import("react-use-websocket"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    __esModule: true,
    default: () => mockWebSocket,
    // your mocked methods
  };
});

describe("Websocket test", () => {
  test("should fetch user ID on mount and call setUserId", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json() {
          return { id: 1234 };
        },
      }),
    );
    render(<App />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("http://127.0.0.1:8000/get_id", {
        method: "GET",
      });
    });

    // screen.debug();
  });
});
