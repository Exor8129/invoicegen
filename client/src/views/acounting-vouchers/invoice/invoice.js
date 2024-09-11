import React from 'react';
import Header from './header';
import './invoice.css'; // Import your CSS for styling
import ItemTable from './content';
import FooterTable from './footer';

const Invoice = () => {
  const printInvoice = () => {
    window.print(); // Trigger the print dialog directly
  };

  return (
    <div className="invoice-container">
      <Header />
      <ItemTable />
      
      <button 
        type="button" 
        onClick={printInvoice} 
        className="btn btn-primary no-print"
      >
        Print Invoice
      </button>
    </div>
  );
};

export default Invoice;
