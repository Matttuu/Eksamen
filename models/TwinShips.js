var mongoose = require('mongoose'), Schema = mongoose.Schema;

var TwinShipsSchema = new mongoose.Schema({
  name: String,
  home: String,
  callsignal: String,
  mmsi: {
      type: Number,
      unique: true
  },
  use: String,
  brt: Number,
  length: Number,
  maximumpeople: Number,
  sensor: {
    speed: Number,
    course: String,
    gps: String,
    windspeed: Number,
    windstrength: Number,
    temp: Number,
    rotation: Number,
  },
  updated_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TwinShips', TwinShipsSchema);
