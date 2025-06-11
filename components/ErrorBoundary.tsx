"use client"

import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen bg-[#030303] flex items-center justify-center p-4">
            <div className="text-center text-white">
              <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
              <p className="text-gray-400 mb-4">
                There was an error loading this page.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Reload Page
              </button>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-4 text-left">
                  <summary className="cursor-pointer text-red-400">
                    Error Details (Development)
                  </summary>
                  <pre className="mt-2 p-4 bg-red-900/20 border border-red-500/20 rounded text-xs overflow-auto">
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary 