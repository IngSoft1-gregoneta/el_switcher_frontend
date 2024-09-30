import { create } from "zustand";

export const useMatchStore = create((set) => ({
  stateMatch: null,
  matchStarted: false,
  updateMatch: false,
  stateBoard: null,
  setStateMatch: (new_state) => set(() => ({ stateMatch: new_state })),
  setMatchStarted: (new_state) => set(() => ({ matchStarted: new_state })),
  setUpdateMatch: () => set((state) => ({ updateMatch: !state.updateMatch })),
  setStateBoard: (new_state) => set(() => ({ stateBoard: new_state })),
}));

export const useOwnerStore = create((set) => ({
  stateOwner: false,
  setStateOwner: () => set((state) => ({ stateOwner: !state.stateOwner })),
}));

export const useUpdateStore = create((set) => ({
  updateList: false,
  updateRoom: false,
  setUpdateList: () => set((state) => ({ updateList: !state.updateList })),
  setUpdateRoom: () => set((state) => ({ updateRoom: !state.updateRoom })),
}));

export const useIdStore = create((set) => ({
  userId: null,
  setId: (newId) => set({ userId: newId }),
}));
