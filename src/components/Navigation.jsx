import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="nav">
      <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end>
        Home
      </NavLink>
      <NavLink to="/catalog" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Catalog
      </NavLink>
      <NavLink to="/cart" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Cart
      </NavLink>
    </nav>
  );
}

export default Navigation;
