import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import * as pages from './pages';

export default function ContentRouter() {
  return (
      <div style={{width: '100%', height: '100%'}}>
        <Switch>
          <Route path="/user/chess">
            <pages.MyChessPage />
          </Route>
          <Route path="/user/login">
            <pages.LoginPage />
          </Route>
          <Route path="/user/register">
            <pages.RegisterPage />
          </Route>
          <Route path="/user/confirm">
            <pages.ConfirmPage />
          </Route>
          <Route path="/user/reset">
            <pages.ResetPasswordPage />
          </Route>
          <Route path="/help">
            <pages.HelpPage />
          </Route>
          <Route path="/database">
            <pages.DatabasePage />
          </Route>
          <Route path="/analysis">
            <pages.AnalysisPage />
          </Route>
          <Route path="/about">
            <pages.AboutPage />
          </Route>
          <Route path="/">
            <pages.HomePage />
          </Route>
        </Switch>
      </div>
  );
}