const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
require('dotenv').config();  // Memuat variabel lingkungan dari file .env
const agrowisataRoutes = require('./routes/routes');

// Koneksi MongoDB
const startMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

// Membuat server Hapi
const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,  // Menggunakan PORT dari .env atau 3000 default
    host: 'localhost',
  });

  // Menggunakan rute dari file terpisah
  server.route(agrowisataRoutes);

  // Jalankan server
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

// Menjalankan koneksi MongoDB dan server
startMongoDB().then(() => {
  init();
});
