import { BackgroundImage } from 'entities/Game/modules/Card/modules/BackgroundImage';
import { drawFillRect } from 'entities/Game/utils/drawFillRect';
import { Rect } from 'entities/Game/modules/Card/modules/Rect';
import { TCard } from 'entities/Game/modules/Card/typesCard/types';
import { TCardChance, TCardType } from 'entities/Game/types/card';
import { TemplateText } from 'entities/Game/modules/Card/modules/TemplateText';
import { theme } from 'entities/Game/setting/theme';
import { topic } from 'entities/Game/setting/topic';

export class Chance extends Rect {
  background: BackgroundImage;
  type = TCardType.Chance;

  title: TemplateText;

  constructor({ position, canvasSize, ctx, orientation }: TCard) {
    super({ position, canvasSize, ctx });
    const { title, background } = topic.cards[position] as TCardChance;

    this.title = new TemplateText({
      ...this.sizeCtx,
      orientation,
      text: title,
      shift: 0.85,
    });

    this.background = new BackgroundImage({
      ...this.sizeCtx,
      ctx: this.ctx,
      src: background,
      isCenter: true,
      orientation,
    });
  }

  static async init(props: TCard): Promise<Chance> {
    const instance = new Chance(props);
    await instance.background.load();
    return instance;
  }

  render() {
    drawFillRect({ ...this.sizeCtx, color: theme.color.background.card.normal });
    this.renderStroke();
    this.background.render();
    this.title.render();
  }
}
