const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const agrowisataSchema = new mongoose.Schema({
  id: { type: String, default: () => nanoid(), unique: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  urlimg: { type: String, required: true }, // Pastikan urlimg wajib ada
  urlmaps: { type: String, required: true },
  fasilitas: { type: String, required: true },
}, { _id: false }); // Nonaktifkan pembuatan _id


const Agrowisata = mongoose.model('Agrowisata', agrowisataSchema);

module.exports = Agrowisata;
