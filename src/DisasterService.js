// DisasterService.js
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const addDisaster = async (disasterData) => {
  try {
    const disasterRef = collection(db, "disasters");
    await addDoc(disasterRef, disasterData);
    console.log("Disaster added successfully!");
  } catch (error) {
    console.error("Error adding disaster:", error);
  }
};

const getDisasters = async () => {
  try {
    const disasterRef = collection(db, "disasters");
    const snapshot = await getDocs(disasterRef);
    return snapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Error fetching disasters:", error);
    return [];
  }
};

export { addDisaster, getDisasters };
