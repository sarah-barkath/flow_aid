// AddDisaster.js
import React, { useState } from "react";
import { addDisaster } from "./DisasterService"; // Assuming you have a service for adding disasters
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase"; // Ensure firebase is configured correctly

const AddDisaster = () => {
  // Local state to store form inputs
  const [location, setLocation] = useState("");
  const [severity, setSeverity] = useState("");
  const [nearbyNGOs, setNearbyNGOs] = useState("");
  
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    
    // Disaster data to be added to Firestore
    const disasterData = {
      location: location,
      severity: severity,
      nearbyNGOs: nearbyNGOs.split(",").map((ngo) => ngo.trim()), // Splitting the NGOs into an array
      createdAt: new Date(), // You can also store the date the disaster was added
    };

    try {
      // Adding disaster to Firestore
      await addDoc(collection(db, "disasters"), disasterData);
      console.log("Disaster added successfully");
      
      // Clear form after submission
      setLocation("");
      setSeverity("");
      setNearbyNGOs("");
    } catch (error) {
      console.error("Error adding disaster:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add Disaster</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Severity:</label>
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            required
          >
            <option value="">Select severity</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label>Nearby NGOs (comma separated):</label>
          <input
            type="text"
            value={nearbyNGOs}
            onChange={(e) => setNearbyNGOs(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Disaster</button>
      </form>
    </div>
  );
};

export default AddDisaster;