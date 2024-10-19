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
  {
    room_id: 4,
    room_name: "room4",
    players_expected: 4,
    players_names: ["tito", "tita"],
    owner_name: "tito",
    is_active: true,
  },
];

describe("ListRoomsLayout tests", () => {
  it("should filter rooms by name", () => {
    render(
      <MemoryRouter>
        <ListRoomsLayout rooms={mockedRooms} />
      </MemoryRouter>
    );

    // filtrar por nombre de sala
    const filterInput = screen.getByPlaceholderText(/filtrar por nombre de sala/i);
    fireEvent.change(filterInput, { target: { value: "room4" } });

    // verificar que solo la sala de estrategia está visible
    expect(screen.getByText(/room4/i)).toBeInTheDocument();
    expect(screen.queryByText(/famaf/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/niconeta/i)).not.toBeInTheDocument();
  });

  it("should filter rooms by number of players", () => {
    render(
      <MemoryRouter>
        <ListRoomsLayout rooms={mockedRooms} />
      </MemoryRouter>
    );

    // filtrar por cantidad de jugadores
    const playersFilter = screen.getByRole("combobox"); // Ajusta si es necesario para obtener el select correcto
    fireEvent.change(playersFilter, { target: { value: "4" } });

    // verificar que solo la sala de estrategia está visible
    expect(screen.getByText(/room4/i)).toBeInTheDocument();
    expect(screen.queryByText(/famaf/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/niconeta/i)).not.toBeInTheDocument();
  });

  it("should show all rooms when filters are cleared", () => {
    render(
      <MemoryRouter>
        <ListRoomsLayout rooms={mockedRooms} />
      </MemoryRouter>
    );

    // filtrar por nombre de sala
    const filterInput = screen.getByPlaceholderText(/filtrar por nombre de sala/i);
    fireEvent.change(filterInput, { target: { value: "room4" } });

    // limpiar filtro
    fireEvent.change(filterInput, { target: { value: "" } });

    // verificar que todas las salas están visibles
    expect(screen.getByText(/famaf/i)).toBeInTheDocument();
    expect(screen.getByText(/niconeta/i)).toBeInTheDocument();
    expect(screen.getByText(/room4/i)).toBeInTheDocument();
  });
});

describe("ListRooms test", () => {
  it("should show list of rooms and not the message of empty rooms", () => {
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
  it("should show message of empty list of rooms and not table of rooms", () => {
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
  it("should show message of empty list of rooms and not table of rooms on empty array", () => {
    render(
      <MemoryRouter>
        <ListRooms rooms={[]} />
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
