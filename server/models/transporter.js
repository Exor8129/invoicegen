const mongoose = require('mongoose');

// Define the schema for your Transporter model
const transporterSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  transporterName: { type: String, required: true } // Adding `required: true` is a good practice if this field is mandatory
}, {
  timestamps: true,
  collection: 'transporter' // Specify the desired collection name here
});

// Create and export the model
const Transporter = mongoose.model('Transporter', transporterSchema);

module.exports = Transporter;
