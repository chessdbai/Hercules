import React, { FC, CSSProperties } from 'react';
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


const layoutStyle : CSSProperties = {
  width: '100%',
  height: '100%',
  minWidth: '100%',
  minHeight: '100%',
  overflow: 'hidden'
}


const App: FC = () => {

  return (
    <Layout style={layoutStyle}>
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