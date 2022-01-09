import { forwardRef } from 'react';
import NumberFormat from 'react-number-format';

type CustomProps = {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
};

type FormatProps = {
  format: string;
};

export const getNumberFormatCustom = ({ format }: FormatProps) =>
  forwardRef<HTMLElement, CustomProps>((props, ref) => {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        mask="_"
        format={format}
      />
    );
  });
