import CssBaseline from '@mui/material/CssBaseline';

export const withMui = (component: () => JSX.Element) => () => (
  <>
    <CssBaseline />
    {component()}
  </>
);
