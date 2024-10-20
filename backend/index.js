const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;

// PostgreSQL connection
const pool = new Pool({
  user: 'retool', // Replace with your user
  host: 'ep-steep-grass-a6ndel6c.us-west-2.retooldb.com', // Replace with your host
  database: 'retool', // Replace with your database name
  password: '8bzvO2aqFLwW', // Replace with your password
  port: 5432, // Default PostgreSQL port
  ssl: {
    rejectUnauthorized: false, // This allows self-signed certificates
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Example route to fetch geolocation data
app.get('/api/geolocations', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM data_maps'); // Replace 'your_table_name' with the actual table name
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching geolocations:', error);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
