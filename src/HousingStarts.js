// src/components/HousingStarts.js

import React, { useEffect, useState } from 'react';

const HousingStarts = () => {
  const [housingStarts, setHousingStarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHousingData = async () => {
      try {
        const response = await fetch('https://mountainmath.github.io/cmhc/api/housing-starts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setHousingStarts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHousingData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="housing-starts">
      <h3>Housing Starts Data</h3>
      <table>
        <thead>
          <tr>
            <th>Region</th>
            <th>Year</th>
            <th>Housing Starts</th>
          </tr>
        </thead>
        <tbody>
          {housingStarts.map((item, index) => (
            <tr key={index}>
              <td>{item.region}</td>
              <td>{item.year}</td>
              <td>{item.housing_starts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HousingStarts;
