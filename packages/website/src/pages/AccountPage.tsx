import React from 'react';
import { PageHeader, Layout } from 'antd';
import { useHistory } from "react-router-dom";

export default function Account() {
  let history = useHistory();
  history.location.toString();

  return (
    <Layout>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Account Information"
        subTitle="Who are you?"
      />,
    </Layout>
  );
}