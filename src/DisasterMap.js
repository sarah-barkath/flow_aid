import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const DisasterMap = () => {
  const [disasters, setDisasters] = useState([]);
  const [ngos, setNgos] = useState([]);

  useEffect(() => {
    setDisasters([
      { id: 1, lat: 17.385, lng: 78.4867, name: "Flood in City A" },
      { id: 2, lat: 17.500, lng: 78.4000, name: "Earthquake in City B" },
    ]);

    setNgos([
      { id: 1, lat: 17.380, lng: 78.4800, name: "NGO 1", resources: 100 },
      { id: 2, lat: 17.520, lng: 78.4200, name: "NGO 2", resources: 70 },
    ]);
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Disaster Map</h2>
      <MapContainer center={[17.385, 78.4867]} zoom={7} style={{ height: "500px", width: "80%", margin: "auto" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {disasters.map((disaster) => (
          <Marker key={disaster.id} position={[disaster.lat, disaster.lng]}>
            <Popup>{disaster.name}</Popup>
          </Marker>
        ))}
        {ngos.map((ngo) => (
          <Marker key={ngo.id} position={[ngo.lat, ngo.lng]}>
            <Popup>{ngo.name} - Resources: {ngo.resources}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default DisasterMap;
