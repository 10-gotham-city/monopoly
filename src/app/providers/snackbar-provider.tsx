import { Close } from '@mui/icons-material';
import { IconButton, Slide } from '@mui/material';
import { SnackbarProvider as NotistackProvider, SnackbarKey } from 'notistack';
import { ComponentProps, useRef } from 'react';

type Props = {
  children: JSX.Element;
};

export const SnackbarProvider = ({ children }: Props) => {
  const notistackRef = useRef<NotistackProvider | null>(null);

  const handleClose = (key: SnackbarKey) => {
    notistackRef.current?.closeSnackbar(key);
  };

  return (
    <NotistackProvider
      ref={notistackRef}
      TransitionComponent={Slide as ComponentProps<typeof NotistackProvider>['TransitionComponent']}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'top',
      }}
      action={(key) => (
        <IconButton onClick={() => handleClose(key)} color="inherit">
          <Close color="inherit" />
        </IconButton>
      )}
    >
      {children}
    </NotistackProvider>
  );
};
