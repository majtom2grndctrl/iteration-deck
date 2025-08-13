/**
 * Global TypeScript declarations for iteration-deck custom elements
 */

import { ReactNode } from 'react'

// TypeScript declarations for vanilla-extract CSS modules
declare module '*.css' {
  const styles: { [className: string]: string };
  export = styles;
}

declare module '*.css.ts' {
  const styles: { [className: string]: string };
  export = styles;
}

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