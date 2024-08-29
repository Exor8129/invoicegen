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
  const [formData, setFormData] = useState({
    partyName: '',
    billingAddress: '',
    shippingAddress: '',
    gstin: '',
    dlno: '',
    stateName: '',
    stateCode: '',
    phoneNumber: '',
    partyType: ''
  });

  const handleIconClick = () => {
    setShowForm(true);
    setShowSearch(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const loadUsers = () => {
    axios.get('http://localhost:3001/getUser')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => console.log(err));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting the following data:', formData);
    try {
      const response = await fetch('http://localhost:3001/addCustomer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log('Response Status:', response.status);
      console.log('Response OK:', response.ok);

      if (response.ok) {
        alert('Customer data saved successfully!');
        setShowForm(false);
        setShowSearch(true);
        setFormData({
          partyName: '',
          billingAddress: '',
          shippingAddress: '',
          gstin: '',
          dlno: '',
          stateName: '',
          stateCode: '',
          phoneNumber: '',
          partyType: ''
        });
        // Optionally, reload the users list to include the new entry
        loadUsers();
      } else {
        alert('Failed to save customer data.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving customer data.');
    }
  };

 

  useEffect(() => {
    loadUsers();
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
              <input type="text" className="form-control" id="partyName" value={formData.partyName} onChange={handleInputChange} />
            </div>
            <div className="col-12">
              <label htmlFor="billingAddress" className="form-label">Billing Address</label>
              <input type="text" className="form-control" id="billingAddress" value={formData.billingAddress} onChange={handleInputChange} />
            </div>
            <div className="col-12">
              <label htmlFor="shippingAddress" className="form-label">Shipping Address (Optional)</label>
              <input type="text" className="form-control" id="shippingAddress" value={formData.shippingAddress} onChange={handleInputChange} />
            </div>
            <div className="col-md-6">
              <label htmlFor="gstin" className="form-label">GSTIN</label>
              <input type="text" className="form-control" id="gstin" value={formData.gstin} onChange={handleInputChange} />
            </div>
            <div className="col-md-6">
              <label htmlFor="dlno" className="form-label">DL NO</label>
              <input type="text" className="form-control" id="dlno" value={formData.dlno} onChange={handleInputChange} />
            </div>
            <div className="col-md-6">
              <label htmlFor="stateName" className="form-label">State Name</label>
              <input type="text" className="form-control" id="stateName" value={formData.stateName} onChange={handleInputChange} />
            </div>
            <div className="col-md-6">
              <label htmlFor="stateCode" className="form-label">State Code</label>
              <input type="text" className="form-control" id="stateCode" value={formData.stateCode} onChange={handleInputChange} />
            </div>
            <div className="col-md-6">
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <input type="text" className="form-control" id="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
            </div>
            <div className="col-md-6">
              <label htmlFor="partyType" className="form-label">Party Type (Optional)</label>
              <input type="text" className="form-control" id="partyType" value={formData.partyType} onChange={handleInputChange} />
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
