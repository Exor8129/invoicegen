const mongoose = require('mongoose');

// Define the schema for products
const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  qty: { type: Number, required: true },
  rate: { type: Number, required: true } // Changed 'Rate' to 'rate'
});

// Define the schema for the sale entry
const saleEntrySchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true },
  partyName: { type: String, required: true },
  products: [productSchema] // Changed 'Products' to 'products' for consistency
}, { collection: 'sale-entry' }); // Specify the collection name

// Create and export the model
const SaleEntry = mongoose.model('SaleEntry', saleEntrySchema);

module.exports = SaleEntry;
