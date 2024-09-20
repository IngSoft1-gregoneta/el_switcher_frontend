import {
    afterEach,
    beforeEach,
    describe,
    expect,
    test,
    vi,
} from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import createRoom from "./services/RoomService.js"
import LobbyConfigLayout from "./components/RoomConfigLayout.jsx";
import { MemoryRouter, useNavigate } from "react-router-dom";
import LobbyCreationFailed from "./components/FailedRoom.jsx";

vi.mock("react-router-dom", async ()=>{
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate : vi.fn(),
    }
});

describe("Lobby tests", ()=>{

    beforeEach(()=>{
        global.fetch = vi.fn();
    })

    afterEach(()=>{
        vi.clearAllMocks();
    })

    test("lobbyService POST request to server, returns a room", async () => {
        
        const mockResponse = {
            room_name: 'Test Room',
            players: [],
            players_expected: 4,
        };

        fetch.mockResolvedValueOnce({
            ok : true,
            json : async () => mockResponse,
        });

        const formData = {room_name: 'Test Room', players_expected: 4};

        const result = await createRoom(formData);

        expect(fetch).toHaveBeenCalledWith('http://localhost:8000/rooms/',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        expect(result).toEqual(mockResponse);
    })

    test("lobbyService POST request to server, returns 400 error", async () => {
        fetch.mockResolvedValueOnce({
            ok : false,
            status : 400,
        });

        const formData = { room_name: 'Test Room', players_expected: 4 };

        await expect(createRoom(formData)).rejects.toThrow(
            'HTTP error! status: 400'
        );
    });

    test("render LobbyConfigLayout",()=>{
        const mockOnSubmit = vi.fn();

        render(
            <MemoryRouter>
                <LobbyConfigLayout onSubmit={mockOnSubmit}/>
            </MemoryRouter>
        );

        const create_room_button = screen.getByText('Create Room');
        const room_name_label = screen.getByLabelText('Lobby Name');
        const player_count_label = screen.getByLabelText('Player Count');

        fireEvent.change(room_name_label,{target : {value : 'Test Room'}});
        fireEvent.change(player_count_label,{target : {value : 2}});

        fireEvent.click(create_room_button);

        expect(mockOnSubmit).toHaveBeenCalledWith({
            room_name : 'Test Room',
            players_expected : 2,
        });

        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        cleanup();
    });

    test("Navigate to root on leave button click(LobbyconfigLayout)",()=>{
        const mockOnSubmit = vi.fn();
        const mockNavigate = vi.fn();

        useNavigate.mockReturnValue(mockNavigate);

        render(
            <MemoryRouter>
                <LobbyConfigLayout onSubmit={mockOnSubmit}/>
            </MemoryRouter>
        );

        const leaveButton = screen.getByText('Leave');
        fireEvent.click(leaveButton);
        expect(mockNavigate).toHaveBeenCalledWith('/');
        expect(mockNavigate).toHaveBeenCalledTimes(1);
        cleanup();
    });

    test("Render FailedLobby, nav. try agan, nav. leave",()=>{
        const mockNavigate = vi.fn();
        useNavigate.mockReturnValue(mockNavigate);
        
        render(
            <MemoryRouter>
                <LobbyCreationFailed/>
            </MemoryRouter>
        );
        cleanup()
    });

    test("Navigate to root on leave button click(LobbyCreationFailed)",()=>{
        const mockNavigate = vi.fn();
        useNavigate.mockReturnValue(mockNavigate);
        
        render(
            <MemoryRouter>
                <LobbyCreationFailed/>
            </MemoryRouter>
        );

        const leaveButton = screen.getByText("Leave");
        fireEvent.click(leaveButton);
        expect(mockNavigate).toHaveBeenCalledWith('/');
        expect(mockNavigate).toHaveBeenCalledTimes(1);

        cleanup()
    });

    test("Navigate to LobbyConfigLayout on try again button click(LobbyCreationFailed)",()=>{
        const mockNavigate = vi.fn();
        useNavigate.mockReturnValue(mockNavigate);
        
        render(
            <MemoryRouter>
                <LobbyCreationFailed/>
            </MemoryRouter>
        );

        const tryAgainButton = screen.getByText("Try Again");
+        fireEvent.click(tryAgainButton);
        expect(mockNavigate).toHaveBeenCalledWith('/CreateLobby');
        expect(mockNavigate).toHaveBeenCalledTimes(1);

        cleanup()
    });

});