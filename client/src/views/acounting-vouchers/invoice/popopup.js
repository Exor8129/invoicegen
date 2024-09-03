import React from 'react';
import './popopup.css'; // Ensure this CSS file is imported

const PPopup = ({ onClose, poNumber, poDate, onPOChange }) => {
  return (
    <div className='po-popup'>
      <div className='po-popup-content'>
        <label>
          PO Number:
          <input 
            type="text" 
            name="poNumber" 
            value={poNumber} 
            onChange={onPOChange} 
          />
        </label>
        <label>
          PO Date:
          <input 
            type="text" 
            name="poDate" 
            value={poDate} 
            onChange={onPOChange} 
          />
        </label>
        <button type="button" onClick={onClose}>Close</button> {/* Added type="button" */}
      </div>
    </div>
  );
};

export default PPopup;
