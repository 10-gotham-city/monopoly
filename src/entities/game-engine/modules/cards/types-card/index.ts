import { CornerCard, TCornerCard } from './corner-card';
import { MainCard, TMainCard } from './main-card';
import { NoPriceCard, TNoPriceCard } from './no-price-card';
import { TWithImageCard, WithImageCard } from './with-image-card';

type TCard = CornerCard | NoPriceCard | MainCard | WithImageCard;

type TCardInitProps = TCornerCard | TNoPriceCard | TWithImageCard | TMainCard;

type TCardInit = (props: TCardInitProps) => Promise<TCard> | TCard;

type TAssetCard = MainCard | WithImageCard;

export { CornerCard, MainCard, NoPriceCard, WithImageCard, TCard, TCardInit, TAssetCard };
