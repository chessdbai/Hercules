import React from 'react';
import { PageHeader, Layout } from 'antd';
import { useHistory } from "react-router-dom";
import { GamesTable } from '../../components'

export default function MyGamesPage() {
  let history = useHistory();
  history.location.toString();

  return (
    <Layout>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Games"
        subTitle="Organize your Chess Masterpieces"
      />
        <GamesTable />
    </Layout>
  );
}