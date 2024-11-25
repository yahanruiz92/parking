const mongoose = require('mongoose');

const parkingDataSchema = new mongoose.Schema({
  Hora: String,
  Fecha: String,
  Espacio1: Boolean,
  Espacio2: Boolean,
  Espacio3: Boolean,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ParkingData', parkingDataSchema);