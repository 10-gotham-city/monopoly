import { drawFillRect } from 'entities/Game/utils/drawFillRect';
import { drawRect } from 'entities/Game/utils/drawRect';
import { SizeCtx } from 'entities/Game/modules/SizeCtx/SizeCtx';
import { TCardOrientation, TColorMainCard } from 'entities/Game/types/card';
import { theme } from 'entities/Game/setting/theme';
import { TRect } from 'entities/Game/types/rect';

type TLabel = TRect & {
  color: TColorMainCard;
  orientation: TCardOrientation;
};

export class Label extends SizeCtx {
  private readonly color: TColorMainCard;

  constructor(props: TLabel) {
    const { ctx, color, orientation, ...size } = props;
    super({ ...size, ctx });

    const { x, y, width, height } = Label.getCoordinates({ ...size, orientation });
    this.color = color;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  private static getCoordinates(props: Omit<TRect, 'ctx'> & { orientation: TCardOrientation }) {
    const { x, y, width, height, orientation } = props;
    const isVertical =
      orientation === TCardOrientation.Top || orientation === TCardOrientation.Bottom;
    const isHorizontal =
      orientation === TCardOrientation.Left || orientation === TCardOrientation.Right;

    return {
      width: isHorizontal ? width * 0.15 : width,
      height: isVertical ? height * 0.15 : height,
      x: orientation === TCardOrientation.Left ? width * 0.85 : x,
      y: orientation === TCardOrientation.Top ? height * 0.85 : y,
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
