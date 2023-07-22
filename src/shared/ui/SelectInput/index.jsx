import React from 'react';

const SelectInput = ({ label, value, onChange, options }) => {
    return (
        <div>
            <label htmlFor={label}>{label}:</label>
            <select id={label} value={value} onChange={onChange}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectInput;
