import { drawFillRect } from 'entities/Game/utils/drawFillRect';
import { drawRect } from 'entities/Game/utils/drawRect';
import { TCardOrientation, TCardPosition, TColorMainCard } from 'entities/Game/types/card';
import { theme } from 'entities/Game/setting/theme';
import { TRect } from 'entities/Game/types/rect';
import { CanvasElement } from 'entities/Game/modules/CanvasElement';

type TLabel = TRect & {
  color: TColorMainCard;
  position: TCardPosition;
  orientation: TCardOrientation;
};

export class Label extends CanvasElement {
  private readonly color: TColorMainCard;

  constructor(props: TLabel) {
    const { ctx, color } = props;
    super({ ctx });

    const { x, y, width, height } = Label.getCoordinates(props);
    this.color = color;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  private static getCoordinates(props: TLabel) {
    const { x, y, width, height, position, orientation } = props;

    return {
      width: orientation === TCardOrientation.Horizontal ? width * 0.15 : width,
      height: orientation === TCardOrientation.Vertical ? height * 0.15 : height,
      x: position === TCardPosition.Left ? width * 0.85 : x,
      y: position === TCardPosition.Top ? height * 0.85 : y,
    };
  }

  render() {
    drawRect({
      ...this.sizeCtx,
      color: theme.color.stroke,
    });
    drawFillRect({
      ...this.sizeCtx,
      color: this.color,
    });
  }
}
