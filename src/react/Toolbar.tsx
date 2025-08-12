import { useEffect } from 'react'
import { useIterationDeckStore } from '../core/store'
import { isDevelopment } from '../core/environment'
import styles from './Toolbar.module.css'

// SVG icons for navigation
const ChevronLeftIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M10.7071 2.29289C11.0976 2.68342 11.0976 3.31658 10.7071 3.70711L6.41421 8L10.7071 12.2929C11.0976 12.6834 11.0976 13.3166 10.7071 13.7071C10.3166 14.0976 9.68342 14.0976 9.29289 13.7071L4.29289 8.70711C3.90237 8.31658 3.90237 7.68342 4.29289 7.29289L9.29289 2.29289C9.68342 1.90237 10.3166 1.90237 10.7071 2.29289Z" fill="currentColor"/>
  </svg>
)

const ChevronRightIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 2.29289C5.68342 1.90237 6.31658 1.90237 6.70711 2.29289L11.7071 7.29289C12.0976 7.68342 12.0976 8.31658 11.7071 8.70711L6.70711 13.7071C6.31658 14.0976 5.68342 14.0976 5.29289 13.7071C4.90237 13.3166 4.90237 12.6834 5.29289 12.2929L9.58579 8L5.29289 3.70711C4.90237 3.31658 4.90237 2.68342 5.29289 2.29289Z" fill="currentColor"/>
  </svg>
)

export function Toolbar() {
  const { 
    decks, 
    activeDeckId, 
    globalToolbarVisible,
    setActiveDeck, 
    previousSlide, 
    nextSlide 
  } = useIterationDeckStore()

  // Set up keyboard shortcuts
  useEffect(() => {
    if (!isDevelopment() || !globalToolbarVisible) return

    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle shortcuts when Ctrl/Cmd is pressed with arrow keys
      if (!(event.ctrlKey || event.metaKey)) return
      
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          previousSlide()
          break
        case 'ArrowRight':
          event.preventDefault()
          nextSlide()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [globalToolbarVisible, previousSlide, nextSlide])

  // Don't render in production or if no decks are registered
  if (!isDevelopment() || !globalToolbarVisible || decks.size === 0) {
    return null
  }

  const activeDeck = activeDeckId ? decks.get(activeDeckId) : null
  const deckEntries = Array.from(decks.entries())
  const showDeckSelector = deckEntries.length > 1

  const currentSlideIndex = activeDeck?.activeSlideIndex ?? 0
  const totalSlides = activeDeck?.slides.length ?? 0
  const currentSlide = activeDeck?.slides[currentSlideIndex]
  
  const canGoPrevious = totalSlides > 1
  const canGoNext = totalSlides > 1

  return (
    <div className={styles.toolbar} role="toolbar" aria-label="Iteration Deck Controls">
      {showDeckSelector && (
        <>
          <select
            className={styles.deckSelector}
            value={activeDeckId || ''}
            onChange={(e) => setActiveDeck(e.target.value || null)}
            aria-label="Select iteration deck"
          >
            {deckEntries.map(([deckId, deck]) => (
              <option key={deckId} value={deckId}>
                {deck.label || deckId}
              </option>
            ))}
          </select>
          <div className={styles.divider} />
        </>
      )}

      <button
        className={styles.navButton}
        onClick={previousSlide}
        disabled={!canGoPrevious}
        aria-label="Previous slide"
        title="Previous slide (Ctrl/Cmd + ←)"
      >
        <ChevronLeftIcon />
      </button>

      <div className={styles.slideInfo}>
        {currentSlide && (
          <span className={styles.slideLabel}>
            {currentSlide.label}
          </span>
        )}
        <span className={styles.slideCounter}>
          {currentSlideIndex + 1} / {totalSlides}
        </span>
      </div>

      <button
        className={styles.navButton}
        onClick={nextSlide}
        disabled={!canGoNext}
        aria-label="Next slide"
        title="Next slide (Ctrl/Cmd + →)"
      >
        <ChevronRightIcon />
      </button>
    </div>
  )
}