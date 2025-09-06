/**
 * Internal hook to automatically manage the IterationDeckToolbar
 * 
 * This hook ensures the toolbar is rendered when needed and cleaned up properly.
 * It follows the singleton pattern - only one toolbar instance across the app.
 */

import { useEffect, useMemo } from 'react';
import { IterationDeckToolbar } from './IterationDeckToolbar';
import { useIterationStore } from './store';

/**
 * Internal hook that ensures the toolbar is rendered when needed
 * 
 * Used internally by IterationDeck - consumers don't need to call this directly.
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
    
    if (shouldShowToolbar && !document.getElementById('iteration-deck-toolbar-singleton')) {
      const toolbarRoot = document.createElement('div');
      toolbarRoot.id = 'iteration-deck-toolbar-singleton';
      document.body.appendChild(toolbarRoot);
      
      // Use dynamic import to avoid issues with React 18 createRoot
      import('react-dom/client').then(({ createRoot }) => {
        const root = createRoot(toolbarRoot);
        root.render(<IterationDeckToolbar />);
      }).catch(err => {
        console.error('❌ Error creating toolbar:', err);
      });
    }
  }, [isProduction, interactiveDeckCount]);
}