import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';


const CustomDatePicker = ({ selectedDate, onDateChange, ...props }) => {
  return (
    <div className="date-picker-container">
      <DatePicker
        selected={selectedDate}
        onChange={date => onDateChange(date)}
        dateFormat="MMMM d, yyyy"
        className="form-control"
        {...props}
      />
    </div>
  );
};

export default CustomDatePicker;
