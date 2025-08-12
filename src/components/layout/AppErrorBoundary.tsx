import type { ReactNode } from 'react'
import { Component } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class AppErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error Boundary caught an error:', error, errorInfo)
    // You could send this to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-wine-50">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">🍷</div>
            <h1 className="text-2xl font-bold text-wine-800 mb-2">
              Something went wrong
            </h1>
            <p className="text-wine-600 mb-4">
              We encountered an error while loading WineBuddy
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-wine-600 text-white px-4 py-2 rounded hover:bg-wine-700 transition-colors"
            >
              Reload App
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
