// src/context/useResidents.js
import { useContext } from "react";
import { ResidentsContext } from "./ResidentsContext";

export function useResidents() {
  return useContext(ResidentsContext);
}