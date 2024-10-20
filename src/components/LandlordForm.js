import React, { useState } from 'react';
import './LandlordForm.css'; // 引入样式文件

function LandlordForm() {
  // 用于保存表单数据
  const [form, setForm] = useState({
    address: '',
    price: '',
    size: ''
  });

  // 用于存储所有提交的数据
  const [dataArray, setDataArray] = useState([]);

  // 处理输入变化
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  // 提交表单并将数据保存到数组
  const handleSubmit = (e) => {
    e.preventDefault();

    // 将表单数据添加到数组中
    setDataArray(prevArray => [...prevArray, form]);

    // 清空表单
    setForm({
      address: '',
      price: '',
      size: ''
    });
  };

  // 将数组中的数据发送到后端
  const handleAddToExcel = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/add-to-excel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: dataArray }),
      });
  
      if (response.ok) {
        alert('Data successfully sent to server and added to Excel file.');
        setDataArray([]); // 清空数组
      } else {
        throw new Error('Failed to add data to Excel');
      }
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
  };
  

  return (
    <div className="form-container">
      <h2>Submit Housing Details</h2>

      <form onSubmit={handleSubmit}>
        {/* Address */}
        <div className="input-wrapper">
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            required
          />
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>

        {/* Price */}
        <div className="input-wrapper">
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>

        {/* Size */}
        <div className="input-wrapper">
          <input
            type="text"
            name="size"
            value={form.size}
            onChange={handleChange}
            placeholder="Size (sqft)"
            required
          />
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>

      <button onClick={handleAddToExcel} className="add-to-excel-btn">Add Data to Excel</button>

      <div>
        <h3>Data in Array:</h3>
        <pre>{JSON.stringify(dataArray, null, 2)}</pre>
      </div>
    </div>
  );
}

export default LandlordForm;


