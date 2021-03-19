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
import { Auth } from 'aws-amplify';
import { useHistory } from "react-router-dom";

const getUserInfo = async () : Promise<any> => {
  const currentUserInfo = await Auth.currentUserInfo();
  console.log(currentUserInfo);
}

function AppTopMenu() {
  // Declare a new state variable, which we'll call "count"
  const [current, setCurrent] = useState("mail");
  const [user, setUser] = useState<any>(null as any);
  let history = useHistory();

  if (user === null) {
    getUserInfo().then(user => {
      console.log(user);
      setUser(user!);
    })
    .catch(() => console.log("Not signed in"));
  }

  const loginRegisterButton = (
    <Menu.Item key="userLoginRegister" icon={<UserOutlined />} style={{float: 'right'}} onClick={() => {
      setCurrent('userLoginRegister');
      history.push('/user/login');
    }}>
      Login/Register
    </Menu.Item>
  );
  const logoutButton = (
    <Menu.Item key="userLogout" icon={<UserOutlined />} style={{float: 'right'}} onClick={() => {
      setCurrent('userLogout');
      Auth.signOut();
      history.push('/user/login');
    }}>
      Logout
    </Menu.Item>
  )

  const profileElement = user === null ? loginRegisterButton : logoutButton;


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
      {profileElement}
    </Menu>
  );
}

export default AppTopMenu;