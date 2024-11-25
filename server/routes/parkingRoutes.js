<command>const express = require('express');
const router = express.Router();
const ParkingData = require('../models/ParkingData');

// Get current parking status
router.get('/status', async (req, res) => {
  try {
    const status = await ParkingData.findOne().sort({ timestamp: -1 });
    res.json(status);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get occupancy data for chart
router.get('/occupancy', async (req, res) => {
  try {
    const data = await ParkingData.find()
      .sort({ timestamp: -1 })
      .limit(24); // Last 24 records
    
    const labels = data.map(d => d.Hora);
    const occupied = data.map(d => 
      (d.Espacio1 ? 1 : 0) + 
      (d.Espacio2 ? 1 : 0) + 
      (d.Espacio3 ? 1 : 0)
    );

    res.json({ labels, occupied });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;</command>