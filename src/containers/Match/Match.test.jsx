import { beforeEach, afterEach, describe, expect, test, vi } from "vitest";
import {
    cleanup,
    render,
  } from "@testing-library/react";

import { fetchMatch, createMatch } from "./services/MatchService";
import Board from "./components/Board";
import { MemoryRouter } from "react-router-dom";
import BoardClass from "./logic/board";
import { useBoardStore } from "../../services/state";

const mockedUseNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual("react-router-dom");
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

describe("MatchService tests", ()=>{
    beforeEach(() => {
        global.fetch = vi.fn();
    });
    
    afterEach(() => {
        vi.clearAllMocks();
    });

    test("createMatch test",async () => {
        const mockResponse = {
            match_id : 1,
            board : {tile : "this is a tile"},
            players : [{name : "this is a player"}],
        };
      
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });
    
        const roomId = 1;
        const owner = "Owner"
    
        const result = await createMatch(roomId,owner);
    
        expect(fetch).toHaveBeenCalledWith(`http://localhost:8000/matchs/create_match/${owner}`,{
            method : "POST",
            headers : {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({room_id : roomId}),
        });

        expect(result).toEqual(mockResponse);
    });

    test("fetchMatch test", async () =>{
        const mockResponse = {
            match_id : 1,
            board : {tile : "this is a tile"},
            players : [{name : "this is a player"}],
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const roomId = 1;

        const result = await fetchMatch(roomId);

        expect(fetch).toHaveBeenCalledWith(`http://localhost:8000/matchs/${roomId}`,{
            method : "GET",
            headers : {
                "Content-Type": "application/json",
            },
        });

        expect(result).toEqual(mockResponse);
    });
});

describe("Board test",()=>{

    afterEach(()=>{
        vi.clearAllMocks();
        cleanup();
    });

    test("Board test, nav to root on null stateBoard",()=>{  
        render(
            <MemoryRouter>
                <Board/>
            </MemoryRouter>
        );
        expect(mockedUseNavigate).toHaveBeenCalledWith('/');
        expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
    });
});