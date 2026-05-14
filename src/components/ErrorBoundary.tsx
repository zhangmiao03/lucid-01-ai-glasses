import { Component, type ReactNode } from "react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#06111f] flex items-center justify-center p-8">
          <div className="optical-glass-strong rounded-2xl p-10 max-w-md text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-ice/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-ice" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl text-blue-ice mb-3">LUCID/01</h2>
            <p className="text-blue-ice/60 text-sm">Something needs refreshing. Please reload the page.</p>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
