const mongoose = require('mongoose');

// Define the schema for a ticket
const ticketSchema = new mongoose.Schema({
  ticketNumber: { 
    type: Number, 
    required: true, 
    unique: true 
  },
  partyName: { 
    type: String, 
    required: true 
  },
  products: [
    {
      serialNo: { 
        type: Number, 
        required: true 
      },
      productName: { 
        type: String, 
        required: true 
      },
      quantity: { 
        type: Number, 
        required: true 
      }
    }
  ],
  assignee: { 
    type: String, 
    required: true 
  },
  ticketStatus: { 
    type: String, 
    required: true, 
    default: 'New' // Default status
    // Uncomment and adjust if you have predefined statuses
    // enum: ['New', 'In Progress', 'Completed', 'Closed']
  }
});

// Define a static method to get the next ticket number
ticketSchema.statics.getNextTicketNumber = async function() {
  try {
    const lastTicket = await this.findOne().sort('-ticketNumber').exec();
    return lastTicket ? lastTicket.ticketNumber + 1 : 1;
  } catch (error) {
    console.error('Error getting next ticket number:', error);
    throw error;
  }
};

// Create the Ticket model
const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
