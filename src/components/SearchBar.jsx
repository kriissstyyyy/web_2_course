import React from 'react';
import PrimaryButton from './PrimaryButton';
import './SearchBar.css';

function SearchBar() {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search aircraft..."
      />
      <PrimaryButton>Search</PrimaryButton>
    </div>
  );
}

export default SearchBar;
