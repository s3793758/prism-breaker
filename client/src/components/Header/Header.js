import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'antd';
import './header.css';
import Navbar from '../Nav/Navbar';
import Search from '../Search/Search';
import Logo from '../../assets/img/Logo.png';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = (show) => {
    setShowSearch(show);
  };

  return (
    <header className="header">
      <h1>
        {/* Prism-Breaker */}
        <img width={400} src={Logo} alt="Site Logo" />
      </h1>
      <Navbar showSearch={showSearch} toggleSearch={toggleSearch} />
      {showSearch && <Search toggleSearch={toggleSearch} />}
    </header>
  );
};

export default Header;
