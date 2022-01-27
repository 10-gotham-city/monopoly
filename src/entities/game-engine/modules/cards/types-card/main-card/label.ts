import { CanvasElement } from 'entities/game-engine/modules';
import { theme } from 'entities/game-engine/setting';
import { TColorMainCard, TOrientation, TPosition, TRect } from 'entities/game-engine/types';
import { fillRect, strokeRect } from 'entities/game-engine/utils';

type TLabel = TRect & {
  color: TColorMainCard;
  position: TPosition;
  orientation: TOrientation;
};

export class Label extends CanvasElement {
  private readonly color: TColorMainCard;
  private static readonly CONST = {
    // Размеры относительно карточки
    SHIFT: 0.85,
    HEIGHT: 0.15,
  };

  constructor(props: TLabel) {
    const { ctx, color } = props;
    super({ ctx });
    const size = Label.getCoordinates(props);
    this.color = color;
    this.setSize(size);
  }

  private static getCoordinates(props: TLabel) {
    const { x, y, width, height, position, orientation } = props;

    return {
      width: orientation === TOrientation.Horizontal ? width * Label.CONST.HEIGHT : width,
      height: orientation === TOrientation.Vertical ? height * Label.CONST.HEIGHT : height,
      x: position === TPosition.Left ? width * Label.CONST.SHIFT : x,
      y: position === TPosition.Top ? height * Label.CONST.SHIFT : y,
    };
  }

  render() {
    strokeRect({
      ...this.sizeAndCtx,
      color: theme.color.stroke,
    });
    fillRect({
      ...this.sizeAndCtx,
      color: this.color,
    });
  }
}
