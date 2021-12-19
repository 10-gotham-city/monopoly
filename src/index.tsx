import ReactDOM from 'react-dom';
import { withErrorBoundary } from './hocs/error-boundary';
import { App } from './app';

const AppWithErrorBoundary = withErrorBoundary(App);

ReactDOM.render(<AppWithErrorBoundary />, document.getElementById('root'));
