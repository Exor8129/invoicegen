import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';

const CustomDatePicker = ({ selectedDate, onDateChange }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={date => onDateChange(date)}
      dateFormat="dd-MM-yyyy"
      className="date-picker-input"
      popperPlacement="bottom-start" // Ensure the popper (calendar) appears below the input
    />
  );
};

export default CustomDatePicker;
