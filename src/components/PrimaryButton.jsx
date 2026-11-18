import React from 'react';
import './PrimaryButton.css';

function PrimaryButton({ children, onClick }) {
  return (
    <button className="btn-primary" onClick={onClick} type="button">
      {children}
    </button>
  );
}

export default PrimaryButton;
