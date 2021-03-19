import React from 'react';
import { PageHeader, Layout } from 'antd';
import { useHistory } from "react-router-dom";

export default function TournamentsPage() {
  let history = useHistory();
  history.location.toString();

  return (
    <Layout>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Tournaments"
        subTitle="Where chess legends were born"
      />,
    </Layout>
  );
}