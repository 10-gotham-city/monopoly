import { memo } from 'react';
import { Card, Typography, Box, Grid, styled, Button } from '@mui/material';
import { InputField } from 'shared/ui/components';
import { Formik } from 'formik';
import * as yup from 'yup';
import { TRegistrationFormValues, RegistrationFormNames } from '../../types';

const FormCard = styled(Card)`
  max-width: 420px;
  padding: ${({ theme }) => theme.spacing(2)};
`;

const ButtonsWrapper = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing(3)} ${theme.spacing(4)} 0`};
`;

// TODO: Добавить специфичную валидацию для полей
const validationSchema: yup.SchemaOf<TRegistrationFormValues> = yup
  .object()
  .shape({
    'first-name': yup.string().required('Обязательное поле'),
    'second-name': yup.string().required('Обязательное поле'),
    email: yup.string().required('Обязательное поле'),
    login: yup.string().required('Обязательное поле'),
    password: yup.string().required('Обязательное поле'),
    phone: yup.string().required('Обязательное поле'),
  });

const defaultValues: TRegistrationFormValues = {
  'first-name': '',
  'second-name': '',
  email: '',
  login: '',
  password: '',
  phone: '',
};

type Props = {
  onSubmit: () => void;
};

export const RegistrationForm = memo(({ onSubmit }: Props) => (
  <FormCard>
    <Box display="flex" justifyContent="center" mb={2}>
      <Typography variant="h5">Регистрация</Typography>
    </Box>

    <Formik<TRegistrationFormValues>
      initialValues={defaultValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <>
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
              <InputField
                name={RegistrationFormNames.SecondName}
                label="Фамилия"
              />
            </Grid>
            <Grid item width={1}>
              <InputField name={RegistrationFormNames.Phone} label="Телефон" />
            </Grid>
            <Grid item width={1}>
              <InputField
                name={RegistrationFormNames.Password}
                label="Пароль"
              />
            </Grid>
          </Grid>

          <ButtonsWrapper>
            <Button
              variant="contained"
              size="large"
              onClick={() => handleSubmit()}
            >
              Зарегистрироваться
            </Button>
          </ButtonsWrapper>
        </>
      )}
    </Formik>
  </FormCard>
));
