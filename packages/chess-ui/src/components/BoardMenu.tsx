import React, { Component } from 'react';
import { 
  Button, ButtonGroup,
  Popover, Position
} from '@blueprintjs/core';
import { WidgetMenu } from '../components/layout/WidgetMenu';

interface BoardMenuProps {
  onBoardFlip: () => void;
  onImportGame: () => void;
}

export class BoardMenu extends Component<BoardMenuProps,{}> {

  constructor(props: BoardMenuProps) {
    super(props);
  }

  render() {
    return (
      <ButtonGroup minimal={true}>
        <Button icon="database" onClick={() => this.props.onImportGame()}>Import</Button>
        <Button icon="function" onClick={() => this.props.onBoardFlip()}>Flip Board</Button>
        <Popover content={<WidgetMenu widgetStates={[]} />} position={Position.BOTTOM_LEFT}>
          <Button rightIcon="caret-down" icon='eye-open' text='Widgets' />
        </Popover>
      </ButtonGroup>);
  }

}