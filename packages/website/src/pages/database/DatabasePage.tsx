import React from 'react';
import {
  PageHeader,
  Layout
} from 'antd';
import { useHistory, Route } from "react-router-dom";
import DatabaseSideMenu from './DatabaseSideMenu';
import {
  HashRouter as Router,
  Switch
} from "react-router-dom";
import SearchPage from './SearchPage';
import GamesPage from './GamesExplorer';
import PlayersPage from './PlayersPage';
import OpeningsPage from './OpeningsPage';
import TournamentsPage from './TournamentsPage';
const { Header, Content, Footer, Sider } = Layout;

export default function DatabasePage() {

  let history = useHistory();
  history.location.toString();

  return (
    <Layout style={{width: '100%', height: '100%'}}>
      <Router>
        <Sider className="site-layout-background" width={200}>
          <DatabaseSideMenu />
        </Sider>
        <Switch>
          <Route path={"/database/search"} render={() => <SearchPage />} />
          <Route path={"/database/games"} render={() => <GamesPage />} />
          <Route path={"/database/players"} render={() => <PlayersPage />} />
          <Route path={"/database/openings"} render={() => <OpeningsPage />} />
          <Route path={"/database/tournaments"} render={() => <TournamentsPage />} />
        </Switch>
      </Router>
    </Layout>
  );
}