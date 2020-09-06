import React from 'react';
import { PageHeader, Layout } from 'antd';
import { useHistory } from "react-router-dom";

export default function OpeningsPage() {
  let history = useHistory();
  history.location.toString();

  return (
    <Layout>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Openings Explorer"
        subTitle="Improve your theoretical knowledge"
      />,
    </Layout>
  );
}