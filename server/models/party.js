const mongoose = require('mongoose');

const partySchema = new mongoose.Schema({
  partyName: { type: String, required: true }
});

module.exports = mongoose.model('Party', partySchema);
