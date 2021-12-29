import { TCardSetting, TCardType, TColorMainCard } from '../types/card';

const cards: TCardSetting[] = [
  {
    type: TCardType.Corner,
    background: '/sprites/start.png',
  },
  {
    title: 'Житная ул.',
    type: TCardType.Main,
    color: TColorMainCard.Brown,
    price: 60,
  },
  {
    title: 'Казна',
    type: TCardType.Chance,
    background: '/sprites/treasury.png',
  },
  {
    title: 'Нагатинская ул.',
    type: TCardType.Main,
    color: TColorMainCard.Brown,
    price: 60,
  },
  {
    title: 'Налог',
    type: TCardType.Other,
    amount: 100,
    background: '/sprites/tax.png',
  },
  {
    title: 'Рижская ж/д',
    type: TCardType.Other,
    amount: 200,
    background: '/sprites/railway-station.png',
  },
  {
    title: 'Варшавское ш.',
    type: TCardType.Main,
    color: TColorMainCard.Gray,
    price: 100,
  },
  {
    title: 'Шанс',
    type: TCardType.Chance,
    background: '/sprites/chance.png',
  },
  {
    title: 'ул. Огарева',
    type: TCardType.Main,
    color: TColorMainCard.Gray,
    price: 100,
  },
  {
    title: 'Парковая ул.',
    type: TCardType.Main,
    color: TColorMainCard.Gray,
    price: 120,
  },
  {
    type: TCardType.Corner,
    background: '/sprites/jail.png',
  },
  {
    title: 'ул. Полянка',
    type: TCardType.Main,
    color: TColorMainCard.Pink,
    price: 140,
  },
  {
    title: 'Электростанция',
    type: TCardType.Other,
    amount: 150,
    background: '/sprites/power-plant.png',
  },
  {
    title: 'ул. Сретенка',
    type: TCardType.Main,
    color: TColorMainCard.Pink,
    price: 140,
  },
  {
    title: 'Ростовская наб.',
    type: TCardType.Main,
    color: TColorMainCard.Pink,
    price: 160,
  },
  {
    title: 'Курская ж/д',
    type: TCardType.Other,
    amount: 200,
    background: '/sprites/railway-station.png',
  },
  {
    title: 'Рязанский просп.',
    type: TCardType.Main,
    color: TColorMainCard.Orange,
    price: 180,
  },
  {
    title: 'Шанс',
    type: TCardType.Chance,
    background: '/sprites/chance.png',
  },
  {
    title: 'ул. Вавилова',
    type: TCardType.Main,
    color: TColorMainCard.Orange,
    price: 180,
  },
  {
    title: 'Рублевское ш.',
    type: TCardType.Main,
    color: TColorMainCard.Orange,
    price: 200,
  },
  {
    type: TCardType.Corner,
    background: '/sprites/parking.png',
  },
  {
    title: 'ул. Тверская',
    type: TCardType.Main,
    color: TColorMainCard.Red,
    price: 220,
  },
  {
    title: 'Шанс',
    type: TCardType.Chance,
    background: '/sprites/chance.png',
  },
  {
    title: 'Пушкинская ул.',
    type: TCardType.Main,
    color: TColorMainCard.Red,
    price: 220,
  },
  {
    title: 'пл. Маяковского',
    type: TCardType.Main,
    color: TColorMainCard.Red,
    price: 240,
  },
  {
    title: 'Казанская ж/д',
    type: TCardType.Other,
    amount: 200,
    background: '/sprites/railway-station.png',
  },
  {
    title: 'пл. Грузинский вал',
    type: TCardType.Main,
    color: TColorMainCard.Yellow,
    price: 260,
  },
  {
    title: 'Новинский б-р',
    type: TCardType.Main,
    color: TColorMainCard.Yellow,
    price: 260,
  },
  {
    title: 'Водопровод',
    type: TCardType.Other,
    amount: 150,
    background: '/sprites/water-supply.png',
  },
  {
    title: 'Смоленская пл.',
    type: TCardType.Main,
    color: TColorMainCard.Yellow,
    price: 280,
  },
  {
    type: TCardType.Corner,
    background: '/sprites/go-jail.png',
  },
  {
    title: 'ул. Щусева',
    type: TCardType.Main,
    color: TColorMainCard.Green,
    price: 300,
  },
  {
    title: 'Гоголевский б-р',
    type: TCardType.Main,
    color: TColorMainCard.Green,
    price: 300,
  },
  {
    title: 'Казна',
    type: TCardType.Chance,
    background: '/sprites/treasury.png',
  },
  {
    title: 'Кутузовский просп.',
    type: TCardType.Main,
    color: TColorMainCard.Green,
    price: 320,
  },
  {
    title: 'Ленинградская ж/д',
    type: TCardType.Other,
    amount: 200,
    background: '/sprites/railway-station.png',
  },
  {
    title: 'Шанс',
    type: TCardType.Chance,
    background: '/sprites/chance.png',
  },
  {
    title: 'ул. Малая Бронная',
    type: TCardType.Main,
    color: TColorMainCard.Blue,
    price: 350,
  },
  {
    title: 'Сверхналог',
    type: TCardType.Other,
    amount: 200,
    background: '/sprites/super-tax.png',
  },
  {
    title: 'ул. Арбат',
    type: TCardType.Main,
    color: TColorMainCard.Blue,
    price: 400,
  },
];

/**
 * Тема игры (названия карточек, спрайты, цвета)
 * используется класс для дальнейшего перехода на смену тематики игры
 */
export const topic = {
  currency: '₽',
  cards,
};
