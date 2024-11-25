import MiningActivity from '../models/MiningActivity.js';

// Controller to create a new mining activity
export const createMiningActivity = async (req, res) => {
  try {
    const { user_id, role } = req.user;

    // Restrict officer from deleting
    if (role === 'officer') {
      return res.status(403).json({ message: 'Officers are not allowed to Create  data' });
    } // Get user ID from authenticated request
    const { excavation, transportation, equipmentUsage, methaneEntrapment } = req.body;

    // Create a new mining activity
    const newActivity = new MiningActivity({
      user_id, // Attach user ID to the activity
      excavation,
      transportation,
      equipmentUsage,
      methaneEntrapment,
    });

    // Save the activity to the database
    await newActivity.save();

    res.status(201).json({
      message: 'Mining activity created successfully!',
      data: newActivity,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating mining activity',
      error: error.message,
    });
  }
};

// Controller to fetch all mining activities
export const getMiningActivities = async (req, res) => {
  try {
    const user_id = req.user.user_id; // Get user ID from token
    const role = req.user.role;  // Get user role from token

    // If the user is an officer, allow them to read all mining activities
    if (role === 'officer') {
      const activities = await MiningActivity.find(); // Fetch all activities
      return res.status(200).json({ activities });
    }
     // Check if any data exists for the user
     const activitiesExist = await MiningActivity.exists({ user_id });
     if (!activitiesExist) {
       return res.status(404).json({ message: 'No mining activities found for this user' });
     }
    const activities = await MiningActivity.find({ user_id }); // Fetch only for the logged-in user

    if (!activities.length) {
      return res.status(404).json({ message: 'No activities found for this user.' });
    }

    res.status(200).json({ activities });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching mining activities',
      error: error.message,
    });
  }
};


// Update a mining activity by ID
export const updateMiningActivity = async (req, res) => {
  try {
    const {user_id,role} = req.user; // Get user ID from token
    //Restrict officer 
    if (role === 'officer') {
      return res.status(403).json({ message: 'Officers are not allowed to update data' });
    }
    const { excavation, transportation, equipmentUsage, methaneEntrapment } = req.body;

     // Check if any data exists for the user
     const activityExists = await MiningActivity.exists({ user_id });
     if (!activityExists) {
       return res.status(404).json({ message: 'No mining activity found for this user to update' });
     }
 
    // Update all activities for the user
    const updatedActivities = await MiningActivity.updateMany(
      { user_id }, // Filter by user_id
      { excavation, transportation, equipmentUsage, methaneEntrapment },
      { new: true } // Return updated documents
    );

    if (!updatedActivities.matchedCount) {
      return res.status(404).json({ message: 'No activities found for this user.' });
    }

    res.status(200).json({
      message: 'Mining activities updated successfully!',
      updatedActivities,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating mining activities',
      error: error.message,
    });
  }
};


// Delete a mining activity by ID
export const deleteMiningActivity = async (req, res) => {
  try {
    const { user_id, role } = req.user;

    // Restrict officer from deleting
    if (role === 'officer') {
      return res.status(403).json({ message: 'Officers are not allowed to delete data' });
    }
    
    const deletedResult = await MiningActivity.deleteMany({ user_id }); // Delete by user_id

    if (!deletedResult.deletedCount) {
      return res.status(404).json({ message: 'No activities found for this user.' });
    }

    res.status(200).json({
      message: 'All mining activities deleted successfully!',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting mining activities',
      error: error.message,
    });
  }
};

