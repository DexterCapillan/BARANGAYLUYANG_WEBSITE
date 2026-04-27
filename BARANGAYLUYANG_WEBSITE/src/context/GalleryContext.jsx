import { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";

export const GalleryContext = createContext(null);

export function GalleryProvider({ children }) {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "gallery"), (snapshot) => {
      const data = snapshot.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
      setPhotos(data);
    });
    return () => unsub();
  }, []);

  async function addPhoto(url, caption = "") {
    await addDoc(collection(db, "gallery"), {
      url,
      caption,
      createdAt: serverTimestamp(),
    });
  }

  async function deletePhoto(id) {
    await deleteDoc(doc(db, "gallery", id));
  }

  return (
    <GalleryContext.Provider value={{ photos, addPhoto, deletePhoto }}>
      {children}
    </GalleryContext.Provider>
  );
}