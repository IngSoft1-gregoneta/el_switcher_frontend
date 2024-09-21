import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import ListRooms from "./ListRooms";
import ListRoomsLayout from "./components/ListRoomsLayout";
import React, { useState } from "react";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("ListRooms Test", () => {
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
  });
  afterEach(() => {
    global.fetch = originalFetch;
  });

  beforeEach(() => {
    vi.resetAllMocks();
  });
  test("test correct username of table is render", () => {
    let rooms = [
      {
        room_id: 1,
        room_name: "famaf",
        players_expected: 3,
        players_names: [],
        owner_name: "estenombredeusuario",
        is_active: true,
      },
      {
        room_id: 2,
        room_name: "famaf",
        players_expected: 3,
        players_names: [],
        owner_name: "Juego de pepe",
        is_active: true,
      },
    ];
    render(<ListRoomsLayout rooms={rooms} />);
    expect(screen.getByText(/estenombredeusuario/i)).toBeDefined();
    expect(screen.getByText(/juego de pepe/i)).toBeDefined();
  });

  test("renders the list of rooms after fetching", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json() {
          return [
            {
              room_id: 2,
              room_name: "famaf",
              players_expected: 3,
              players_names: ["grego"],
              owner_name: "grego",
              is_active: true,
            },
          ];
        },
      }),
    );
    render(<ListRooms />);
    // aca podes chequear fuera del await si antes de tener la data feched hay algun tipo de msj
    // like loading...
    await waitFor(() => {
      expect(screen.getByText(/grego/i)).toBeDefined();
    });
    // screen.debug();
  });
});
