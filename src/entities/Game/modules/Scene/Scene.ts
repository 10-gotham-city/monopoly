import { BackgroundImage } from 'entities/Game/modules/Card/modules/BackgroundImage/BackgroundImage';
import { Card } from 'entities/Game/modules/Card';
import { Chance } from 'entities/Game/modules/Card/typesCard/Chance';
import { Chip } from 'entities/Game/modules/Chip';
import { Corner } from 'entities/Game/modules/Card/typesCard/Corner';
import { Dices } from 'entities/Game/modules/Dice';
import { drawFillRect } from 'entities/Game/utils/drawFillRect';
import { Main } from 'entities/Game/modules/Card/typesCard/Main';
import { Other } from 'entities/Game/modules/Card/typesCard/Other';
import { TCardType } from 'entities/Game/types/card';
import { theme } from 'entities/Game/setting/theme';
import { GameLoop } from 'entities/Game/modules/Scene/GameLoop';

// TODO Добавить ресайз
// TODO Добавить ожидание загрузки ресурсов
// TODO обработать исключения
export class Scene extends GameLoop {
  private readonly top: number;
  private readonly left: number;
  private readonly x: number = 0;
  private readonly y: number = 0;
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly width: number;
  private readonly height: number;
  private background: BackgroundImage;
  private cards: (Corner | Chance | Main | Other)[] = [];
  private mouse = {
    x: 0,
    y: 0,
  };

  private chips: Chip[];
  private dices: Dices;

  elements: (BackgroundImage | Corner | Chance | Main | Other | Dices | Chip)[];

  constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.ctx = Scene.getContext(canvas);
    const { height, width } = this.getSizeElement();
    this.width = width;
    this.height = height;

    this.background = new BackgroundImage({
      ...this.sizeCtx,
      src: theme.background,
      isCenter: true,
    });
    this.dices = new Dices({
      ctx: this.ctx,
      canvasSize: this.width,
    });

    // TODO сделать инициализацию фишек из состояния игры
    this.chips = [
      new Chip({
        ctx: this.ctx,
        color: 'red',
      }),
    ];

    const { top, left } = this.canvas.getBoundingClientRect();
    this.top = top + window.scrollY;
    this.left = left + window.scrollX;
    // TODO remove event
    this.addEventListeners();
  }

  get sizeCtx() {
    return {
      width: this.width,
      height: this.height,
      x: this.x,
      y: this.y,
      ctx: this.ctx,
    };
  }

  static async init(canvas: HTMLCanvasElement) {
    const scene = new Scene(canvas);
    await scene.background.load();
    await scene.initCards();
    scene.moveChip(0, 0);
    scene.gameLoop();
  }

  async initCards() {
    this.cards = await Card.initAll(this.ctx, this.width);
  }

  static getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      return ctx;
    }
    throw new Error('Идентификатор контекста не определён');
  }

  addEventListeners() {
    this.canvas.addEventListener('mousemove', this.onMousemove);
    this.canvas.addEventListener('mouseout', this.onMouseout);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.canvas.addEventListener('click', this.onClick);
  }

  onClick = async (e: MouseEvent): Promise<void> => {
    this.mouse.x = e.pageX - this.left;
    this.mouse.y = e.pageY - this.top;

    // TODO обработать клик
    const cardClick = this.cards.find((card) => card.checkHover(this.mouse));
    if (cardClick && cardClick.type === TCardType.Main) {
      // eslint-disable-next-line no-console
      console.log((cardClick as Main).title.text);
    }

    if (this.dices.isPointInPath(this.mouse)) {
      const { value, double } = await this.dices.roll();
      // eslint-disable-next-line no-console
      console.log(value, double);
      const position = this.chips[0].takeStep(value);
      this.moveChip(0, position);
    }
  };

  onMousemove = (e: MouseEvent) => {
    this.mouse.x = e.pageX - this.left;
    this.mouse.y = e.pageY - this.top;

    let noHover = true;
    this.cards.forEach((card) => {
      if (card.type === TCardType.Main || card.type === TCardType.Other) {
        const hoverCard = card.checkHover(this.mouse);
        if (hoverCard) {
          this.canvas.style.cursor = 'pointer';
          noHover = false;
        }
      }
    });

    if (this.dices.isPointInPath(this.mouse)) {
      this.canvas.style.cursor = 'pointer';
      noHover = false;
    }

    if (noHover) {
      this.canvas.style.cursor = 'default';
    }
  };

  onMouseout = () => {
    this.mouse.x = 0;
    this.mouse.y = 0;
  };

  getSizeElement() {
    const { width, height } = this.canvas.getBoundingClientRect();
    return { width, height };
  }

  render() {
    this.clear();
    drawFillRect({ ...this.sizeCtx, color: theme.color.background.playingField });
    this.background?.render();
    this.cards.forEach((card) => card.render());
    this.dices.render();
    this.chips.forEach((chip) => chip.render());
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  moveChip(indexChip: number, indexCard: number) {
    const { center } = this.cards[indexCard];
    this.chips[indexChip].setCoordinates(center);
  }
}
