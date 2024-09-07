// ShippingPopup.js
import React from 'react';
import './shippopup.css'; // Import the corresponding CSS file

const ShippingPopup = ({ addresses, onClose, onAddressSelect }) => {
  return (
    <div className='shipp-popup'>
      <div className='shipp-popup-content'>
        <h4>Select a Shipping Address</h4>
        <div className='card-container'>
          {addresses.map((address, index) => (
            <div
              key={index}
              className='card'
              onClick={() => onAddressSelect(address)}
            >
              <div className='card-body'>
                <h5 className='card-title'>Address {index + 1}</h5>
                <p className='card-text'>{address}</p>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ShippingPopup;
