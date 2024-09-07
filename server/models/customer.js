const mongoose = require('mongoose');

// Define the schema for your Customer model
const customerSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  PartyName: { type: String, required: true },
  PartyAddress: { type: String, required: true },
  ShipAddress: [{ type: String }], // No default value needed, since it's an array
  PhoneNumber: { type: String }, // If optional, no default value needed
  DLNO: { type: String }, // Removed default value as it's optional
  GSTIN: { type: String }, // Removed default value as it's optional
  STATE: { type: String }, // Removed default value as it's optional
  STATECODE: { type: Number } // Changed to Number if it's a numeric code
}, { timestamps: true });

// Create and export the model
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
