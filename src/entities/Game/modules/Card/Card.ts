import { NoPrice } from './typesCard/NoPrice';
import { Corner } from './typesCard/Corner';
import { Main } from './typesCard/Main';
import { WithImage } from './typesCard/WithImage';
import { TCard, TCardType } from '../../types/card';
import { topic } from '../../setting/topic';

type TCardInit = {
  card: TCard;
  index: number;
  ctx: CanvasRenderingContext2D;
  canvasSize: number;
};

/**
 * Создание экземпляров карточек в соответствии с типом
 */
export class Card {
  static async initAll(ctx: CanvasRenderingContext2D, canvasSize: number) {
    return Promise.all(
      topic.cards.map((card, index) => Card.init({ card, index, ctx, canvasSize })),
    );
  }

  static async init(props: TCardInit): Promise<Corner | Main | NoPrice | WithImage> {
    const { card, index, ctx, canvasSize } = props;
    const { type } = card;
    const rectProps = { index, canvasSize, ctx };

    if (type === TCardType.Corner) {
      return Corner.init(rectProps);
    }
    if (type === TCardType.Main) {
      return new Main(rectProps);
    }
    if (type === TCardType.NoPrice) {
      return NoPrice.init(rectProps);
    }
    return WithImage.init(rectProps);
  }
}
