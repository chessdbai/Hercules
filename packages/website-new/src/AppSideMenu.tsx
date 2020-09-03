import React from 'react';
import { Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";

function AppSideMenu() {
  let history = useHistory();

  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      <Menu.Item key="1" icon={<UserOutlined />} onClick={(e) => history.push('/home')}>
        Home
      </Menu.Item>
      <Menu.Item key="2" icon={<VideoCameraOutlined />} onClick={(e) => history.push('/about')}>
        About
      </Menu.Item>
      <Menu.Item key="3" icon={<UploadOutlined />} onClick={(e) => history.push('/account')}>
        Account
      </Menu.Item>
    </Menu>
  );
}

export default AppSideMenu;