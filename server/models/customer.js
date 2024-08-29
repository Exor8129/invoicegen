const mongoose = require('mongoose');

// Define the schema for your Customer model
const customerSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  PartyName: { type: String, required: true },
  PartyAddress: { type: String, required: true },
  ShipAddress: { type: String, required: true },
  PhoneNumber: { type: String, default: '' },
  DLNO: { type: String, default: '' },
  GSTIN: { type: String, default: '' },
  STATE: { type: String, default: '' },
  STATECODE: { type: String, default: '' }
}, { timestamps: true });

// Create and export the model
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
