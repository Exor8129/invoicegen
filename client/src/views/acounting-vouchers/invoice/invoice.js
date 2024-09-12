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
      <div className='logo-container'>
        <div className='logo'>
          <img src="/ExorLogo_PNG.png" alt="Exor Logo" className="App-logo" />
          <div className='app-address'>
            19/3053A, Bismi Complex, Ozhukkara,<br />
            Calicut Medical College PO,
            Kozhikode-673008
          </div>
        </div>
        <div className='tag'>
          <img src="/invoice_tag.png" alt="Invoice Tag" className="App-invoice-tag" />
          <div className='app-gst-dl'><p className="comp-gst">
          GST NO : 32AXCPV5409P1Z0<br />
          DL NO: KL-KKD-166278,<br />
          KL-KKD-166279</p>

          </div>
        </div>
      </div>
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
