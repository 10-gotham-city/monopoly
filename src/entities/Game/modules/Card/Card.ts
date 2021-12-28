import { Chance } from './typesCard/Chance';
import { Corner } from './typesCard/Corner';
import { Main } from './typesCard/Main';
import { Other } from './typesCard/Other';
import { TCardOrientation, TCardSetting, TCardType } from '../../types/card';
import { Topic } from '../../setting/Topic';

type TCardInit = {
  card: TCardSetting,
  position: number
  ctx: CanvasRenderingContext2D,
  canvasSize: number
};

export class Card {
  static async initAll(ctx: CanvasRenderingContext2D, canvasSize: number) {
    return Promise.all(Topic.instance.cards.map(
      (card, position) => Card.init({
        card, position, ctx, canvasSize,
      }),
    ));
  }

  static async init(props: TCardInit): Promise<Corner | Main | Chance | Other> {
    const {
      card, position, ctx, canvasSize,
    } = props;
    const { type } = card;
    const orientation = Card.getOrientation(position);
    const rectProps = {
      position, canvasSize, ctx, orientation,
    };

    if (type === TCardType.Corner) {
      return Corner.init(rectProps);
    }
    if (type === TCardType.Main) {
      return new Main(rectProps);
    }
    if (type === TCardType.Chance) {
      return Chance.init(rectProps);
    }
    return Other.init(rectProps);
  }

  private static getOrientation(position: number) {
    if (position < 10) {
      return TCardOrientation.Top;
    }
    if (position < 20) {
      return TCardOrientation.Right;
    }
    if (position < 30) {
      return TCardOrientation.Bottom;
    }
    return TCardOrientation.Left;
  }
}
