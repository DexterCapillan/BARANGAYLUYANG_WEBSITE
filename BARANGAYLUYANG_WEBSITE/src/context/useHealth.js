// src/context/useHealth.js
import { useContext } from "react";
import { HealthContext } from "./HealthContext";

export function useHealth() {
  return useContext(HealthContext);
}