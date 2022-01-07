import { Chip } from './modules/Chip';
import { Cards } from 'entities/Game/modules/Cards';
import { TCardOrientation } from 'entities/Game/types/card';
import { EventBus } from 'entities/Game/modules/EventBus';
import { EVENTS_NAME } from 'entities/Game/modules/EventBus/eventsName';

export class Chips {
  chips: Chip[];
  private static instance: Chips;

  constructor(ctx: CanvasRenderingContext2D) {
    // TODO сделать инициализацию фишек из состояния игры
    const CHIPS = [
      {
        color: 'red',
      },
      {
        color: 'blue',
      },
    ];

    this.chips = CHIPS.map(({ color }) => new Chip({ color, ctx }));

    this.getCoordinatesForCard(0).forEach(({ chip, coordinates }) => {
      chip.setCoordinates(coordinates);
    });

    Chips.instance = this;

    this.addEventListener();
  }

  private addEventListener() {
    EventBus.getInstance().on(EVENTS_NAME.CHIP_IN_CENTER_CARD, this.finishMove);
  }

  static getInstance() {
    return Chips.instance;
  }

  getChipByIndex(index: number) {
    return this.chips[index];
  }

  render() {
    this.chips.forEach((chip) => chip.render());
  }

  update() {
    this.chips.forEach((chip) => chip.update());
  }

  /**
   * Рассчитать координаты фишек на целевой карточке
   */
  getCoordinatesForCard(indexCard: number) {
    const card = Cards.getInstance().getCardByIndex(indexCard);
    const { orientation } = card;
    // координаты центра области фишек
    const { x, y } = card.chipPosition;
    // расстояние между фишками
    const step = Chip.stepInCard;
    // фишки на карточке
    const chips = this.chips.filter(({ position }) => position === indexCard);
    const count = chips.length;

    if (orientation === TCardOrientation.Horizontal) {
      let startY = Math.floor(y - ((count - 1) * step) / 2);
      return chips.map((chip) => {
        const coordinates = {
          x,
          y: startY,
        };
        startY += step;
        return { chip, coordinates };
      });
    }

    let startX = Math.floor(x - ((count - 1) * step) / 2);
    return chips.map((chip) => {
      const coordinates = {
        x: startX,
        y,
      };
      startX += step;
      return { chip, coordinates };
    });
  }

  /**
   * Получить координаты count карточек, начиная с карточки index
   */
  getIntervalCardsCenter(index: number, count: number) {
    let centerCards = [];

    while (centerCards.length <= count) {
      const { center } = Cards.getInstance().getCardByIndex(index);
      centerCards.push(center);
      index++;
      if (index === 40) {
        index = 0;
      }
    }

    return centerCards;
  }

  moveChip(indexChip: number, value: number = 0) {
    const chip = this.getChipByIndex(indexChip);
    const startCard = chip.position;
    const moveCoordinates = this.getIntervalCardsCenter(startCard, value);

    chip.moveBetweenCards(value, moveCoordinates);

    // обновить фишки на стартовой карточке
    this.arrangeChipsOnCard(startCard);
  }

  /**
   * Расставить фишки на карточке
   * @param indexCard
   */
  arrangeChipsOnCard(indexCard: number) {
    this.getCoordinatesForCard(indexCard).forEach(({ chip, coordinates }) => {
      chip.moveInsideCard(coordinates);
    });
  }

  private finishMove = (index: number) => {
    this.arrangeChipsOnCard(index);
    EventBus.getInstance().emit(EVENTS_NAME.READY_STEP, index);
  };
}
