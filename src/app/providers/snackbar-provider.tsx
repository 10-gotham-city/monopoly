import { Close } from '@mui/icons-material';
import { IconButton, Slide } from '@mui/material';
import { SnackbarProvider as NotistackProvider, SnackbarKey } from 'notistack';
import { ComponentProps, useCallback, useMemo, useRef } from 'react';

type Props = {
  children: JSX.Element;
};

export const SnackbarProvider = ({ children }: Props) => {
  const notistackRef = useRef<NotistackProvider | null>(null);

  const handleClose = useCallback((key: SnackbarKey) => {
    notistackRef.current?.closeSnackbar(key);
  }, []);

  const action = useCallback(
    (key: SnackbarKey) => (
      <IconButton onClick={() => handleClose(key)} color="inherit">
        <Close color="inherit" />
      </IconButton>
    ),
    [handleClose],
  );

  const anchorOrigin = useMemo(
    () => ({
      horizontal: 'right' as const,
      vertical: 'top' as const,
    }),
    [],
  );

  return (
    <NotistackProvider
      ref={notistackRef}
      TransitionComponent={Slide as ComponentProps<typeof NotistackProvider>['TransitionComponent']}
      anchorOrigin={anchorOrigin}
      action={action}
    >
      {children}
    </NotistackProvider>
  );
};
