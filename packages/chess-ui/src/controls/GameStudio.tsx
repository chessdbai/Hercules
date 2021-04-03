import React, { Component } from 'react';
import ChessBoard from '../components/ChessBoard';
import { BoardMove, LineState, SuperPly, Cues, pushMove } from '../components/BoardUtils';
import { NotationViewer } from '../components/notation/NotationViewer';
import Chess, { ChessInstance } from 'chess.js';
import DatabaseClient, { SummarizePositionResponse, SummarizePositionMove, SummarizePositionTopGame } from '../clients/openings';
import { BoardMenu } from '../components/BoardMenu';
import { TopMovesPanel } from '../components/TopMovesPanel';
import { TopGamesPanel } from '../components/TopGamesPanel';
import { ImportGameDialog } from '../components/dialogs/ImportGameDialog';

import { DynamicPanel, MemoryGrid } from '../components/layout';
import { PieceColor } from '../components/ChessPiece';


const DEFAULT_FEN : string = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
const newChess = (fen?: string) : ChessInstance => {
  var realFen = fen === undefined ? DEFAULT_FEN : fen!;
  return (Chess as any)(realFen) as ChessInstance;
};  

interface GameStudioState {
  line: LineState,
  fen: string,
  positionSummary?: SummarizePositionResponse,
  perspective: PieceColor,
  databaseLoading: boolean,
  importGameShowing: boolean
}

interface GameStudioProps {
  startingFen?: string
}

export class GameStudio extends Component<GameStudioProps, GameStudioState> {

  private readonly chess: ChessInstance;
  private readonly database: DatabaseClient;

  constructor(props: GameStudioProps) {
    super(props);
    this.chess = newChess(props.startingFen);
    this.state = {
      line: {},
      importGameShowing: false,
      fen: this.chess.fen(),
      perspective: 'white',
      databaseLoading: false
    };
    this.database = new DatabaseClient();
  }

  positionChanged = async () => {
    this.setState({databaseLoading: true});
    var positions = await this.database.summarizePosition(this.chess.fen());
    this.setState({
      positionSummary: positions,
      databaseLoading: false
    });
  }

  onBoardMove = (move: BoardMove) => {
    var newState = pushMove(move, this.state.line);
    this.chess.move(move.san);
    this.setState({
      line: newState.newState,
      fen: move.newFen});
      this.positionChanged();
  }

  handleImportGame = () => {
    this.setState({
      importGameShowing: true
    });
  }

  handleSelectedPlyChanged = (ply: SuperPly) => {
    const newFen = ply.boardMove!.newFen;
    if (!this.chess.load(newFen)) {
      console.log('Error loading new fen!');
    }
    this.setState({
      fen: newFen
    });
    this.positionChanged();
  }

  rewindToBeginning = () => {

    var newStateObj = {};
    Object.assign(newStateObj, this.state.line);
    var newState : LineState = newStateObj as LineState;

    newState.pointer = undefined;

    this.setState({
        line: newState,
        fen: this.props.startingFen || DEFAULT_FEN
      });
      this.positionChanged();
  }

  flipBoard = () => {
    var newPerspective;
    if (this.state.perspective === 'white') newPerspective = 'black';
    else newPerspective = 'white';
    this.setState({
      perspective: newPerspective as PieceColor
    });
  }

  previousPly = () => {

    var line = this.state.line;
    
    if (line.pointer === undefined || line.pointer === null) {
      return;
    }
    var ply = line.pointer!;

    var newStateObj = {};
    Object.assign(newStateObj, this.state.line);
    var newState : LineState = newStateObj as LineState;

    if (ply.previousMove === undefined) {
      newState.pointer = undefined;
      this.setState({
        line: newState,
        fen: this.props.startingFen || DEFAULT_FEN
      });
      this.positionChanged();
    } else {
      newState.pointer = ply.previousMove;
      this.setState({
        line: newState,
        fen: newState.pointer!.boardMove!.newFen
      });
      this.positionChanged();
    }
  }

