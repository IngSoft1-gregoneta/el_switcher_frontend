import { create } from "zustand";

export const useBoardStore = create((set) => ({
  stateBoard: null,
  setStateBoard: (new_state) => set(() => ({ stateBoard: new_state })),
}));

export const useUpdateStore = create((set) => ({
  updateList: false,
  updateRoom: false,
  setUpdateList: () => set((state) => ({ updateList: !state.updateList })),
  setUpdateRoom: () => set((state) => ({ updateRoom: !state.updateRoom })),
  setStateMatch: (new_state) => set(() => ({ stateMatch: new_state })),
}));

export const useIdStore = create((set) => ({
  userId: null,
  setId: (newId) => set({ userId: newId }),
}));

//TODO: create state for cards(queue?) and movements
