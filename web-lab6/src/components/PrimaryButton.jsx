import React from 'react';
import './PrimaryButton.css';

function PrimaryButton({ children }) {
  return (
    <button className="btn-primary">
      {children}
    </button>
  );
}

export default PrimaryButton;
