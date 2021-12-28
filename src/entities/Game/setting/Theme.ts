export class Theme {
  private static inst: Theme;
  color = {
    background: {
      playingField: '#06262a',
      card: {
        normal: '#F0F6F8',
        hover: '#ceeeda',
      },
    },
    dice: {
      background: '#F0F6F8',
      dots: '#0d1c00',
    },
    base: '#c4eda4',
    stroke: '#0d1c00',
    text: '#000000',
  };

  background = '/sprites/background.png';

  static get instance() {
    if (Theme.inst) {
      return Theme.inst;
    }
    return new Theme();
  }
}
