import React, { CSSProperties } from 'react';
import { PageHeader, Layout } from 'antd';
import { useHistory } from "react-router-dom";
import { GameStudio } from '@chessdb.biz/hercules-chess-ui';

export default function AnalysisPage() {
  let history = useHistory();
  history.location.toString();

  return (
    <Layout style={{width: '100%', height: '100%'}}>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Analysis"
        subTitle="Cook up some dangerous prep"
      />

      <div style={{flex: 1, marginRight: '10px'}}>
        <GameStudio />
      </div>
    </Layout>
  );
}