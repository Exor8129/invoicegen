import React, { useState, forwardRef } from 'react';
import Select from 'react-select';
import './SelectItem.css'; // Ensure this CSS file exists and is properly linked

const customStyles = {
  control: (provided) => ({
    ...provided,
    paddingRight: '2.5rem', // Add padding to make space for the icon
  }),
};

const SelectItem = forwardRef(({ options, onSelect }, ref) => {
  const [showForm, setShowForm] = useState(false);
  const [showSearch, setShowSearch] = useState(true);

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

  return (
    <div className="select-container">
      {showSearch && (
        <>
          <Select
            className="search-box"
            ref={ref}
            options={options}
            onChange={(option) => onSelect(option ? option.value : '')}
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
            <div className="col-12">
              <label htmlFor="productName" className="form-label">Product Name</label>
              <input type="text" className="form-control" id="productName" />
            </div>
            <div className="col-12">
              <label htmlFor="hsnCode" className="form-label">HSN Code</label>
              <input type="text" className="form-control" id="hsnCode" />
            </div>
            <div className="col-12">
              <label htmlFor="taxRate" className="form-label">Tax Rate</label>
              <select id="taxRate" className="form-control">
                <option value="5%">5%</option>
                <option value="12%">12%</option>
                <option value="18%">18%</option>
                <option value="28%">28%</option>
              </select>
            </div>
            
            <div className="col-12">
              <label htmlFor="mrp" className="form-label">MRP</label>
              <input type="text" className="form-control" id="mrp" />
            </div>
            <div className="col-12">
              <label htmlFor="gdl" className="form-label">GDL (Godown Provided Location)</label>
              <input type="text" className="form-control" id="gdl" />
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

export default SelectItem;
