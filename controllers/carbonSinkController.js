import CarbonSink from '../models/CarbonSink.js';

// Create Carbon Sink
export const createCarbonSink = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { type, location, creationDate, afforestation, biodiversityConservation, greenTechnology } = req.body;
    
    const newCarbonSink = new CarbonSink({
      user_id, // Attach user ID to the carbon sink
      type,
      location,
      creationDate,
      afforestation,
      biodiversityConservation,
      greenTechnology,
    });
    
    await newCarbonSink.save();
    
    res.status(201).json({
      message: 'Carbon sink created successfully!',
      data: newCarbonSink,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating carbon sink',
      error: error.message,
    });
  }
};

// Get all Carbon Sinks
export const getCarbonSinks = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    // Check if any carbon sinks exist for the user
    const sinksExist = await CarbonSink.exists({ user_id });
    if (!sinksExist) {
      return res.status(404).json({ message: 'No carbon sinks found for this user' });
    }
    const carbonSinks = await CarbonSink.find({user_id});
    res.status(200).json({
      message: 'Carbon sinks fetched successfully!',
      data: carbonSinks,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching carbon sinks',
      error: error.message,
    });
  }
};

// Update Carbon Sink by ID
export const updateCarbonSink = async (req, res) => {
  try {
    const user_id = req.user.user_id; // Extract user ID from token
    const { type, location, creationDate, afforestation, biodiversityConservation, greenTechnology } = req.body;
    
    // Check if any carbon sink exists for the user
    const sinkExists = await CarbonSink.exists({ user_id });
    if (!sinkExists) {
      return res.status(404).json({ message: 'No carbon sink found for this user to update' });
    }
    // Find and update the first matching carbon sink for the user
    const updatedCarbonSink = await CarbonSink.findOneAndUpdate(
      { user_id }, // Match based on user_id only
      { type, location, creationDate, afforestation, biodiversityConservation, greenTechnology },
      { new: true } // Return the updated document
    );

    if (!updatedCarbonSink) {
      return res.status(404).json({ message: 'No carbon sink found for the user' });
    }

    res.status(200).json({
      message: 'Carbon sink updated successfully!',
      data: updatedCarbonSink,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating carbon sink',
      error: error.message,
    });
  }
};


// Delete Carbon Sink by ID
export const deleteCarbonSink = async (req, res) => {
  try {
    const user_id = req.user.user_id; // Extract user ID from token

     // Check if any carbon sink exists for the user
     const sinkExists = await CarbonSink.exists({ user_id });
     if (!sinkExists) {
       return res.status(404).json({ message: 'No carbon sink found for this user to delete' });
     }
 
    // Find and delete the first matching carbon sink for the user
    const deletedCarbonSink = await CarbonSink.findOneAndDelete({ user_id });

    if (!deletedCarbonSink) {
      return res.status(404).json({ message: 'No carbon sink found for the user' });
    }

    res.status(200).json({
      message: 'Carbon sink deleted successfully!',
      data: deletedCarbonSink,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting carbon sink',
      error: error.message,
    });
  }
};
