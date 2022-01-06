import { drawRect } from 'entities/Game/utils/drawRect';
import { theme } from 'entities/Game/setting/theme';
import { CanvasElement } from 'entities/Game/modules/CanvasElement';
import { TCardOrientation, TCardPosition } from 'entities/Game/types/card';
import { TCoordinates } from 'entities/Game/modules/CanvasElement/CanvasElement';

export type TCardRect = {
  index: number;
  canvasSize: number;
  ctx: CanvasRenderingContext2D;
};

/**
 * Абстрактный класс для расчета координат карточки и отрисовки области карточки
 * Размеры карточек рассчитываются в соотношении (14 / 9*8 / 14) от размера холста
 * т.е. угловые - 14%, остальные 8%
 */
export abstract class CardRect extends CanvasElement {
  // Базовый размер (для вертикальных - высота, для горизонтальных - ширина)
  private readonly baseSize: number;
  // Позиционирование карточки
  readonly orientation: TCardOrientation;
  readonly position: TCardPosition;
  chipPosition: TCoordinates;

  protected constructor({ index, canvasSize, ctx }: TCardRect) {
    super({ ctx });
    this.orientation = CardRect.getOrientation(index);
    this.position = CardRect.getPosition(index);
    this.baseSize = Math.floor(canvasSize * 0.14);

    const { width, height, x, y } = this.getSizes(index, canvasSize);
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.chipPosition = this.getChipPosition(index);
  }

  private static getOrientation(index: number): TCardOrientation {
    if (index % 10 === 0) {
      return TCardOrientation.Corner;
    }
    if (index < 10 || (index > 20 && index < 30)) {
      return TCardOrientation.Vertical;
    }
    return TCardOrientation.Horizontal;
  }

  private static getPosition(index: number): TCardPosition {
    if (index < 10) {
      return TCardPosition.Top;
    }
    if (index < 20) {
      return TCardPosition.Right;
    }
    if (index < 30) {
      return TCardPosition.Bottom;
    }
    return TCardPosition.Left;
  }

  getSizes(index: number, canvasSize: number) {
    if (this.orientation === TCardOrientation.Vertical) {
      return this.getSizesVertical(index, canvasSize);
    }
    if (this.orientation === TCardOrientation.Horizontal) {
      return this.getSizesHorizontal(index, canvasSize);
    }
    return this.getSizesSquare(index, canvasSize);
  }

  getSizesSquare(index: number, canvasSize: number) {
    return {
      width: this.baseSize,
      height: this.baseSize,
      x: index === 0 || index === 30 ? 0 : canvasSize - this.baseSize,
      y: index === 0 || index === 10 ? 0 : canvasSize - this.baseSize,
    };
  }

  getSizesVertical(position: number, canvasSize: number) {
    const width = Math.floor(canvasSize * 0.08);
    const height = this.baseSize;
    const baseX = this.baseSize + width * ((position % 10) - 1);
    const x = position < 10 ? baseX : canvasSize - baseX - width;
    // к угловой карточке (размер this.baseSize) прибавляем произведение ширины на (позицию - 1)
    const y = position < 10 ? 0 : canvasSize - this.baseSize;

    return { width, height, x, y };
  }

  getSizesHorizontal(position: number, canvasSize: number) {
    const width = this.baseSize;
    const height = Math.floor(canvasSize * 0.08);
    const x = position < 30 ? canvasSize - this.baseSize : 0;
    // к угловой карточке (размер this.baseSize) прибавляем произведение высоты на (позицию - 1)
    const baseY = this.baseSize + height * ((position % 10) - 1);
    const y = position < 30 ? baseY : canvasSize - baseY - height;

    return { width, height, x, y };
  }

  renderStroke() {
    drawRect({
      ...this.sizeCtx,
      color: theme.color.stroke,
    });
  }

  private getChipPosition(index: number) {
    const topShift = 0.25;
    const bottomShift = 1 - topShift;

    if (index === 0 || index === 10 || this.position === TCardPosition.Top) {
      return {
        x: this.x + Math.floor(this.width * 0.5),
        y: this.y + Math.floor(this.height * topShift),
      };
    }
    if (index === 20 || index === 30 || this.position === TCardPosition.Bottom) {
      return {
        x: this.x + Math.floor(this.width * 0.5),
        y: this.y + Math.floor(this.height * bottomShift),
      };
    }
    if (this.position === TCardPosition.Right) {
      return {
        x: this.x + Math.floor(this.width * bottomShift),
        y: this.y + Math.floor(this.height * 0.5),
      };
    }
    return {
      x: this.x + Math.floor(this.width * topShift),
      y: this.y + Math.floor(this.height * 0.5),
    };
  }

  // TODO окрасить карточку если она у юзера
  renderUserStroke(color: string) {
    this.ctx.strokeStyle = color;
    this.ctx.rect(this.x + 1, this.y + 1, this.width, this.height);
  }
}
