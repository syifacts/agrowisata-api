// models/agrowisata.js
const mongoose = require('mongoose');

const agrowisataSchema = new mongoose.Schema({
  name: String,
  location: String,
  urlimg: String,
  urlmaps: String,
  fasilitas: String,
});

const Agrowisata = mongoose.model('Agrowisata', agrowisataSchema);

module.exports = Agrowisata;
