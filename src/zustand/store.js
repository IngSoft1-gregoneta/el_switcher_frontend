import { create } from "zustand";

export const useMatchStore = create((set) => ({
  matchStarted: false,
  haveITurn: false,
  setMatchStarted: (new_state) => set(() => ({ matchStarted: new_state })),
  setHaveITurn: (new_state) => set(() => ({ haveITurn: new_state })),
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

export const useBoardStore = create((set) => ({
  board: null,
  firstPos: null,
  highlightedTiles: null,
  dispatchPositions: null,
  dispatchMovCard : null,
  selectedMovCard : null,
  setSelectedMovCard : (mov_card) => set({selectedMovCard : mov_card}),
  setMovCardDispatch : (dispatch) => set({dispatchMovCard : dispatch}),
  setHighlightedTiles: (new_highlighted_tiles) =>
    set({ highlightedTiles: new_highlighted_tiles }),
  setFirstPos: (new_pos) => set({ firstPos: new_pos }),
  setBoard: (new_board) => set({ board: new_board }),
    setDispatchPositions : (dispatch) => set({dispatchPositions : dispatch })
}));

export const useFigCardStore = create((set) => ({
  selectedFigCards: null,
  selectedFigCardsDispatch: null,
  setSelectedFigCards: (new_card) => set({ selectedFigCards: new_card }),
  setFigCardsDispatch: (dispatch) => set({ selectedFigCardsDispatch: dispatch }),
}));

export const useTimerStore = create((set) => ({
  Timer: null,
  setTimerMessage: (newMessage) => set({ Timer: newMessage }),
}));
