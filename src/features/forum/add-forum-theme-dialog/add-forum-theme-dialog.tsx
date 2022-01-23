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
  handleClose: () => void;
  handleAddTheme: () => void;
};

export const AddForumThemeDialog = ({ open, handleClose, handleAddTheme }: Props) => (
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
);