  nextPly = () => {

    var line = this.state.line;
    
    var newStateObj = {};
    Object.assign(newStateObj, this.state.line);
    var newState : LineState = newStateObj as LineState;

    if (line.pointer === undefined || line.pointer === null) {
      if (line.line !== undefined && line.line !== null) {
        newState.pointer = line.line!;
        this.setState({
          line: newState,
          fen: newState.pointer!.boardMove!.newFen
        });
        this.positionChanged();
        return;
      }
    }
    var ply = line.pointer!;
    if (ply.nextMoveInMainLine !== undefined) {
      newState.pointer = ply.nextMoveInMainLine!;
    } else if (ply.consideredNextMoves !== undefined && ply.consideredNextMoves !== null && ply.consideredNextMoves!.length > 0) {
      newState.pointer = ply.consideredNextMoves![0];
    } else {
      return;
    }
    
    this.setState({
      line: newState,
      fen: newState.pointer!.boardMove!.newFen
    });
    this.positionChanged();
  }

  handleCuesChanged(newCues: Cues) {
    if (this.state.line !== undefined && this.state.line !== null &&
      this.state.line.pointer !== undefined && this.state.line.pointer !== null) {
        this.state.line.pointer.visualCues = newCues;
    }
  }

  componentDidMount() {
    document.body.onkeydown = (evt: KeyboardEvent) => {
      evt = evt || window.event;
      var target : any | null = evt.target || evt.srcElement;
      var targetTagName = (target!.nodeType == 1) ? target.nodeName.toUpperCase() : "";
      if ( !/INPUT|SELECT|TEXTAREA/.test(targetTagName) ) { 
        switch (evt.keyCode) {
          case 37:
            // Left key
            this.previousPly();
            break;
          case 38:
            // Up key
            this.rewindToBeginning();
            break;
          case 39:
            // Right key
            this.nextPly();
            break;
          default:
            break;
        }
      }
    }
  }

  handleTableMove(m: SummarizePositionMove) {

    var oldFen = this.chess.fen();
    if (this.chess.move(m.san)) {
      var newFen = this.chess.fen();
      var newState = pushMove({
        san: m.san,
        uci: m.uci,
        oldFen: oldFen,
        newFen: this.chess.fen()
      }, this.state.line);
      this.setState({
        line: newState.newState,
        fen: newFen});
        this.positionChanged();
    }
  }

  render() {

    var visualCues : Cues | undefined;
    if (this.state.line !== undefined && this.state.line.pointer !== undefined) {
      visualCues = this.state.line.pointer!.visualCues;
    }

    var moves : SummarizePositionMove[] = [];
    var games : SummarizePositionTopGame[] = [];
    if (this.state.positionSummary !== undefined && this.state.positionSummary.moves !== undefined) {
      moves = this.state.positionSummary!.moves!;
    }
    if (this.state.positionSummary !== undefined && this.state.positionSummary.topGames !== undefined) {
      games = this.state.positionSummary!.topGames!;
    }

    return (
      <div style={{flexDirection:'row', width:'100%'}}>
        <div style={{flexGrow:3, width:'100%'}}>
          <ChessBoard
            allowMoveOtherColor={true}
            fen={this.state.fen}
            onMove={(m) => this.onBoardMove(m)}
            onCuesChanged={(newCues) => this.handleCuesChanged(newCues)}
            cues={visualCues}
            perspective={this.state.perspective} />
        </div>
        <div style={{flexGrow:1, width:'100%', flexDirection:'column'}}>
          <div style={{marginBottom: '15px'}}>
            <BoardMenu 
                onBoardFlip={() => this.flipBoard()}
                onImportGame={() => this.handleImportGame()} />
          </div>
          <MemoryGrid>
            <div key='notation'>
              <DynamicPanel title='Notation'>
                <NotationViewer
                  lineState={this.state.line}
                  onSelectedPlyChanged={(newPly: SuperPly) => this.handleSelectedPlyChanged(newPly)} />
              </DynamicPanel>
            </div>
            <div key='topMoves'>
              <DynamicPanel title='Top Moves'>
                <TopMovesPanel
                    loading={this.state.databaseLoading}
                    moves={moves}
                    onMoveSelect={(m: SummarizePositionMove) => this.handleTableMove(m)} />
              </DynamicPanel>
            </div>
            <div key='topGames'>
              <DynamicPanel title='Top Games'>
                <TopGamesPanel 
                    loading={this.state.databaseLoading}
                    topGames={games} />
              </DynamicPanel>
            </div>
            </MemoryGrid>
        </div>
      </div>
    );
  }
}