'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { trackError } from '@/lib/analytics/track';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to analytics
    trackError(error.message, error.digest, {
      stack: error.stack,
    });
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Something Went Wrong
          </h1>
          
          <p className="text-gray-600 mb-2">
            We&apos;re sorry, but something unexpected happened.
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg text-left">
              <p className="text-xs font-mono text-gray-700 break-all">
                {error.message}
              </p>
            </div>
          )}

          <div className="mt-6 space-y-3">
            <button
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>

            <a
              href="/"
              className="block w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              <Home className="w-5 h-5" />
              Go to Home
            </a>
          </div>

          {error.digest && (
            <p className="text-xs text-gray-400 mt-6">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
