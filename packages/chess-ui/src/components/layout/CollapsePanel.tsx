import React, { Component, CSSProperties } from 'react';
import { Card, Collapse, Elevation } from '@blueprintjs/core';
import { PanelProps } from './Shared';
 
const outerStyle : CSSProperties = {
  padding: '5px 2px 2px 2px',
  height: '100%'
}
const titleStyle : CSSProperties = {margin: '3px 1px 3px'};
const innerStyle : CSSProperties = {
  height: '100%',
  overflow: 'auto',
  paddingBottom: '50px'
}

interface CollapsePanelProps extends PanelProps {
  children: JSX.Element,
  title: string,
  collapsed?: boolean
}

interface CollapsePanelState {
  collapsed: boolean
}

const style : CSSProperties = {
  width: '100%',
  height: '100%',
  flexGrow: 1,
  margin: '5px 5px 5px 5px'
};

export class CollapsePanel extends Component<CollapsePanelProps, CollapsePanelState> {

  constructor(props: CollapsePanelProps) {
    super(props);
    this.state = {
      collapsed: this.props.collapsed || false
    }
  }

  private toggleCollapse() {
    this.setState({collapsed: !this.state.collapsed});
  }

  render() {
    return (
      
      <Card elevation={Elevation.TWO} style={outerStyle}>
          <h5 style={titleStyle}><a href="#">{this.props.title}</a></h5>
          <Collapse isOpen={!this.state.collapsed}>
            <div style={innerStyle}>
              {this.props.children}
            </div>
          </Collapse>
      </Card>
    )
  }

}