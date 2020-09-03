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