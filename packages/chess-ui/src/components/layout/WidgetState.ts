import GridLayout from 'react-grid-layout';

export interface WidgetState {
  name: string,
  title: string,
  enabled: boolean,
  layout: {
    [P: string]: GridLayout.Layout
  },
  icon: string
}