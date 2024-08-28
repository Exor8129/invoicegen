// src/components/PartySelect.js
import React, { useState, forwardRef, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './PartySelect.css';

const customStyles = {
  control: (provided) => ({
    ...provided,
    paddingRight: '2.5rem',
  }),
};

const PartySelect = forwardRef(({ onSelect }, ref) => {
  const [showForm, setShowForm] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const [users, setUsers] = useState([]);

  const handleIconClick = () => {
    setShowForm(true);
    setShowSearch(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setShowForm(false);
    setShowSearch(true);
  };

  useEffect(() => {
    axios.get('http://localhost:3001/getUser')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const selectOptions = users.map(user => ({
    value: user.PartyName,
    label: user.PartyName
  }));

  return (
    <div className="select-container">
      {showSearch && (
        <>
          <Select
            className="search-box"
            ref={ref}
            options={selectOptions}
            onChange={(option) => onSelect(option ? option.value : '')}
            placeholder="Search for a party"
            styles={customStyles}
          />
          <div className="icon-container" onClick={handleIconClick}>
            <span className="material-symbols-outlined">person_add</span>
          </div>
        </>
      )}
     {showForm && (
        <div className="form-popup">
          <form className="row g-3" onSubmit={handleFormSubmit}>
            <div className="col-12">
              <label htmlFor="partyName" className="form-label">Party Name</label>
              <input type="text" className="form-control" id="partyName" />
            </div>
            <div className="col-12">
              <label htmlFor="billingAddress" className="form-label">Billing Address</label>
              <input type="text" className="form-control" id="billingAddress" />
            </div>
            <div className="col-12">
              <label htmlFor="shippingAddress" className="form-label">Shipping Address (Optional)</label>
              <input type="text" className="form-control" id="shippingAddress" />
            </div>
            <div className="col-md-6">
              <label htmlFor="gstin" className="form-label">GSTIN</label>
              <input type="text" className="form-control" id="gstin" />
            </div>
            <div className="col-md-6">
              <label htmlFor="dlno" className="form-label">DL NO</label>
              <input type="text" className="form-control" id="dlno" />
            </div>
            <div className="col-md-6">
              <label htmlFor="stateName" className="form-label">State Name</label>
              <input type="text" className="form-control" id="stateName" />
            </div>
            <div className="col-md-6">
              <label htmlFor="stateCode" className="form-label">State Code</label>
              <input type="text" className="form-control" id="stateCode" />
            </div>
            <div className="col-md-6">
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <input type="text" className="form-control" id="phoneNumber" />
            </div>
            <div className="col-md-6">
              <label htmlFor="partyType" className="form-label">Party Type (Optional)</label>
              <input type="text" className="form-control" id="partyType" />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
});

export default PartySelect;



