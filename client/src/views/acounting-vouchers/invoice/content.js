import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import SelectItem from './selectItem'; // Ensure the correct path
import './content.css';

// Function to fetch item details
const fetchItemDetails = async (itemName) => {
  try {
    const response = await axios.get(`http://localhost:3001/getItemDetails?name=${itemName}`);
    return response.data; // Return item details
  } catch (err) {
    console.error('Error fetching item details:', err);
    return null; // Return null if there's an error
  }
};

const ItemTable = () => {
  const [invoiceData, setInvoiceData] = useState({
    items: [], // Initialize as an empty array
  });
  const [showPopup, setShowPopup] = useState(false);
  const [popupRef, setPopupRef] = useState(null);

  // Function to open the popup
  const handleCellClick = () => {
    setShowPopup(true);
  };

  // Function to close the popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Function to handle item selection from the popup
  const handleSelect = async (item) => {
    const itemDetails = await fetchItemDetails(item);
    if (itemDetails) {
      setInvoiceData((prevData) => ({
        items: [
          ...prevData.items,
          {
            description: itemDetails.ITEM,
            hsnSac: itemDetails.HSN_CODE,
            tax: `${itemDetails.TAX_RATE}%`,
            batchNo: itemDetails.GDL,
            expiry: '', // You can modify this if needed
            mrp: itemDetails.MRP,
            qty: '',
            rate: '',
            discount: '',
            amount: '',
            cgst: '',
            sgst: '',
          },
        ],
      }));
    }
    // handleClosePopup();
  };

  // Function to handle input changes
  const handleInputChange = (e, index, field) => {
    const { value } = e.target;
    setInvoiceData((prevData) => {
      const updatedItems = [...prevData.items];
      updatedItems[index] = { ...updatedItems[index], [field]: value };
      return { ...prevData, items: updatedItems };
    });
  };

  // Handle click outside of popup to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef && !popupRef.contains(event.target)) {
        console.log('Click outside detected');
        handleClosePopup();
      }
    };

    if (showPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopup, popupRef]);

  return (
    <div className="itemTableheader">
      <div className="tableHead">
        <table>
          <thead>
            {/* <tr>
              <th colSpan="11" onClick={handleCellClick} style={{ cursor: 'pointer', textAlign: 'center' }}>
                Click here to add an item
              </th>
            </tr> */}
            <tr>
              <th>Sl No</th>
              <th onClick={handleCellClick} style={{ cursor: 'pointer', textAlign: 'center' }}>Item Description</th>
              <th>HSN Code</th>
              <th>Tax</th>
              <th>MRP</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Disc</th>
              <th>CGST</th>
              <th>SGST</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody className="item-table-body">
            {/* Actual Data Rows */}
            {invoiceData.items.map((item, rowIndex) => (
              <tr key={rowIndex}>
                <td>{rowIndex + 1}</td>
                <td>{item.description}</td>
                <td>{item.hsnSac}</td>
                <td>{item.tax}</td>
                <td>{item.mrp}</td>
                <td>
                  <input
                    className='input-field'
                    type="number"
                    value={item.qty}
                    onChange={(e) => handleInputChange(e, rowIndex, 'qty')}
                  />
                </td>
                <td>
                  <input
                    className='input-field-Rate'
                    type="number"
                    value={item.rate}
                    onChange={(e) => handleInputChange(e, rowIndex, 'rate')}
                  />
                </td>
                <td>
                  <input
                    className='input-field'
                    type="number"
                    value={item.discount}
                    onChange={(e) => handleInputChange(e, rowIndex, 'discount')}
                  />
                </td>
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
          <div className="popup-content" ref={(ref) => setPopupRef(ref)}>
            <SelectItem onSelect={handleSelect} onClose={handleClosePopup} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemTable;
