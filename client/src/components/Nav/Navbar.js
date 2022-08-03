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
} from '@ant-design/icons';
import './navbar.css';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const res = useContext(AuthContext);
  const { isLoggedIn, logoutUser } = useContext(AuthContext);
  console.log({ res });
  const navigate = useNavigate();
  let items = [];
  if (isLoggedIn) {
    items = [
      {
        label: 'Prism-Breaker',
        key: 'Prism-Breake',
        icon: <RadarChartOutlined />,
      }, // remember to pass the key prop
      { label: 'Home', key: 'home', icon: <HomeOutlined /> }, // which is required
      { label: 'Messages', key: 'message', icon: <MailOutlined /> }, // which is required
      { label: 'Profile', key: 'profile', icon: <ProfileOutlined /> }, // which is required

      { label: 'Profile', key: '{name}', icon: <SmileOutlined /> }, // which is required
      {
        label: 'Logout',
        key: 'logout',
        icon: <LogoutOutlined />,
      },
    ];
  } else {
    items = [
      { label: 'Home', key: 'home', icon: <HomeOutlined /> }, // which is required
      {
        label: 'Prism-Breaker',
        key: 'Prism-Breake',
        icon: <RadarChartOutlined />,
      }, // remember to pass the key prop
      { label: 'Messages', key: 'message', icon: <MailOutlined /> }, // which is required
      { label: 'Login', key: 'login', icon: <LoginOutlined /> }, // which is required
    ];
  }

  const handleClick = ({ item, key }) => {
    switch (key) {
      case 'home':
        navigate('/home');
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
        theme="grey"
        onClick={handleClick}
      />
    </>
  );
};

export default Navbar;
