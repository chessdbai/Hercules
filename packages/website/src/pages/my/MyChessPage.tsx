import React from 'react';
import {
  PageHeader,
  Layout
} from 'antd';
import { useHistory, Route } from "react-router-dom";
import MyChessSideMenu from './MyChessSideMenu';
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import MyGamesPage from './MyGamesPage';
import MyRepertoirePage from './MyRepertoirePage';
import MyStatsPage from './MyStatsPage';
import MyTrainingRegimenPage from './MyTrainingRegimenPage';
const { Header, Content, Footer, Sider } = Layout;

export default function MyChessPage() {

  let history = useHistory();
  history.location.toString();

  return (
    <Layout style={{width: '100%', height: '100%'}}>
      <Router>
        <Sider className="site-layout-background" width={200}>
          <MyChessSideMenu />
        </Sider>
        <Switch>
          <Route path={"/user/chess/games"} render={() => <MyGamesPage />} />
          <Route path={"/user/chess/repertoire"} render={() => <MyRepertoirePage />} />
          <Route path={"/user/chess/regimen"} render={() => <MyTrainingRegimenPage />} />
          <Route path={"/user/chess/stats"} render={() => <MyStatsPage />} />
        </Switch>
      </Router>
    </Layout>
  );
}