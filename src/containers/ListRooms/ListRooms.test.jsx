import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import ListRooms from "./ListRooms";
import ListRoomsLayout from "./components/ListRoomsLayout";

const mockedRooms = [
  {
    room_id: 2,
    room_name: "famaf",
    players_expected: 3,
    players_names: ["grego", "nico"],
    owner_name: "grego",
    is_active: true,
  },
  {
    room_id: 3,
    room_name: "niconeta",
    players_expected: 3,
    players_names: ["tadeo", "yamil"],
    owner_name: "yamil",
    is_active: true,
  },
];

describe("ListRooms test", () => {
  it("should show message of empty list of rooms", () => {
    render(
      <MemoryRouter>
        <ListRoomsLayout rooms={mockedRooms} />
      </MemoryRouter>,
    );

    const texto = screen.queryByText(/no hay salas/i);
    expect(texto).not.toBeInTheDocument();

    const jugadores_th = screen.getByRole("columnheader", {
      name: /jugadores/i,
      hidden: true,
    });
    expect(jugadores_th).toBeInTheDocument();

    const owner = screen.getByText(/yamil/i);
    expect(owner).toBeInTheDocument();
  });
  it("should show list of rooms and not the message of empty rooms", () => {
    render(
      <MemoryRouter>
        <ListRooms />
      </MemoryRouter>,
    );

    const texto = screen.getByText(/no hay salas/i);
    expect(texto).toBeInTheDocument();

    const jugadores_th = screen.queryByRole("columnheader", {
      name: /jugadores/i,
      hidden: true,
    });
    expect(jugadores_th).not.toBeInTheDocument();
  });
});
