import express from 'express';
import { createMiningActivity, getMiningActivities, updateMiningActivity, 
    deleteMiningActivity } from '../controllers/miningActivitiesController.js';
import authenticateToken from '../middlewares/authenticateToken.js';
const router = express.Router();

// Route to create a new mining activity
router.post('/', authenticateToken, createMiningActivity);

// Route to get all mining activities
router.get('/', authenticateToken,getMiningActivities);

// Route to update a mining activity by ID
router.put('/', authenticateToken,updateMiningActivity);

// Route to delete a mining activity by ID
router.delete('/',authenticateToken, deleteMiningActivity);

export default router;
