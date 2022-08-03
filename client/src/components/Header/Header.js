import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import Navbar from '../Nav/Navbar';

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <h1>Prism-Breaker</h1>
      </Link>
      <Navbar />
    </header>
  );
};

export default Header;
