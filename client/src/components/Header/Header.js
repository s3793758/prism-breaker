import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'antd';
import './header.css';
import Navbar from '../Nav/Navbar';
import Search from '../Search/Search';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch((show) => !show);
  };

  return (
    <header className="header">
      <Link to="/">
        <h1>
          {/* Prism-Breaker */}
          <Image width={200} src="../assets/img/logo.jpg" />
        </h1>
      </Link>
      <Navbar showSearch={showSearch} toggleSearch={toggleSearch} />
      {showSearch && <Search toggleSearch={toggleSearch} />}
    </header>
  );
};

export default Header;
