import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import Filter from './Filter';
import './HousingMap.css';

// Create a custom pin icon
const pinIcon = new L.Icon({
  iconUrl: '/pin-icon.png', // Update the path based on your project structure
  iconSize: [15, 20],
  iconAnchor: [15, 40],
  popupAnchor: [0, -40]
});

const HousingMap = () => {
  const [locations, setLocations] = useState([]);
  const [filter, setFilter] = useState({
    program: '',
    constructionStatus: ''
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/geolocations')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setLocations(data))
      .catch(error => console.error('Error fetching locations:', error));
  }, []);

  const programs = [...new Set(locations.map(location => location.program))];
  const statuses = [...new Set(locations.map(location => location.construction_status))];

  const filteredLocations = locations.filter(location => {
    const programMatch = filter.program ? location.program === filter.program : true;
    const statusMatch = filter.constructionStatus ? location.construction_status === filter.constructionStatus : true;
    return programMatch && statusMatch;
  });

  return (
    <div className="map-container">
      <div className="filter-section"> {/* Add this wrapper for the filter */}
        <Filter programs={programs} statuses={statuses} filter={filter} setFilter={setFilter} />
      </div>
      <MapContainer center={[44.6488, -63.5752]} zoom={8} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {filteredLocations.map((location, index) => {
          const { latitude, longitude, project_name, location: loc, program, construction_status } = location;

          return latitude && longitude ? (
            <Marker key={index} position={[latitude, longitude]} icon={pinIcon}>
              <Popup>
                <div>
                  <h4>{project_name}</h4>
                  <p><strong>Location:</strong> {loc}</p>
                  <p><strong>Program:</strong> {program}</p>
                  <p><strong>Status:</strong> {construction_status}</p>
                  <p><strong>Units:</strong> {location.number_of_units}</p>
                  <p><strong>Affordable Units:</strong> {location.number_of_affordable_units}</p>
                </div>
              </Popup>
            </Marker>
          ) : null;
        })}
      </MapContainer>
    </div>
  );
};

export default HousingMap;
