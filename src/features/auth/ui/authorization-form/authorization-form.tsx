import { Button, Grid, Link } from '@mui/material';
import { FormikProps } from 'formik';
import { memo, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as yup from 'yup';

import { AuthorizationFormNames, TAuthorizationFormValues } from 'features/auth/types';

import { AuthFormTemplate } from 'entities/auth';

import { routes } from 'shared/config';
import { InputField } from 'shared/ui/components';

type Props = {
  onSubmit: () => void;
};

const validationSchema: yup.SchemaOf<TAuthorizationFormValues> = yup.object().shape({
  login: yup.string().required('Обязательное поле'),
  password: yup.string().required('Обязательное поле'),
});

const defaultValues: TAuthorizationFormValues = {
  login: '',
  password: '',
};

export const AuthorizationForm = memo(({ onSubmit }: Props) => {
  const content = useCallback(
    () => (
      <Grid container spacing={3}>
        <Grid item width={1}>
          <InputField name={AuthorizationFormNames.Login} label="Логин" />
        </Grid>
        <Grid item width={1}>
          <InputField name={AuthorizationFormNames.Password} label="Пароль" />
        </Grid>
      </Grid>
    ),
    [],
  );

  const buttons = useCallback(
    ({ handleSubmit }: FormikProps<TAuthorizationFormValues>) => (
      <>
        <Button variant="contained" size="large" onClick={() => handleSubmit()}>
          Войти
        </Button>
        <Link component={RouterLink} to={routes.registration}>
          Зарегистрироваться
        </Link>
      </>
    ),
    [],
  );

  return (
    <AuthFormTemplate<TAuthorizationFormValues>
      title="Вход"
      validationSchema={validationSchema}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      content={content}
      buttons={buttons}
    />
  );
});
