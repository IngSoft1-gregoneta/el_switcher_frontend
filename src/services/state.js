import { create } from "zustand";

export const useUpdateStore = create((set) => ({
  updateList: false,
  stateRoom: null,
  setUpdateList: () => set((state) => ({ updateList: !state.updateList })),
  setStateRoom: (new_state) => set(() => ({ stateRoom: new_state })),
}));

export const useIdStore = create((set) => ({
  userId: null,
  setId: (newId) => set({ userId: newId }),
}));
