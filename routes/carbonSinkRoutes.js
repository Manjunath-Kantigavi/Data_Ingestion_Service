import express from 'express';
import { 
  createCarbonSink, 
  getCarbonSinks, 
  updateCarbonSink, 
  deleteCarbonSink 
} from '../controllers/carbonSinkController.js';
import authenticateToken from '../middlewares/authenticateToken.js';


const router = express.Router();

// Route to create a new carbon sink
router.post('/', authenticateToken, createCarbonSink);

// Route to get all carbon sinks
router.get('/',authenticateToken, getCarbonSinks);

// Route to update a carbon sink by ID
router.put('/',authenticateToken, updateCarbonSink);

// Route to delete a carbon sink by ID
router.delete('/',authenticateToken, deleteCarbonSink);

export default router;
