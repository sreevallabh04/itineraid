"use client"

import React, { Component, ErrorInfo, ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { getEnvironment } from "@/lib/environment"

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  resetOnPropsChange?: boolean
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo)
    
    // Send to error tracking service in production
    if (getEnvironment().isProduction) {
      // Here you would typically send to a service like Sentry
      // If using Sentry, you'd call: Sentry.captureException(error)
    }
    
    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }
  
  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    // Reset error state if props change and resetOnPropsChange is true
    if (
      this.state.hasError &&
      this.props.resetOnPropsChange &&
      prevProps.children !== this.props.children
    ) {
      this.reset()
    }
  }

  reset = (): void => {
    this.setState({ hasError: false, error: null })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI or default error UI
      if (this.props.fallback) {
        return this.props.fallback
      }
      
      return (
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="max-w-md w-full mx-auto p-8 rounded-xl bg-zinc-900 border border-zinc-800 text-white">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-red-900/30 flex items-center justify-center rounded-full mb-6">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8 text-red-500" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                  />
                </svg>
              </div>
              
              <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
              
              <p className="text-gray-400 mb-6">
                {getEnvironment().isDevelopment && this.state.error 
                  ? `Error: ${this.state.error.message}` 
                  : "We've encountered an error and our team has been notified."}
              </p>
              
              <div className="flex gap-4">
                <Button 
                  onClick={this.reset} 
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Try Again
                </Button>
                
                <Button 
                  variant="outline"
                  className="border-zinc-700"
                  onClick={() => window.location.href = '/'}
                >
                  Go Home
                </Button>
              </div>
              
              {getEnvironment().isDevelopment && this.state.error && (
                <div className="mt-8 p-4 bg-zinc-950 rounded-lg text-left overflow-auto max-h-64 w-full">
                  <pre className="text-xs text-red-400 whitespace-pre-wrap">
                    {this.state.error.stack}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Error boundary for specific page sections
 */
export function SectionErrorBoundary({ children, title = "Section Error" }: { 
  children: ReactNode, 
  title?: string 
}) {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-6 rounded-xl bg-zinc-900/50 border border-red-900/30 text-white">
          <h3 className="font-medium text-lg mb-2">{title}</h3>
          <p className="text-gray-400 mb-4">
            This section encountered an error while rendering.
          </p>
          <Button 
            onClick={() => window.location.reload()}
            variant="outline" 
            size="sm"
            className="border-zinc-700"
          >
            Reload
          </Button>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  )
}