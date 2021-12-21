import { InputHTMLAttributes, memo, ComponentProps } from 'react';
import { TextField, Typography, useTheme } from '@mui/material';
import { Field, FieldProps } from 'formik';

type Props = {
  label: string;
  name: string;
  type?: InputHTMLAttributes<unknown>['type'];
  inputProps?: ComponentProps<typeof TextField>['InputProps'];
};

export const InputField = memo(
  ({ name, label, type = 'text', inputProps }: Props) => {
    const theme = useTheme();

    return (
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
            helperText={
              meta.touched && (
                <Typography color={theme.palette.error.main}>
                  {meta.error}
                </Typography>
              )
            }
            onChange={field.onChange}
            onBlur={field.onBlur}
            fullWidth
            InputProps={inputProps}
          />
        )}
      </Field>
    );
  },
);
