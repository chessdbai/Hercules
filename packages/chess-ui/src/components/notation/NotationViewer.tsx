import React, { Component } from 'react';
import { LineState, SuperPly, PlyInfo } from '../BoardUtils';
import { MoveItem, DisplayPly } from './MoveItem';
import { PlyItem } from './PlyItem';

interface PlyMoveGroup {
  white?: SuperPly,
  black?: SuperPly
}

interface NotationViewerProps {
  lineState: LineState,
  onSelectedPlyChanged: (lineState: SuperPly) => void;
}

interface NotationViewerState {

}

export class NotationViewer extends Component<NotationViewerProps, NotationViewerState> {

  constructor(props: NotationViewerProps) {
    super(props);
  }

  onPlySelect(ply: SuperPly) {
    this.props.lineState.pointer = ply;
    this.setState({lineState: this.props.lineState});

    try {
      this.props.onSelectedPlyChanged(this.props.lineState.pointer!);
    } catch (err) {

    }
  }

  render() {

    var mainLine = this.lineMoves();
    var moveItems : JSX.Element[] = [];

    while (mainLine.length > 0) {
      var move = mainLine.shift()!;
      var displayWhite : DisplayPly | undefined;
      var displayBlack : DisplayPly | undefined;
      if (move.white !== undefined) {
        displayWhite = {
          ply: move.white!,
          selected: this.props.lineState.pointer === move.white!
        } as DisplayPly;

        var nextMoves = move!.white!.consideredNextMoves;
        if (nextMoves !== undefined && nextMoves !== null && nextMoves.length > 0) {
          // White has alternate moves. We're done with this line
          if (move.black !== undefined) {
            mainLine.unshift({
              black: move.black
            });
          }
          

        }
      }
      if (move.black !== undefined) {
        displayBlack = {
          ply: move.black!,
          selected: this.props.lineState.pointer === move.black!
        } as DisplayPly
      }

      var moveItem = <MoveItem
      white={displayWhite}
      black={displayBlack}
      onPlyClick={(ply) => this.onPlySelect(ply)} />;
      moveItems.push(moveItem);
    }

    var renderItems : JSX.Element[] = [];
    moveItems.forEach(item => {
      renderItems.push(item);
      renderItems.push(<br />);
    });
    return <div style={{width: '100%', height: '100%'}}>{renderItems}</div>;
  }

  private lineMoves = () : PlyMoveGroup[] => {
    if (this.props.lineState === null || this.props.lineState === undefined) return [];
    if (this.props.lineState.line === null || this.props.lineState.line === undefined) return [];
    var mainLine : SuperPly[] = [];
    var line = this.props.lineState.line;
    mainLine.push(line);
    while (line.nextMoveInMainLine !== null && line.nextMoveInMainLine !== undefined) {
      line = line.nextMoveInMainLine!;
      mainLine.push(line);
    }
    
    var moveGroupings : PlyMoveGroup[] = [];
    if (mainLine.length > 0 && new PlyInfo(mainLine[0]).blackMove) {
      moveGroupings.push({
        black: mainLine.shift()!
      });
    }

    while (mainLine.length > 0) {
      var white = mainLine.shift();
      if (mainLine.length > 0) {
        moveGroupings.push({
          white: white,
          black: mainLine.shift()
        });
      } else {
        moveGroupings.push({
          white: white
        });
      }
    }
    return moveGroupings;
  }

  private createFlatLine = (ply: SuperPly, depth: number) : JSX.Element => {
    
    var plyLine : SuperPly[] = [];
    plyLine.push(ply);
    while (ply.nextMoveInMainLine !== null && ply.nextMoveInMainLine !== undefined) {
      ply = ply.nextMoveInMainLine!;
      plyLine.push(ply);
    }

    var items : JSX.Element[] = [];
    plyLine.forEach(p => {
      var pi = <PlyItem ply={p} onClick={() => this.onPlySelect(p)} selected={this.props.lineState.pointer === p} />;
      items.push(pi);

      if (p.consideredNextMoves !== null && p.consideredNextMoves !== undefined && p.consideredNextMoves.length > 0) {
        var nestedItems : JSX.Element[] = [];
        p.consideredNextMoves!.forEach(nestedPly => {
          nestedItems.push(this.createFlatLine(nestedPly, depth+1));
        });
      }
    });

    return <div>{items}</div>
  }
}