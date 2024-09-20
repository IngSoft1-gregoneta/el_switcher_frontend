import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import ListRooms from "./ListRooms";
import ListRoomsLayout from "./components/ListRoomsLayout";
import React, { useState } from "react";

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
      { id: 1, name: "estenombredeusuario" },
      { id: 2, name: "Juego de pepe" },
    ];
    render(<ListRoomsLayout rooms={rooms} />);
    expect(screen.getByText(/estenombredeusuario/i)).toBeDefined();
    expect(screen.getByText(/juego de pepe/i)).toBeDefined();
  });

  test("renders the list of rooms after fetching", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json() {
          return [{ id: 1, name: "grego" }];
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
