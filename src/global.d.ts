/**
 * Global TypeScript declarations for iteration-deck custom elements
 */

import { ReactNode } from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'iteration-deck': {
        id: string
        label?: string
        prompt?: string
        description?: string
        children?: ReactNode
      }
      
      'iteration-deck-slide': {
        label: string
        'ai-prompt'?: string
        notes?: string
        confidence?: number
        children?: ReactNode
      }
      
      'iteration-deck-toolbar': {
        children?: ReactNode
      }
    }
  }
}

export {}