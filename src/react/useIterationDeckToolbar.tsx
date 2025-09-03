/**
 * Hook to automatically manage the IterationDeckToolbar
 * 
 * This hook ensures the toolbar is rendered when needed and cleaned up properly.
 * It follows the singleton pattern - only one toolbar instance across the app.
 */

import { useEffect, useMemo } from 'react';
import { IterationDeckToolbar } from './IterationDeckToolbar';
import { useIterationStore } from './store';

let toolbarInstance: HTMLElement | null = null;
let toolbarActiveCount = 0;

/**
 * Hook to manage the global iteration deck toolbar
 * 
 * Automatically shows/hides the toolbar based on the presence of interactive decks.
 * Uses a reference counting system to ensure proper cleanup.
 */
export function useIterationDeckToolbar() {
  const store = useIterationStore();
  
  // Calculate stable values to avoid infinite re-renders
  const isProduction = store.isProduction;
  const interactiveDeckCount = useMemo(() => 
    Object.values(store.deckMetadata).filter(meta => meta?.isInteractive === true).length,
    [store.deckMetadata]
  );
  
  useEffect(() => {
    // Only show toolbar if there are interactive decks and not in production
    const shouldShowToolbar = !isProduction && interactiveDeckCount > 0;
    
    if (shouldShowToolbar) {
      // Increment reference count
      toolbarActiveCount++;
      
      // Create toolbar if it doesn't exist
      if (!toolbarInstance) {
        toolbarInstance = document.createElement('div');
        toolbarInstance.id = 'iteration-deck-toolbar-singleton';
        document.body.appendChild(toolbarInstance);
        
        // Render the toolbar component
        const { createRoot } = require('react-dom/client');
        const root = createRoot(toolbarInstance);
        root.render(<IterationDeckToolbar />);
      }
    }
    
    // Cleanup function
    return () => {
      if (shouldShowToolbar) {
        toolbarActiveCount--;
        
        // Remove toolbar if no more references
        if (toolbarActiveCount <= 0 && toolbarInstance) {
          if (document.body.contains(toolbarInstance)) {
            document.body.removeChild(toolbarInstance);
          }
          toolbarInstance = null;
          toolbarActiveCount = 0;
        }
      }
    };
  }, [isProduction, interactiveDeckCount]);
}

/**
 * Hook for components that want to ensure the toolbar is available
 * 
 * This is a simpler version that just ensures the toolbar is rendered
 * when needed without complex reference counting.
 */
export function useEnsureToolbar() {
  const store = useIterationStore();
  
  // Calculate stable values to avoid infinite re-renders
  const isProduction = store.isProduction;
  const interactiveDeckCount = useMemo(() => 
    Object.values(store.deckMetadata).filter(meta => meta?.isInteractive === true).length,
    [store.deckMetadata]
  );
  
  useEffect(() => {
    const shouldShowToolbar = !isProduction && interactiveDeckCount > 0;
    
    console.log('🔧 useEnsureToolbar:', {
      isProduction,
      interactiveDeckCount,
      shouldShowToolbar,
      existingToolbar: !!document.getElementById('iteration-deck-toolbar-singleton')
    });
    
    if (shouldShowToolbar && !document.getElementById('iteration-deck-toolbar-singleton')) {
      const toolbarRoot = document.createElement('div');
      toolbarRoot.id = 'iteration-deck-toolbar-singleton';
      document.body.appendChild(toolbarRoot);
      
      // Use dynamic import to avoid issues with React 18 createRoot
      import('react-dom/client').then(({ createRoot }) => {
        const root = createRoot(toolbarRoot);
        root.render(<IterationDeckToolbar />);
      });
    }
  }, [isProduction, interactiveDeckCount]);
}