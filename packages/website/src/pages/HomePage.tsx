import React from 'react';
import { PageHeader, Layout } from 'antd';
import { useHistory } from "react-router-dom";

export default function Home() {
  let history = useHistory();
  history.location.toString();

  return (
    <Layout>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Home"
        subTitle="Is where the heart is"
      />,
    </Layout>
  );
}