import React, { FC } from 'react';
import { Layout } from 'antd';
import AppSideMenu from './AppSideMenu';
import AppTopMenu from './AppTopMenu';

import ContentRouter from './ContentRouter';
import {
  BrowserRouter as Router
} from "react-router-dom";
import './App.css';

const { Header, Content, Footer, Sider } = Layout;

const App: FC = () => (
  <Layout style={{width: '100%', height: '100%'}}>
    <Router>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <AppSideMenu />
      </Sider>
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
          <AppTopMenu />
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <ContentRouter />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Router>
  </Layout>
);

export default App;