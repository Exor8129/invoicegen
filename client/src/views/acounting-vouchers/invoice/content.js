import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import SelectItem from './selectItem'; // Ensure the correct path
import FooterTable from './footer'; // Ensure the correct path
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

// Function to calculate taxes and amount
const calculateTaxes = (qty, rate, discount, cgstRate) => {
  const taxRate = cgstRate * 2;
  const amountBeforeDiscount = qty * rate;
  const discountAmount = (discount / 100) * amountBeforeDiscount;
  const amountAfterDiscount = amountBeforeDiscount - discountAmount;

  const cgst = (qty * rate * (taxRate / 200)).toFixed(2);
  const sgst = (qty * rate * (taxRate / 200)).toFixed(2);

  return { cgst, sgst, amount: amountAfterDiscount.toFixed(2) };
};

// Function to create taxRateToHSNMapping
const createTaxRateToHSNMapping = (items) => {
  const taxRateToHSNMapping = {};

  if (Array.isArray(items)) {
    items.forEach(item => {
      const { tax, hsnSac, amount } = item; // Extract the amount
      if (tax && hsnSac && amount) {
        const taxRate = tax.trim(); // Example: "12%"

        // Initialize if it doesn't exist
        if (!taxRateToHSNMapping[taxRate]) {
          taxRateToHSNMapping[taxRate] = {
            hsnCodes: [],
            totalAmounts: 0,
          };
        }

        // Add HSN codes and aggregate amounts
        taxRateToHSNMapping[taxRate].hsnCodes.push(hsnSac);
        taxRateToHSNMapping[taxRate].totalAmounts += parseFloat(amount) || 0;
      }
    });

    // Convert HSN codes array to a comma-separated string and include total amount
    Object.entries(taxRateToHSNMapping).forEach(([taxRate, data]) => {
      taxRateToHSNMapping[taxRate] = {
        hsnCodes: data.hsnCodes.join(', '),
        totalAmounts: data.totalAmounts.toFixed(2), // Format total amount to 2 decimal places
      };
    });
  }

  return taxRateToHSNMapping;
};



// Function to check for duplicate items
const isDuplicateItem = (items, newItem) => {
  return items.some((item) => item.description === newItem.description);
};

