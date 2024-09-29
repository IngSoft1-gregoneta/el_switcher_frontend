import { create } from "zustand";

export const useBoardStore = create((set) => ({
  stateBoard : null,
  setStateBoard: (new_state) => set(()=>({stateBoard : new_state})),
}));

export const useOwnerStore = create((set) => ({
  stateOwner : false,
  setStateOwner : () => set((state)=>({stateOwner : !state.stateOwner}))
}));

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
