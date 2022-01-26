import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
} from '@mui/material';
import { memo } from 'react';

const Input = styled('input')`
  display: none;
`;

type Props = {
  open: boolean;
  isLoading: boolean;
  onSubmit: () => void;
  onClose: () => void;
};

export const ChangeAvatarDialog = memo(({ onClose, onSubmit, isLoading, open }: Props) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
    <DialogTitle>Изменить аватар</DialogTitle>
    <DialogContent>
      <Box display="flex" justifyContent="center" width={1}>
        <label htmlFor="avatar-file-input">
          <Input id="avatar-file-input" type="file" accept="image/*" />
          <Button variant="text" component="span" size="large">
            Выбрать файл
          </Button>
        </label>
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} disabled={isLoading}>
        Отмена
      </Button>
      <LoadingButton loading={isLoading} onClick={onSubmit}>
        Сохранить
      </LoadingButton>
    </DialogActions>
  </Dialog>
));
