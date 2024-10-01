import { vi } from "vitest";

export const uuid = crypto.randomUUID();
export const mockStateStore = () => {
  vi.mock("../../services/state.js", () => ({
    useUpdateStore: vi.fn(() => ({
      updateList: false,
      updateRoom: false,
      setUpdateList: vi.fn(),
      setUpdateRoom: vi.fn(),
    })),
    useMatchStore: (state) => {
      const data = {
        stateMatch: null,
        matchStarted: false,
        updateMatch: false,
        stateBoard: null,
        setStateMatch: vi.fn(),
        setMatchStarted: vi.fn(),
        setUpdateMatch: vi.fn(),
        setStateBoard: vi.fn(),
      };
      return state(data);
    },
    useIdStore: (state) => {
      const data = {
        userId: uuid,
        setUserId: vi.fn(),
      };
      return state(data);
    },
  }));
};
