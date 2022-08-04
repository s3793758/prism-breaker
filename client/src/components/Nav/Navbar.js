import React, { useContext } from 'react';
import { Menu } from 'antd';
import {
  RadarChartOutlined,
  MailOutlined,
  HomeOutlined,
  LogoutOutlined,
  LoginOutlined,
  ProfileOutlined,
  SmileOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import './navbar.css';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ toggleSearch, showSearch }) => {
  const { isLoggedIn, logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  let items = [];
  if (isLoggedIn) {
    items = [
      {
        label: 'About Us',
        key: 'about-us',
        icon: <RadarChartOutlined />,
      },
      {
        label: 'Search',
        key: 'search',
        icon: <SearchOutlined />,
      },
      // remember to pass the key prop
      {
        label: 'Home',
        key: 'home',
        icon: <HomeOutlined />,
        id: 'prism-breaker',
      }, // which is required
      { label: 'Messages', key: 'message', icon: <MailOutlined /> }, // which is required
      { label: 'Profile', key: 'profile', icon: <SmileOutlined /> }, // which is required
      {
        label: 'Logout',
        key: 'logout',
        icon: <LogoutOutlined />,
      },
    ];
  } else {
    items = [
      // { label: 'Home', key: 'home', icon: <HomeOutlined /> }, // which is required
      {
        label: 'About Us',
        key: 'about-us',
        icon: <RadarChartOutlined />,
        id: 'prism-breaker',
      }, // remember to pass the key prop
      // { label: 'Messages', key: 'message', icon: <MailOutlined /> }, // which is required
      { label: 'Login', key: 'login', icon: <LoginOutlined /> }, // which is required
    ];
  }

  const handleClick = ({ item, key }) => {
    toggleSearch(false);
    switch (key) {
      case 'about-us':
        //  navigate('/home');
        break;
      case 'home':
        navigate('/home');
        break;
      case 'search':
        toggleSearch(true);
        break;
      case 'profile':
        navigate('/profile');
        break;
      case 'logout':
        logoutUser().then((response) => {
          if (response) {
            navigate('/login');
          }
        });
        break;
      default:
        navigate('/login');
    }
  };

  return (
    <>
      <Menu
        items={items}
        mode="horizontal"
        theme="dark"
        onClick={handleClick}
      />
    </>
  );
};

export default Navbar;
