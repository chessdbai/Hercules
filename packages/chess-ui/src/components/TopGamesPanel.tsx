import React, { Component } from 'react';
import { Spinner } from '@blueprintjs/core';
import { SummarizePositionTopGame } from '../clients/openings';

interface TopGamesPanelProps {
  topGames: SummarizePositionTopGame[],
  loading: boolean
}

interface TopGamesPanelState {
  
}

export class TopGamesPanel extends Component<TopGamesPanelProps, TopGamesPanelState> {

  constructor(props: TopGamesPanelProps) {
    super(props);
  }

  render = () => {

    var rows : JSX.Element[] = [];
    this.props.topGames.forEach(topGame => {
      rows.push(<tr key={`move${rows.length}`}>
        
        <td>{`${topGame.white.name} (${topGame.white.rating})`}</td>
        <td>{`${topGame.black.name} (${topGame.black.rating})`}</td>
        <td>{topGame.winner === 'white' ? '1-0' : (topGame.winner === 'blac' ? '0-1' : '1/2-1/2')}</td>
        <td>{topGame.year}</td>
      </tr>);
    });

    if (this.props.loading) {
      return <Spinner />
    }

    return (
      <table className='bp3-html-table bp3-interactive bp3-small bp3-html-table-striped bp3-html-table-condensed bp3-html-table-bordered'>
        <thead>
          <tr>
            <th>White</th>
            <th>Black</th>
            <th>Result</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }

}