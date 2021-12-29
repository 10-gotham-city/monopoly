import { BackgroundImage } from 'entities/Game/modules/Card/modules/BackgroundImage/BackgroundImage';
import { drawFillRect } from 'entities/Game/utils/drawFillRect';
import { Rect } from 'entities/Game/modules/Card/modules/Rect/Rect';
import { TCard } from 'entities/Game/modules/Card/typesCard/types';
import { TCardCorner, TCardType } from 'entities/Game/types/card';
import { theme } from 'entities/Game/setting/theme';
import { topic } from 'entities/Game/setting/topic';

type TCardCornerProps = Omit<TCard, 'orientation'>;

export class Corner extends Rect {
  background: BackgroundImage;

  type = TCardType.Corner;

  constructor({ position, canvasSize, ctx }: TCardCornerProps) {
    super({ position, canvasSize, ctx });
    this.background = new BackgroundImage({
      ...this.sizeCtx,
      src: (topic.cards[position] as TCardCorner).background,
    });
  }

  static async init(props: TCardCornerProps): Promise<Corner> {
    const instance = new Corner(props);
    await instance.background.load();
    return instance;
  }

  render() {
    drawFillRect({ ...this.sizeCtx, color: theme.color.background.card.normal });
    this.background?.render();
    this.renderStroke();
  }
}
