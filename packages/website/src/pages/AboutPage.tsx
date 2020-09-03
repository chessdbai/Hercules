import React from 'react';
import { PageHeader, Layout } from 'antd';
import { useHistory } from "react-router-dom";

export default function About() {
  let history = useHistory();
  history.location.toString();

  return (
    <Layout>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="About Page"
        subTitle="What is ChessDB.ai?"
      />,
    </Layout>
  );
}