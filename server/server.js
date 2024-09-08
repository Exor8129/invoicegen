const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Customer = require("./models/customer");
const Transporter= require("./models/transporter");
const Item=require("./models/items");
const Ticket=require("./models/ticket")

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

app.get("/getTransporterNames",(req,res)=>{
  Transporter.find()
  .then((trans)=>res.json(trans))
  .catch((err)=>res.json(err));
})

app.get("/getItemNames",(req,res)=>{
  Item.find()
  .then((items)=>res.json(items))
  .catch((err)=>res.json(err));
})

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

app.get('/getHighestTicketNumber', async (req, res) => {
  try {
    const highestTicket = await Ticket.findOne().sort({ ticketNumber: -1 }).exec();
    const highestNumber = highestTicket ? highestTicket.ticketNumber : 0;
    console.log('Highest ticket number:', highestNumber);
    res.json({ highestTicketNumber: highestNumber });
  } catch (error) {
    console.error('Error fetching highest ticket number:', error);
    res.status(500).json({ message: 'Error fetching highest ticket number' });
  }
});

// API endpoint to fetch all tickets
app.get('/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.find().exec();
    res.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ message: 'Error fetching tickets' });
  }
});

// app.use(bodyParser.json());

app.post('/ticketData', async (req, res) => {
  try {
    const ticketData = req.body;

    // Get the next ticket number
    const nextTicketNumber = await Ticket.getNextTicketNumber();

    // Create a new Ticket instance with the ticket number
    const newTicket = new Ticket({
      ...ticketData,
      ticketNumber: nextTicketNumber,
      ticketStatus: 'New' // Default status
    });

    // Save the ticket to the database
    await newTicket.save();

    res.status(201).json({ 
      message: 'Ticket created successfully', 
      ticketNumber: nextTicketNumber 
    });
  } catch (error) {
    console.error('Error saving ticket:', error);
    res.status(500).json({ message: 'Error saving ticket' });
  }
});

app.post('/addCustomer', async (req, res) => {
  console.log('POST /addCustomer route hit');
  try {
    console.log('Request Body:', req.body); // Check the request body
    const customerData = req.body;
    const newCustomer = new Customer(customerData);
    await newCustomer.save();
    res.status(201).send('Customer data saved successfully');
  } catch (err) {
    console.error('Error:', err); // Log the error details
    res.status(500).send('Error saving customer data');
  }
});


app.listen(3001, () => {
  console.log("Server is Running");
});
