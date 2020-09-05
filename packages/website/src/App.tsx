import React, { FC, useState } from 'react';
import { Layout, Breadcrumb, Menu } from 'antd';
import AppSideMenu from './AppSideMenu';
import AppTopMenu from './AppTopMenu';
import ContentRouter from './ContentRouter';
import {
  BrowserRouter as Router
} from "react-router-dom";

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
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{ height: '100%', width: '100%' }}>
            <Sider className="site-layout-background" width={200}>
              <AppSideMenu />
            </Sider>
            <ContentRouter />
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>ChessDB.ai ©2020</Footer>
      </Router>
    </Layout>
  )

}

export default App;