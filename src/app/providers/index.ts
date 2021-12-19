import compose from 'compose-function';

import { withRouter } from './with-router';
import { withMui } from './with-mui';

export const withProviders = compose(withRouter, withMui);
