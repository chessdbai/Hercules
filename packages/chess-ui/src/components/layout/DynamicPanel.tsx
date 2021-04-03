import React, { Component, CSSProperties } from 'react';
import { Card, Collapse, Elevation } from "@blueprintjs/core";

import { PanelProps } from './Shared';
 
const outerStyle : CSSProperties = {
  padding: '5px 2px 35px 2px',
  height: '100%'
}
const titleStyle : CSSProperties = {margin: '3px 1px 3px'};
const innerStyle : CSSProperties = {
  height: '100%',
  overflow: 'auto',
  paddingBottom: '50px'
}

interface DynamicPanelProps extends PanelProps {
}

export class DynamicPanel extends Component<DynamicPanelProps, {}> {

  render = () => {
    return (
      <Card elevation={Elevation.TWO} style={outerStyle}>
          <h5 style={titleStyle}><a href="#">{this.props.title}</a></h5>
          <div style={innerStyle}>
            {this.props.children}
          </div>
      </Card>
    );
  }
}