import React, { useState, useEffect } from 'react';
import './HousingList.css'; // 引入自定义的CSS样式文件

function HousingList() {
  const [housingData, setHousingData] = useState([]);
  const [loading, setLoading] = useState(true); // 加载状态
  const [error, setError] = useState(null); // 错误状态

  // 从后端获取房源数据
  useEffect(() => {
    fetch('http://localhost:5001/api/get-housing-data')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch housing data');
        }
        return response.json();
      })
      .then(data => {
        console.log('Received data:', data);
        setHousingData(data);
        setLoading(false); // 结束加载
      })
      .catch(err => {
        setError(err.message); // 记录错误信息
        setLoading(false); // 结束加载
      });
  }, []);

  // 处理删除操作
  const handleDelete = (address) => {
    fetch('http://localhost:5001/api/delete-housing-data', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address }), // 将要删除的地址传递给后端
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete housing data');
        }
        // 删除成功后从本地状态中移除数据
        setHousingData(housingData.filter(house => house.address !== address));
      })
      .catch(error => {
        setError('Error deleting housing data: ' + error.message);
      });
  };

  // 显示加载状态、错误信息或房源列表
  if (loading) {
    return <p>Loading housing data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (housingData.length === 0) {
    return <p>No available housing data.</p>;
  }

  return (
    <div className="housing-list">
      <h1>Available Housing</h1>
      <div className="housing-cards">
  {housingData.map((house, index) => (
    <div key={index} className="housing-card">
      <h2>{house.address}</h2>
      <p>Price: ${house.price}</p>
      <p>Size: {house.size} sqft</p>
      <button className="delete-button" onClick={() => handleDelete(house.address)}>Apply</button>
    </div>
  ))}
</div>

    </div>
  );
}

export default HousingList;

