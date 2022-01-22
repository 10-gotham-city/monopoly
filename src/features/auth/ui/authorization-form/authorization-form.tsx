import { LoadingButton } from '@mui/lab';
import { Grid, Link } from '@mui/material';
import { FormikHelpers, FormikProps } from 'formik';
import { memo, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as yup from 'yup';

import { AuthorizationFormNames, TAuthorizationFormValues } from 'features/auth/types';

import { AuthFormTemplate } from 'entities/auth';

import { routes } from 'shared/config';
import { InputField } from 'shared/ui/components';

type Props = {
  onSubmit: (
    values: TAuthorizationFormValues,
    helpers: FormikHelpers<TAuthorizationFormValues>,
  ) => void;
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
          <InputField name={AuthorizationFormNames.Password} label="Пароль" type="password" />
        </Grid>
      </Grid>
    ),
    [],
  );

  const buttons = useCallback(
    ({ handleSubmit, isSubmitting }: FormikProps<TAuthorizationFormValues>) => (
      <>
        <LoadingButton
          variant="contained"
          size="large"
          loading={isSubmitting}
          onClick={() => handleSubmit()}
        >
          Войти
        </LoadingButton>
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
