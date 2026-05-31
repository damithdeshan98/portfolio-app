import {
  collection,
  doc,
  getDocs,
  getDoc,
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
