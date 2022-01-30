import { TextField } from '@mui/material';
import { Field, FieldProps } from 'formik';
import { ComponentProps, InputHTMLAttributes, memo } from 'react';

type Props = {
  label: string;
  name: string;
  required?: boolean;
  type?: InputHTMLAttributes<unknown>['type'];
  inputProps?: ComponentProps<typeof TextField>['InputProps'];
};

export const InputField = memo(({ name, label, type = 'text', inputProps, required }: Props) => (
  <Field name={name}>
    {({ field, meta, form: { isSubmitting } }: FieldProps<unknown>) => (
      <TextField
        name={name}
        id={name}
        type={type}
        label={label}
        value={field.value}
        error={meta.touched && Boolean(meta.error)}
        disabled={isSubmitting}
        required={required}
        helperText={meta.touched && meta.error}
        onChange={field.onChange}
        onBlur={field.onBlur}
        fullWidth
        InputProps={inputProps}
      />
    )}
  </Field>
));
