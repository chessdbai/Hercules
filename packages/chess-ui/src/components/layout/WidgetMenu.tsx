import React, { Component } from 'react';
import { 
  Menu, MenuItem,
  IProps } from '@blueprintjs/core';
import { WidgetState } from './WidgetState';

interface IWidgetToolboxProps extends IProps {
  widgetStates: WidgetState[]
}

export class WidgetMenu extends Component<IWidgetToolboxProps,{}> {

  constructor(props: IWidgetToolboxProps) {
    super(props);
  }

  render = () => {
    var widgetMenuItems : JSX.Element[] = [];
    this.props.widgetStates.forEach(widgetState => {
      widgetMenuItems.push(<MenuItem text={widgetState.title} icon={widgetState.icon as any} />);
    });
    return (
      <Menu className={this.props.className}>
        {widgetMenuItems}
      </Menu>
    )
  }
}
