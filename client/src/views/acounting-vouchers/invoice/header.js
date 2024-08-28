// src/components/Temp.js
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import PartySelect from './PartySelect';
import './header.css';

const Temp = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedParty, setSelectedParty] = useState('');
  const [partyDetails, setPartyDetails] = useState(null);
  const popupRef = useRef(null);
  const partySelectRef = useRef(null);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const fetchPartyDetails = (partyName) => {
    console.log("Selected Party:", partyName);
  
    axios.get(`http://localhost:3001/getUserDetails?name=${partyName}`)
      .then((response) => {
        // Response data should be an object representing the party details
        const Details = response.data;
        console.log("Party Details:", Details); // Log all details
        console.log("Party Name from details:", Details.STATECODE); // Log the party name from details
  
        // Update state or perform other actions with the party details
        setPartyDetails(Details);
      })
      .catch((err) => console.log("Error fetching party details:", err));
  };
  
  const handlePartySelect = (value) => {
    setSelectedParty(value);
    fetchPartyDetails(value); // Fetch details for the selected party
    closePopup();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
    };

    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      if (partySelectRef.current) {
        partySelectRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupOpen]);

 

  return (
    <div className='containerInvoice'>
      <div className='section1'>
        <div className='partyNamehead' onClick={openPopup}>
          <strong>Party Name</strong>
          <h className="partyName">{selectedParty || 'Select a party'}</h>
        </div>
        <div className='partyAddresshead'>
          <strong>Billing Address</strong>
          <h className="partyAddress">{partyDetails?.PartyAddress || 'N/A'}</h>
          <div className='phone'>
            <strong>Ph:</strong>
            <h>{partyDetails?.PhoneNumber || 'N/A'}</h>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content" ref={popupRef}>
            <PartySelect
              ref={partySelectRef}
              onSelect={handlePartySelect}
            />
          </div>
        </div>
      )}

      <div className='section2'>
        <div className='gst'>
          <strong>GSTIN</strong>
          <h className="gstno">{partyDetails?.GSTIN || 'N/A'}</h>
        </div>
        <div className='dlno'>
          <strong>DL No</strong>
          <h className="dl">{partyDetails?.DLNO || 'N/A'}</h>
        </div>
        <div className='ship'>
          <strong>Shipping Address</strong>
          <h className="shipadd">{partyDetails?.PartyAddress || 'N/A'}</h>
        </div>
      </div>

      <div className='section3'>
        <div className='invcNum'>
          <div className='invoiceNumber'>
            <strong>Invoice No.</strong>
            <h className="txttoppad">2463/24-25</h>
          </div>
          <div className='invoiceDate'>
            <strong>Date</strong>
            <h className="txttoppad">14/08/2024</h>
          </div>
        </div>

        <div className='poNum'>
          <div className='poNumber'>
            <strong>P. Order No.</strong>
            <h className="txttoppad">PO-78910</h>
          </div>
          <div className='poDate'>
            <strong>PO Date</strong>
            <h className="txttoppad">14/08/2024</h>
          </div>
        </div>

        <div className='state'>
          <div className='stateName'>
            <strong>State</strong>
            <h className="statename">{partyDetails?.STATE || 'N/A'}</h>
          </div>
          <div className='stateCode'>
            <strong>Code</strong>
            <h className="code">{partyDetails?.STATECODE || 'N/A'}</h>
          </div>
        </div>

        <div className='trans'>
          <strong>Transport</strong>
          <h className="courier">Speed and Safe</h>
        </div>
      </div>
    </div>
  );
};

export default Temp;
