/**
 * IterationDeckToolbar component
 * 
 * Global toolbar component that provides navigation controls for iteration decks.
 * Uses portal pattern to render at document root level for consistent positioning.
 */

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { tokens } from '../../shared';
import { toolbarStyles } from '../../shared/styles';
import { useIterationStore } from './store';

/**
 * Toolbar component props
 */
export interface IterationDeckToolbarProps {
  /** Optional className for the toolbar container */
  className?: string;
  /** Whether to show keyboard shortcut hints */
  showKeyboardHints?: boolean;
}

/**
 * Navigation button component
 */
const NavButton: React.FC<{
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
  title: string;
  isFirst?: boolean;
  isLast?: boolean;
}> = ({ onClick, disabled, children, title, isFirst, isLast }) => {
  const buttonStyle = useMemo(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: tokens.spacing[6], // 24px - matching Lit version
    height: tokens.spacing[6], // 24px - matching Lit version
    
    background: tokens.colors.white, // var(--color-bg-elevated) equivalent
    border: `${tokens.spacing[0]} solid ${tokens.colors.gray[300]}`, // 2px border like Lit
    borderRadius: 0, // Reset border radius for segmented group
    
    // Segmented button group styling
    borderTopLeftRadius: isFirst ? tokens.spacing[3] : 0, // 12px
    borderBottomLeftRadius: isFirst ? tokens.spacing[3] : 0, // 12px
    borderTopRightRadius: isLast ? tokens.spacing[3] : 0, // 12px
    borderBottomRightRadius: isLast ? tokens.spacing[3] : 0, // 12px
    borderRight: isLast ? undefined : 'none', // Remove right border except on last
    borderLeft: isFirst ? undefined : 'none', // Remove left border except on first
    
    color: disabled ? tokens.colors.gray[400] : tokens.colors.gray[500],
    cursor: disabled ? 'not-allowed' : 'pointer',
    outline: 'none',
    
    ':hover': !disabled ? {
      background: tokens.colors.gray[50], // var(--color-interactive-hover) equivalent
      borderColor: tokens.colors.gray[400],
      color: tokens.colors.gray[700]
    } : undefined,
  }), [disabled, isFirst, isLast]);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={buttonStyle}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = tokens.colors.gray[50];
          e.currentTarget.style.borderColor = tokens.colors.gray[400];
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = tokens.colors.white;
          e.currentTarget.style.borderColor = tokens.colors.gray[300];
        }
      }}
    >
      {children}
    </button>
  );
};

/**
 * Deck selector dropdown component
 */
