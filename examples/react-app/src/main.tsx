import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Import core components to ensure Lit web components are registered
import '../../../src/components'

// Add component registration check
console.log('[DEBUG] Checking component registration...');
console.log('iteration-deck defined:', customElements.get('iteration-deck'));
console.log('iteration-deck-slide defined:', customElements.get('iteration-deck-slide'));
console.log('iteration-deck-toolbar defined:', customElements.get('iteration-deck-toolbar'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)