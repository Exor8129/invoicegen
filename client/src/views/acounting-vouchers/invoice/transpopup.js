import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './transpopup.css'; // Ensure this CSS file is imported

// Inline SearchableDropdown Component
const SearchableDropdown = ({ options, onSelect }) => {
  const handleChange = (selectedOption) => {
    onSelect(selectedOption);
  };

  return (
    <Select
      options={options}
      onChange={handleChange}
      placeholder='Search...'
      isSearchable // Enables the search functionality
    />
  );
};

// Main Popup Component
const TPopup = ({ onClose, onTransporterSelect }) => {
  const [transporterOptions, setTransporterOptions] = useState([]);

  useEffect(() => {
    // Fetch transporter options from API
    axios.get('http://localhost:3001/getTransporterNames')
      .then(response => {
        console.log('Fetched transporter options:', response.data);

        // Format the options for react-select
        const formattedOptions = response.data.map(transporter => ({
          value: transporter.id, // Use _id or another unique identifier for the value
          label: transporter.transporterName
        }));

        setTransporterOptions(formattedOptions);
      })
      .catch(error => {
        console.error('Error fetching transporter options:', error);
      });
  }, []);

  return (
    <div className='trans-popup'>
      <div className='trans-popup-content'>
        <label>
          Transporter Name:
          <SearchableDropdown 
            options={transporterOptions} 
            onSelect={onTransporterSelect} 
          />
        </label>
        <button type="button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TPopup;
