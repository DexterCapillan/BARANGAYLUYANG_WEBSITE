import { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

export const AwardsContext = createContext(null);

export function AwardsProvider({ children }) {
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "awards"), (snap) => {
      setAwards(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  async function addAward(award) {
    await addDoc(collection(db, "awards"), award);
  }

  async function deleteAward(id) {
    await deleteDoc(doc(db, "awards", id));
  }

  async function updateAward(id, data) {
    await updateDoc(doc(db, "awards", id), data);
  }

  return (
    <AwardsContext.Provider value={{ awards, addAward, deleteAward, updateAward }}>
      {children}
    </AwardsContext.Provider>
  );
}