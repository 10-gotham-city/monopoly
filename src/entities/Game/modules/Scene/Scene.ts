import { BackgroundImage } from 'entities/Game/modules/BackgroundImage';
import { Cards } from 'entities/Game/modules/Cards';
import { Chips } from 'entities/Game/modules/Chips';
import { Dices } from 'entities/Game/modules/Dices';
import { drawFillRect } from 'entities/Game/utils/drawFillRect';
import { Main } from 'entities/Game/modules/Cards/typesCard/Main';
import { theme } from 'entities/Game/setting/theme';
import { GameLoop } from './modules/GameLoop';
import { Canvas } from './modules/Canvas';

type TScene = {
  canvas: HTMLCanvasElement;
  onRollDices: () => void;
  onClickCard: (card: Main) => void;
};

// TODO Добавить ресайз
// TODO Добавить ожидание загрузки ресурсов
// TODO обработать исключения
export class Scene extends GameLoop {
  private readonly canvas: Canvas;
  private background: BackgroundImage | undefined;
  private dices: Dices | undefined;
  cards: Cards | undefined;
  chips: Chips | undefined;

  private readonly onRollDices: () => void;

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

  static async init(props: TScene) {
    const scene = new Scene(props);
    await scene.createElements();
    scene.gameLoop();
    return scene;
  }

  async createElements() {
    this.background = new BackgroundImage({
      ...this.canvas.sizeCtx,
      src: theme.background,
      isCenter: true,
    });
    await this.background.load();

    this.cards = await Cards.initAll(this.canvas.ctx, this.canvas.width);

    this.dices = new Dices({
      ctx: this.canvas.ctx,
      canvasSize: this.canvas.width,
    });

    this.chips = new Chips(this.canvas.ctx);
  }

  onClick = async (e: MouseEvent): Promise<void> => {
    const mouseCord = this.canvas.getPositionMouseOnCanvas(e);

    const cardClick = this.cards?.checkClickMain(mouseCord);
    if (cardClick) {
      this.onClickCard(cardClick);
    }

    if (this.dices?.checkClick(mouseCord)) {
      this.onRollDices();
    }
  };

  onMousemove = (e: MouseEvent) => {
    const mouseCord = this.canvas.getPositionMouseOnCanvas(e);
    let isHover = this.cards!.checkHover(mouseCord);
    if (this.dices?.checkClick(mouseCord)) {
      isHover = true;
    }
    this.canvas.setCursor(isHover);
  };

  onMouseout = () => {
    this.cards?.clearHover();
  };

  render() {
    this.canvas.clear();
    drawFillRect({
      ...this.canvas.sizeCtx,
      color: theme.color.background.playingField,
    });
    this.background?.render();
    this.cards?.render();
    this.dices?.render();
    this.chips?.render();
  }

  update() {
    this.chips?.update();
  }
}
