// DisasterService.js
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase"; // Import db from firebase.js

const addDisaster = async (disasterData) => {
  try {
    // Firestore collection name
    const disasterRef = collection(db, "disasters");

    // Add disaster data to Firestore
    await addDoc(disasterRef, disasterData);
    console.log("Disaster added successfully!");
  } catch (error) {
    console.error("Error adding disaster:", error);
  }
};

export { addDisaster };
