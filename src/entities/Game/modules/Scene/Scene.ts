import { BackgroundImage } from 'entities/Game/modules/Card/modules/BackgroundImage/BackgroundImage';
import { Card } from 'entities/Game/modules/Card';
import { NoPrice } from 'entities/Game/modules/Card/typesCard/NoPrice';
import { Chip } from 'entities/Game/modules/Chip';
import { Corner } from 'entities/Game/modules/Card/typesCard/Corner';
import { Dices } from 'entities/Game/modules/Dice';
import { drawFillRect } from 'entities/Game/utils/drawFillRect';
import { Main } from 'entities/Game/modules/Card/typesCard/Main';
import { WithImage } from 'entities/Game/modules/Card/typesCard/WithImage';
import { TCardType } from 'entities/Game/types/card';
import { theme } from 'entities/Game/setting/theme';
import { GameLoop } from 'entities/Game/modules/Scene/GameLoop';
import { Canvas } from 'entities/Game/modules/Scene/Canvas';

type TScene = {
  canvas: HTMLCanvasElement;
  onRollDices: (value: number, double: boolean) => void;
  onClickCard: (card: Main) => void;
};

// TODO Добавить ресайз
// TODO Добавить ожидание загрузки ресурсов
// TODO обработать исключения
export class Scene extends GameLoop {
  private readonly canvas: Canvas;
  private background: BackgroundImage | undefined;
  private dices: Dices | undefined;
  cards: (Corner | NoPrice | Main | WithImage)[] = [];
  chips: Chip[] = [];
  private readonly onRollDices: (value: number, double: boolean) => void;
  private readonly onClickCard: (card: Main) => void;

  constructor({ canvas, onRollDices, onClickCard }: TScene) {
    super();
    this.canvas = new Canvas(canvas, {
      mousemove: this.onMousemove,
      mouseout: this.onMouseout,
      click: this.onClick,
    });
    this.onRollDices = onRollDices;
    this.onClickCard = onClickCard;
  }

  async createElements() {
    this.background = new BackgroundImage({
      ...this.canvas.sizeCtx,
      src: theme.background,
      isCenter: true,
    });
    await this.background.load();

    this.cards = await Card.initAll(this.canvas.ctx, this.canvas.width);

    this.dices = new Dices({
      ctx: this.canvas.ctx,
      canvasSize: this.canvas.width,
    });

    // TODO сделать инициализацию фишек из состояния игры
    this.chips = [
      new Chip({
        ctx: this.canvas.ctx,
        color: 'red',
      }),
    ];
  }

  onClick = async (e: MouseEvent): Promise<void> => {
    const mouseCord = this.canvas.getPositionMouseOnCanvas(e);

    const cardClick = this.cards.find((card) => card.checkHover(mouseCord));
    if (cardClick && cardClick.type === TCardType.Main) {
      this.onClickCard(cardClick as Main);
    }

    if (this.dices?.isPointInPath(mouseCord)) {
      const { value, double } = await this.dices.roll();
      this.onRollDices(value, double);
    }
  };

  onMousemove = (e: MouseEvent) => {
    const mouseCord = this.canvas.getPositionMouseOnCanvas(e);

    let isHover = false;
    this.cards.forEach((card) => {
      if (card.type === TCardType.Main || card.type === TCardType.WithImage) {
        const hoverCard = card.checkHover(mouseCord);
        if (hoverCard) {
          isHover = true;
        }
      }
    });

    if (this.dices?.isPointInPath(mouseCord)) {
      isHover = true;
    }

    this.canvas.setCursor(isHover);
  };

  onMouseout = () => {
    this.cards.forEach((card) => {
      card.checkHover();
    });
  };

  render() {
    this.canvas.clear();
    drawFillRect({
      ...this.canvas.sizeCtx,
      color: theme.color.background.playingField,
    });
    this.background?.render();
    this.cards.forEach((card) => card.render());
    this.dices?.render();
    this.chips.forEach((chip) => chip.render());
  }
}
