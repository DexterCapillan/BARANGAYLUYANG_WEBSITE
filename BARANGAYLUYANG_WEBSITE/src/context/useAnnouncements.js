// src/context/useAnnouncements.js
import { useContext } from "react";
import { AnnouncementsContext } from "./AnnouncementsContext";

export function useAnnouncements() {
  return useContext(AnnouncementsContext);
}