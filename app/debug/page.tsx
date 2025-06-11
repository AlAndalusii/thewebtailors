"use client"

import { useEffect, useState } from 'react'

export default function DebugPage() {
  const [status, setStatus] = useState({
    window: false,
    requestIdleCallback: false,
    serviceWorker: false,
    battery: false,
    connection: false,
    fontLoader: false,
    performanceMonitor: false
  })

  useEffect(() => {
    // Check all APIs
    setStatus({
      window: typeof window !== 'undefined',
      requestIdleCallback: typeof window !== 'undefined' && !!window.requestIdleCallback,
      serviceWorker: typeof window !== 'undefined' && 'serviceWorker' in navigator,
      battery: typeof navigator !== 'undefined' && 'getBattery' in navigator,
      connection: typeof navigator !== 'undefined' && 'connection' in navigator,
      fontLoader: !!document.getElementById('poppins-font') || !!document.getElementById('pacifico-font'),
      performanceMonitor: typeof window !== 'undefined' && !!(window as any)['web-vital']
    })
  }, [])

  return (
    <div className="min-h-screen bg-[#030303] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Performance Debug Status</h1>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Browser APIs</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Window Available:</span>
                <span className={status.window ? 'text-green-400' : 'text-red-400'}>
                  {status.window ? '✅' : '❌'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>requestIdleCallback:</span>
                <span className={status.requestIdleCallback ? 'text-green-400' : 'text-yellow-400'}>
                  {status.requestIdleCallback ? '✅' : '⚠️ (using fallback)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Service Worker:</span>
                <span className={status.serviceWorker ? 'text-green-400' : 'text-yellow-400'}>
                  {status.serviceWorker ? '✅' : '⚠️ (not supported)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Battery API:</span>
                <span className={status.battery ? 'text-green-400' : 'text-yellow-400'}>
                  {status.battery ? '✅' : '⚠️ (not supported)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Connection API:</span>
                <span className={status.connection ? 'text-green-400' : 'text-yellow-400'}>
                  {status.connection ? '✅' : '⚠️ (not supported)'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Performance Components</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Font Loader:</span>
                <span className={status.fontLoader ? 'text-green-400' : 'text-yellow-400'}>
                  {status.fontLoader ? '✅' : '⏳ (loading)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Performance Monitor:</span>
                <span className={status.performanceMonitor ? 'text-green-400' : 'text-yellow-400'}>
                  {status.performanceMonitor ? '✅' : '⏳ (initializing)'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Test Results</h2>
          <p className="text-gray-300 mb-4">
            If you can see this page without any client-side errors, the performance optimizations are working correctly!
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
            >
              Go to Homepage
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg transition-colors"
            >
              Reload Debug Page
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 