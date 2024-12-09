const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const agrowisataSchema = new mongoose.Schema({
  id: { type: String, default: () => nanoid(), unique: true }, // ID unik
  name: { type: String, required: true }, // Nama agrowisata wajib ada
  location: { type: String, required: true }, // Lokasi wajib ada
  urlimg: { type: String, required: true }, // URL gambar wajib ada
  urlmaps: { type: String, required: true }, // URL peta wajib ada
  fasilitas: { type: String, required: true }, // Fasilitas wajib ada
});

// Model Mongoose untuk koleksi agrowisata
const Agrowisata = mongoose.model('Agrowisata', agrowisataSchema);

module.exports = Agrowisata;
