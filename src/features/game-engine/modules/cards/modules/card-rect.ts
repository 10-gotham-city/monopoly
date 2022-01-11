import { theme } from 'features/game-engine/setting';
import { CanvasElement } from 'features/game-engine/modules';
import { TOrientation, TPosition, TCardType, TCoordinates } from 'features/game-engine/types';
import { fillRect, strokeRect } from 'features/game-engine/utils';

export type TCardRect = {
  index: number;
  canvasSize: number;
  ctx: CanvasRenderingContext2D;
  type: TCardType;
};

/**
 * Абстрактный класс для расчета координат горизонтальных и вертикальных карточек (а также позицию фишек)
 * (угловые карточки рассчитываются в соответствующем классе - Corner)
 * Размеры карточек рассчитываются в соотношении (14 / 9*8 / 14) от размера холста
 * т.е. угловые - 14%, остальные 8%
 *
 * Определяет позиционирование и ориентацию карточки
 */
export abstract class CardRect extends CanvasElement {
  static readonly CONST = {
    // индексы карточек
    INDEX_CORNER: 10,
    INDEX_TOP_LEFT: 0,
    INDEX_TOP_RIGHT: 10,
    INDEX_BOTTOM_RIGHT: 20,
    INDEX_BOTTOM_LEFT: 30,
    // Размеры относительно размера холста
    BASE_SIZE: 0.14,
    MAIN_CARD_SIZE: 0.08,
    // Размеры относительно карточки
    CHIP_SHIFT: 0.25,
    CHIP_CENTER: 0.5,
  };

  // Базовый размер (для вертикальных - высота, для горизонтальных - ширина)
  readonly baseSize: number;
  // Позиционирование карточки
  readonly orientation: TOrientation;
  readonly position: TPosition;
  readonly type: TCardType;
  // позиция для размещения фишек
  chipPosition = {
    x: 0,
    y: 0,
  };

  private backgroundColor: string = theme.color.background.card.normal;

  protected constructor({ index, canvasSize, ctx, type }: TCardRect) {
    super({ ctx });
    this.type = type;
    this.orientation = CardRect.getOrientation(index);
    this.position = CardRect.getPosition(index);
    this.baseSize = Math.floor(canvasSize * CardRect.CONST.BASE_SIZE);
  }

  /**
   * Свойства для инициализации элементов карточки
   */
  protected get propsForElements() {
    return {
      ...this.sizeAndCtx,
      position: this.position,
      orientation: this.orientation,
    };
  }

  /**
   * Установить координаты для горизонтальных и вертикальных карточек
   */
  protected setSizeCard(index: number, canvasSize: number) {
    const size = this.getSizesCard(index, canvasSize);
    super.setSize(size);
    this.chipPosition = this.getChipPosition(index);
  }

  /**
   * Определить ориентацию карточки
   */
  private static getOrientation(index: number): TOrientation {
    if (index % CardRect.CONST.INDEX_CORNER === 0) {
      // при индексе кратном десяти - угловая карточка
      return TOrientation.Corner;
    }

    const isTop = index < CardRect.CONST.INDEX_TOP_RIGHT;
    const isBottom =
      index > CardRect.CONST.INDEX_BOTTOM_RIGHT && index < CardRect.CONST.INDEX_BOTTOM_LEFT;
    if (isTop || isBottom) {
      return TOrientation.Vertical;
    }

    return TOrientation.Horizontal;
  }

  /**
   * Определить позицию карточки
   */
  private static getPosition(index: number): TPosition {
    if (index < CardRect.CONST.INDEX_TOP_RIGHT) {
      return TPosition.Top;
    }
    if (index < CardRect.CONST.INDEX_BOTTOM_RIGHT) {
      return TPosition.Right;
    }
    if (index < CardRect.CONST.INDEX_BOTTOM_LEFT) {
      return TPosition.Bottom;
    }
    return TPosition.Left;
  }

  /**
   * Расчет координат горизонтальных и вертикальных карточек
   */
  private getSizesCard(index: number, canvasSize: number) {
    if (this.orientation === TOrientation.Vertical) {
      return this.getSizesVertical(index, canvasSize);
    }
    return this.getSizesHorizontal(index, canvasSize);
  }

