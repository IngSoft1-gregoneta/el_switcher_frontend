import { beforeEach, describe, expect, it, vi } from "vitest";
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
import { useIdStore } from "../../zustand/store";

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
    // esto anda pero igual se llama :think
    const userId = "c2da8e4a-6b5d-483f-879f-dfa2e9e5f39d";
    useIdStore.setState({ userId: userId });

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
