import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import * as pages from './pages';

export default function ContentRouter() {
  return (
      <div>
        <Switch>
          <Route path="/user/login">
            <pages.LoginPage />
          </Route>
          <Route path="/user/register">
            <pages.RegisterPage />
          </Route>
          <Route path="/account">
            <pages.AccountPage />
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