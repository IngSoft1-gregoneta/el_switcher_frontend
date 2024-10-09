import { create } from "zustand";

export const useMatchStore = create((set) => ({
  matchStarted: false,
  setMatchStarted: (new_state) => set(() => ({ matchStarted: new_state })),
}));

export const useWinnerStore = create((set) => ({
  stateWinner: null,
  setStateWinner: (new_winner) => set(() => ({ stateWinner: new_winner })),
}));

export const useUpdateStore = create((set) => ({
  updateList: false,
  updateRoom: false,
  updateMatch: false,
  setUpdateList: () => set((state) => ({ updateList: !state.updateList })),
  setUpdateRoom: () => set((state) => ({ updateRoom: !state.updateRoom })),
  setUpdateMatch: () => set((state) => ({ updateMatch: !state.updateMatch })),
}));

export const useIdStore = create((set) => ({
  userId: null,
  setUserId: (newId) => set({ userId: newId }),
}));

export const useBoardStore = create((set)=>({
  board:null,
  firstPos:null,
  secondPos:null,
  setFirstPos: (new_pos) => set({firstPos:new_pos}),
  setSecondPos: (new_pos) => set({secondPos:new_pos}),
  setBoard: (new_board) => set({board:new_board}),
}));