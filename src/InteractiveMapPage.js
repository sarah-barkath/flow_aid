import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Circle, Tooltip, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getDisasters } from "./DisasterService";
import { haversineDistance as calculateDistance } from "./locationUtils";

const InteractiveMapPage = () => {
  const [disasterZones, setDisasterZones] = useState([]);
  const [hoveredDisaster, setHoveredDisaster] = useState(null);
  const [bestNGO, setBestNGO] = useState([]); // bestNGO is an array to hold 1 or 2 NGOs


  useEffect(() => {
    const fetchDisasters = async () => {
      const data = await getDisasters();
      setDisasterZones(data.map(doc => ({
        id: doc.id,
        ...doc,
        coords: [doc.latitude, doc.longitude],
      })));
    };
    fetchDisasters();
  }, []);

  const ngos = [
  { id: 1, name: "Goonj", coords: [28.5245, 77.1855], resources: 80 }, // Delhi
  { id: 2, name: "SEWA (Self Employed Women’s Association)", coords: [23.0225, 72.5714], resources: 60 }, // Ahmedabad
  { id: 3, name: "CARE India", coords: [25.5941, 85.1376], resources: 70 }, // Patna
  { id: 4, name: "Smile Foundation", coords: [28.5672, 77.2100], resources: 65 }, // Delhi NCR
  { id: 5, name: "Save the Children India", coords: [19.0760, 72.8777], resources: 75 }, // Mumbai
  { id: 6, name: "The Red Elephant Foundation", coords: [13.0827, 80.2707], resources: 55 }, // Chennai
  { id: 7, name: "Myna Mahila Foundation", coords: [19.0728, 72.8826], resources: 40 }, // Mumbai
  { id: 8, name: "Habitat for Humanity India", coords: [18.5204, 73.8567], resources: 85 }, // Pune
  { id: 9, name: "Plan India", coords: [28.6139, 77.2090], resources: 65 }, // New Delhi
  { id: 10, name: "Eco Femme", coords: [11.9320, 79.8300], resources: 50 }, // Auroville, Tamil Nadu
  { id: 11, name: "ActionAid India", coords: [12.9716, 77.5946], resources: 70 }, // Bengaluru
  { id: 12, name: "WaterAid India", coords: [28.6304, 77.2177], resources: 60 }, // New Delhi
  { id: 13, name: "Bhumi", coords: [13.0827, 80.2707], resources: 55 }, // Chennai
  { id: 14, name: "Samhita Social Ventures", coords: [19.0760, 72.8777], resources: 45 }, // Mumbai
  { id: 15, name: "Pravah", coords: [28.6390, 77.2150], resources: 35 }, // Delhi
  { id: 16, name: "Aakar Innovations", coords: [22.7196, 75.8577], resources: 50 }, // Indore, MP
  { id: 17, name: "SWaCH Pune Seva Sahakari Sanstha", coords: [18.5204, 73.8567], resources: 55 }, // Pune, MH
  { id: 18, name: "Gramalaya", coords: [10.7905, 78.7047], resources: 60 }, // Tiruchirappalli, TN
  { id: 19, name: "Needs India Foundation", coords: [26.4499, 80.3319], resources: 45 }, // Kanpur, UP
  { id: 20, name: "Seva Mandir", coords: [24.5854, 73.7125], resources: 70 }, // Udaipur, Rajasthan
  { id: 21, name: "Manav Sadhna", coords: [23.0225, 72.5714], resources: 40 }, // Ahmedabad
  { id: 22, name: "Association for Rural & Urban Needy (ARUN)", coords: [22.3072, 73.1812], resources: 35 }, // Vadodara
  { id: 23, name: "Jagriti", coords: [17.3850, 78.4867], resources: 50 }, // Hyderabad
  { id: 24, name: "Pratham Education Foundation", coords: [19.0750, 72.8777], resources: 55 }, // Mumbai
  { id: 25, name: "Apni Shala", coords: [21.1458, 79.0882], resources: 45 }, // Nagpur
  { id: 26, name: "SaveLIFE Foundation", coords: [12.2958, 76.6394], resources: 60 }, // Mysore
  { id: 27, name: "Aide et Action India", coords: [28.4595, 77.0266], resources: 50 }, // Gurgaon
  { id: 28, name: "Katha", coords: [28.6448, 77.2167], resources: 40 }, // Delhi
  { id: 29, name: "Butterflies", coords: [19.0760, 72.8777], resources: 35 }, // Mumbai
  { id: 30, name: "Nanhi Kali", coords: [12.9716, 77.5946], resources: 55 }, // Bengaluru
  { id: 31, name: "VITAP FOUNDATION", coords: [14.8476, 80.4045], resources: 60 }, // Bengaluru
  { id: 32, name: "SRM FOUNDATION", coords: [14.1726, 79.7075], resources: 30 }, // Bengaluru
  { id: 33, name: "Kashi Educare Society", coords: [25.351027121323774, 82.94456403201553], resources: 70},
  { id: 34, name: "Dharma Chakra Mul Boudh Sodh Sansthan", coords: [25.373586989955232, 83.03110831515488], resources: 50},
  { id: 35, name: "Akanksha Foundation", coords: [18.54021612229653, 73.8561008469484], resources: 80},
  { id: 36, name: "Bharatiya Samaj Seva Kendra", coords: [18.535393239501893, 73.8990584029704], resources: 40},
  { id: 37, name: "Lok Chetna Vikas Samiti(LCVS NGO)", coords: [29.618987725383818, 79.72302633398739], resources: 40},
  { id: 38, name: "Central Himalayan Environment Association (CHEA)", coords: [29.393724738355814, 79.45112610147505], resources: 65},
  { id: 39, name: "Sri Arunodayam Charitable Trust", coords: [13.124699075851629, 80.2020643806401], resources: 65},
  { id: 40, name: "SOS Children's Village Bhubaneswar", coords: [20.285926914920505, 85.77675864110785], resources: 75},
  { id: 41, name: "Orissa Voluntary Health Association", coords: [20.267176756291086, 85.84839652206209], resources: 70},
  { id: 42, name: "Kumbakonam Multipurpose Social Service Society", coords: [10.957066053330427, 79.38794364884487], resources: 30},
  { id: 43, name: "Cloistered Carmel Ashram", coords: [10.964017714325786, 79.40632040096393], resources: 50},
  { id: 44, name: "Rural Reconstruction And Rehabilitation Educational Society", coords: [14.410525411739084, 79.95144704890613], resources: 55},
  { id: 45, name: "Chaitanya Jyothi Welfare Society", coords: [14.407176462974641, 79.95718415993028], resources: 70},
  { id: 46, name: "The Akshaya Patra Foundation in Visakhapatnam", coords: [18.078017918938304, 83.42885601292232], resources: 76},
  { id: 47, name: "The Akshaya Patra Foundation", coords: [13.790111294927353, 80.37465685457833], resources: 50},
  { id: 48, name: "Andhra Pradesh Vaidya Vidhana Parishad Office Of The District Coordinator Of Hospital Services", coords: [17.52727638688455, 82.99754878639739], resources: 100},
  { id: 49, name: "DBRC", coords: [16.347650835255486, 80.44534184894759], resources: 69},
  { id: 50, name: "Education, Cultural, and Health Organization (ECHO)", coords: [14.968666649576974, 78.18871394230568], resources: 77},
  { id: 51, name: "Human Organisation for People’s Enlightment (HOPE) NGO", coords: [13.211832088139936, 79.12636772485942], resources: 40},
];


  const safeZones = [
    { id: 1, location: "Nagpur", coords: [21.1458, 79.0882] },
    { id: 2, location: "Patna", coords: [25.5941, 85.1376] },
  ];

  // Function to find the best NGO when a disaster is hovered
  const findBestNGO = (disaster) => {
  setBestNGO([]); // clear old data

  const threshold = disaster.severity.toLowerCase() === 'moderate' ? 50 : 150;

  const ngosWithDistance = ngos.map((ngo) => ({
    ...ngo,
    distance: calculateDistance(disaster.coords, ngo.coords),
  }));

  const closestNGO = ngosWithDistance.reduce(
    (closest, ngo) => (ngo.distance < closest.distance ? ngo : closest),
    ngosWithDistance[0]
  );

  // ✅ Only show one NGO for high severity
  if (disaster.severity.toLowerCase() === 'high') {
    setBestNGO([{ ...closestNGO, distance: closestNGO.distance.toFixed(2) }]);
    return;
  }

  const validNGOs = ngosWithDistance.filter((ngo) => ngo.distance <= threshold);

  const leastResourceNGO = validNGOs.reduce(
    (least, ngo) => (ngo.resources < least.resources ? ngo : least),
    validNGOs[0]
  );

  if (leastResourceNGO) {
    setBestNGO([
      { ...closestNGO, distance: closestNGO.distance.toFixed(2) },
      { ...leastResourceNGO, distance: leastResourceNGO.distance.toFixed(2) },
    ]);
  } else {
    setBestNGO([{ ...closestNGO, distance: closestNGO.distance.toFixed(2) }]);
  }
};


  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Disaster Zones (Red Circles) */}
        {disasterZones.map((zone) => {
          // normalize severity and map to colors (adjust colors if you like)
          const severityNormalized = (zone.severity || "").toString().toLowerCase().trim();

          const getZoneColor = (s) => {
            switch (s) {
              case "low":
                return "#2ecc71";    // green
              case "moderate":
                return "#f1c40f";    // yellow
              case "high":
              case "severe":
                return "#e74c3c";    // red
              default:
                return "#e74c3c";    // fallback red
            }
          };

          const color = getZoneColor(severityNormalized);
          console.log("zone", zone.id, "severity:", zone.severity, "=> color:", color);

          return (
            <Circle
              // include severity in key to force remount when severity changes
              key={`${zone.id}-${severityNormalized}`}
              center={zone.coords}
              radius={50000}
              pathOptions={{
                color: color,        // stroke
                fillColor: color,    // fill
                fillOpacity: 0.35,   // visible shading
                weight: 2,           // stroke width
              }}
              eventHandlers={{
                mouseover: () => {
                  setHoveredDisaster(zone);
                  findBestNGO(zone); // Update bestNGO state with best NGO(s)
                },
                mouseout: () => {
                  setHoveredDisaster(null);
                  setBestNGO([]);  // Clear bestNGO state on mouse leave
                },
              }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <b>{zone.location} (Disaster Zone)</b> <br />
                Severity: {zone.severity}
              </Tooltip>
            </Circle>
          );
        })}


        {/* Safe Zones (Green Circles) */}
        {safeZones.map((zone) => (
          <Circle key={zone.id} center={zone.coords} radius={30000} pathOptions={{ color: "green" }}>
            <Tooltip direction="top" offset={[0, -10]} opacity={1}>
              <b>{zone.location} (Safe Zone)</b>
            </Tooltip>
          </Circle>
        ))}

        {/* NGOs (Blue Circles) */}
        {ngos.map((ngo) => (
          <Circle key={ngo.id} center={ngo.coords} radius={2000} pathOptions={{ color: "blue" }}>
            <Tooltip direction="top" offset={[0, -10]} opacity={1}>
              <b>{ngo.name}</b> <br />
              Resources: {ngo.resources}
            </Tooltip>
          </Circle>
        ))}

        {/* Draw lines from hovered disaster to NGOs with distances */}
        {hoveredDisaster &&
          bestNGO.map((ngo) => (
            <Polyline key={ngo.id} positions={[hoveredDisaster.coords, ngo.coords]} color="purple">
              <Tooltip direction="center" offset={[0, 0]} opacity={1}>
                <b>{ngo.name}</b> <br />
                Resources: {ngo.resources} <br />
                Distance: {ngo.distance} km
              </Tooltip>
            </Polyline>
        ))}


        {/* Display Popup for Best NGO */}
        {bestNGO && hoveredDisaster && (
          <Popup position={hoveredDisaster.coords}>
            <div>
              {bestNGO.length === 1 ? (
                <>
                  <h3>Best NGO: {bestNGO[0].name}</h3>
                  <p>Resources: {bestNGO[0].resources}</p>
                  <p>Distance: {bestNGO[0].distance} km</p>
                </>
              ) : (
                <>
                  <h3>Best NGOs:</h3>
                  {bestNGO.map((ngo) => (
                    <div key={ngo.id} style={{ marginBottom: '10px' }}>
                      <b>{ngo.name}</b><br />
                      Resources: {ngo.resources}<br />
                      Distance: {ngo.distance} km
                    </div>
                  ))}
                </>
              )}
            </div>
          </Popup>
        )}
      </MapContainer>
    </div>
  );
};

export default InteractiveMapPage;
