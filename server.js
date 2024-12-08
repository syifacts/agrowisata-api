const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
require('dotenv').config();
const agrowisataRoutes = require('./routes/routes');

// Koneksi MongoDB
const startMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
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
    port: process.env.PORT || 3000, // Use the port provided by Heroku
    routes: {
      cors: {
        origin: ['*'], // Allow all origins or specify your frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
      }
    }
  });

  // Menggunakan rute dari file terpisah
  server.route(agrowisataRoutes);

  // Jalankan server
  try {
    await server.start();
    console.log('Server running on %s', server.info.uri);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

// Menjalankan koneksi MongoDB dan server
startMongoDB().then(() => {
  init();
}).catch(err => {
  console.error('Error starting application:', err);
  process.exit(1);
});