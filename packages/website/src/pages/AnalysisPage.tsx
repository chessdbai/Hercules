import React from 'react';
import { PageHeader, Layout } from 'antd';
import { useHistory } from "react-router-dom";
import { PositionClassifier, PositionalClassificationTask } from '@chessdb.biz/hercules-chess-ui';

const task : PositionalClassificationTask = {
  initialFen: 'r2qk2r/pp2bppp/2n1bn2/3P4/2P2p2/5N2/PP4PP/RNBQKB1R b KQkq - 0 9',
  categories: [
    {
      name: 'fork',
      label: 'Fork',
      description: 'Attacking two pieces at once'
    },
    {
      name: 'skewer',
      label: 'Skewer',
      description: 'Attacking a piece through another piece.'
    }
  ],
  perspective: 'white'
}

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
      />,


      <div className="site-card-wrapper" style={{width: '100%', height: '100%'}}>
        <PositionClassifier
          fixedSize={true}
          task={task}
          onSubmit={(categories => console.log(categories))} />
      </div>
    </Layout>
  );
}