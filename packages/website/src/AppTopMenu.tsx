import React, { useState } from 'react';
import { Menu } from 'antd';
import { SearchOutlined, FileSearchOutlined, CodepenCircleOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
const { SubMenu } = Menu;

function AppTopMenu() {
  // Declare a new state variable, which we'll call "count"
  const [current, setCurrent] = useState("mail");
  let history = useHistory();

  const handleClick = (e: any) => {

  };

  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
      <Menu.Item key="mail" icon={<SearchOutlined />} onClick={() => {
        setCurrent('mail');
        history.push('/mail');
      }}>
        Search
      </Menu.Item>
      <Menu.Item key="guide" icon={<FileSearchOutlined />} onClick={() => {
        setCurrent('guide');
        history.push('/guide');
      }}>
        Guide
      </Menu.Item>
      <Menu.Item key="develop" icon={<CodepenCircleOutlined />} onClick={() => {
        setCurrent('develop');
        history.push('/develop');
      }}>
        Develop
      </Menu.Item>
    </Menu>
  );
}

export default AppTopMenu;