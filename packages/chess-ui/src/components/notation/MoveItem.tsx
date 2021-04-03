import React, { Component } from 'react';
import { SuperPly, PlyInfo } from '../BoardUtils';
import { PlyItem } from './PlyItem';

export interface DisplayPly {
  ply: SuperPly,
  continuation: boolean,
  selected: boolean
}

interface MoveItemProps {
  white?: DisplayPly,
  black?: DisplayPly,
  onPlyClick: (ply: SuperPly) => void;
}

export class MoveItem extends Component<MoveItemProps, {}> {

  constructor(props: MoveItemProps) {
    super(props);
  }

  private elementForPly = (ply: DisplayPly | undefined) : JSX.Element => {
    var ele : JSX.Element;
    if (ply === undefined) {
      ele = <div></div>;
    } else {
      var plyInfo = new PlyInfo(ply.ply);
      ele = 
      <PlyItem
        key={plyInfo.uniqueKey}
        ply={ply.ply}
        selected={ply.selected}
        onClick={() => this.props.onPlyClick(ply.ply)} />;
    }
    return ele;
  }

  render = () => {

    var whiteElement = this.elementForPly(this.props.white);
    var blackElement = this.elementForPly(this.props.black);

    return (
      <div style={{flexDirection: 'row', width: '100%'}}>
        <div style={{flexGrow: 1, width: '50%'}}>
          {whiteElement}
        </div>
        <div style={{flexGrow: 1, width: '50%'}}>
          {blackElement}
        </div>
      </div>
    )
  }

}