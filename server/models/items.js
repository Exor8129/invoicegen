const mongoose = require('mongoose');

// Define the schema for the Item model
const itemSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  ITEM: {
    type: String,
    required: true
  },
  HSN_CODE: {
    type: String, // Changed to String to handle codes with leading zeros
    required: true
  },
  MRP: {
    type: Number,
    required: true
  },
  Vendor: {
    type: String,
    required: true
  },
  TAX_RATE: {
    type: Number,
    required: true
  },
  GDL: {
    type: String,
    required: true
  }
}, { timestamps: true }); // Optional: includes createdAt and updatedAt fields

// Create and export the model
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
