import { BrowserRouter } from 'react-router-dom';

export const withRouter = (component: () => JSX.Element) => () => (
  <BrowserRouter>{component()}</BrowserRouter>
);
