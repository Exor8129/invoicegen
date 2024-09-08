import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ticketpopup.css'; // Import the relevant CSS file

const TicketPopup = ({ onClose, products, assignee }) => {
  const [selectedParty, setSelectedParty] = useState('');
  const [parties, setParties] = useState([]);
  const [newProduct, setNewProduct] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [productList, setProductList] = useState(products);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedAssignee, setSelectedAssignee] = useState(assignee);
  const [productOptions, setProductOptions] = useState([]);
  const [ticketNum, setTicketNum] = useState(null); // State for ticket number
  const [highestTicketNumber, setHighestTicketNumber] = useState(null);

  useEffect(() => {
    // Fetch the highest ticket number when the component mounts
    axios.get('http://localhost:3001/getHighestTicketNumber')
      .then(response => {
        const highestNumber = response.data.highestTicketNumber;
      
        setTicketNum(highestNumber + 1); // Increment ticket number
      })
      .catch(error => {
        console.error('Error fetching highest ticket number:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch party names when component mounts
    axios
      .get('http://localhost:3001/getUser')
      .then((response) => {
        const partyNames = response.data.map((item) => item.PartyName);
        setParties(partyNames);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // Fetch items options from API
    axios
      .get('http://localhost:3001/getItemNames')
      .then((response) => {
        const productNames = response.data.map((item) => item.ITEM);
        setProductOptions(productNames);
      })
      .catch((error) => {
        console.error('Error fetching item:', error);
      });
  }, []);

  const handleAddProduct = () => {
    if (newProduct && newQuantity) {
      const productExists = productList.some((product) => product.productName === newProduct);

      if (productExists) {
        setErrorMessage('This product is already in the list.');
        return;
      }

      setProductList([
        ...productList,
        {
          serialNo: productList.length + 1,
          productName: newProduct,
          quantity: parseInt(newQuantity, 10),
        },
      ]);
      setNewProduct('');
      setNewQuantity('');
      setErrorMessage('');
    } else {
      setErrorMessage('Please provide both product and quantity.');
    }
  };

  const handlePartyChange = (e) => {
    setSelectedParty(e.target.value);
  };

  const handleProductChange = (e) => {
    setNewProduct(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setNewQuantity(e.target.value);
  };

  const handleAssigneeChange = (e) => {
    setSelectedAssignee(e.target.value);
  };

  const handleRemoveProduct = (serialNo) => {
    setProductList(productList.filter((product) => product.serialNo !== serialNo));
  };

  const handleCreateNew = () => {
    if (!selectedParty || !productList.length || !selectedAssignee) {
      setErrorMessage('Please complete all fields.');
      return;
    }

    const ticketData = {
      partyName: selectedParty,
      products: productList,
      assignee: selectedAssignee,
      ticketNumber: ticketNum, // Include the ticket number
      ticketStatus: 'New', // Default status
    };

    console.log('Sending data to server:', ticketData);

    axios
      .post('http://localhost:3001/ticketData', ticketData)
      .then((response) => {
        console.log('Ticket created successfully:', response.data);
        setErrorMessage(''); // Clear any previous errors
        alert(`Ticket created successfully! Ticket Number: ${response.data.ticketNum}`);
        onClose(); // Close the popup after successful creation
      })
      .catch((error) => {
        console.error('Error creating ticket:', error.response ? error.response.data.message : error.message);
        setErrorMessage('Error creating ticket. Please try again.');
      });
  };

  return (
    <div className="ticket-popup">
      <div className="ticket-popup-content">
        <div className='headcontainer'>
          <h4 className="popup-heading">Ticket Details</h4>
          <div className='ticketnum'>
            <h>Ticket #{ticketNum || 'Pending'}</h> {/* Display the ticket number */}
          </div>
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="partySelect">
            Party
          </label>
          <select className="form-select" id="partySelect" value={selectedParty} onChange={handlePartyChange}>
            <option value="">Select a Party</option>
            {parties.map((party) => (
              <option key={party} value={party}>
                {party}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="productSelect">
            Product Name
          </label>
          <select className="form-select" id="productSelect" value={newProduct} onChange={handleProductChange}>
            <option value="">Select a product</option>
            {productOptions.map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="quantityInput">
            Quantity
          </label>
          <input type="number" className="form-control" id="quantityInput" value={newQuantity} onChange={handleQuantityChange} />
          <button type="button" className="btn btn-primary ms-2" onClick={handleAddProduct}>
            +
          </button>
        </div>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <h5>Products:</h5>
        <ul className="product-list">
          {productList.map((product) => (
            <li key={product.serialNo} onMouseEnter={() => setHoveredItem(product.serialNo)} onMouseLeave={() => setHoveredItem(null)}>
              <strong>
                #{product.serialNo} {product.productName}:
              </strong>{' '}
              {product.quantity} pcs
              {hoveredItem === product.serialNo && (
                <button type="button" className="btn btn-danger btn-sm ms-2 remove-btn" onClick={() => handleRemoveProduct(product.serialNo)}>
                  -
                </button>
              )}
            </li>
          ))}
        </ul>

        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="assigneeSelect">
            Assignee
          </label>
          <select className="form-select" id="assigneeSelect" value={selectedAssignee} onChange={handleAssigneeChange}>
            <option value="">Choose...</option>
            <option value="John Doe">John Doe</option>
            <option value="Jane Smith">Jane Smith</option>
            <option value="Mike Johnson">Mike Johnson</option>
          </select>
        </div>

        <div className="button-group">
          <button type="button" className="btn btn-success" onClick={handleCreateNew}>
            Create New
          </button>
          <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketPopup;
