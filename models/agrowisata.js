const { nanoid } = require('nanoid');
const mongoose = require('mongoose');

const agrowisataSchema = new mongoose.Schema({
  id: { type: String, default: () => nanoid(), unique: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  urlimg: { type: String, default: '' },
  urlmaps: { type: String, required: true },
  fasilitas: { type: String, required: true },
}, { _id: false }); // Menonaktifkan pembuatan _id


const Agrowisata = mongoose.model('Agrowisata', agrowisataSchema);

module.exports = Agrowisata;
