import React, { useState, useEffect, forwardRef } from 'react';
import Select from 'react-select';
import axios from 'axios';
import './SelectItem.css'; // Ensure this CSS file exists and is properly linked

const customStyles = {
  control: (provided) => ({
    ...provided,
    paddingRight: '2.5rem', // Add padding to make space for the icon
  }),
};

const SelectItem = forwardRef(({ onSelect, onClose }, ref) => {
  const [options, setOptions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showSearch, setShowSearch] = useState(true);

  useEffect(() => {
    // Fetch item names from API
    axios
      .get('http://localhost:3001/getItemNames')
      .then((response) => {
        const formattedOptions = response.data.map((item) => ({
          value: item.ITEM,
          label: item.ITEM,
        }));
        setOptions(formattedOptions);
      })
      .catch((error) => {
        console.error('Error fetching item names:', error);
      });
  }, []);

  const handleIconClick = () => {
    setShowForm(true);
    setShowSearch(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
    setShowForm(false);
    setShowSearch(true);
  };

  // Ensure `onSelect` is defined and is a function
  const handleChange = (option) => {
    if (typeof onSelect === 'function') {
      onSelect(option ? option.value : '');
    } else {
      console.error('onSelect is not a function');
    }
  };

  return (
    <div className="select-container">
      {showSearch && (
        <>
          <Select
            className="search-box"
            ref={ref}
            options={options}
            onChange={handleChange} // Use handleChange here
            placeholder="Search for an item"
            styles={customStyles}
          />
          <div className="icon-container" onClick={handleIconClick}>
            <span className="material-symbols-outlined">place_item</span>
          </div>
        </>
      )}
      {showForm && (
        <div className="form-popup">
          <form className="row g-3" onSubmit={handleFormSubmit}>
            {/* Your form fields */}
          </form>
        </div>
      )}
      <button type='button' onClick={onClose} className="btn btn-secondary">Close</button>
    </div>
  );
});

export default SelectItem;
