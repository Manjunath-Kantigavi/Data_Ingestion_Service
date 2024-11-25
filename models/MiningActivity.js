// models/MiningActivity.js

import mongoose from 'mongoose';

const { Schema } = mongoose;

const miningActivitySchema = new Schema({
  user_id: { type: String, required: true }, // Associating data with a user
  excavation: {
    coalAmount: { type: Number, required: true },            // Amount of coal excavated (in tons)
    method: { type: String, required: true },                // Type of excavation method (e.g., Open-Cast)
    fuelType: { type: String, required: true },              // Fuel type (e.g., Diesel, Electric)
    distance: { type: Number, required: true },              // Distance covered (in meters or kilometers)
    equipmentUsed: { type: String, required: true },         // Equipment used (e.g., Excavators)
  },
  transportation: {
    coalTransported: { type: Number, required: true },       // Amount of coal transported (in tons)
    mode: { type: String, required: true },                  // Mode of transport (e.g., Dump Truck)
    fuelType: { type: String, required: true },
    distancePerTrip: { type: Number, required: true },
    vehicleCapacity: { type: Number, required: true },
    tripsPerDay: { type: Number, required: true },
  },
  equipmentUsage: {
    type: { type: String, required: true },
    fuelType: { type: String, required: true },
    operatingHours: { type: Number, required: true },
    fuelConsumptionPerHour: { type: Number, required: true },
  },
  methaneEntrapment: {
    captureRate: { type: Number, required: true },           // Volume of methane captured (m³)
    utilizationMethod: { type: String, required: true },     // Utilization method (e.g., energy generation)
    // dischargeAmount: { type: Number, required: true },       // Methane discharged if not captured (m³)
    conversionEfficiency: { type: Number },                  // Conversion efficiency if used for energy
  },
}, {
  timestamps: true
});

const MiningActivity = mongoose.model('MiningActivity', miningActivitySchema);

export default MiningActivity;