  private getSizesVertical(position: number, canvasSize: number) {
    const width = canvasSize * CardRect.CONST.MAIN_CARD_SIZE;
    const height = this.baseSize;
    // к угловой карточке (размер this.baseSize) прибавляем произведение ширины на (позицию - 1)
    const baseX = this.baseSize + width * ((position % CardRect.CONST.INDEX_CORNER) - 1);
    const x = position < CardRect.CONST.INDEX_TOP_RIGHT ? baseX : canvasSize - baseX - width;
    const y = position < CardRect.CONST.INDEX_TOP_RIGHT ? 0 : canvasSize - this.baseSize;

    return { width, height, x, y };
  }

  private getSizesHorizontal(position: number, canvasSize: number) {
    const width = this.baseSize;
    const height = canvasSize * CardRect.CONST.MAIN_CARD_SIZE;
    const x = position < CardRect.CONST.INDEX_BOTTOM_LEFT ? canvasSize - this.baseSize : 0;
    // к угловой карточке (размер this.baseSize) прибавляем произведение высоты на (позицию - 1)
    const baseY = this.baseSize + height * ((position % CardRect.CONST.INDEX_CORNER) - 1);
    const y = position < CardRect.CONST.INDEX_BOTTOM_LEFT ? baseY : canvasSize - baseY - height;

    return { width, height, x, y };
  }

  /**
   * Отрисовка границы
   */
  protected strokeRect() {
    strokeRect({
      ...this.sizeAndCtx,
      color: theme.color.stroke,
    });
  }

  /**
   * Отрисовка фона
   */
  protected fillRect() {
    fillRect({
      ...this.sizeAndCtx,
      color: this.backgroundColor,
    });
  }

  /**
   * Переопределил метод для подсветки фона
   */
  isPointInPath(props?: TCoordinates) {
    const hover = super.isPointInPath(props);
    this.setBackgroundColorByHover(hover);
    return hover;
  }

  setBackgroundColorByHover(isHover: boolean) {
    const { hover, normal } = theme.color.background.card;
    this.backgroundColor = isHover ? hover : normal;
  }

  /**
   * Определить позицию фишек на карточке
   */
  // TODO отдельное позиционирования для карточки тюрьмы
  getChipPosition(index: number) {
    const topShift = CardRect.CONST.CHIP_SHIFT;
    const bottomShift = 1 - topShift;

    const { INDEX_TOP_LEFT, INDEX_TOP_RIGHT, INDEX_BOTTOM_RIGHT, INDEX_BOTTOM_LEFT } =
      CardRect.CONST;

    const isTopCard =
      index === INDEX_TOP_LEFT || index === INDEX_TOP_RIGHT || this.position === TPosition.Top;

    if (isTopCard) {
      // Позиции для фишек на верхних карточек, включая угловые
      return {
        x: this.x + this.width * CardRect.CONST.CHIP_CENTER,
        y: this.y + this.height * topShift,
      };
    }

    const isBottomCard =
      index === INDEX_BOTTOM_RIGHT ||
      index === INDEX_BOTTOM_LEFT ||
      this.position === TPosition.Bottom;
    if (isBottomCard) {
      // Позиции для фишек на нижних карточек, включая угловые
      return {
        x: this.x + this.width * CardRect.CONST.CHIP_CENTER,
        y: this.y + this.height * bottomShift,
      };
    }

    if (this.position === TPosition.Right) {
      // Позиции для фишек на правых карточек
      return {
        x: this.x + this.width * bottomShift,
        y: this.y + this.height * CardRect.CONST.CHIP_CENTER,
      };
    }

    // Позиции для фишек на правых карточек
    return {
      x: this.x + this.width * topShift,
      y: this.y + this.height * CardRect.CONST.CHIP_CENTER,
    };
  }

  // TODO окрасить карточку если она у юзера
  renderUserStroke(color: string) {
    this.ctx.strokeStyle = color;
    this.ctx.rect(this.x + 1, this.y + 1, this.width, this.height);
  }
}
