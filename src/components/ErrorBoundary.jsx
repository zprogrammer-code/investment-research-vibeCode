import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Uncaught error in React tree:', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
          <div className="max-w-md rounded-2xl border border-rose-500/30 bg-slate-900/80 p-8 text-center shadow-lg">
            <h1 className="text-xl font-semibold text-rose-300">Something went wrong</h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              An unexpected error occurred. Try refreshing the page.
            </p>
            <pre className="mt-4 max-h-40 overflow-auto rounded-lg bg-slate-950 p-3 text-left text-xs text-rose-200/80">
              {this.state.error.message}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
