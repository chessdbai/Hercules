import React, { FC, useState } from 'react';
import { Layout, Breadcrumb, Menu } from 'antd';
import AppSideMenu from './pages/database/DatabaseSideMenu';
import AppTopMenu from './AppTopMenu';
import ContentRouter from './ContentRouter';
import {
  HashRouter as Router
} from "react-router-dom";
import "./config/auth-config";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const App: FC = () => {

  return (
    <Layout style={{height: '100%', width: '100%'}}>
      <Router>
        <Header className="header">
          <div className="logo" />
          <AppTopMenu />
        </Header>
        <Content style={{height: '100%'}}>
          <Layout className="site-layout-background" style={{ height: '100%', width: '100%' }}>
            <ContentRouter />
          </Layout>
        </Content>
      </Router>
    </Layout>
  )

}

export default App;