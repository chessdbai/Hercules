import React from 'react';
import { PageHeader, Layout } from 'antd';
import { useHistory } from "react-router-dom";

export default function Home() {
  let history = useHistory();
  history.location.toString();

  return (
    <Layout style={{width: '100%', height: '100%'}}>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Home"
        subTitle="Is where the heart is"
      />,
    </Layout>
  );
}