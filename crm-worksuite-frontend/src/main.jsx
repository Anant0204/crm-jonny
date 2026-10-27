import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Suppress findDOMNode deprecation warning from react-quill
// This is a known issue in react-quill v2.0.0 and doesn't affect functionality
if (import.meta.env.DEV) {
  const originalWarn = console.warn
  const originalError = console.error
  
  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('findDOMNode is deprecated')
    ) {
      return
    }
    originalWarn.apply(console, args)
  }
  
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('findDOMNode is deprecated')
    ) {
      return
    }
    originalError.apply(console, args)
  }
}

// Initialize PWA
import { initPwa } from './utils/pwaInit.js'

// Initialize PWA after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPwa)
} else {
  initPwa()
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <App />
  </React.Fragment>,
)
