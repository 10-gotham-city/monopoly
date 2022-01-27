import { CornerCard, TCornerCard } from './corner-card';
import { NoPriceCard, TNoPriceCard } from './no-price-card';
import { WithImageCard, TWithImageCard } from './with-image-card';
import { MainCard, TMainCard } from './main-card';

type TCard = CornerCard | NoPriceCard | MainCard | WithImageCard;

type TCardInitProps = TCornerCard | TNoPriceCard | TWithImageCard | TMainCard;

type TCardInit = (props: TCardInitProps) => Promise<TCard> | TCard;

type TAssetCard = MainCard | WithImageCard;

export { CornerCard, MainCard, NoPriceCard, WithImageCard, TCard, TCardInit, TAssetCard };
