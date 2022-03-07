export type TRect = {
  width: number;
  height: number;
  x: number;
  y: number;
  ctx: CanvasRenderingContext2D;
};

export type TCoordinates = {
  x: number;
  y: number;
};

export enum TPosition {
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left',
}

export enum TOrientation {
  Corner = 'corner',
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}
