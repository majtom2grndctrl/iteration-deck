# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This project builds an NPM module containing React TypeScript components called `IterationDeck` and `IterationDeckSlide` for rapid design iteration. The components wrap UI variations with development-mode controls for switching between them using a slide deck metaphor.

**Key Details:**
- Package name: `iteration-deck`
- Target: < 10kb gzipped bundle size
- Supports both ESM and CommonJS
- Production builds render only the first child
- Development mode includes toolbar with keyboard shortcuts

## Development Commands

Based on the technical specifications, these commands will be used once the project is scaffolded:

```bash
# Build for distribution
pnpm build

# Run test suite  
pnpm test

# Lint TypeScript code
pnpm lint

# Type checking
pnpm typecheck

# Publish to npm registry
pnpm publish
```

## Project Architecture

### Core Components Structure
```
src/
├── index.ts              # Main exports
├── IterationDeck.tsx     # Main wrapper component
├── IterationDeckSlide.tsx # Individual slide wrapper
├── context.ts            # React context for state management
└── toolbar.tsx           # Development-only navigation toolbar
```

### Component API Design

**IterationDeck** - Main wrapper component:
- Required `id` prop for unique identification
- Optional `label` for toolbar display  
- Children must be `IterationDeckSlide` components

**IterationDeckSlide** - Individual variation wrapper:
- Required `label` for navigation
- Wraps any React content as `children`

### State Management

Uses React Context pattern with automatic provider creation:
- Global state tracks all decks by ID with automatic registration/deregistration
- Each deck maintains active slide index and slide metadata
- Context tracks `activeDeckId` for multi-deck keyboard navigation
- Context provides registration and navigation methods
- Development toolbar consumes context for all interactions
- **No explicit provider required** - components self-organize via auto-created global context

### Environment-Specific Behavior

**Development Mode:**
- Renders single global navigation toolbar (singleton pattern)
- Toolbar includes deck selector when multiple IterationDecks are present
- Supports keyboard shortcuts (Ctrl/Cmd + Arrow keys) for active deck
- Shows all slide variations
- Automatic registration with global context on mount

**Production Mode:**
- Renders only the first slide by default
- No toolbar or navigation UI
- Minimal runtime footprint

## Build Configuration

The module will use:
- **Rollup** for bundling with tree-shaking support
- **TypeScript** compilation with declaration files
- **Vite** configured for library mode instead of app mode
- Proper `package.json` exports field for dual ESM/CJS support

## Development Workflow

**Current Status:** Project is in specification phase with no source code yet implemented.

**Next Steps:**
1. Scaffold React TypeScript project structure
2. Implement core components with context
3. Build development toolbar with keyboard navigation
4. Configure bundling for npm distribution
5. Create example/demo application

## Code Style Guidelines

### Accessibility Requirements

#### WCAG 2.1 AA Compliance
- **Contrast ratios**: 4.5:1 minimum for normal text, 3:1 for large text
- **Color independence**: Never rely solely on color to convey information
- **Focus indicators**: Always visible and high contrast (2px minimum)
- **Touch targets**: 44px minimum for mobile interactions

#### Keyboard Navigation
- **Tab order**: Logical progression through toolbar controls
- **Arrow keys**: Navigate between slides within active deck
- **Enter/Space**: Activate buttons and select slides
- **Escape**: Close deck selector or return focus to content
- **Keyboard shortcuts**: 
  - `Ctrl/Cmd + ←/→`: Navigate slides in active deck
  - `Ctrl/Cmd + ↑/↓`: Switch between decks (when multiple present)

