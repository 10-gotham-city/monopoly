import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  styled,
} from '@mui/material';
import { useCallback, useState } from 'react';

const WrapperButton = styled(Box)`
  display: flex;
  justify-content: flex-end;
`;

export const AddForumThemeDialog = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const handleAddTheme = useCallback(() => null, []);

  return (
    <>
      <WrapperButton>
        <Button variant="outlined" onClick={handleClickOpen}>
          Создать тему
        </Button>
      </WrapperButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Добавить тему</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Введите название темы, которую хотели бы открыть для обсуждения.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="theme"
            label="Тема"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleAddTheme}>Добавить</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
