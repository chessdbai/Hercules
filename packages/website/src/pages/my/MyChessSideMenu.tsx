import React from 'react';
import { Menu } from 'antd';
import Icon, {
  SearchOutlined,
  GatewayOutlined,
  NumberOutlined,
  BookOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { ReactComponent as DumbbellIcon } from '../../img/dumbbell.svg';

function DatabaseSideMenu() {
  let history = useHistory();

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['1']}
      style={{ height: '100%' }}>
      <Menu.Item key="2" icon={<GatewayOutlined />} onClick={(e) => history.push('/user/chess/games')}>
        Games
      </Menu.Item>
      <Menu.Item key="3" icon={<BookOutlined />} onClick={(e) => history.push('/user/chess/repertoire')}>
        Repertoire
      </Menu.Item>
      <Menu.Item key="4" icon={<Icon component={DumbbellIcon} />} onClick={(e) => history.push('/user/chess/regimen')}>
        Training Regimen
      </Menu.Item>
      <Menu.Item key="5" icon={<NumberOutlined />} onClick={(e) => history.push('/user/chess/stats')}>
        Stats
      </Menu.Item>
    </Menu>
  );
}

export default DatabaseSideMenu;