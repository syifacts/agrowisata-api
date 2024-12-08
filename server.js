const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
require('dotenv').config();
const agrowisataRoutes = require('./routes/routes');

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
  
const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
  });

  // Register CORS middleware
  server.ext('onPreResponse', (request, h) => {
    const response = h.continue;
    response.headers['Access-Control-Allow-Origin'] = '*';
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
    return response;
  });

  server.route(agrowisataRoutes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

startMongoDB().then(() => {
  init().catch(err => {
    console.error('Server initialization error:', err);
    process.exit(1);
  });
});