const DeckSelector: React.FC<{
  decks: { id: string; label?: string }[];
  selectedDeckId?: string;
  onSelect: (deckId: string) => void;
}> = ({ decks, selectedDeckId, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedDeck = decks.find(d => d.id === selectedDeckId);
  const displayLabel = selectedDeck ? (selectedDeck.label || selectedDeck.id) : 'Select Deck';

  // Use shared Tailwind classes for consistent styling
  const dropdownClasses = 'relative';
  const buttonClasses = toolbarStyles.selector.button;

  const menuClasses = `${toolbarStyles.selector.menu} max-h-[200px] overflow-y-auto`;
  const menuItemClasses = toolbarStyles.selector.menuItem;

  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  if (decks.length <= 1) return null;

  return (
    <div className={dropdownClasses}>
      <button
        className={buttonClasses}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = tokens.colors.gray[50];
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = tokens.colors.white;
        }}
      >
        <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">{displayLabel}</span>
        <span className="text-xs text-gray-500 pointer-events-none">{isOpen ? '▲' : '▼'}</span>
      </button>
      
      {isOpen && (
        <div className={menuClasses}>
          {decks.map((deck) => (
            <div
              key={deck.id}
              className={`${menuItemClasses} ${deck.id === selectedDeckId ? 'bg-gray-100' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(deck.id);
                setIsOpen(false);
              }}
            >
              {deck.label || deck.id}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Scroll to deck and add glow effect
 * Matches the Lit version's scrollToDeckAndHighlight functionality
 */
function scrollToDeckAndHighlight(deckId: string) {
  // Look for React iteration deck with data-iteration-deck attribute
  const deckElement = document.querySelector(`[data-iteration-deck="${deckId}"]`) as HTMLElement;
  
  if (!deckElement) {
    return;
  }
  
  // Find the active slide element within the deck
  const activeSlide = deckElement.querySelector('[data-slide-active="true"]') as HTMLElement;
  const elementToHighlight = activeSlide || deckElement;

  const rect = deckElement.getBoundingClientRect();
  const currentScrollY = window.scrollY;
  const elementTop = rect.top + currentScrollY;
  const targetScrollY = elementTop - (window.innerHeight * 0.15);

  const finalScrollY = Math.max(0, targetScrollY);
  window.scrollTo({
    top: finalScrollY,
    behavior: 'smooth'
  });

  waitForScrollComplete(finalScrollY, () => {
    addGlowEffect(elementToHighlight);
  });
}

/**
 * Wait for scroll animation to complete and then execute callback
 */
function waitForScrollComplete(targetY: number, callback: () => void) {
  let scrollTimeout: number;
  let maxWaitTimeout: number;
  
  const onScroll = () => {
    clearTimeout(scrollTimeout);
    
    // Check if we're close enough to the target (within 5px tolerance)
    scrollTimeout = window.setTimeout(() => {
      const currentY = window.scrollY;
      const tolerance = 5;
      
      if (Math.abs(currentY - targetY) <= tolerance) {
        // Scroll has stopped at the target position
        window.removeEventListener('scroll', onScroll);
        clearTimeout(maxWaitTimeout);
        callback();
      }
    }, 150); // Wait 150ms of no scroll movement to consider it "stopped"
  };
  
  // Safety timeout - trigger after 3 seconds maximum, even if scroll detection fails
  maxWaitTimeout = window.setTimeout(() => {
    window.removeEventListener('scroll', onScroll);
    clearTimeout(scrollTimeout);
    callback();
  }, 3000);
  
  // Start listening for scroll events
  window.addEventListener('scroll', onScroll);
  
  // Also trigger immediately if we're already at the target position
  const currentY = window.scrollY;
  if (Math.abs(currentY - targetY) <= 5) {
    window.removeEventListener('scroll', onScroll);
    clearTimeout(maxWaitTimeout);
    setTimeout(callback, 100); // Small delay to ensure DOM is settled
  }
}

/**
 * Inject global CSS for deck glow animations (called once)
 */
function ensureGlowStyles() {
  const styleId = 'iteration-deck-glow-styles';
  if (document.getElementById(styleId)) return; // Already injected
  
  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    /* Iteration Deck Glow Effect Global Styles */
    [data-iteration-glow] {
      border-radius: 8px; /* 8px - small radius */
      position: relative;
      animation: iteration-deck-glow 0.5s ease-in-out;
    }
    
    @keyframes iteration-deck-glow {
      0% {
        box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.2), 0 0 25px rgba(236, 72, 153, 0.1);
        outline: 2px solid rgba(236, 72, 153, 0.2);
      }
      50% {
        box-shadow: 0 0 0 6px rgba(236, 72, 153, 0.4), 0 0 40px rgba(236, 72, 153, 0.2);
        outline: 3px solid rgba(236, 72, 153, 0.4);
      }
      100% {
        box-shadow: 0 0 0 3px rgba(236, 72, 153, 0);
        outline: 2px solid rgba(236, 72, 153, 0);
      }
    }
    
    /* Accessibility: respect reduced motion preference */
    @media (prefers-reduced-motion: reduce) {
      [data-iteration-glow] {
        animation: none;
        border: 2px solid rgba(236, 72, 153, 0.6);
        box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.3), 0 0 25px rgba(236, 72, 153, 0.2);
      }
    }
  `;
  document.head.appendChild(style);
}

/**
 * Add temporary glow effect to deck element using CSS classes
 * Much simpler and more performant than inline style manipulation
 */
function addGlowEffect(deckElement: HTMLElement) {
  // Ensure global styles are injected
  ensureGlowStyles();
  
  // Add glow data attribute to trigger CSS animation
  deckElement.setAttribute('data-iteration-glow', '');
  
  // Remove glow attribute after animation completes
  setTimeout(() => {
    deckElement.removeAttribute('data-iteration-glow');
  }, 800);
}

/**
 * Global toolbar for iteration deck navigation
 * 
 * Provides a fixed toolbar at the bottom of the screen with deck selection,
 * slide navigation, and keyboard shortcut support.
 */
export const IterationDeckToolbar: React.FC<IterationDeckToolbarProps> = ({
  className,
  showKeyboardHints = true
}) => {
  const store = useIterationStore();
  const [toolbarRoot, setToolbarRoot] = useState<HTMLElement | null>(null);

  // Get interactive decks and current deck info
  const interactiveDecks = store.getInteractiveDecks().map(deckId => ({
    id: deckId,
    label: store.getDeckMetadata(deckId)?.label
  }));

  const selectedDeckId = store.selectedDeckId || interactiveDecks[0]?.id;
  const selectedDeckMetadata = selectedDeckId ? store.getDeckMetadata(selectedDeckId) : null;
  const currentSlideIndex = selectedDeckMetadata ? 
    selectedDeckMetadata.slideIds.indexOf(selectedDeckMetadata.activeSlideId) : -1;

  // Responsive styles for larger screens (handled via CSS media queries in a style tag)
  const responsiveStyles = `
    @media (min-width: 640px) {
      #iteration-deck-toolbar-root > div {
        min-width: calc(${tokens.spacing[8]} * 6) !important;
        padding: ${tokens.spacing[1]} !important;
        gap: ${tokens.spacing[2]} !important;
        bottom: ${tokens.spacing[4]} !important;
        font-size: ${tokens.spacing[2]} !important;
      }
    }
  `;

  // Create toolbar root element and inject responsive styles
  useEffect(() => {
    const root = document.createElement('div');
    root.id = 'iteration-deck-toolbar-root';
    document.body.appendChild(root);
    setToolbarRoot(root);

    // Inject responsive styles
    const styleId = 'iteration-deck-toolbar-responsive-styles';
    if (!document.getElementById(styleId)) {
      const styleElement = document.createElement('style');
      styleElement.id = styleId;
      styleElement.textContent = responsiveStyles;
      document.head.appendChild(styleElement);
    }

    return () => {
      if (document.body.contains(root)) {
        document.body.removeChild(root);
      }
      // Note: Keep styles in head for other toolbar instances
    };
  }, [responsiveStyles]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedDeckId || !selectedDeckMetadata) return;
      
      // Check for Cmd/Ctrl+Alt+[ or ] shortcuts
      if (event.metaKey || event.ctrlKey) {
        if (event.altKey) {
          if (event.key === '[') {
            event.preventDefault();
            handlePreviousSlide();
          } else if (event.key === ']') {
            event.preventDefault();
            handleNextSlide();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedDeckId, selectedDeckMetadata]);

  // Navigation handlers
  const handlePreviousSlide = useCallback(() => {
    if (!selectedDeckId || !selectedDeckMetadata) return;
    
    const currentIndex = selectedDeckMetadata.slideIds.indexOf(selectedDeckMetadata.activeSlideId);
    if (currentIndex === -1) return;
    
    const prevIndex = currentIndex <= 0 ? selectedDeckMetadata.slideIds.length - 1 : currentIndex - 1;
    const prevSlideId = selectedDeckMetadata.slideIds[prevIndex];
    store.setActiveSlide(selectedDeckId, prevSlideId);
  }, [selectedDeckId, selectedDeckMetadata, store]);

  const handleNextSlide = useCallback(() => {
    if (!selectedDeckId || !selectedDeckMetadata) return;
    
    const currentIndex = selectedDeckMetadata.slideIds.indexOf(selectedDeckMetadata.activeSlideId);
    if (currentIndex === -1) return;
    
    const nextIndex = (currentIndex + 1) % selectedDeckMetadata.slideIds.length;
    const nextSlideId = selectedDeckMetadata.slideIds[nextIndex];
    store.setActiveSlide(selectedDeckId, nextSlideId);
  }, [selectedDeckId, selectedDeckMetadata, store]);

  // Don't show toolbar in production mode or if no interactive decks
  if (store.isProduction || interactiveDecks.length === 0) {
    return null;
  }

  // Use shared Tailwind classes for consistent styling
  const toolbarClasses = `${toolbarStyles.container} ${className || ''}`;
  
  // Debug styling
  console.log('🎨 Toolbar styling:', {
    toolbarClasses,
    containerStyles: toolbarStyles.container,
    toolbarRoot: toolbarRoot?.id
  });

  const slideCounterStyle = useMemo(() => ({
    fontSize: '12px',
    color: tokens.colors.gray[500],
    fontWeight: '500',
    whiteSpace: 'nowrap' as const,
    minWidth: '60px',
    textAlign: 'center' as const,
  }), []);

  if (!toolbarRoot) return null;

  return createPortal(
    <div 
      className={toolbarClasses}
      style={{
        // Fallback inline styles in case Tailwind classes don't work
        position: 'fixed',
        bottom: '8px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '4px 8px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(12px)',
        borderRadius: '40px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        minWidth: '320px',
        fontSize: '14px',
        color: '#374151'
      }}
    >
      <DeckSelector
        decks={interactiveDecks}
        selectedDeckId={selectedDeckId}
        onSelect={(deckId) => {
          store.setSelectedDeck(deckId);
          // Auto-scroll to deck and highlight it - matching Lit version
          scrollToDeckAndHighlight(deckId);
        }}
      />
      
      {/* Segmented button group wrapper */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: tokens.spacing[1], // 4px gap between elements on mobile, handled responsively via CSS
      }}>
        {/* Navigation buttons in segmented group */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: tokens.spacing[0], // No gap for seamless segmented group 
          overflow: 'hidden'
        }}>
          <NavButton
            onClick={handlePreviousSlide}
            disabled={!selectedDeckMetadata}
            title={showKeyboardHints ? "Previous slide (Cmd/Ctrl+Alt+[)" : "Previous slide"}
            isFirst={true}
          >
            ←
          </NavButton>

          <NavButton
            onClick={handleNextSlide}
            disabled={!selectedDeckMetadata}
            title={showKeyboardHints ? "Next slide (Cmd/Ctrl+Alt+])" : "Next slide"}
            isLast={true}
          >
            →
          </NavButton>
        </div>

        {/* Slide counter */}
        <div style={slideCounterStyle}>
          {selectedDeckMetadata ? 
            `${currentSlideIndex + 1} / ${selectedDeckMetadata.slideIds.length}` 
            : '0 / 0'
          }
        </div>
      </div>

      {showKeyboardHints && (
        <div style={{ fontSize: '11px', color: tokens.colors.gray[400] }}>
          ⌘⌥[]
        </div>
      )}
    </div>,
    toolbarRoot
  );
};

IterationDeckToolbar.displayName = 'IterationDeckToolbar';