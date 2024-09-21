import { useContext, createContext } from "react";

export const WSMessageContext = createContext(null);

export function useWSMessage() {
  return useContext(WSMessageContext);
}
