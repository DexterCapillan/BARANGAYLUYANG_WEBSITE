// src/context/AnnouncementsContext.jsx
import { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

export const AnnouncementsContext = createContext(null);

export function AnnouncementsProvider({ children }) {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "announcements"), orderBy("createdAt", "desc")),
      (snapshot) => {
        const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setAnnouncements(data);
      }
    );
    return () => unsub();
  }, []);

  async function addAnnouncement(ann) {
    await addDoc(collection(db, "announcements"), {
      ...ann,
      image: "https://via.placeholder.com/600x300",
      createdAt: serverTimestamp(),
    });
  }

  async function deleteAnnouncement(id) {
    await deleteDoc(doc(db, "announcements", id));
  }

  return (
    <AnnouncementsContext.Provider value={{ announcements, addAnnouncement, deleteAnnouncement }}>
      {children}
    </AnnouncementsContext.Provider>
  );
}