import { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const AnnouncementsContext = createContext(null);

export function AnnouncementsProvider({ children }) {
  const [announcements, setAnnouncements] = useState([]);

  // Real-time listener for announcements collection
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "announcements"), (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setAnnouncements(data);
    });
    return () => unsub();
  }, []);

  async function addAnnouncement(ann) {
    await addDoc(collection(db, "announcements"), {
      ...ann,
      image: "https://via.placeholder.com/600x300",
      createdAt: new Date().toISOString(),
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