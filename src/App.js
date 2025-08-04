import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar"; // Import Navbar from second code
import LandingPage from "./LandingPage";
import DonorLogin from "./DonorLogin";
import VolunteerLogin from "./VolunteerLogin";
import NGOLogin from "./NGOLogin";
import DisasterMap from "./DisasterMap"; // Map with disaster zones, NGOs, and distance
import AddDisaster from "./AddDisaster"; // Import AddDisaster component
import InteractiveMapPage from "./InteractiveMapPage"; // Import InteractiveMap component

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar added from the second code */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/add-disaster" element={<AddDisaster />} />
        <Route path="/donors" element={<DonorLogin />} />
        <Route path="/volunteers" element={<VolunteerLogin />} />
        <Route path="/ngo" element={<NGOLogin />} />
        <Route path="/disaster-map" element={<DisasterMap />} />
        <Route path="/interactive-map" element={<InteractiveMapPage />} /> {/* Interactive map route */}
      </Routes>
    </Router>
  );
};

export default App;
