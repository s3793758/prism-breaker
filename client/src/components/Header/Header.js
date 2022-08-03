import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import Navbar from '../Nav/Navbar';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch((show) => !show);
  };

  return (
    <header className="header">
      <Link to="/">
        <h1>Prism-Breaker</h1>
      </Link>
      <Navbar showSearch={showSearch} toggleSearch={toggleSearch} />
      {showSearch && <Search toggleSearch={toggleSearch} />}
    </header>
  );
};

export default Header;
