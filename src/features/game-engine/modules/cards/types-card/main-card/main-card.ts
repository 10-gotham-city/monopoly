import { TCardMainSetting } from 'features/game-engine/types';
import { topic } from 'features/game-engine/setting';
import { CardRect, TCardRect } from '../../modules/card-rect';
import { TemplateText } from '../../modules/template-text';
import { Label } from './label';

export type TMainCard = TCardRect & TCardMainSetting;

export class MainCard extends CardRect {
  private static readonly CONST_MAIN_CARD = {
    // Размеры относительно карточки
    SHIFT_TITLE: 0.8,
    SHIFT_PRISE: 0.1,
  };

  private readonly title: TemplateText;
  private readonly price: TemplateText;
  private readonly label: Label;

  constructor({ title, color, price, ...props }: TMainCard) {
    super(props);

    const { index, canvasSize } = props;
    this.setSizeCard(index, canvasSize);

    this.title = new TemplateText({
      ...this.propsForElements,
      text: title,
      shift: MainCard.CONST_MAIN_CARD.SHIFT_TITLE,
    });

    this.price = new TemplateText({
      ...this.propsForElements,
      text: `${price} ${topic.currency}`,
      shift: MainCard.CONST_MAIN_CARD.SHIFT_PRISE,
    });

    this.label = new Label({
      ...this.propsForElements,
      color,
    });
  }

  static init(props: TMainCard) {
    return new MainCard(props);
  }

  render() {
    this.fillRect();
    this.label.render();
    this.title.render();
    this.price.render();
    this.strokeRect();
  }
}
