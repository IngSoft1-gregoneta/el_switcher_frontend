import { create } from "zustand";

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

//TODO: create state for cards(queue?) and movements
