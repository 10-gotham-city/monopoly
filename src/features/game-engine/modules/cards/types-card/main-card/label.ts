import { strokeRect, fillRect } from 'features/game-engine/utils';
import { TOrientation, TPosition, TColorMainCard, TRect } from 'features/game-engine/types';
import { theme } from 'features/game-engine/setting';
import { CanvasElement } from 'features/game-engine/modules';

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
