export enum TCardType {
  Corner = 'corner', // Старт
  Chance = 'chance', // Шанс
  Other = 'other', // Дополнительные
  Main = 'main', // Основные карточки
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

export enum TCardOrientation {
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left',
}

export type TMouse = {
  x: number;
  y: number;
};
export type TCardSetting = TCardCorner | TCardMain | TCardChance | TCardOther;

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

export type TCardChance = {
  type: TCardType.Chance;
  title: string;
  background: string;
};

export type TCardOther = {
  type: TCardType.Other;
  title: string;
  amount: number;
  background: string;
};
