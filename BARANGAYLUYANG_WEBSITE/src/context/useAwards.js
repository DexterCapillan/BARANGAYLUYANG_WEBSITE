import { useContext } from "react";
import { AwardsContext } from "./AwardsContext";

export function useAwards() {
  return useContext(AwardsContext);
}