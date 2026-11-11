import React from 'react';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="nav">
      <a href="/" className="nav-link active">Home</a>
      <a href="/catalog" className="nav-link">Catalog</a>
      <a href="/cart" className="nav-link">Cart</a>
    </nav>
  );
}

export default Navigation;
