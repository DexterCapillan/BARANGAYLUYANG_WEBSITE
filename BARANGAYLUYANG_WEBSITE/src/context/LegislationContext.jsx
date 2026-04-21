import { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection, onSnapshot, addDoc, deleteDoc,
  doc, getDoc, setDoc
} from "firebase/firestore";

export const LegislationContext = createContext(null);

export function LegislationProvider({ children }) {
  const [executiveOrders, setExecutiveOrders] = useState([]);
  const [ordinances, setOrdinances] = useState([]);
  const [resolutions, setResolutions] = useState([]);
  const [charterImages, setCharterImages] = useState([]);

  useEffect(() => {
    const unsub1 = onSnapshot(collection(db, "executiveOrders"), (snap) => {
      setExecutiveOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    const unsub2 = onSnapshot(collection(db, "ordinances"), (snap) => {
      setOrdinances(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    const unsub3 = onSnapshot(collection(db, "resolutions"), (snap) => {
      setResolutions(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    const unsub4 = onSnapshot(doc(db, "settings", "citizensCharter"), (snap) => {
      if (snap.exists()) setCharterImages(snap.data().images ?? []);
    });
    return () => { unsub1(); unsub2(); unsub3(); unsub4(); };
  }, []);

  async function addItem(collectionName, item) {
    await addDoc(collection(db, collectionName), item);
  }

  async function deleteItem(collectionName, id) {
    await deleteDoc(doc(db, collectionName, id));
  }

  async function addCharterImage(url) {
    const updated = [...charterImages, url];
    await setDoc(doc(db, "settings", "citizensCharter"), { images: updated });
  }

  async function deleteCharterImage(index) {
    const updated = charterImages.filter((_, i) => i !== index);
    await setDoc(doc(db, "settings", "citizensCharter"), { images: updated });
  }

  return (
    <LegislationContext.Provider value={{
      executiveOrders, ordinances, resolutions,
      charterImages,
      addItem, deleteItem,
      addCharterImage, deleteCharterImage,
    }}>
      {children}
    </LegislationContext.Provider>
  );
}