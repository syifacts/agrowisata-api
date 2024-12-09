const { nanoid } = require('nanoid');
const mongoose = require('mongoose');

const agrowisataSchema = new mongoose.Schema({
  id: { type: String, default: () => nanoid(), unique: true },
  name: String,
  location: String,
  urlimg: String,
  urlmaps: String,
  fasilitas: String,
});

const Agrowisata = mongoose.model('Agrowisata', agrowisataSchema);

module.exports = Agrowisata;
