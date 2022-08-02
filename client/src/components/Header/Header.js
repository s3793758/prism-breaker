import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <h1>Prism-Breaker</h1>
      </Link>
    </header>
  );
};

export default Header;
