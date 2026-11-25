import React from 'react';
import Navigation from './Navigation';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span className="logo-text">SkyFleet</span>
        </div>
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
