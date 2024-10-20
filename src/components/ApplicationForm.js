import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import './ApplicationForm.css';

function ApplicationForm() {
  // Updated form state with new fields
  const [form, setForm] = useState({
    name: '',
    age: '',
    address: '',
    location: '',
    plotSize: '',
    rooms: '',
    budgetMin: '',
    budgetMax: '',
    rentOrBuy: 'rent',
  });

  const [dataArray, setDataArray] = useState([]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Add form data to dataArray
    setDataArray((prevArray) => [...prevArray, form]);

    // Clear the form
    setForm({
      name: '',
      age: '',
      address: '',
      location: '',
      plotSize: '',
      rooms: '',
      budgetMin: '',
      budgetMax: '',
      rentOrBuy: 'rent',
    });
  };

  // Add data to Excel
  const handleAddToExcel = async () => {
    try {
      const response = await fetch('/data.xlsx'); // Ensure 'data.xlsx' exists in the public folder
      const blob = await response.blob();
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        const arrayBuffer = e.target.result;
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        dataArray.forEach((row) => {
          const newData = [
            [
              row.name,
              row.age,
              row.address,
              row.location,
              row.plotSize,
              row.rooms,
              row.budgetMin,
              row.budgetMax,
              row.rentOrBuy,
            ],
          ];
          XLSX.utils.sheet_add_aoa(worksheet, newData, { origin: -1 });
        });

        const updatedExcelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const newBlob = new Blob([updatedExcelBuffer], { type: 'application/octet-stream' });
        saveAs(newBlob, 'data.xlsx');
        alert('Data added to Excel file successfully.');
      };

      fileReader.readAsArrayBuffer(blob);
    } catch (error) {
      console.error('Error reading or writing Excel file:', error);
      alert('Failed to add data to Excel. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Apply for Housing</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
         
        </div>

        <div className="input-wrapper">
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Age"
            required
          />
          
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            required
          />
          
        </div>

        {/* Location */}
        <div className="input-wrapper">
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Preferred Location"
          />
        </div>

        {/* Plot Size */}
        <div className="input-wrapper">
          <input
            type="text"
            name="plotSize"
            value={form.plotSize}
            onChange={handleChange}
            placeholder="Plot Size (e.g., 1000 sq ft)"
          />
        </div>

        {/* Number of Rooms */}
        <div className="input-wrapper">
          <input
            type="number"
            name="rooms"
            value={form.rooms}
            onChange={handleChange}
            placeholder="Number of Rooms"
          />
        </div>

        {/* Budget Range */}
        <div className="input-wrapper">
          <input
            type="number"
            name="budgetMin"
            value={form.budgetMin}
            onChange={handleChange}
            placeholder="Minimum Budget"
          />
          <input
            type="number"
            name="budgetMax"
            value={form.budgetMax}
            onChange={handleChange}
            placeholder="Maximum Budget"
          />
        </div>

        {/* Rent or Buy */}
        <div className="input-wrapper">
          <label>
            <input
              type="radio"
              name="rentOrBuy"
              value="rent"
              checked={form.rentOrBuy === 'rent'}
              onChange={handleChange}
            />
            Rent
          </label>
          <label>
            <input
              type="radio"
              name="rentOrBuy"
              value="buy"
              checked={form.rentOrBuy === 'buy'}
              onChange={handleChange}
            />
            Buy
          </label>
        </div>

        <button type="submit" className="submit-btn">Submit</button>
        
      </form>

      <button onClick={handleAddToExcel} className="add-to-excel-btn">Add Data to Excel</button>
    </div>
  );
}

export default ApplicationForm;
