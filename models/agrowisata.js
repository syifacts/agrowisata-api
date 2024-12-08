// models/agrowisata.js
const mongoose = require('mongoose');

const agrowisataSchema = new mongoose.Schema({
  id: String,
  name: String,
  location: String,
  urlmaps: String,
  fasilitas: String,
});

const Agrowisata = mongoose.model('Agrowisata', agrowisataSchema);

module.exports = Agrowisata;
