const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/party-names', (req, res) => {
  console.log('Route /party-names hit'); // Log when the route is hit
  customerController.fetchAllPartyNames(req, res);
});

module.exports = router;
