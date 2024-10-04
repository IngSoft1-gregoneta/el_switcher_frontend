import { describe, expect, it, vi } from "vitest";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router";
import userEvent from "@testing-library/user-event";
import CreateRoom from "./CreateRoom";

const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual("react-router-dom");
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

describe("CreateRoom test", () => {
  it("should navigate to / when there is no user_id", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <CreateRoom />
        </MemoryRouter>,
      );
    });

    await waitFor(() => expect(mockedUseNavigate).toHaveBeenCalledWith("/"));
  });
  it("should NOT navigate to / when there is user_id", async () => {
    const userId = self.crypto.randomUUID();
    await act(async () => {
      render(
        <MemoryRouter>
          <CreateRoom />
        </MemoryRouter>,
      );
    });

    await waitFor(() =>
      expect(mockedUseNavigate).not.toHaveBeenCalledWith("/"),
    );
    screen.debug();
  });
});
