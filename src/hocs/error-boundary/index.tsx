import {
  Component, ErrorInfo, ReactNode, FunctionComponent,
} from 'react';

interface Props {
  children ?: ReactNode;
}

interface State {
  hasError: boolean;
}

// eslint-disable-next-line max-len
export const withErrorBoundary = (WrappedComponent : FunctionComponent) => class extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      return (
        <div>
          <h2>Что-то пошло не так...</h2>
        </div>
      );
    }

    return <WrappedComponent />;
  }
};
