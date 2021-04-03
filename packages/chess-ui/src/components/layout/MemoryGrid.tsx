import React, { Component, CSSProperties } from 'react';
import { Responsive as ResponsiveGridLayout, WidthProvider } from 'react-grid-layout';

import '../../../styles/memory-grid.css';

interface MemoryGridProps {
  children: JSX.Element[]
}

export class MemoryGrid extends Component<MemoryGridProps,{}> {

  private layouts : ReactGridLayout.Layouts;

  constructor(props: MemoryGridProps) {
    super(props);
    this.layouts = {
        lg: [
          {i: 'notation', x: 0, y: 0, w: 8, h: 11},
          {i: 'topMoves', x: 0, y: 11, w: 4, h: 11},
          {i: 'topGames', x: 4, y: 11, w: 4, h: 11}
        ],
        sm: [
          {i: 'notation', x: 0, y: 0, w: 6, h: 8},
          {i: 'topMoves', x: 0, y: 8, w: 3, h: 5},
          {i: 'topGames', x: 3, y: 8, w: 3, h: 5}
        ]
    };
  }

  handleLayoutChange = (layout: ReactGridLayout.Layout[], layouts: ReactGridLayout.Layouts) => {
    this.layouts = layouts;
  }

  render() {
    const style : CSSProperties = {
      height: '100%', width: '100%'
    };

    const DynamicGridLayout = WidthProvider(ResponsiveGridLayout);

    return (
      <DynamicGridLayout
        style={style}
        layouts={this.layouts}
        rowHeight={30}
        autoSize={false}
        compactType={null}
        useCSSTransforms={true}
        preventCollision={true}
        measureBeforeMount={true}
        onLayoutChange={(layout, layouts) =>
          this.handleLayoutChange(layout, layouts)
        }>
        {this.props.children}
      </DynamicGridLayout>
    )
  }

}