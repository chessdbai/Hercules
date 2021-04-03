import React, { Component } from 'react';
import { Spinner } from '@blueprintjs/core';
import { SummarizePositionMove } from '../clients/openings';
import { ChessPiece, PieceType } from './ChessPiece';
 
interface TopMovesPanelProps {
  loading: boolean,
  moves: SummarizePositionMove[],
  onMoveSelect: (m: SummarizePositionMove) => void;
}

interface TopMovesPanelState {

}

export class TopMovesPanel extends Component<TopMovesPanelProps, TopMovesPanelState> {

  render = () => {

    var rows : JSX.Element[] = [];
    this.props.moves.forEach(move => {
      var weightedCount = move.white + move.draws + move.black;
      var score = weightedCount == 0 ? "--" : (100.0 * (move.white + (move.draws / 2.0)) / weightedCount)
        .toFixed(2)
        .toString() + "%";

        var pieceType;
        if (move.san.startsWith('N')) pieceType = 'knight';
        else if (move.san.startsWith('R')) pieceType = 'rook';
        else if (move.san.startsWith('Q')) pieceType = 'queen';
        else if (move.san.startsWith('K')) pieceType = 'king';
        else if (move.san.startsWith('B')) pieceType = 'bishop';
        else pieceType = 'pawn';

      rows.push(<tr key={`move${rows.length}`}>
        
        <td>
          <button className="bp3-button bp3-small" onClick={() => this.props.onMoveSelect(move)}>
            <ChessPiece
              color='white'
              size={25}
              type={pieceType as PieceType} />
              {move.san}
          </button>
        </td>
        <td>{`${move.white+move.black+move.draws}`}</td>
        <td>{score}</td>
        <td>{move.averageRating}</td>
      </tr>);
    });

    if (this.props.loading) {
      return <Spinner />
    }

    return (
      <table className='bp3-html-table bp3-interactive bp3-small bp3-html-table-striped bp3-html-table-condensed bp3-html-table-bordered'>
        <thead>
          <tr>
            <th>Move</th>
            <th>Games</th>
            <th>Score</th>
            <th>Average Rating</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }

}