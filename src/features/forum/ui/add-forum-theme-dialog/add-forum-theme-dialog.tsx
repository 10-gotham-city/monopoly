import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';

type Props = {
  open: boolean;
  handlerClose: () => void;
  handlerAddTheme: () => void;
};

export const AddForumThemeDialog = ({ open, handlerClose, handlerAddTheme }: Props) => (
  <Dialog open={open} onClose={handlerClose}>
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
      <Button onClick={handlerClose}>Отмена</Button>
      <Button onClick={handlerAddTheme}>Добавить</Button>
    </DialogActions>
  </Dialog>
);
