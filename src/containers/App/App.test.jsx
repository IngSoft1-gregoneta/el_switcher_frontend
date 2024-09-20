import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";
import App from "./App";
import useWebSocket from "react-use-websocket";

vi.mock("react-use-websocket", { spy: true });

describe("Websocket test", () => {
  let originalFetch;
  beforeEach(() => {
    originalFetch = global.fetch;
  });
  afterEach(() => {
    global.fetch = originalFetch;
  });

  test("correct calling on url with useWebSocket", () => {
    render(<App />);
    expect(useWebSocket).toHaveBeenCalledWith("ws://localhost:8000/ws");
  });

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
  });
});
