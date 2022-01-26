import { topic } from 'features/game-engine/setting';
import { TCardWithImageSetting } from 'features/game-engine/types';

import { Background, CardRect, TCardRect, TemplateText } from '../modules';

export type TWithImageCard = TCardRect & TCardWithImageSetting;

export class WithImageCard extends CardRect {
  private static readonly SIZE_WITH_IMAGE = {
    // Размеры относительно карточки
    SHIFT_TITLE: 0.85,
    SHIFT_AMOUNT: 0.1,
  };

  private background: Background | undefined;
  private readonly amount: TemplateText;
  private readonly title: TemplateText;

  constructor({ title, amount, ...props }: Omit<TWithImageCard, 'background'>) {
    super(props);
    const { index, canvasSize } = props;
    this.setSizeCard(index, canvasSize);

    this.title = new TemplateText({
      ...this.propsForElements,
      text: title,
      shift: WithImageCard.SIZE_WITH_IMAGE.SHIFT_TITLE,
    });

    this.amount = new TemplateText({
      ...this.propsForElements,
      text: `${amount} ${topic.currency}`,
      shift: WithImageCard.SIZE_WITH_IMAGE.SHIFT_AMOUNT,
    });
  }

  private async addBackground(src: string) {
    this.background = await Background.initImage({ ...this.propsForElements, src });
  }

  static async init({ background, ...props }: TWithImageCard): Promise<WithImageCard> {
    const instance = new WithImageCard(props);
    await instance.addBackground(background);
    return instance;
  }

  render() {
    this.fillRect();
    this.background?.render();
    this.title.render();
    this.amount.render();
    this.strokeRect();
  }
}
