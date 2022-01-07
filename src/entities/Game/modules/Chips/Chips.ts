import { Chip } from './modules/Chip';
import { Cards } from 'entities/Game/modules/Cards';
import { TCardOrientation } from 'entities/Game/types/card';

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
   * @param indexCard
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
   * @param index
   * @param count
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

    // callback перемещения фишки - расставить фишки на одной карточке
    const callbackMove = () => {
      this.arrangeChipsOnCard(chip.position);
    };
    chip.setMoveCoordinates(value, moveCoordinates, callbackMove);

    // обновить фишки на стартовой карточке
    this.arrangeChipsOnCard(startCard);
  }

  // Расставить фишки на карточке
  arrangeChipsOnCard(indexCard: number) {
    this.getCoordinatesForCard(indexCard).forEach(({ chip, coordinates }) => {
      chip.setMoveCoordinates(0, [coordinates]);
    });
  }
}
