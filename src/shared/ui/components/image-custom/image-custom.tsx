type Prop = {
  className?: string;
  src: string;
  alt: string;
  prop?: unknown;
};

export const ImageCustom = ({ className, src, alt, ...prop }: Prop) => (
  <img className={className} src={src} alt={alt} {...prop} />
);
