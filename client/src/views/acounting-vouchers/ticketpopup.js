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

  useEffect(() => {
    // Fetch party names when component mounts
    axios
      .get('http://localhost:3001/getUser')
      .then((response) => {
        // Extract PartyName from each object in the array
        const partyNames = response.data.map((item) => item.PartyName);

        setParties(partyNames); // Set data to parties state
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // Fetch items options from API
    axios
      .get('http://localhost:3001/getItemNames')
      .then((response) => {
        const productNames = response.data.map((item) => item.ITEM);
        // console.log('Fetched transporter options:', productNames);
        setProductOptions(productNames); // Set data to productOptions state
      })
      .catch((error) => {
        console.error('Error fetching item:', error);
      });
  }, []);

  const handleAddProduct = () => {
    if (newProduct && newQuantity) {
      // Check if product already exists
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
    // Implement your logic for the "Create New" button
    console.log('Create New button clicked');
  };

  return (
    <div className="ticket-popup">
      <div className="ticket-popup-content">
        <h4 className="popup-heading">Ticket Details</h4>

        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="partySelect">
            Party
          </label>
          <select className="form-select" id="partySelect" value={selectedParty} onChange={handlePartyChange}>
            <option value="">Choose...</option>
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
            <option value="">Choose...</option>
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
            {/* Add more assignee options here */}
            <option value="John Doe">John Doe</option>
            <option value="Jane Smith">Jane Smith</option>
            <option value="Mike Johnson">Mike Johnson</option>
            {/* Add more assignees as needed */}
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
