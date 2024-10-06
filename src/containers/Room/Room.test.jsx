import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Room from "./Room";
import RoomLayout from "./components/RoomLayout";

const mockedRoomData = {
  room_id: 1,
  room_name: "famaf",
  players_expected: 3,
  players_names: ["yamil", "facu"],
  owner_name: "yamil",
  is_active: true,
};

describe("Room testing", () => {
  it("Button start game should appear given user isOwner", () => {
    render(
      <MemoryRouter>
        <RoomLayout
          roomData={mockedRoomData}
          isOwner={true}
          handleLeaveRoom={() => void 0}
          handleStartMatch={() => void 0}
        />
      </MemoryRouter>,
    );

    const buttonStart = screen.getByText(/Empezar/i);
    expect(buttonStart).toBeInTheDocument();
  });
  it("Button start game shouldn't appear given user in not the owner", () => {
    render(
      <MemoryRouter>
        <RoomLayout
          roomData={mockedRoomData}
          isOwner={false}
          handleLeaveRoom={() => void 0}
          handleStartMatch={() => void 0}
        />
      </MemoryRouter>,
    );

    const buttonStart = screen.queryByText(/Empezar/i);
    expect(buttonStart).not.toBeInTheDocument();
  });

  it("roomData should be displayed correctly", () => {
    render(
      <MemoryRouter>
        <RoomLayout
          roomData={mockedRoomData}
          isOwner={true}
          handleLeaveRoom={() => void 0}
          handleStartMatch={() => void 0}
        />
      </MemoryRouter>,
    );
    screen.debug();

    const roomName = screen.getByRole("heading", { level: 2 });
    const ownerName = screen.getByRole("heading", {
      level: 4,
      name: /yamil/i,
    });
    const playerName = screen.getByText(/facu/i);

    expect(roomName).toBeInTheDocument();
    expect(roomName).toHaveTextContent(/famaf/i);
    expect(ownerName).toBeInTheDocument();
    expect(ownerName).toHaveTextContent(/yamil/i);
    expect(playerName).toBeInTheDocument();
    expect(playerName).toHaveTextContent(/facu/i);
  });
});

