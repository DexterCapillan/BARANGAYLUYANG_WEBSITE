import { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { defaultStats } from "../data/residents";

export const ResidentsContext = createContext(null);

export function ResidentsProvider({ children }) {
  const [residents, setResidents] = useState([]);
  const [stats, setStats] = useState(defaultStats);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "residents"), (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setResidents(data);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "stats"), (docSnap) => {
      if (docSnap.exists()) setStats(docSnap.data());
    });
    return () => unsub();
  }, []);

  // Mirror total to public whenever stats change
  useEffect(() => {
    const total = stats.males + stats.females;
    setDoc(doc(db, "public", "residentCount"), { total });
  }, [stats]);

  // Single resident add — updates public count once
  async function addResident(resident) {
    await addDoc(collection(db, "residents"), resident);
    const total = stats.males + stats.females + residents.length + 1;
    await setDoc(doc(db, "public", "residentCount"), { total });
  }

  // Bulk import — uses Firestore batch, updates public count only once at the end
  async function addResidentsBulk(newResidents) {
    const BATCH_SIZE = 500;
    for (let i = 0; i < newResidents.length; i += BATCH_SIZE) {
      const batch = writeBatch(db);
      const chunk = newResidents.slice(i, i + BATCH_SIZE);
      chunk.forEach((resident) => {
        const ref = doc(collection(db, "residents"));
        batch.set(ref, resident);
      });
      await batch.commit();
    }
    // Update public count once after all batches finish
    const total = stats.males + stats.females + residents.length + newResidents.length;
    await setDoc(doc(db, "public", "residentCount"), { total });
  }

  async function deleteResident(id) {
    await deleteDoc(doc(db, "residents", id));
    const total = stats.males + stats.females + residents.length - 1;
    await setDoc(doc(db, "public", "residentCount"), { total });
  }

  async function updateStats(newStats) {
    const merged = { ...stats, ...newStats, updatedAt: new Date().toISOString() };
    await setDoc(doc(db, "settings", "stats"), merged);
    const total = (newStats.males ?? stats.males) + (newStats.females ?? stats.females);
    await setDoc(doc(db, "public", "residentCount"), { total });
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
        addResidentsBulk,
        deleteResident,
        updateStats,
      }}
    >
      {children}
    </ResidentsContext.Provider>
  );
}