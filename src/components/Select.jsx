import React from 'react';
import './Select.css';

function Select({ label, options, value }) {
  return (
    <div className="select-wrap">
      {label && <label className="select-label">{label}</label>}
      <select className="select" defaultValue={value}>
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
