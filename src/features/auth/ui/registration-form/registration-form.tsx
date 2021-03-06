import { LoadingButton } from '@mui/lab';
import { Grid, Link } from '@mui/material';
import { FormikProps } from 'formik';
import { memo, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as yup from 'yup';

import { AuthFormTemplate } from 'entities/auth';

import { routes } from 'shared/config';
import { regexp } from 'shared/lib';
import { InputField, getNumberFormatCustom } from 'shared/ui/components';

import { RegistrationFormNames, TRegistrationFormValues } from '../../types';

const validationSchema: yup.SchemaOf<TRegistrationFormValues> = yup.object().shape({
  'first-name': yup.string().required('Обязательное поле'),
  'second-name': yup.string().required('Обязательное поле'),
  email: yup.string().required('Обязательное поле').matches(regexp.email, 'Неверный формат'),
  login: yup.string().required('Обязательное поле'),
  password: yup.string().required('Обязательное поле'),
  phone: yup.string().required('Обязательное поле').matches(regexp.phone, 'Неверный формат'),
});

const defaultValues: TRegistrationFormValues = {
  'first-name': '',
  'second-name': '',
  email: '',
  login: '',
  password: '',
  phone: '',
};

const FormatPhoneCustom = getNumberFormatCustom({ format: '+# ### ### ## ##' });

type Props = {
  onSubmit: (values: TRegistrationFormValues) => Promise<void>;
};

export const RegistrationForm = memo(({ onSubmit }: Props) => {
  const content = useCallback(
    () => (
      <Grid container spacing={3}>
        <Grid item width={1}>
          <InputField name={RegistrationFormNames.Login} label="Логин" />
        </Grid>
        <Grid item width={1}>
          <InputField name={RegistrationFormNames.Email} label="Email" />
        </Grid>
        <Grid item width={1}>
          <InputField name={RegistrationFormNames.FirstName} label="Имя" />
        </Grid>
        <Grid item width={1}>
          <InputField name={RegistrationFormNames.SecondName} label="Фамилия" />
        </Grid>
        <Grid item width={1}>
          <InputField
            name={RegistrationFormNames.Phone}
            label="Телефон"
            inputProps={{
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              inputComponent: FormatPhoneCustom as any,
            }}
          />
        </Grid>
        <Grid item width={1}>
          <InputField name={RegistrationFormNames.Password} label="Пароль" type="password" />
        </Grid>
      </Grid>
    ),
    [],
  );

  const buttons = useCallback(
    ({ handleSubmit, isSubmitting }: FormikProps<TRegistrationFormValues>) => (
      <>
        <LoadingButton
          loading={isSubmitting}
          variant="contained"
          size="large"
          onClick={() => handleSubmit()}
        >
          Зарегистрироваться
        </LoadingButton>
        <Link component={RouterLink} to={routes.login}>
          Войти
        </Link>
      </>
    ),
    [],
  );

  return (
    <AuthFormTemplate<TRegistrationFormValues>
      title="Регистрация"
      validationSchema={validationSchema}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      content={content}
      buttons={buttons}
    />
  );
});
