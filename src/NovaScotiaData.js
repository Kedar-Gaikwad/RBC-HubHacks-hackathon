import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NovaScotiaData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/nova-scotia-data');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Nova Scotia Housing Data</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item['Geography']}: {item['Value']}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NovaScotiaData;
