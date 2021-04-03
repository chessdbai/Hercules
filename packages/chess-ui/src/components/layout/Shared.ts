interface GridLayoutProps {
  x: number,
  y: number,
  width: number,
  height: number,
  static?: boolean,
  maxWidth?: number,
  maxHeight?: number,
  minWidth?: number,
  minHeight?: number,
  isDraggable?: boolean,
  isResizable?: boolean
}

export interface PanelProps {
  children: JSX.Element,
  title: string
}