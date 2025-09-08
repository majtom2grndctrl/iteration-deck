/**
 * Internal hook to automatically manage the IterationDeckToolbar
 * 
 * This hook ensures the toolbar is rendered when needed and cleaned up properly.
 * It follows the singleton pattern - only one toolbar instance across the app.
 */

import { useEffect } from 'react';
import { IterationDeckToolbar } from './IterationDeckToolbar';
import { useIterationStore } from './store';

/**
 * Internal hook that ensures the toolbar is rendered when needed
 * 
 * Used internally by IterationDeck - consumers don't need to call this directly.
 */
export function useEnsureToolbar() {
  const store = useIterationStore();
  
  useEffect(() => {
    // Calculate fresh count directly in useEffect to avoid stale closure issues
    const interactiveDeckCount = Object.values(store.deckMetadata).filter(meta => meta?.isInteractive === true).length;
    const shouldShowToolbar = interactiveDeckCount > 0;
    
    console.log('[useEnsureToolbar DEBUG] Checking toolbar:', { 
      interactiveDeckCount, 
      shouldShowToolbar,
      existingToolbar: !!document.getElementById('iteration-deck-toolbar-singleton'),
      deckMetadata: store.deckMetadata
    });
    
    if (shouldShowToolbar && !document.getElementById('iteration-deck-toolbar-singleton')) {
      console.log('[useEnsureToolbar DEBUG] Creating toolbar...');
      const toolbarRoot = document.createElement('div');
      toolbarRoot.id = 'iteration-deck-toolbar-singleton';
      document.body.appendChild(toolbarRoot);
      
      // Use dynamic import to avoid issues with React 18 createRoot
      import('react-dom/client').then(({ createRoot }) => {
        console.log('[useEnsureToolbar DEBUG] React root created, rendering toolbar');
        const root = createRoot(toolbarRoot);
        root.render(<IterationDeckToolbar />);
      }).catch(err => {
        console.error('❌ Error creating toolbar:', err);
      });
    }
  }, [store.deckMetadata]);
}