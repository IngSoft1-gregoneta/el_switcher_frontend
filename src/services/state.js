import { create } from "zustand";

export const useUpdateStore = create((set) => ({
  updateList: false,
  stateRoom: null,
  stateMatch: false,
  setUpdateList: () => set((state) => ({ updateList: !state.updateList })),
  setStateRoom: (new_state) => set(() => ({ stateRoom: new_state })),
  setStateMatch: (new_state) => set(() => ({stateMatch: new_state})),
}));

export const useIdStore = create((set) => ({
  userId: null,
  setId: (newId) => set({ userId: newId }),
}));
