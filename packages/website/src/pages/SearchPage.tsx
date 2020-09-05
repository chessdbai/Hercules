import React from 'react';
import { PageHeader, Layout } from 'antd';
import { useHistory } from "react-router-dom";

export default function SearchPage() {
  let history = useHistory();
  history.location.toString();

  return (
    <Layout style={{width: '100%', height: '100%'}}>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="About Page"
        subTitle="What is ChessDB.ai?"
      />,
    </Layout>
  );
}