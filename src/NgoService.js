// NgoService.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";  // your firebase.js config file

export async function getNGOs() {
  const ngoCollection = collection(db, "ngos");
  const snapshot = await getDocs(ngoCollection);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    coords: [doc.data().lat, doc.data().lng], // create coords array
  }));
}