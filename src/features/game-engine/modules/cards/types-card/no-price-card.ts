import { TCardNoPriceSetting } from 'features/game-engine/types';
import { TemplateText, Background, CardRect, TCardRect } from '../modules';

export type TNoPriceCard = TCardRect & TCardNoPriceSetting;

export class NoPriceCard extends CardRect {
  private background: Background | undefined;
  private readonly title: TemplateText;
  private static readonly CONST_NO_PRICE = {
    // Размеры относительно карточки
    SHIFT_TITLE: 0.85,
  };

  constructor({ title, ...props }: Omit<TNoPriceCard, 'background'>) {
    super(props);

    const { index, canvasSize } = props;
    this.setSizeCard(index, canvasSize);

    this.title = new TemplateText({
      ...this.propsForElements,
      text: title,
      shift: NoPriceCard.CONST_NO_PRICE.SHIFT_TITLE,
    });
  }

  static async init({ background, ...props }: TNoPriceCard): Promise<NoPriceCard> {
    const instance = new NoPriceCard(props);
    await instance.addBackground(background);
    return instance;
  }

  private async addBackground(src: string) {
    this.background = await Background.initImage({ ...this.propsForElements, src });
  }

  render() {
    this.fillRect();
    this.background?.render();
    this.title.render();
    this.strokeRect();
  }
}
