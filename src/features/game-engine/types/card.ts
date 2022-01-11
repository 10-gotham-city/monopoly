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

export type TCardSetting =
  | TCardCornerSetting
  | TCardMainSetting
  | TCardNoPriceSetting
  | TCardWithImageSetting;

export type TCardCornerSetting = {
  type: TCardType.Corner;
  background: string;
};

export type TCardMainSetting = {
  type: TCardType.Main;
  color: TColorMainCard;
  title: string;
  price: number;
};

export type TCardNoPriceSetting = {
  type: TCardType.NoPrice;
  title: string;
  background: string;
};

export type TCardWithImageSetting = {
  type: TCardType.WithImage;
  title: string;
  amount: number;
  background: string;
};
