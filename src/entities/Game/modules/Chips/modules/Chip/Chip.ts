import { TCoordinates } from 'entities/Game/modules/CanvasElement/CanvasElement';
import { EventBus } from 'entities/Game/modules/EventBus';
import { EVENTS_NAME } from 'entities/Game/modules/EventBus/eventsName';

type TChip = {
  color: string;
  ctx: CanvasRenderingContext2D;
};

export class Chip {
  private static radius = 15;
  static stepInCard = Math.floor(Chip.radius * 0.7);
  private static speedMove = 300;
  private readonly color: string;
  private x = 0;
  private y = 0;
  private ctx: CanvasRenderingContext2D;
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
    this.color = color;
    this.ctx = ctx;
  }

  setCoordinates({ x, y }: TCoordinates) {
    this.x = x;
    this.y = y;
  }

  render() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, Chip.radius, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  /**
   * Сделать шаг фишкой - рассчитать новую позицию
   * @param value
   */
  private takeStep(value: number) {
    this.position += value;
    if (this.position >= 40) {
      this.position -= 40;
    }
  }

  /**
   * Перемещение фишек между карточек
   * @param value
   * @param moveCoordinates
   */
  moveBetweenCards(value: number, moveCoordinates: TCoordinates[]) {
    this.moveToNewCard = true;
    this.moveCoordinates = moveCoordinates;
    this.takeStep(value);
    this.setNextStep();
  }

  /**
   * Перемещение внутри карточки
   * @param coordinates
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
      this.endMoveTime = this.startMoveTime + Chip.speedMove;
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
   * @private
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
      const time = (currentTime - this.startMoveTime) / Chip.speedMove;
      this.setLERPCoordinates(time);
    }
  }

  private setLERPCoordinates(time: number) {
    this.x = Chip.LERP(this.moveStep.from!.x, this.moveStep.to!.x, time);
    this.y = Chip.LERP(this.moveStep.from!.y, this.moveStep.to!.y, time);
  }

  /**
   * линейная интерполяция
   * @param start
   * @param finish
   * @param time
   */
  private static LERP(start: number, finish: number, time: number) {
    return Math.floor(start + (finish - start) * time);
  }
}
