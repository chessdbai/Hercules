import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  SearchOutlined,
  FileSearchOutlined,
  SmileOutlined,
  UserOutlined,
  ExperimentOutlined
} from '@ant-design/icons';
import { useHistory } from "react-router-dom";

function AppTopMenu() {
  // Declare a new state variable, which we'll call "count"
  const [current, setCurrent] = useState("mail");
  let history = useHistory();

  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[current]}>
      <Menu.Item key="home" icon={<HomeOutlined />} style={{float: 'left'}} onClick={() => {
        setCurrent('home');
        history.push('/');
      }}>
        Home
      </Menu.Item>
      <Menu.Item key="database" icon={<SearchOutlined />} style={{float: 'left'}} onClick={() => {
        setCurrent('database');
        history.push('/database');
      }}>
        Database
      </Menu.Item>
      <Menu.Item key="analysis" icon={<ExperimentOutlined />} style={{float: 'left'}} onClick={() => {
        setCurrent('analysis');
        history.push('/analysis');
      }}>
        Analysis
      </Menu.Item>
      <Menu.Item key="mychess" icon={<SmileOutlined />} style={{float: 'left'}} onClick={() => {
        setCurrent('mychess');
        history.push('/user/chess');
      }}>
        My Chess
      </Menu.Item>
      <Menu.Item key="help" icon={<FileSearchOutlined />} style={{float: 'left'}} onClick={() => {
        setCurrent('help');
        history.push('/help');
      }}>
        Help
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