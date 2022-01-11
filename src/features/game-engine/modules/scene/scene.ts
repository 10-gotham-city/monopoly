import { Cards } from 'features/game-engine/modules/cards';
import { Chips } from 'features/game-engine/modules/chips';
import { Dices } from 'features/game-engine/modules/dices';
import { fillRect } from 'features/game-engine/utils/fillRect';
import { theme } from 'features/game-engine/setting/theme';
import { EventBus } from 'features/game-engine/modules/event-bus';
import { EVENTS_NAME } from 'features/game-engine/setting/events-name';
import { GameLoop } from './game-loop';
import { Canvas } from './canvas';
import { Background } from './background';

// TODO Добавить ресайз
// TODO Добавить ожидание загрузки ресурсов
// TODO обработать исключения
export class Scene {
  private readonly canvas: Canvas;
  private readonly gameLoop: GameLoop;
  private background: Background | undefined;
  private dices: Dices | undefined;
  private cards: Cards | undefined;
  private chips: Chips | undefined;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = new Canvas(canvas);
    this.gameLoop = new GameLoop({
      render: this.render,
      update: this.update,
    });
  }

  static async init(canvas: HTMLCanvasElement) {
    const scene = new Scene(canvas);
    await scene.createElements();
    scene.gameLoop.run();
    scene.addEventListeners();
    return scene;
  }

  private addEventListeners() {
    this.canvas.addEventListeners({
      mousemove: this.onMousemove,
      mouseout: this.onMouseout,
      click: this.onClick,
    });
  }

  private fillBackground() {
    fillRect({
      ...this.canvas.sizeAndCtx,
      color: theme.color.background.playingField,
    });
  }

  async createElements() {
    this.background = await Background.initImage({
      ctx: this.canvas.ctx,
      canvasSize: this.canvas.width,
    });

    this.cards = await Cards.initAll(this.canvas.ctx, this.canvas.width);

    this.dices = new Dices({
      ctx: this.canvas.ctx,
      canvasSize: this.canvas.width,
    });

    this.chips = new Chips(this.canvas.ctx);
  }

  onClick = (e: MouseEvent) => {
    const mouseCord = this.canvas.getPositionMouseOnCanvas(e);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const cardClick = this.cards!.checkClickAssetCard(mouseCord);
    if (cardClick) {
      EventBus.getInstance().emit(EVENTS_NAME.CLICK_CARD, cardClick);
    }

    if (this.dices?.isPointInPath(mouseCord)) {
      EventBus.getInstance().emit(EVENTS_NAME.ROLL_DICES);
    }
  };

  onMousemove = (e: MouseEvent) => {
    const mouseCord = this.canvas.getPositionMouseOnCanvas(e);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    let isHover = this.cards!.checkHoverAssetCard(mouseCord);
    if (this.dices?.isPointInPath(mouseCord)) {
      isHover = true;
    }
    this.canvas.setCursor(isHover);
  };

  onMouseout = () => {
    this.cards?.clearHover();
  };

  render = () => {
    this.canvas.clear();
    this.fillBackground();
    this.background?.render();
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    this.cards!.render();
    this.dices!.render();
    this.chips!.render();
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  };

  update = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.chips!.update();
  };
}
