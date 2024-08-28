const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Customer = require("./models/customer");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://hijas:hijas123@cluster0.fdvdmzh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/test"
);

app.get("/getUser", (req, res) => {
  Customer.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get('/getUserDetails', async (req, res) => {
  const partyName = req.query.name;

  try {
    // Find one customer by PartyName
    const customer = await Customer.findOne({ PartyName: partyName }).exec();

    if (customer) {
      res.json(customer); // Return the found customer as JSON
    } else {
      res.status(404).send(`No party details found for: ${partyName}`);
    }
  } catch (err) {
    res.status(500).send('Error fetching party details');
  }
});

app.listen(3001, () => {
  console.log("Server is Running");
});
