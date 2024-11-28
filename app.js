// Import necessary modules
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import miningActivitiesRoutes from './routes/miningActivitiesRoutes.js';
import carbonSinkRoutes from './routes/carbonSinkRoutes.js';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Use the routes for mining activities
app.use('/api/mining-activities', miningActivitiesRoutes);
app.use('/api/carbon-sinks', carbonSinkRoutes);

// Basic route to check if the server is running
app.get('/', (req, res) => {
  res.send(' Data-Ingestion Servivce ->Server is up and running!');
});
connectDB();
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
