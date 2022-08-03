import React, { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import './appdrawer.css';

const style = {
  background: '#000',
  width: '200px',
};
const AppDrawer = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <div className="drawer">
      <MenuOutlined className="hamburger" onClick={showDrawer} />
      <Drawer
        placement="left"
        onClose={onClose}
        visible={visible}
        drawerStyle={style}
      >
        <div>
          <h2 className="menu-headings">Search Game</h2>
          <ul className="menu-list">
            <li className="menu-list-item">Online</li>
            <li className="menu-list-item">In Person</li>
          </ul>
          <hr />
          <h2 className="menu-headings">Host Game</h2>
          <ul className="menu-list">
            <li className="menu-list-item">Online</li>
            <li className="menu-list-item">In Person</li>
          </ul>
          <hr />
          <h2 className="menu-headings">Blogs</h2>
          <ul className="menu-list">
            <li className="menu-list-item">Your Blogs</li>
            <li className="menu-list-item">Favorite</li>
          </ul>
          <hr />
          <h2 className="menu-headings">Groups</h2>
          <ul className="menu-list">
            <li className="menu-list-item">Create Groups</li>
          </ul>
          <hr />
          <h2 className="menu-headings">Events</h2>
          <ul className="menu-list">
            <li className="menu-list-item">Create Events</li>
          </ul>
        </div>
      </Drawer>
    </div>
  );
};

export default AppDrawer;
