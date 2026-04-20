// src/context/HealthContext.jsx
import { createContext, useEffect, useState } from "react";
import {
  collection, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp, orderBy, query
} from "firebase/firestore";
import { db } from "../firebase";

export const HealthContext = createContext(null);

export function HealthProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const unsubPosts = onSnapshot(
      query(collection(db, "healthPosts"), orderBy("createdAt", "desc")),
      (snap) => setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const unsubSchedules = onSnapshot(
      query(collection(db, "healthSchedules"), orderBy("createdAt", "desc")),
      (snap) => setSchedules(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const unsubPrograms = onSnapshot(
      query(collection(db, "healthPrograms"), orderBy("createdAt", "desc")),
      (snap) => setPrograms(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    return () => { unsubPosts(); unsubSchedules(); unsubPrograms(); };
  }, []);

  async function addPost(data) {
    await addDoc(collection(db, "healthPosts"), { ...data, createdAt: serverTimestamp() });
  }
  async function deletePost(id) {
    await deleteDoc(doc(db, "healthPosts", id));
  }

  async function addSchedule(data) {
    await addDoc(collection(db, "healthSchedules"), { ...data, createdAt: serverTimestamp() });
  }
  async function deleteSchedule(id) {
    await deleteDoc(doc(db, "healthSchedules", id));
  }

  async function addProgram(data) {
    await addDoc(collection(db, "healthPrograms"), { ...data, createdAt: serverTimestamp() });
  }
  async function deleteProgram(id) {
    await deleteDoc(doc(db, "healthPrograms", id));
  }

  return (
    <HealthContext.Provider value={{
      posts, addPost, deletePost,
      schedules, addSchedule, deleteSchedule,
      programs, addProgram, deleteProgram,
    }}>
      {children}
    </HealthContext.Provider>
  );
}