const ItemTable = () => {
  const [invoiceData, setInvoiceData] = useState({ items: [] });
  const [showPopup, setShowPopup] = useState(false);
  const [popupRef, setPopupRef] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null); // State for selected row

  // Function to open the popup
  const handleCellClick = () => setShowPopup(true);

  // Function to close the popup
  const handleClosePopup = () => setShowPopup(false);

  // Function to handle item selection from the popup
  const handleSelect = async (item) => {
    const itemDetails = await fetchItemDetails(item);
    if (itemDetails) {
      const newItem = {
        description: itemDetails.ITEM,
        hsnSac: itemDetails.HSN_CODE,
        tax: `${itemDetails.TAX_RATE}%`,
        batchNo: itemDetails.GDL,
        expiry: '',
        mrp: itemDetails.MRP,
        qty: '',
        rate: '',
        discount: '',
        amount: '',
        cgst: '',
        sgst: '',
        cgstRate: itemDetails.TAX_RATE / 2 || 0, // Default to 0 if not available
        sgstRate: itemDetails.TAX_RATE / 2 || 0, // Default to 0 if not available
      };

      if (!isDuplicateItem(invoiceData.items, newItem)) {
        setInvoiceData((prevData) => ({
          items: [...prevData.items, newItem],
        }));
      } else {
        alert('This item is already in the list.');
      }
    }
  };

  // Function to handle input changes
  const handleInputChange = (e, index, field) => {
    const { value } = e.target;
    setInvoiceData((prevData) => {
      const updatedItems = [...prevData.items];
      updatedItems[index] = { ...updatedItems[index], [field]: value };

      // Extract values from updated item
      const { qty, rate, discount, cgstRate } = updatedItems[index];

      // Perform calculation
      const { cgst, sgst, amount } = calculateTaxes(Number(qty), Number(rate), Number(discount), Number(cgstRate));

      // Update the item with calculated values
      updatedItems[index] = { ...updatedItems[index], cgst, sgst, amount };

      return { ...prevData, items: updatedItems };
    });
  };

  // Function to handle row click
  const handleRowClick = (index) => {
    // If the clicked row is already selected, deselect it
    if (selectedRowIndex === index) {
      setSelectedRowIndex(null);
    } else {
      // Otherwise, select the clicked row
      setSelectedRowIndex(index);
    }
  };

  // Function to delete an item
  const handleDelete = () => {
    setInvoiceData((prevData) => {
      const updatedItems = prevData.items.filter((_, index) => index !== selectedRowIndex);
      return { ...prevData, items: updatedItems };
    });
    setSelectedRowIndex(null); // Clear the selection after deletion
  };

  // Function to calculate totals
  const calculateTotals = () => {
    return invoiceData.items.reduce(
      (totals, item) => {
        const amount = parseFloat(item.amount) || 0;
        const cgst = parseFloat(item.cgst) || 0;
        const sgst = parseFloat(item.sgst) || 0;

        return {
          totalAmount: totals.totalAmount + amount,
          totalCGST: totals.totalCGST + cgst,
          totalSGST: totals.totalSGST + sgst,
        };
      },
      { totalAmount: 0, totalCGST: 0, totalSGST: 0 }
    );
  };

  // Handle click outside of popup to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef && !popupRef.contains(event.target)) {
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
  
    

   

  const totals = calculateTotals(); // Get totals for use in FooterTable
  const taxRateToHSNMapping = createTaxRateToHSNMapping(invoiceData.items); // Create mapping
  return (
    <div className="itemTableheader">
      <div className="tableHead">
        <table>
          <thead>
            <tr>
              <th>Sl No</th>
              <th className="item-column" onClick={handleCellClick} style={{ cursor: 'pointer', textAlign: 'center' }}>
                Item Description
              </th>
              <th>HSN Code</th>
              <th>Tax</th>
              <th>MRP</th>
              <th className="qty-column">Qty</th>
              <th className="rate-column">Rate</th>
              <th>Disc</th>
              <th>Taxable Amount</th>
              <th>CGST</th>
              <th>SGST</th>
            </tr>
          </thead>
          <tbody className="item-table-body">
            {invoiceData.items.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => handleRowClick(rowIndex)} // Set row click handler
                className={selectedRowIndex === rowIndex ? 'selected-row' : ''} // Highlight selected row
              >
                <td>{rowIndex + 1}</td>
                <td className="item-col">{item.description}</td>
                <td>{item.hsnSac}</td>
                <td>{item.tax}</td>
                <td>{item.mrp}</td>
                <td className="qty-column">
                  <input className="input-field" type="number" value={item.qty} onChange={(e) => handleInputChange(e, rowIndex, 'qty')} />
                </td>
                <td className="rate-column">
                  <input className="input-field-Rate" type="number" value={item.rate} onChange={(e) => handleInputChange(e, rowIndex, 'rate')} />
                </td>
                <td>
                  <input className="input-field-disc" type="number" value={item.discount} onChange={(e) => handleInputChange(e, rowIndex, 'discount')} />
                </td>
                <td>{item.amount}</td>
                <td>{item.cgst}</td>
                <td>{item.sgst}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedRowIndex !== null && (
          <button type="button" className="delete-icon" onClick={handleDelete}>
            🗑️ {/* Delete icon */}
          </button>
        )}
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content" ref={(ref) => setPopupRef(ref)}>
            <SelectItem onSelect={handleSelect} onClose={handleClosePopup} />
          </div>
        </div>
      )}

      <FooterTable totalAmount={totals.totalAmount} totalCGST={totals.totalCGST} totalSGST={totals.totalSGST} taxRateToHSNMapping={taxRateToHSNMapping} />
    </div>
  );
};

export default ItemTable;
