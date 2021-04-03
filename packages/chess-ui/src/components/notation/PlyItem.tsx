import React, { Component } from 'react';
import { SuperPly, PlyInfo } from '../BoardUtils';
import { Tag } from "@blueprintjs/core";

interface PlyItemProps {
  ply: SuperPly,
  selected: boolean,
  onClick: () => void;
}

export class PlyItem extends Component<PlyItemProps,{}> {

  constructor(props: PlyItemProps) {
    super(props);
  }

  render = () => {

    var plyInfo = new PlyInfo(this.props.ply);
    var moveText : string;
    if (plyInfo.whiteMove) {
      moveText = `${plyInfo.moveNumber.toString()}. ${this.props.ply.text!}`
    } else {

      // Black move, was there a branch in the previous ply and is this not the main line?

      var branchCount = 0;
      var notMainLine = false;
      if (this.props.ply.previousMove !== undefined && this.props.ply.previousMove !== null &&
        this.props.ply.previousMove.consideredNextMoves !== undefined && this.props.ply.previousMove.consideredNextMoves !== null) {
          branchCount = this.props.ply.previousMove.consideredNextMoves.length;
          notMainLine = this.props.ply.previousMove!.nextMoveInMainLine!.text! != this.props.ply.text!;
      }
      var previousPlyText = branchCount > 0 && notMainLine ? `${plyInfo.moveNumber}... ` : '';

      moveText = `${previousPlyText}${this.props.ply.text!}`
    }

    return <Tag
      large interactive fill
      active={this.props.selected}
      onClick={() => this.props.onClick()}
    >{moveText}</Tag>;
  }
}