import {
  collection,
  doc,
  getDocs,
  getDocsFromCache,
  getDoc,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../firebase/config";

/* ------------------------------------------------------------------ *
 * Generic collection CRUD helpers
 * ------------------------------------------------------------------ */

// Get all documents from a collection, optionally ordered by a field.
export async function getAll(collectionName, orderField = "order") {
  const colRef = collection(db, collectionName);
  let snapshot;
  try {
    snapshot = await getDocs(query(colRef, orderBy(orderField)));
  } catch {
    // Field may not exist on every doc — fall back to unordered.
    snapshot = await getDocs(colRef);
  }
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Read a collection straight from the local cache (no network). Returns null
// when nothing is cached yet, so callers can fall back to a server fetch.
export async function getAllFromCache(collectionName, orderField = "order") {
  const colRef = collection(db, collectionName);
  try {
    let snapshot;
    try {
      snapshot = await getDocsFromCache(query(colRef, orderBy(orderField)));
    } catch {
      snapshot = await getDocsFromCache(colRef);
    }
    if (snapshot.empty) return null;
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch {
    // Nothing in cache yet (first ever load).
    return null;
  }
}

// Subscribe to a collection in real time. Calls onData with the rows on every
// change (admin edits, active toggles, etc.) and returns an unsubscribe fn.
export function subscribeAll(collectionName, orderField = "order", onData, onError) {
  const colRef = collection(db, collectionName);
  let q;
  try {
    q = query(colRef, orderBy(orderField));
  } catch {
    q = colRef;
  }
  return onSnapshot(
    q,
    (snap) => onData(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    onError
  );
}

// Subscribe to a single document in real time. Returns an unsubscribe fn.
export function subscribeOne(collectionName, id, onData, onError) {
  return onSnapshot(
    doc(db, collectionName, id),
    (snap) => onData(snap.exists() ? { id: snap.id, ...snap.data() } : null),
    onError
  );
}

// Get a single document by id.
export async function getOne(collectionName, id) {
  const snap = await getDoc(doc(db, collectionName, id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// Add a new document (auto id).
export async function add(collectionName, data) {
  const colRef = collection(db, collectionName);
  const docRef = await addDoc(colRef, { ...data, createdAt: serverTimestamp() });
  return docRef.id;
}

// Update an existing document.
export async function update(collectionName, id, data) {
  await updateDoc(doc(db, collectionName, id), { ...data, updatedAt: serverTimestamp() });
}

// Create or overwrite a document with a fixed id (used for the profile/main doc).
export async function setDocument(collectionName, id, data) {
  await setDoc(
    doc(db, collectionName, id),
    { ...data, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

// Delete a document.
export async function remove(collectionName, id) {
  await deleteDoc(doc(db, collectionName, id));
}

/* ------------------------------------------------------------------ *
 * Storage helpers
 * ------------------------------------------------------------------ */

// Upload a file to a storage path and return its download URL.
export async function uploadFile(path, file) {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

// Delete a file by its storage path (ignores not-found errors).
export async function deleteFile(path) {
  try {
    await deleteObject(ref(storage, path));
  } catch {
    /* file may not exist — ignore */
  }
}
