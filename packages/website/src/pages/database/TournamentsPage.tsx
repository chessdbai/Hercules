import React from 'react';
import { PageHeader, Layout } from 'antd';
import { useHistory } from "react-router-dom";

export default function SearchPage() {
  let history = useHistory();
  history.location.toString();

  return (
    <Layout>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Search"
        subTitle="Find what you're looking for"
      />,
    </Layout>
  );
}