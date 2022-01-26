import { Chips, Dices, EventBus, Scene } from './modules';
import { EVENTS_NAME } from './setting';

/**
 * Движок игры
 * предназначен для управления элементами на сцене
 */
export class GameEngine {
  scene: Scene | undefined;
  private myChipIndex = 0;
  private readonly eventBus: EventBus;
  private canRollDices = true;

  constructor() {
    this.eventBus = new EventBus();
  }

  static async init(canvas: HTMLCanvasElement) {
    const game = new GameEngine();
    await game.addScene(canvas);
    game.start();
  }

  private async addScene(canvas: HTMLCanvasElement) {
    this.scene = await Scene.init(canvas);
    this.addEventListeners();
  }

  addEventListeners() {
    // eslint-disable-next-line  @typescript-eslint/no-misused-promises
    this.eventBus.on(EVENTS_NAME.ROLL_DICES, this.onRollDices);
    this.eventBus.on(EVENTS_NAME.CLICK_CARD, this.onClickCard);
    this.eventBus.on(EVENTS_NAME.READY_STEP, this.onReadyStep);
  }

  /**
   * Кинуть кубики
   */
  private onRollDices = async () => {
    if (!this.canRollDices) {
      return;
    }
    // TODO раскомментировать после добавления логики смены хода
    // this.canRollDices = false;

    const { value, double } = await Dices.getInstance().roll();

    // TODO double - повтор хода
    // eslint-disable-next-line no-console
    console.log(value, double);

    GameEngine.moveChip(this.myChipIndex, value);

    // TODO убрать. Используется для имитации одновременного перемещения фишек
    this.myChipIndex = this.myChipIndex === 0 ? 1 : 0;
  };

  /**
   * Нажали на карточку
   */
  // eslint-disable-next-line class-methods-use-this
  private onClickCard = (card: unknown) => {
    // TODO открыть модалку карточки
    // eslint-disable-next-line no-console
    console.log(card);
  };

  /**
   * Фишка пришла на поле
   */
  // eslint-disable-next-line class-methods-use-this
  private onReadyStep = (index: number) => {
    // TODO обработать ход
    // eslint-disable-next-line no-console
    console.log('Фишка пришла на поле', index);
  };

  private static moveChip(indexChip: number, dicesValue: number) {
    Chips.getInstance().moveChip(indexChip, dicesValue);
  }

  // TODO написать методы
  /**
   * Переход на определенную карточку
   */
  // moveChipToCard(indexChip: number, indexCard: number) {}

  /**
   * Переход в тюрьму
   */
  // moveChipToJail(indexChip: number) {}

  // eslint-disable-next-line class-methods-use-this
  start() {}
}
