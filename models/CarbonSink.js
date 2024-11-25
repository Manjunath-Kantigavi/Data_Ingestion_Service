import mongoose from 'mongoose';

const { Schema } = mongoose;

const carbonSinkSchema = new Schema({
  user_id: { type: String, required: true }, // Associating data with a user
  type: {
    type: String,
    required: true, // e.g., "Afforestation", "Biodiversity Conservation", or "Green Technology"
  },
  // Fields for Afforestation
  afforestation: {
    area: { type: Number },               // Area in hectares
    treePlantingRate: { type: Number },   // Trees per hectare
    treeType: { type: String },           // e.g., "broadleaf", "evergreen"
  },
  // Fields for Biodiversity Conservation
  biodiversityConservation: {
    area: { type: Number },               // Area in hectares
    habitatType: { type: String },        // e.g., "wetlands", "forests"
    carbonSequestration: { type: Number }, // Tons per hectare per year
  },
  // Fields for Green Technology Implementation
  greenTechnology: {
    technologyType: { type: String },     // e.g., "carbon capture", "carbon-absorbing machinery"
    emissionReduction: { type: Number },  // Tons per year of emissions reduced
    energySource: { type: String },       // e.g., "solar", "hydrogen"
  },
  // Common fields for all types
  location: {
    type: String,
    required: true, // Location of the project
  },
  creationDate: {
    type: Date,
    required: true, // Date when the carbon sink was created
  },
}, {
  timestamps: true,
});

const CarbonSink = mongoose.model('CarbonSink', carbonSinkSchema);

export default CarbonSink;
