const mongoose = require('mongoose');

const agrowisataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  urlimg: {
    type: String,
    required: true,
  },
  urlmaps: {
    type: String,
    required: true,
  },
  fasilitas: {
    type: String,
    required: true,
  },
}, {
  // Jangan tentukan `id` di sini karena MongoDB mengelola `_id` secara otomatis
  timestamps: true,
});

const Agrowisata = mongoose.model('Agrowisata', agrowisataSchema);

module.exports = Agrowisata;
