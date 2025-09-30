import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import { Link } from "react-router-dom"; // Import Link for navigation
import "leaflet/dist/leaflet.css";
import "./MapAnimations.css";

const LandingPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [shelters, setShelters] = useState([]);
  const [safezones, setSafeZones] = useState([]);

  useEffect(() => {
    setAlerts([
      { id: 1, location: "Bangalore", severity: "High", coords: [12.9716, 77.5946] },
      { id: 2, location: "Delhi", severity: "Moderate", coords: [28.7041, 77.1025] },
    ]);
    setShelters([
      { id: 1, lat: 31.6000, lng: 74.8530, name: "Bhai Dharam Singh Khalsa Charitable Trust", resources: 50, severity: "NGO" },
      { id: 2, lat: 31.6300, lng: 74.8230, name: "All India Women Conference", resources: 30, severity: "NGO" },
    ]);
    setSafeZones([
      { id: 3, location: "Amritsar", severity: "Safe Zone", coords: [31.6340, 74.8723]},
      { id: 4, location: "Tumukur", severity: "Safe Zone", coords: [13.3379, 77.1173]},
    ]);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "High":
        return "red";
      case "Moderate":
        return "orange";
      case "Safe Zone":
        return "green";
      default:
        return "blue";
    }
  };

  const getMarkerIcon = (color) => {
    return L.divIcon({
      className: "custom-marker",
      html: `<div style="
        background-color: ${color};
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 6px ${color};
      "></div>`,
      iconSize: [12, 12],
    });
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#faf9f6" }}>
      <h1 style={{ color: "#0f4662", fontSize: "24px" }}>Aiding menstrual hygiene by connecting volunteers, NGOs, and government agencies for rapid, coordinated disaster relief</h1>

      {/* Disaster Alerts Section */}
      <div style={{ background: "#ADD8E6", padding: "10px", marginBottom: "45px", borderRadius: "50px", width: "50%", margin: "auto" }}>
        <h2>Disaster Alerts</h2>
        {alerts.map(alert => (
          <p key={alert.id}><strong>{alert.location}:</strong> {alert.severity} Alert</p>
        ))}
      </div>

      {/* Interactive Map */}
      <MapContainer center={[17.385, 78.4867]} zoom={7} style={{ height: "400px", width: "80%", margin: "auto" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {alerts.map((alert) => (
        <Marker key={alert.id} position={alert.coords} icon={getMarkerIcon(alert.severity === "High" ? "red" : "yellow")}>
          <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
            <b>{alert.location}</b> <br />
            Severity: <span style={{ color: getSeverityColor(alert.severity) }}>{alert.severity}</span>
          </Tooltip>
        </Marker>
      ))}
        {shelters.map((shelter) => (
          <Marker key={shelter.id} position={[shelter.lat, shelter.lng]} icon={getMarkerIcon("blue")}>
            <Tooltip>
              <span style={{ color: getSeverityColor(shelter.severity) }}>{shelter.severity} - 
              {shelter.name} - Resources: {shelter.resources}</span></Tooltip>
          </Marker>
        ))}
        {/* Safe Zones */}
      {safezones.map((safezone) => (
        <Marker key={safezone.id} position={safezone.coords} icon={getMarkerIcon("green")}>
          <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
            <b>✅ {safezone.location}
            <span style={{ color: getSeverityColor(safezone.severity) }}> {safezone.severity}</span>
            </b>
          </Tooltip>
        </Marker>
      ))}
      </MapContainer>

      {/* New Section with 3 Buttons */}
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "15px" }}>
        <Link to="/donors" style={donateButtonStyle}>Donate Now</Link>
        <Link to="/volunteers" style={volunteerButtonStyle}>Register as a Volunteer</Link>
        <Link to="/ngo" style={ngoButtonStyle}>Register if part of an NGO</Link>
      </div>
    </div>
  );
};

// Button Styles
const buttonStyle = {
  display: "inline-block",
  backgroundColor: "#1a73e8",
  color: "white",
  padding: "12px 20px",
  fontSize: "1rem",
  fontWeight: "bold",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  textDecoration: "none",
  textAlign: "center"
};

const donateButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#28a745"
};

const volunteerButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#ff5733"
};

const ngoButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#f39c12"
};

export default LandingPage;