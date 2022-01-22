import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { memo } from 'react';
import * as yup from 'yup';

import { regexp } from 'shared/lib';
import { InputField, getNumberFormatCustom } from 'shared/ui/components';

import { ChangeUserDataFormNames, TChangeUserDataFormValues } from '../../types';

const validationSchema: yup.SchemaOf<TChangeUserDataFormValues> = yup.object().shape({
  'first-name': yup.string().required('Обязательное поле'),
  'second-name': yup.string().required('Обязательное поле'),
  'display-name': yup.string().required('Обязательное поле'),
  email: yup.string().required('Обязательное поле').matches(regexp.email, 'Неверный формат'),
  login: yup.string().required('Обязательное поле'),
  phone: yup.string().required('Обязательное поле').matches(regexp.phone, 'Неверный формат'),
});

const FormatPhoneCustom = getNumberFormatCustom({ format: '+# ### ### ## ##' });

type Props = {
  open: boolean;
  initialValues: TChangeUserDataFormValues;
  onSubmit: (
    values: TChangeUserDataFormValues,
    helpers: FormikHelpers<TChangeUserDataFormValues>,
  ) => void;
  onClose: () => void;
};

export const ChangeUserDataDialog = memo(({ initialValues, open, onClose, onSubmit }: Props) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
    <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
      {({ handleSubmit, isSubmitting }) => (
        <Form>
          <DialogTitle>Изменить данные</DialogTitle>
          <DialogContent
            sx={{
              overflow: 'initial',
            }}
          >
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <InputField label="Имя" name={ChangeUserDataFormNames.FirstName} required />
              </Grid>
              <Grid item>
                <InputField label="Фамилия" name={ChangeUserDataFormNames.SecondName} required />
              </Grid>
              <Grid item>
                <InputField
                  label="Отображаемое имя"
                  name={ChangeUserDataFormNames.DisplayName}
                  required
                />
              </Grid>
              <Grid item>
                <InputField label="Логин" name={ChangeUserDataFormNames.Login} required />
              </Grid>
              <Grid item>
                <InputField label="Email" name={ChangeUserDataFormNames.Email} required />
              </Grid>
              <Grid item>
                <InputField
                  label="Телефон"
                  name={ChangeUserDataFormNames.Phone}
                  required
                  inputProps={{
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    inputComponent: FormatPhoneCustom as any,
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} disabled={isSubmitting}>
              Отмена
            </Button>
            <LoadingButton loading={isSubmitting} onClick={() => handleSubmit()}>
              Сохранить
            </LoadingButton>
          </DialogActions>
        </Form>
      )}
    </Formik>
  </Dialog>
));
