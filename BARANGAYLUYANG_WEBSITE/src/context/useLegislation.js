import { useContext } from "react";
import { LegislationContext } from "./LegislationContext";

export function useLegislation() {
  return useContext(LegislationContext);
}