#### Screen Reader Support
```html
<!-- Toolbar markup example -->
<nav aria-label="Design iteration controls" role="toolbar">
  <div role="group" aria-labelledby="deck-label">
    <span id="deck-label" class="sr-only">Component: Button Variants</span>
    <select aria-label="Select iteration deck">
      <option>Button Variants</option>
      <option>Card Layouts</option>
    </select>
  </div>
  
  <div role="group" aria-label="Slide navigation">
    <button aria-label="Previous slide" aria-keyshortcuts="Control+ArrowLeft">←</button>
    <span aria-live="polite" aria-atomic="true">
      Slide 2 of 4: Hover State
    </span>
    <button aria-label="Next slide" aria-keyshortcuts="Control+ArrowRight">→</button>
  </div>
</nav>
```

#### Motion & Animation
- **Reduced motion**: Honor `prefers-reduced-motion` system preference
- **Vestibular safety**: Avoid parallax, rapid flashing, or jarring transitions
- **Focus management**: Maintain focus position during slide transitions
- **Animation duration**: Maximum 0.3s for interface transitions

#### Error Handling & States
- **Loading states**: Provide clear feedback during async operations  
- **Error messages**: Descriptive text for screen readers, not just icons
- **Empty states**: Clear messaging when no slides are available
- **Graceful degradation**: Core functionality works without JavaScript

### Styling Standards
- **CSS Modules** for all component styling (`.module.css` files)
- Use semantic class names that describe purpose, not appearance
- Leverage CSS custom properties for theming
- **Dark/Light Mode Support**: Use `prefers-color-scheme` media query
- Toolbar must adapt to system theme automatically
- Maintain consistent spacing using CSS custom properties

### Design System

#### Typography
```css
:root {
  /* System font stack - matches OS/browser dev tools */
  --iteration-deck-font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  
  /* Type scale - developer tools aesthetic */
  --iteration-deck-font-size-xs: 11px;   /* Secondary labels */
  --iteration-deck-font-size-sm: 12px;   /* Primary UI text */
  --iteration-deck-font-size-md: 14px;   /* Slide labels */
  --iteration-deck-font-size-lg: 16px;   /* Deck labels */
  
  /* Line heights */
  --iteration-deck-line-height-tight: 1.2;
  --iteration-deck-line-height-normal: 1.4;
}
```

#### Spacing System (8px Grid)
```css
:root {
  /* 8px base unit spacing system */
  --iteration-deck-space-1: 4px;   /* 0.5x - tight spacing */
  --iteration-deck-space-2: 8px;   /* 1x - base unit */
  --iteration-deck-space-3: 12px;  /* 1.5x - small gaps */
  --iteration-deck-space-4: 16px;  /* 2x - medium gaps */
  --iteration-deck-space-6: 24px;  /* 3x - large gaps */
  --iteration-deck-space-8: 32px;  /* 4x - section spacing */
  
  /* Component-specific spacing */
  --iteration-deck-toolbar-padding: var(--iteration-deck-space-3);
  --iteration-deck-button-padding: var(--iteration-deck-space-2) var(--iteration-deck-space-3);
}
```

#### Color System
```css
/* Light mode (default) */
:root {
  /* Surface colors */
  --iteration-deck-bg-primary: #ffffff;
  --iteration-deck-bg-secondary: #f5f5f5;
  --iteration-deck-bg-elevated: #ffffff;
  
  /* Text colors */
  --iteration-deck-text-primary: #1a1a1a;
  --iteration-deck-text-secondary: #666666;
  --iteration-deck-text-muted: #999999;
  
  /* Border colors */
  --iteration-deck-border-light: #e5e5e5;
  --iteration-deck-border-medium: #cccccc;
  
  /* Interactive colors */
  --iteration-deck-accent: #0066cc;
  --iteration-deck-accent-hover: #0052a3;
  --iteration-deck-accent-active: #003d7a;
  
  /* State colors */
  --iteration-deck-focus-ring: #0066cc40;
  --iteration-deck-hover-bg: #f0f0f0;
  --iteration-deck-active-bg: #e0e0e0;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    /* Surface colors */
    --iteration-deck-bg-primary: #1a1a1a;
    --iteration-deck-bg-secondary: #2d2d2d;
    --iteration-deck-bg-elevated: #2d2d2d;
    
    /* Text colors */
    --iteration-deck-text-primary: #ffffff;
    --iteration-deck-text-secondary: #cccccc;
    --iteration-deck-text-muted: #999999;
    
    /* Border colors */
    --iteration-deck-border-light: #404040;
    --iteration-deck-border-medium: #555555;
    
    /* Interactive colors */
    --iteration-deck-accent: #66b3ff;
    --iteration-deck-accent-hover: #80c4ff;
    --iteration-deck-accent-active: #4da6ff;
    
    /* State colors */
    --iteration-deck-focus-ring: #66b3ff40;
    --iteration-deck-hover-bg: #333333;
    --iteration-deck-active-bg: #404040;
  }
}
```

