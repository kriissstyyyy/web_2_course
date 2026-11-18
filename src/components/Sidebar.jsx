import React from 'react';
import Select from './Select';
import './Sidebar.css';

function Sidebar() {
  const typeOptions = [
    { value: 'all', label: 'All types' },
    { value: 'narrow-body', label: 'Narrow-body' },
    { value: 'wide-body', label: 'Wide-body' },
    { value: 'regional', label: 'Regional' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'passengers', label: 'Passengers' },
    { value: 'fuel', label: 'Fuel volume' }
  ];

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Filters</h2>
      <div className="sidebar-section">
        <Select label="Aircraft type" options={typeOptions} value="all" />
      </div>
      <div className="sidebar-section">
        <Select label="Sort by" options={sortOptions} value="name" />
      </div>
    </aside>
  );
}

export default Sidebar;
