import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { memo } from 'react';

import { InputField } from 'shared/ui/components';

import { ChangePasswordFormNames, TChangePasswordFormValues } from '../../types';
import { validator } from './validator';

const defaultValues: TChangePasswordFormValues = {
  'old-password': '',
  'new-password': '',
  'repeat-new-password': '',
};

type Props = {
  open: boolean;
  onSubmit: (
    values: TChangePasswordFormValues,
    helpers: FormikHelpers<TChangePasswordFormValues>,
  ) => void;
  onClose: () => void;
};

export const ChangePasswordDialog = memo(({ open, onSubmit, onClose }: Props) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
    <Formik initialValues={defaultValues} onSubmit={onSubmit} validate={validator}>
      {({ handleSubmit, isSubmitting }) => (
        <Form>
          <DialogTitle>Изменить пароль</DialogTitle>
          <DialogContent
            sx={{
              overflow: 'initial',
            }}
          >
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <InputField
                  label="Старый пароль"
                  name={ChangePasswordFormNames.OldPassword}
                  required
                />
              </Grid>
              <Grid item>
                <InputField
                  label="Новый пароль"
                  name={ChangePasswordFormNames.NewPassword}
                  required
                />
              </Grid>
              <Grid item>
                <InputField
                  label="Повторите новый пароль"
                  name={ChangePasswordFormNames.RepeatNewPassword}
                  required
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
