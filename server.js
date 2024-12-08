const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables from .env file
const agrowisataRoutes = require('./routes/routes');

// MongoDB connection
const startMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

// Create Hapi server
const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,  // Use PORT from .env or default to 3000
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],  // Allow all origins or specify your allowed origins
        methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Define methods as an array
      },
    },
  });

  // Use routes from a separate file
  server.route(agrowisataRoutes);

  // Start the server
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

// Run MongoDB connection and server
startMongoDB().then(() => {
  init().catch(err => {
    console.error('Server initialization error:', err);
    process.exit(1);
  });
});