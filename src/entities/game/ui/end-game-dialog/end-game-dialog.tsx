import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

type Props = {
  open: boolean;
  handleClose: () => void;
  handleRepeatGame: () => void;
};

export const EndGameDialog = ({ open, handleClose, handleRepeatGame }: Props) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle>Хотите сыграть снова?</DialogTitle>
    <DialogActions>
      <Button onClick={handleClose}>Нет</Button>
      <Button onClick={handleRepeatGame}>Да</Button>
    </DialogActions>
  </Dialog>
);
