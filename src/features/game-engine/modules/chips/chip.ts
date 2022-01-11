import { EVENTS_NAME } from '../../setting';
import { TCoordinates } from '../../types';
import { EventBus } from '../event-bus';
import { CanvasElement } from '../../modules';
import { arc } from '../../utils';

type TChip = {
  color: string;
  ctx: CanvasRenderingContext2D;
};

export class Chip extends CanvasElement {
  static readonly CONST = {
    RADIUS: 15, // px
    COUNT_CARD: 40,
    END_ANGLE: 2 * Math.PI, //deg
    DISTANCE_BETWEEN_CHIPS: Math.floor(15 * 0.7), // px
    SPEED_MOVE: 300, //ms
  };
  private readonly color: string;
  position = 0;

  private startMoveTime = 0;
  private endMoveTime = 0;
  private moveCoordinates: TCoordinates[] = [];
  private moveToNewCard = false;

  private moveStep: {
    from: TCoordinates | null;
    to: TCoordinates | null;
  } = {
    from: null,
    to: null,
  };

  constructor({ color, ctx }: TChip) {
    super({ ctx });
    this.color = color;
  }

  render() {
    arc({
      ...this.sizeAndCtx,
      fill: this.color,
      endAngle: Chip.CONST.END_ANGLE,
      radius: Chip.CONST.RADIUS,
    });
  }

  /**
   * Сделать шаг фишкой - рассчитать новую позицию
   */
  private takeStep(value: number) {
    this.position += value;
    if (this.position >= Chip.CONST.COUNT_CARD) {
      this.position -= Chip.CONST.COUNT_CARD;
    }
  }

  /**
   * Перемещение фишек между карточек
   */
  moveBetweenCards(value: number, moveCoordinates: TCoordinates[]) {
    this.moveToNewCard = true;
    this.moveCoordinates = moveCoordinates;
    this.takeStep(value);
    this.setNextStep();
  }

  /**
   * Перемещение внутри карточки
   */
  moveInsideCard(coordinates: TCoordinates) {
    this.moveCoordinates = [coordinates];
    this.setNextStep();
  }

  /**
   * установить координаты следующей карточки для перемещения на нее фишки,
   * зафиксировать время для линейной интерполяции
   */
  private setNextStep() {
    if (this.moveCoordinates.length) {
      // есть карточки для движения
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const to = this.moveCoordinates.shift()!;
      this.moveStep = {
        from: {
          x: this.x,
          y: this.y,
        },
        to,
      };
      // время для линейной интерполяции
      this.startMoveTime = performance.now();
      this.endMoveTime = this.startMoveTime + Chip.CONST.SPEED_MOVE;
    } else {
      this.moveStep.to = null;
      if (this.moveToNewCard) {
        // выполнить только для перемещений между карточками
        EventBus.getInstance().emit(EVENTS_NAME.CHIP_IN_CENTER_CARD, this.position);
        this.moveToNewCard = false;
      }
    }
  }

  /**
   * Рассчитать координаты движения фишки
   */
  update() {
    if (this.moveStep.to === null) {
      return;
    }
    const currentTime = performance.now();
    if (currentTime > this.endMoveTime) {
      this.setNextStep();
    }
    if (this.moveStep.to) {
      const time = (currentTime - this.startMoveTime) / Chip.CONST.SPEED_MOVE;
      this.setLERPCoordinates(time);
    }
  }

  private setLERPCoordinates(time: number) {
    if (this.moveStep.from && this.moveStep.to) {
      this.x = Chip.LERP(this.moveStep.from.x, this.moveStep.to.x, time);
      this.y = Chip.LERP(this.moveStep.from.y, this.moveStep.to.y, time);
    }
  }

  /**
   * линейная интерполяция
   */
  private static LERP(start: number, finish: number, time: number) {
    return Math.floor(start + (finish - start) * time);
  }
}
