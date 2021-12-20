import { InputHTMLAttributes, memo } from 'react';
import { TextField, Typography, useTheme } from '@mui/material';
import { Field, FieldProps } from 'formik';

type Props = {
  label: string
  name: string
  type?: InputHTMLAttributes<unknown>['type']
};

// TODO: добавить возможность добавлять маску инпуту
export const InputField = memo(
  ({
    name,
    label,
    type = 'text',
  }: Props) => {
    const theme = useTheme();

    return (
      <Field
        name={name}

      >
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
              meta.touched && <Typography color={theme.palette.error.main}>{meta.error}</Typography>
            }
            onChange={field.onChange}
            onBlur={field.onBlur}
            fullWidth
          />
        )}
      </Field>
    );
  },
);
