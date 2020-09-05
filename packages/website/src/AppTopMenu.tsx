import React, { useState } from 'react';
import { Menu } from 'antd';
import { SearchOutlined, FileSearchOutlined, CodepenCircleOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";

function AppTopMenu() {
  // Declare a new state variable, which we'll call "count"
  const [current, setCurrent] = useState("mail");
  let history = useHistory();

  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[current]}>
      <Menu.Item key="mail" icon={<SearchOutlined />} style={{float: 'left'}} onClick={() => {
        setCurrent('search');
        history.push('/search');
      }}>
        Search
      </Menu.Item>
      <Menu.Item key="guide" icon={<FileSearchOutlined />} style={{float: 'left'}} onClick={() => {
        setCurrent('guide');
        history.push('/guide');
      }}>
        Guide
      </Menu.Item>
      <Menu.Item key="develop" icon={<CodepenCircleOutlined />} style={{float: 'left'}} onClick={() => {
        setCurrent('develop');
        history.push('/develop');
      }}>
        Develop
      </Menu.Item>
      <Menu.Item key="userLoginRegister" icon={<UserOutlined />} style={{float: 'right'}} onClick={() => {
        setCurrent('userLoginRegister');
        history.push('/user/login');
      }}>
        Login/Register
      </Menu.Item>
    </Menu>
  );
}

export default AppTopMenu;