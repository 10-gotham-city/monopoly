import React, { ErrorInfo, ReactNode } from 'react';

type Props = {
  children ?: ReactNode;
};

interface TState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, TState> {
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
    const { children } = this.props;
    if (hasError) {
      return (
        // TODO: Доделать UI при возникновении ошибок
        <h1>Что-то пошло не так...</h1>
      );
    }

    return children;
  }
}
