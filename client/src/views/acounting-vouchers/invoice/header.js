

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PartySelect from './PartySelect';
import CustomDatePicker from '../../datepicker/datepicker'; // Import CustomDatePicker


import './header.css';
import PPopup from './popopup';
import TPopup from './transpopup';

const Temp = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedParty, setSelectedParty] = useState('');
  const [partyDetails, setPartyDetails] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const popupRef = useRef(null);
  const partySelectRef = useRef(null);
  const datePickerRef = useRef(null);
  const invoiceDateRef = useRef(null);
  const [isPOPopupOpen, setIsPOPopupOpen] = useState(false);
  const [poNumber, setPoNumber] = useState('');
  const [poDate, setPoDate] = useState('');
  const [transporter, setTransporter] = useState('');
  const [isTransPopupOpen, setIsTransPopupOpen] = useState(false);
  const [transporterOptions, setTransporterOptions] = useState([]);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const openPOPopup = () => setIsPOPopupOpen(true);
  const closePOPopup = () => setIsPOPopupOpen(false);

  const openTransPopup = () => setIsTransPopupOpen(true);
  const closeTransPopup = () => setIsTransPopupOpen(false);

  const fetchPartyDetails = (partyName) => {
    console.log("Selected Party:", partyName);
  
    axios.get(`http://localhost:3001/getUserDetails?name=${partyName}`)
      .then((response) => {
        const Details = response.data;
        console.log("Party Details:", Details);
        setPartyDetails(Details);
      })
      .catch((err) => console.log("Error fetching party details:", err));
  };
  
  const handlePartySelect = (value) => {
    setSelectedParty(value);
    fetchPartyDetails(value);
    closePopup();
  };

  const handleDateChange = (date) => {
    setInvoiceDate(date);
    setIsDatePickerOpen(false);
  };

  const handlePOChange = (e) => {
    const { name, value } = e.target;
    if (name === 'poNumber') {
      setPoNumber(value);
    } else if (name === 'poDate') {
      setPoDate(value);
    }
  };

  const handleTransporterChange = (selectedOption) => {
    setTransporter(selectedOption ? selectedOption.label : '');
    closeTransPopup();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
      if (datePickerRef.current && !datePickerRef.current.contains(event.target) && !invoiceDateRef.current.contains(event.target)) {
        setIsDatePickerOpen(false);
      }
    };
  
    if (isPopupOpen || isDatePickerOpen || isTransPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupOpen, isDatePickerOpen, isTransPopupOpen]); 
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
          <div 
            className='invoiceDate' 
            onClick={() => setIsDatePickerOpen(true)}
            ref={invoiceDateRef}
          >
            <strong>Date</strong>
            <h className="txttoppad">{invoiceDate.toLocaleDateString('en-GB')}</h>
          </div>

          {isDatePickerOpen && (
            <div className="date-picker-container" ref={datePickerRef}>
              <DatePicker
                selected={invoiceDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                inline
              />
            </div>
          )}
        </div>

        <div className='poNum'>
          <div className='poNumber' onClick={openPOPopup}>
            <strong>P. Order No.</strong>
            <h className="txttoppad">{poNumber || 'N/A'}</h> 
          </div>
          <div className='poDate'>
            <strong>PO Date</strong>
            <h className="txttoppad">{poDate || 'N/A'}</h>
          </div>
        </div>

        {isPOPopupOpen && (
          <PPopup
          onClose={closePOPopup}
          poNumber={poNumber}
          poDate={poDate}
          onPOChange={handlePOChange}
          ref={popupRef}
          />
        )}

          

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

        <div className='trans' onClick={openTransPopup}>
          <strong>Transport</strong>
          <h className="courier">{transporter || 'Select a transporter'}</h>
        </div>
        {isTransPopupOpen && (
          <TPopup
            onClose={closeTransPopup}
            // transporterOptions={transporterOptions}
            onTransporterSelect={handleTransporterChange} // Updated handler
            ref={popupRef} // Ensure TPopup component supports ref
          />
        )}

      </div>
    </div>
  );
};

export default Temp;
