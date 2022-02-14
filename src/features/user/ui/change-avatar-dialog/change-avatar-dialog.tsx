import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  styled,
} from '@mui/material';
import { Formik } from 'formik';
import { ChangeEvent, memo } from 'react';

import { TChangeAvatarDataFormValues } from '../../types';

const Input = styled('input')`
  display: none;
`;

const ContentWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  width: 100%;
`;

type Props = {
  open: boolean;
  onSubmit: (values: TChangeAvatarDataFormValues) => Promise<void>;
  onClose: () => void;
};

export const ChangeAvatarDialog = memo(({ onClose, onSubmit, open }: Props) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
    <Formik<TChangeAvatarDataFormValues>
      initialValues={{
        avatar: null,
      }}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, values, isSubmitting, setFieldValue }) => (
        <>
          <DialogTitle>Изменить аватар</DialogTitle>
          <DialogContent>
            <ContentWrapper>
              {values.avatar && <Typography variant="body2">{values.avatar.name}</Typography>}
              <label htmlFor="avatar-file-input">
                <Input
                  id="avatar-file-input"
                  type="file"
                  accept="image/*"
                  onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                    const file = evt.target?.files?.[0];

                    if (file) {
                      setFieldValue('avatar', file);
                    }
                  }}
                />
                <Button variant="text" component="span" size="large">
                  {values.avatar ? 'Изменить файл' : 'Выбрать файл'}
                </Button>
              </label>
            </ContentWrapper>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} disabled={isSubmitting}>
              Отмена
            </Button>
            <LoadingButton
              loading={isSubmitting}
              disabled={isSubmitting}
              onClick={() => handleSubmit()}
            >
              Сохранить
            </LoadingButton>
          </DialogActions>
        </>
      )}
    </Formik>
  </Dialog>
));
