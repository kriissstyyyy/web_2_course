import React from 'react';
import './Select.css';

function Select({ label, options, value, onChange }) {
  return (
    <div className="select-wrap">
      {label && <label className="select-label">{label}</label>}
      <select
        className="select"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