// import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
// import { cleanup, fireEvent, render, screen } from "@testing-library/react";
// import { createRoom } from "./services/RoomService.js";
// import CreateRoomLayout from "./components/CreateRoomLayout.jsx";
// import { MemoryRouter, useNavigate } from "react-router-dom";
// import RoomCreationFailed from "./components/FailedRoom.jsx";
// import RoomLayout from "./components/RoomLayout.jsx";
//
// const uuid = crypto.randomUUID();
// vi.mock("../../services/state.js", () => ({
//   useUpdateStore: vi.fn(() => ({
//     updateList: false,
//     updateRoom: false,
//     setUpdateList: vi.fn(),
//     setUpdateRoom: vi.fn(),
//   })),
//   useMatchStore: (state) => {
//     const data = {
//       stateMatch: null,
//       matchStarted: false,
//       updateMatch: false,
//       stateBoard: null,
//       setStateMatch: vi.fn(),
//       setMatchStarted: vi.fn(),
//       setUpdateMatch: vi.fn(),
//       setStateBoard: vi.fn(),
//     };
//     return state(data);
//   },
//   useIdStore: (state) => {
//     const data = {
//       userId: uuid,
//       setUserId: vi.fn(),
//     };
//     return state(data);
//   },
// }));
// const mockedUseNavigate = vi.fn();
// vi.mock("react-router-dom", async () => {
//   const mod = await vi.importActual("react-router-dom");
//   return {
//     ...mod,
//     useNavigate: () => mockedUseNavigate,
//   };
// });
//
// describe("Room tests", () => {
//   beforeEach(() => {
//     global.fetch = vi.fn();
//   });
//
//   afterEach(() => {
//     vi.clearAllMocks();
//   });
//
//   test("RoomService POST request to server, returns a room", async () => {
//     const mockResponse = {
//       owner_name: "nico",
//       room_name: "Test Room",
//       players: [],
//       players_expected: 4,
//     };
//
//     fetch.mockResolvedValueOnce({
//       ok: true,
//       json: async () => mockResponse,
//     });
//
//     const formData = { room_name: "Test Room", players_expected: 4 };
//
//     const result = await createRoom(formData, uuid);
//
//     expect(fetch).toHaveBeenCalledWith(
//       `http://localhost:8000/rooms/create_room/${uuid}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       },
//     );
//     expect(result).toEqual(mockResponse);
//     cleanup();
//   });
//
//   test("RoomService POST request to server, returns 400 error", async () => {
//     fetch.mockResolvedValueOnce({
//       ok: false,
//       status: 400,
//     });
//
//     const formData = { room_name: "Test Room", players_expected: 4 };
//
//     await expect(createRoom(formData, uuid)).rejects.toThrow(
//       "HTTP error! status: 400",
//     );
//     cleanup();
//   });
//
//   test("RoomLayout join websocket", () => {
//     let setRoomDataMock = vi.fn();
//     const mockRoomData = {
//       room_name: "Test Room",
//       players_names: [],
//       expected_players: 4,
//       room_id: "1234",
//     };
//
//     let mockWebSocket = {
//       onmessage: vi.fn(),
//       onerror: vi.fn(),
//       onclose: vi.fn(),
//       close: vi.fn(),
//     };
//     mockWebSocket.onmessage = setRoomDataMock;
//     global.WebSocket = vi.fn(() => mockWebSocket);
//
//     vi.mock("../context/RoomContext", () => ({
//       useRoom: () => ({
//         RoomData: mockRoomData,
//         setRoomData: setRoomDataMock,
//       }),
//     }));
//
//     render(
//       <MemoryRouter>
//         <RoomLayout />
//       </MemoryRouter>,
//     );
//
//     const newPlayer = "Player 1";
//     mockWebSocket.onmessage({ data: newPlayer });
//     expect(setRoomDataMock).toBeCalledWith({ data: newPlayer });
//     expect(setRoomDataMock).toBeCalledTimes(1);
//   });
//
//   test("Name dialog accepted and render RoomConfigLayout", () => {
//     const mockOnSubmit = vi.fn();
//
//     render(
//       <MemoryRouter>
//         <CreateRoomLayout onSubmit={mockOnSubmit} />
//       </MemoryRouter>,
//     );
//
//     const nameInput = screen.getByRole("textbox", {
//       name: /name-input/,
//     });
//     const submit_button = screen.getByRole("button", {
//       name: /Submit/i,
//     });
//     fireEvent.change(nameInput, { target: { value: "Sakalomo" } });
//     fireEvent.click(submit_button);
//
//     const create_room_button = screen.getByRole("button", {
//       name: /Create Room/i,
//     });
//     const room_name_label = screen.getByLabelText("Room Name");
//     const player_count_label = screen.getByLabelText("Player Count");
//
//     fireEvent.change(room_name_label, { target: { value: "Test Room" } });
//     fireEvent.change(player_count_label, { target: { value: 2 } });
//
//     fireEvent.click(create_room_button);
//
//     expect(mockOnSubmit).toHaveBeenCalledWith({
//       owner_name: "Sakalomo",
//       room_name: "Test Room",
//       players_expected: 2,
//     });
//
//     expect(mockOnSubmit).toHaveBeenCalledTimes(1);
//     cleanup();
//   });
//
//   test("Navigate to root on leave button click(RoomConfigLayout)", () => {
//     const mockOnSubmit = vi.fn();
//
//     render(
//       <MemoryRouter>
//         <CreateRoomLayout onSubmit={mockOnSubmit} />
//       </MemoryRouter>,
//     );
//
//     const leaveButton = screen.getByText("Leave");
//     fireEvent.click(leaveButton);
//     expect(mockedUseNavigate).toHaveBeenCalledWith(`/id/${uuid}`);
//     expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
//     cleanup();
//   });
//
//   test("Render FailedRoom, nav. try agan, nav. leave", () => {
//     render(
//       <MemoryRouter>
//         <RoomCreationFailed />
//       </MemoryRouter>,
//     );
//     cleanup();
//   });
//
//   test("Navigate to root on leave button click(RoomCreationFailed)", () => {
//     render(
//       <MemoryRouter>
//         <RoomCreationFailed />
//       </MemoryRouter>,
//     );
//
//     const leaveButton = screen.getByText("Leave");
//     fireEvent.click(leaveButton);
//     expect(mockedUseNavigate).toHaveBeenCalledWith(`/id/${uuid}`);
//     expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
//
//     cleanup();
//   });
//
//   test("Navigate to RoomConfigLayout on try again button click(RoomCreationFailed)", () => {
//     render(
//       <MemoryRouter>
//         <RoomCreationFailed />
//       </MemoryRouter>,
//     );
//
//     const tryAgainButton = screen.getByText("Try Again");
//     +fireEvent.click(tryAgainButton);
//     expect(mockedUseNavigate).toHaveBeenCalledWith("/create_room");
//     expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
//
//     cleanup();
//   });
// });
