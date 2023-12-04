import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Input = ({ value, onChange }) => {
    const [isValid, setIsValid] = useState(true);

    const handleChange = (e) => {
        let value = e.target.value;

        value = value.replace(/[^0-9:]/g, '');
        const [hours, minutes, seconds] = value.split(':').map(Number);
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;

        if (totalSeconds < 0) {
            setIsValid(false);
            return;
        }

        value = `${Math.floor(totalSeconds / 3600)}:${Math.floor((totalSeconds % 3600) / 60)}:${totalSeconds % 60}`;


        setIsValid(true);

        if (onChange) {
            onChange(value);
        }

        if (!/^([0-9]+:[0-5]?[0-9]:[0-5]?[0-9])?$/.test(value)) {
            setIsValid(false);
        }
    };

    return (
        <div className={`input-container ${isValid ? '' : 'invalid'}`}>
            <input
                type="text"
                value={value}
                onChange={handleChange}
                className={`input-box input ${isValid ? '' : 'invalid'}`}
            />
            {!isValid && <span className="error-message">Please enter a valid time.</span>}
        </div>
    );
};

Input.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};

export default Input;
