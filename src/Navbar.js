import "./Navbar.css"; // Import Navbar styles
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Flow Aid</h1>
      <ul className="flex gap-4">
        <li><Link to="/" className="nav-item">Home</Link></li>
        <li><Link to="/add-disaster" className="nav-item">Report Disaster</Link></li>
        <li className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="nav-item"
          >
            Login ▼
          </button>
          {isDropdownOpen && (
            <ul className="absolute bg-gray-800 p-2 mt-1 rounded shadow-lg">
              <li><Link to="/donors" className="dropdown-item">Donors</Link></li>
              <li><Link to="/volunteers" className="dropdown-item">Volunteers</Link></li>
              <li><Link to="/ngo" className="dropdown-item">NGOs</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/disaster-map" className="nav-item">Map</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;