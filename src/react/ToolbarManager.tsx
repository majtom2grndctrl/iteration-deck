import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Toolbar } from './Toolbar'
import { isDevelopment } from '../core/environment'

// Singleton to ensure only one toolbar is rendered
let toolbarContainerElement: HTMLDivElement | null = null
let toolbarInstanceCount = 0

function getOrCreateToolbarContainer(): HTMLDivElement {
  if (!toolbarContainerElement) {
    toolbarContainerElement = document.createElement('div')
    toolbarContainerElement.id = 'iteration-deck-toolbar-container'
    document.body.appendChild(toolbarContainerElement)
  }
  return toolbarContainerElement
}

export function ToolbarManager() {
  const [isFirstInstance, setIsFirstInstance] = useState(false)
  const [containerReady, setContainerReady] = useState(false)

  useEffect(() => {
    if (!isDevelopment()) return

    // Increment instance count
    toolbarInstanceCount++

    // Set as first instance if count is 1
    const isFirst = toolbarInstanceCount === 1
    setIsFirstInstance(isFirst)

    // Create container and mark as ready
    getOrCreateToolbarContainer()
    setContainerReady(true)

    // Cleanup function
    return () => {
      toolbarInstanceCount--

      // Remove container when no instances remain
      if (toolbarInstanceCount === 0 && toolbarContainerElement) {
        document.body.removeChild(toolbarContainerElement)
        toolbarContainerElement = null
      }
    }
  }, [])

  // Don't render anything in production
  if (!isDevelopment() || !containerReady || !isFirstInstance) {
    return null
  }

  return createPortal(<Toolbar />, getOrCreateToolbarContainer())
}