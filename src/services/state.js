import { create } from "zustand";

export const useBoardStore = create((set) => ({
  stateBoard: null,
  setStateBoard: (new_state) => set(() => ({ stateBoard: new_state })),
}));

export const useMatchStore = create((set) => ({
  stateMatch: null,
  matchStarted: false,
  updateMatch: false,
  setStateMatch: (new_state) => set(() => ({ stateMatch: new_state })),
  setMatchStarted: (new_state) => set(() => ({ matchStarted: new_state })),
  setUpdateMatch: () => set((state) => ({ updateMatch: !state.updateMatch })),
}));

export const useUpdateStore = create((set) => ({
  updateList: false,
  updateRoom: false,
  setUpdateList: () => set((state) => ({ updateList: !state.updateList })),
  setUpdateRoom: () => set((state) => ({ updateRoom: !state.updateRoom })),
}));

export const useIdStore = create((set) => ({
  userName: null,
  userId: null,
  setId: (newId) => set({ userId: newId }),
  setUserName: (newName) => set({ userName: newName }),
}));

//TODO: create state for cards(queue?) and movements
