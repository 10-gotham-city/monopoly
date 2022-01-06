import { TCoordinates } from 'entities/Game/modules/CanvasElement/CanvasElement';

type TChip = {
  color: string;
  ctx: CanvasRenderingContext2D;
};

type TCord = {
  x: number;
  y: number;
};

export class Chip {
  static speedMove = 300;
  private x = 0;
  private y = 0;
  private ctx: CanvasRenderingContext2D;
  private radius = 15;
  private position = 0;
  private startTime = 0;
  private endTime = 0;
  private readonly color: string;

  private moveCoordinates: {
    from: TCoordinates | null;
    to: TCoordinates | null;
  } = {
    from: null,
    to: null,
  };

  private centerCards: TCoordinates[] = [];

  constructor({ color, ctx }: TChip) {
    this.color = color;
    this.ctx = ctx;
  }

  get currentIndexCard() {
    return this.position;
  }

  setCoordinates({ x, y }: TCord) {
    this.x = x;
    this.y = y;
  }

  render() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
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

  setMoveCoordinates(value: number, centerCards: TCoordinates[]) {
    this.centerCards = centerCards;
    this.takeStep(value);
    this.setNextCard();
  }

  /**
   * установить координаты следующей карточки для перемещения на нее фишки,
   * зафиксировать время для линейной интерполяции
   */
  private setNextCard() {
    if (this.centerCards.length) {
      // есть карточки для движения
      const to = this.centerCards.shift()!;
      this.moveCoordinates = {
        from: {
          x: this.x,
          y: this.y,
        },
        to,
      };
      // время для линейной интерполяции
      this.startTime = performance.now();
      this.endTime = this.startTime + Chip.speedMove;
    } else {
      this.moveCoordinates.to = null;
    }
  }

  /**
   * Рассчитать координаты движения фишки
   * @private
   */
  update() {
    if (this.moveCoordinates.to === null) {
      return;
    }
    const currentTime = performance.now();
    if (currentTime > this.endTime) {
      this.setNextCard();
    }
    if (this.moveCoordinates.to) {
      const time = (currentTime - this.startTime) / Chip.speedMove;
      this.lerpCoordinates(time);
    }
  }

  private lerpCoordinates(time: number) {
    this.x = Chip.lerp(this.moveCoordinates.from!.x, this.moveCoordinates.to!.x, time);
    this.y = Chip.lerp(this.moveCoordinates.from!.y, this.moveCoordinates.to!.y, time);
  }

  /**
   * линейная интерполяция
   * @param start
   * @param finish
   * @param time
   */
  static lerp(start: number, finish: number, time: number) {
    return Math.floor(start + (finish - start) * time);
  }
}
