import { TCardOrientation } from 'entities/Game/types/card';

export type TCard = {
  position: number;
  canvasSize: number;
  orientation: TCardOrientation;
  ctx: CanvasRenderingContext2D;
};
