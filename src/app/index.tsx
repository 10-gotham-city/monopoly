import { Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes, Link } from 'react-router-dom';

import { withProviders } from './providers';

export const App = withProviders(() => (
  <>
    <CssBaseline />
    <Routes>
      <Route
        path="/"
        element={(
          <>
            <Typography variant="h1">Apps</Typography>
            <Link to="/test">Test</Link>
          </>
        )}
      />
      <Route path="/test" element={<>Test</>} />
    </Routes>
  </>
));
