const mongoose = require('mongoose');

// Define the schema for your Customer model
const customerSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Automatically created by MongoDB
  PartyName: { type: String, required: true }, // PartyName field
  PartyAddress: { type: String,required: true  }, // Party Address field
  PhoneNumber: { type: String, default: '' }, // Phone Number field  
  DLNO:{ type: String, default: '' }, // GSTIN field
  GSTIN: { type: String, default: '' }, // GSTIN field
  STATE: { type: String, default: '' }, // STATE field
  STATECODE: { type: String, default: '' } // STATE CODE field
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Create and export the model
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
