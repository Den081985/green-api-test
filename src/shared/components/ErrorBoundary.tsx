import { Component, type PropsWithChildren } from 'react';

import ErrorFallback from './ErrorFallback';

export default class ErrorBoundary extends Component<
  PropsWithChildren,
  { failed: boolean }
> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    const { failed } = this.state;
    const { children } = this.props;
    return failed ? <ErrorFallback /> : children;
  }
}
