import React from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import './DateTimePicker.css'

const DateTimePicker = ({ value, onChange }) => {
    return (
        <Datetime
            value={value}
            onChange={onChange}
            dateFormat="DD/MM/YYYY"
            timeFormat="HH:mm"
            inputProps={{
                placeholder: "Select date & time",
                style: {
                    fontSize: '1rem',
                    color: '#fff',
                    backgroundColor: '#1f1f1f',
                    border: '1px solid #444',
                    borderRadius: '4px',
                    padding: '0.5rem'
                }
            }}
        />
    );
};

export default DateTimePicker;
