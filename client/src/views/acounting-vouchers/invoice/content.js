import React, { useState, useRef, useEffect } from 'react';
import SelectItem from './selectItem';
import './content.css';

const ItemTable = () => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const invoiceData = {
    items: [
      {
        description: "Product 1",
        hsnSac: "1234",
        tax: "18%",
        batchNo: "B123",
        expiry: "2025-12",
        qty: "10",
        rate: "100",
        discount: "5%",
        amount: "950",
        cgst: "85.5",
        sgst: "85.5",
      },
      {
        description: "Ventilator Circuit Plain Adult Proximal Line MSI",
        hsnSac: "56782322",
        tax: "18%",
        batchNo: "B124",
        expiry: "2025-11",
        qty: "5",
        rate: "200",
        discount: "10%",
        amount: "900",
        cgst: "81",
        sgst: "81",
      },
    ],
  };

  const handleCellClick = (index) => {
    if (index === 0) { // Example: Show popup for the first cell of the first row
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        console.log('Click outside detected'); // Log only when clicking outside
        handleClosePopup();
      }
    };

    if (showPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopup]);

  return (
    <div className="itemTableheader">
      <div className="tableHead">
        <table>
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Item Description</th>
              <th>HSN Code</th>
              <th>Tax</th>
              <th>Batch No</th>
              <th>Expiry</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Disc</th>
              <th>CGST</th>
              <th>SGST</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody className="item-table-body">
            {invoiceData.items.map((item, rowIndex) => (
              <tr key={rowIndex}>
                <td>{rowIndex + 1}</td>
                <td onClick={() => handleCellClick(rowIndex)}>{item.description}</td>
                <td>{item.hsnSac}</td>
                <td>{item.tax}</td>
                <td>{item.batchNo}</td>
                <td>{item.expiry}</td>
                <td>{item.qty}</td>
                <td>{item.rate}</td>
                <td>{item.discount}</td>
                <td>{item.cgst}</td>
                <td>{item.sgst}</td>
                <td>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content" ref={popupRef}>
            <SelectItem onClose={handleClosePopup} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemTable;