### Interaction Design

#### Button States
```css
/* Standard button styling */
.button {
  font-family: var(--iteration-deck-font-family);
  font-size: var(--iteration-deck-font-size-sm);
  padding: var(--iteration-deck-button-padding);
  border: 1px solid var(--iteration-deck-border-medium);
  background: var(--iteration-deck-bg-primary);
  color: var(--iteration-deck-text-primary);
  cursor: pointer;
  transition: all 0.15s ease;
  
  /* Focus state - always visible for accessibility */
  &:focus-visible {
    outline: 2px solid var(--iteration-deck-focus-ring);
    outline-offset: 2px;
  }
  
  /* Hover state */
  &:hover {
    background: var(--iteration-deck-hover-bg);
    border-color: var(--iteration-deck-accent);
  }
  
  /* Active state */
  &:active {
    background: var(--iteration-deck-active-bg);
    transform: translateY(1px);
  }
  
  /* Selected/current state */
  &[aria-selected="true"], &[aria-current="true"] {
    background: var(--iteration-deck-accent);
    color: white;
    border-color: var(--iteration-deck-accent);
  }
}
```

#### Toolbar Behavior
- **Position**: Fixed to bottom of viewport (similar to browser dev tools)
- **Layering**: High z-index (9999) to appear above all content
- **Backdrop**: Semi-transparent backdrop-blur for visual separation
- **Responsive breakpoints**:
  - Desktop: Full horizontal toolbar with all controls
  - Tablet (≤768px): Compact toolbar with abbreviated labels
  - Mobile (≤480px): Minimal toolbar with icons only

#### Animation Guidelines
```css
:root {
  /* Standard timing functions */
  --iteration-deck-timing-fast: 0.15s ease;
  --iteration-deck-timing-normal: 0.2s ease;
  --iteration-deck-timing-slow: 0.3s ease-out;
  
  /* Respect user motion preferences */
  --iteration-deck-motion-duration: var(--iteration-deck-timing-normal);
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --iteration-deck-motion-duration: 0.01ms;
  }
}

/* Slide transitions */
.slide-enter {
  opacity: 0;
  transform: translateX(8px);
}

.slide-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: opacity var(--iteration-deck-motion-duration),
              transform var(--iteration-deck-motion-duration);
}
```

### Markup Standards
- Use semantic markup for toolbar navigation (`<nav>`, `<button>`, `<select>`)
- Implement proper ARIA attributes (`aria-label`, `aria-current`, `aria-selected`)
- Ensure interactive elements are properly focusable with visible focus indicators
- Use appropriate button types and form elements
- Maintain logical tab order through toolbar controls

## Implementation Notes

- Focus on simplicity over complex features
- Prioritize bundle size optimization
- Use TypeScript throughout for better DX
- Component registration happens automatically on mount/unmount
- Keyboard shortcuts operate on the currently active deck in dev mode
- Production detection should use `process.env.NODE_ENV`
- **Multi-deck support**: Automatic handling of multiple IterationDeck instances with deck selector UI
- **Zero-config approach**: No providers or setup required - components work out of the box