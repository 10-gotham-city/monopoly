export enum TCardType {
  Main = 'main', // основные карточки (улицы)
  Corner = 'corner', // угловые карточки
  NoPrice = 'noPrice', // казна, шанс
  WithImage = 'withImage', // жж, налоги, электростация и водоканал
}

export enum TColorMainCard {
  Red = '#da2128',
  Orange = '#f58220',
  Yellow = '#ffc61a',
  Green = '#48b85e',
  Blue = '#0078bf',
  Brown = '#894e35',
  Pink = '#e66ac0',
  Gray = '#a1a2a3',
}

export enum TCardPosition {
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left',
}

export enum TCardOrientation {
  Corner = 'corner',
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

export type TMouse = {
  x: number;
  y: number;
};

export type TCard = TCardCorner | TCardMain | TCardNoPrice | TCardWithImage;

export type TCardCorner = {
  type: TCardType.Corner;
  background: string;
};

export type TCardMain = {
  type: TCardType.Main;
  color: TColorMainCard;
  title: string;
  price: number;
};

export type TCardNoPrice = {
  type: TCardType.NoPrice;
  title: string;
  background: string;
};

export type TCardWithImage = {
  type: TCardType.WithImage;
  title: string;
  amount: number;
  background: string;
};
