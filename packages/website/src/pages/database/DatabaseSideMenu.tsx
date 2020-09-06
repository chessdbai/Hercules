import React from 'react';
import { Menu } from 'antd';
import {
  SearchOutlined,
  GatewayOutlined,
  TeamOutlined,
  BookOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { useHistory } from "react-router-dom";

function DatabaseSideMenu() {
  let history = useHistory();

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['1']}
      style={{ height: '100%' }}>
      <Menu.Item key="1" icon={<SearchOutlined />} onClick={(e) => history.push('/database')}>
        Search All
      </Menu.Item>
      <Menu.Item key="2" icon={<GatewayOutlined />} onClick={(e) => history.push('/database/games')}>
        Games
      </Menu.Item>
      <Menu.Item key="3" icon={<TeamOutlined />} onClick={(e) => history.push('/database/players')}>
        Players
      </Menu.Item>
      <Menu.Item key="4" icon={<BookOutlined />} onClick={(e) => history.push('/database/openings')}>
        Openings
      </Menu.Item>
      <Menu.Item key="5" icon={<CalendarOutlined />} onClick={(e) => history.push('/database/tournaments')}>
        Tournaments
      </Menu.Item>
    </Menu>
  );
}

export default DatabaseSideMenu;