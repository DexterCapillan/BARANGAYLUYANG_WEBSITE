import { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { defaultStats } from "../data/residents";

export const ResidentsContext = createContext(null);

export function ResidentsProvider({ children }) {
  const [residents, setResidents] = useState([]);
  const [stats, setStats] = useState(defaultStats);

  // Real-time listener for residents collection
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "residents"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setResidents(data);
    });
    return () => unsub();
  }, []);

  // Real-time listener for stats document
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "stats"), (docSnap) => {
      if (docSnap.exists()) {
        setStats(docSnap.data());
      }
    });
    return () => unsub();
  }, []);

  async function addResident(resident) {
    await addDoc(collection(db, "residents"), resident);
  }

  async function deleteResident(id) {
    await deleteDoc(doc(db, "residents", id));
  }

  async function updateStats(newStats) {
    await setDoc(doc(db, "settings", "stats"), {
      ...stats,
      ...newStats,
      updatedAt: new Date().toISOString(),
    });
  }

  const computedTotal = stats.males + stats.females;

  return (
    <ResidentsContext.Provider
      value={{
        residents,
        stats: {
          ...stats,
          total: computedTotal,
          adults: computedTotal - stats.children,
        },
        addResident,
        deleteResident,
        updateStats,
      }}
    >
      {children}
    </ResidentsContext.Provider>
  );
}