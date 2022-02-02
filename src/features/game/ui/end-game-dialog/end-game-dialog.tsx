import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  handleRepeatGame: () => void;
};

const DIALOG_QUESTION = 'Хотите сыграть снова?';
const YES = 'Да';
const NO = 'Нет';

export const EndGameDialog = ({ isOpen, handleClose, handleRepeatGame }: Props) => (
  <Dialog open={isOpen} onClose={handleClose}>
    <DialogTitle>{DIALOG_QUESTION}</DialogTitle>
    <DialogActions>
      <Button onClick={handleClose}>{NO}</Button>
      <Button onClick={handleRepeatGame}>{YES}</Button>
    </DialogActions>
  </Dialog>
);
