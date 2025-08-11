# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This project builds an NPM module containing React TypeScript components called `IterationDeck` and `IterationDeckSlide` for **AI-first prototyping workflows**. The components enable rapid design iteration by wrapping AI-generated UI variations with intuitive controls for switching between them using a familiar slide deck metaphor.

### Vision: Designer Tools for the AI Era

**The Problem**: Designers can iterate lightning-fast in Figma by duplicating frames and making non-destructive edits. But in AI-first prototyping workflows, where coding agents generate multiple variations of a component based on specs, there's no equivalent tool for comparing those iterations in-context.

**The Solution**: IterationDeck bridges this gap by providing the "duplicate frame" equivalent for AI-generated code variations. Instead of switching between static mockups, designers can compare live, interactive prototypes directly in the product context.

**Philosophy**: "We've had developer tools for so long. But where are the designer tools? Let's start one!"

### Target Users
**Primary**: Designers and Product Managers working with AI coding agents
**Secondary**: Frontend developers building component libraries and design systems  
**Tertiary**: Design system teams evaluating AI-generated component variations

### AI-First Workflow
1. **Designer creates spec**: "Make a card component with 5 different visual treatments"
2. **AI generates variations**: Coding agent creates 5 different implementations
3. **Designer compares in-context**: IterationDeck lets them toggle between variations on the actual page
4. **Stakeholder review**: Share interactive prototypes without complex deployment
5. **Decision & handoff**: Select preferred variation with documented rationale

**Core User Goals:**
- Compare AI-generated design variations in real product context
- Present multiple AI-created options to stakeholders interactively
- Iterate on AI prompts based on side-by-side comparisons
- Document design decisions from AI exploration sessions
- Bridge the gap between AI prototyping and production implementation

**Key Details:**
- Package name: `iteration-deck`
- Target: < 10kb gzipped bundle size
- Supports both ESM and CommonJS
- Production builds render only the first child
- Development mode includes visual toolbar with both mouse and keyboard controls

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

### Implementation-Ready File Structure
```
src/
├── index.ts                    # Main exports (re-exports react/index.tsx)
├── core/                       # Framework-agnostic logic
│   ├── types.ts               # All TypeScript interfaces
│   ├── state.ts               # createInitialState, createDeckActions  
│   └── url-params.ts          # parseURLParams, updateURLParams
├── react/                     # React implementation  
│   ├── index.tsx              # Main exports + IterationDeck wrapper
│   ├── context.tsx            # Global state + subscription system
│   ├── IterationDeck.tsx      # Base component (registers with context)
│   ├── IterationDeckSlide.tsx # Wrapper component (metadata only)
│   ├── toolbar.tsx            # Singleton toolbar + portal management
│   └── styles.css             # Complete design system CSS
└── example/                   # Test application
    ├── index.html             # Basic HTML shell  
    └── app.tsx                # Demo with IterationDeckProvider wrapper
```

### Critical Implementation Patterns

#### Auto-Provider Pattern (Avoid This - Use Manual Provider)
```tsx
// WRONG: Each IterationDeck creates own provider
export function IterationDeck(props) {
  return (
    <IterationDeckProvider>  {/* Creates isolated state! */}
      <BaseIterationDeck {...props} />
      <ToolbarRoot />
    </IterationDeckProvider>
  )
}

// RIGHT: Single provider wraps app, components just connect
export function IterationDeck(props) {
  return (
    <>
      <BaseIterationDeck {...props} />  {/* Registers with global state */}
      <ToolbarRoot />                   {/* Singleton toolbar */}
    </>
  )
}
```

#### Toolbar Singleton Management  
```tsx
// src/react/toolbar.tsx - Critical implementation pattern
let toolbarContainer: HTMLDivElement | null = null
let toolbarMounted = false

export function ToolbarRoot() {
  useEffect(() => {
    if (toolbarMounted) return // Prevent duplicate mounting
    
    const container = document.createElement('div')
    container.id = 'iteration-deck-toolbar-root'
    document.body.appendChild(container)
    
    const root = createRoot(container)
    root.render(<IterationDeckToolbar />)
    toolbarMounted = true
  }, [])
  
  return null // Component renders nothing in React tree
}
```

#### Global State Access Pattern
```tsx
// src/react/toolbar.tsx - Access global state outside React tree
export function IterationDeckToolbar() {
  const [, forceRender] = useState({})
  const context = useGlobalIterationDeck() // Direct global access
  
  useEffect(() => {
    return subscribeToGlobalState(() => {
      forceRender({}) // Force re-render on state changes
    })
  }, [])
  
  if (!context?.isDevMode) return null
  // Render toolbar...
}
```

### Package Exports Strategy
```json
{
  "name": "iteration-deck",
  "exports": {
    ".": {
      "types": "./dist/react/index.d.ts",
      "import": "./dist/react/index.js",
      "require": "./dist/react/index.cjs"
    },
    "./react": {
      "types": "./dist/react/index.d.ts", 
      "import": "./dist/react/index.js",
      "require": "./dist/react/index.cjs"
    },
    "./web-components": {
      "types": "./dist/web-components/index.d.ts",
      "import": "./dist/web-components/index.js",
      "require": "./dist/web-components/index.cjs"
    },
    "./svelte": {
      "types": "./dist/svelte/index.d.ts",
      "import": "./dist/svelte/index.js",
      "require": "./dist/svelte/index.cjs"
    },
    "./vue": {
      "types": "./dist/vue/index.d.ts",
      "import": "./dist/vue/index.js", 
      "require": "./dist/vue/index.cjs"
    },
    "./core": {
      "types": "./dist/core/index.d.ts",
      "import": "./dist/core/index.js",
      "require": "./dist/core/index.cjs"
    }
  }
}
```

### Component API Design

### Component Implementation Specifications

**IterationDeck** - Main wrapper component:
- **Required `id` prop**: Unique identification for global state registration
- **Optional `label`**: Toolbar display name (e.g., "Button Variants", "Card Layouts")
- **Optional `prompt`**: Document original AI prompt for generation context
- **Optional `description`**: Additional stakeholder presentation context
- **Children constraint**: Must contain only `IterationDeckSlide` components
- **Behavior**: Automatically registers with global state on mount, unregisters on unmount
- **Rendering**: In dev mode shows active slide, in production shows first slide only

**Key Implementation Details:**
```tsx
// Component extracts slide metadata from children
const slides: SlideMetadata[] = Children.toArray(children)
  .filter(isValidElement)
  .map(child => ({
    label: child.props.label,
    aiPrompt: child.props.aiPrompt,
    // ... other metadata
  }))

// Registers deck with global state
useEffect(() => {
  context.registerDeck({ id, label, slides, activeSlideIndex: 0 })
  return () => context.unregisterDeck(id)
}, [id])
```

**IterationDeckSlide** - Metadata wrapper component:
- **Required `label`**: Navigation display name (e.g., "Modern Minimal", "Dark Mode")
- **Optional `aiPrompt`**: Document specific prompt refinements for this variation
- **Optional `notes`**: Design rationale, AI feedback, or iteration insights
- **Optional `confidence`**: AI generation confidence score (0-1, dev mode only)
- **Children**: Any React content (typically AI-generated components)
- **Behavior**: Pure wrapper component - metadata extracted by parent IterationDeck

**Key Implementation Detail:**
```tsx  
// Component is purely a wrapper - rendering handled by parent
export function IterationDeckSlide({ children }) {
  return <>{children}</>  // Props used only for metadata extraction
}
```

### Required Usage Pattern

**❌ Incorrect - Multiple Providers:**
```tsx
function App() {
  return (
    <div>
      <IterationDeck id="buttons">...</IterationDeck>  {/* Creates own provider */}
      <IterationDeck id="cards">...</IterationDeck>    {/* Creates another provider */}
    </div>
  )
}
```

**✅ Correct - Single Provider:**
```tsx
function App() {
  return (
    <IterationDeckProvider>  {/* Single provider for entire app */}
      <div>
        <IterationDeck id="buttons">...</IterationDeck>  {/* Registers with shared state */}
        <IterationDeck id="cards">...</IterationDeck>    {/* Registers with shared state */}
      </div>
    </IterationDeckProvider>
  )
}
```

### AI-First Design Features
- **Prompt documentation**: Track original AI prompts and refinements per slide
- **Iteration history**: Optional metadata about the AI generation process
- **Confidence indicators**: Visual feedback about AI generation quality (dev mode only)
- **Quick regeneration**: Interface for sending variations back to AI for refinement
- **Batch operations**: Select multiple variations for combined AI refinement prompts

### URL Sharing & Navigation

**Router-Agnostic URL Parameters:**
```javascript
// Single deck sharing
https://myapp.com/dashboard?iteration-deck=button-variations&slide=hover-state

// Multiple decks (prefixed parameters)
https://myapp.com/page?iteration-deck-1=buttons:hover-state&iteration-deck-2=cards:minimal

// With AI prompt context
https://myapp.com/page?iteration-deck=cards&slide=modern&prompt=make-it-more-minimal

// Encoded for complex scenarios
https://myapp.com/page?iteration-deck=cards&slide=modern&ai-session=eyJ2ZXJzaW9u...
```

**URL Parameter Schema:**
- `iteration-deck={deckId}` - Sets active deck
- `slide={slideLabel}` - Sets active slide (URL-encoded)
- `prompt={aiPrompt}` - Optional AI prompt context (URL-encoded)
- `ai-session={base64Data}` - Optional full AI session metadata
- Multiple decks use prefixed params: `iteration-deck-1`, `iteration-deck-2`, etc.

**Implementation Behavior:**
- **On mount**: Read URL parameters and set initial deck/slide state
- **On navigation**: Optionally update URL (configurable via props)
- **Browser navigation**: Back/forward buttons work naturally
- **Fallback**: Graceful handling when parameters are missing/invalid
- **Encoding**: Safe URL encoding for slide labels and prompts

### Design Collaboration Features  
- **Shareable links**: URLs preserve exact deck/slide state for stakeholder reviews
- **Presentation mode**: Clean interface hiding AI metadata during client presentations
- **Bookmarkable sessions**: Designers can bookmark specific AI iteration states
- **Cross-browser compatibility**: Works with any routing setup or static hosting
- **Export capabilities**: Generate design specs from selected AI variations
- **Version control integration**: Git-friendly storage of AI iteration sessions

### Global State Management Architecture

**Critical Implementation Detail**: Multiple `IterationDeck` components must share a single global state, but toolbar renders in portal outside React tree.

#### Singleton State Pattern
```typescript
// Global singleton state (src/react/context.tsx)
let globalState: IterationDeckContextValue | null = null
let subscribers: Set<() => void> = new Set()

// State subscription for cross-component updates
export function subscribeToGlobalState(callback: () => void) {
  subscribers.add(callback)
  return () => subscribers.delete(callback)
}

// Notify all subscribers when state changes
function notifySubscribers() {
  subscribers.forEach(callback => callback())
}
```

#### Provider Pattern
- **Single IterationDeckProvider** wraps entire application
- **All IterationDeck components** register with same global state
- **Toolbar accesses global state** via `useGlobalIterationDeck()` hook
- **State updates trigger** subscriber notifications for toolbar re-render

#### State Shape
```typescript
interface GlobalState {
  decks: Record<string, DeckState>  // All registered decks
  activeDeckId: string | null       // Currently selected deck
  isDevMode: boolean               // Environment detection
}

interface DeckState {
  id: string
  label?: string
  slides: SlideMetadata[]
  activeSlideIndex: number         // Current slide per deck
}
```

### Environment-Specific Behavior

#### Development Mode
- **Global toolbar singleton**: One toolbar for entire application (not per deck)
- **Toolbar portal rendering**: Appends to `document.body` via React portal
- **Multi-deck support**: Dropdown selector appears when >1 deck registered
- **Keyboard shortcuts**: Arrow keys navigate when toolbar focused
- **All slides visible**: IterationDeck renders active slide based on global state

#### Production Mode  
- **First slide only**: IterationDeck renders `Children.toArray(children)[0]`
- **No toolbar**: Environment detection prevents mounting
- **Minimal footprint**: Zero overhead in production builds

#### Environment Detection Strategy
```typescript
// Primary: Vite/modern bundlers
const isDevMode = import.meta.env?.MODE !== 'production'

// Fallback: Traditional NODE_ENV (Webpack, etc.)
const isDevMode = process.env?.NODE_ENV !== 'production'

// Implementation:
const isDevMode = (import.meta.env?.MODE || process.env?.NODE_ENV) !== 'production'
```

### Implementation Phases

#### Phase 1: React-First Foundation (v1.0)
- Implement complete React version with all AI-first features
- Framework-agnostic core logic in `src/core/`
- Full TypeScript support and documentation
- Complete testing suite and examples
- **Target**: Production-ready React implementation

#### Phase 2: Web Components Bridge (v1.1)
- Custom elements wrapping React components
- Framework-agnostic usage via `<iteration-deck>` tags
- Maintains full feature parity with React version
- **Target**: Universal framework compatibility

#### Phase 3: Native Framework Implementations (v1.2+)
- Native Svelte implementation using Svelte stores
- Native Vue implementation using Vue 3 Composition API
- Shared core logic ensures consistent behavior
- **Target**: Optimal performance per framework

### Multi-Framework Usage Examples
```javascript
// React (default import)
import { IterationDeck, IterationDeckSlide } from 'iteration-deck'

// React (explicit import)
import { IterationDeck, IterationDeckSlide } from 'iteration-deck/react'

// Web Components (framework-agnostic)
import 'iteration-deck/web-components'
// Use: <iteration-deck id="cards"><iteration-deck-slide label="Modern">...</iteration-deck-slide></iteration-deck>

// Svelte
import { IterationDeck, IterationDeckSlide } from 'iteration-deck/svelte'

// Vue
import { IterationDeck, IterationDeckSlide } from 'iteration-deck/vue'

// Core utilities only
import { createDeckState, parseURLParams } from 'iteration-deck/core'
```

## Build Configuration

The module will use:
- **Rollup** for bundling with tree-shaking support per framework
- **TypeScript** compilation with declaration files for all targets
- **Vite** configured for library mode with multiple entry points
- Framework-specific build targets with shared core bundle
- Proper `package.json` exports field for all framework variants

## Development Workflow & Debugging Guide

### Implementation Sequence (Learned from Trial)

**Phase 1: Core Foundation (30 minutes)**
1. **Scaffold project**: `pnpm init`, package.json exports, tsconfig.json, vite.config.ts
2. **Core types & utilities**: All interfaces in `src/core/types.ts` first
3. **State management**: `createInitialState`, `createDeckActions` with subscription system
4. **URL parameter handling**: `parseURLParams`, `updateURLParams` with error handling

**Phase 2: React Components (45 minutes)**  
5. **Global context**: Provider with singleton state and subscriber notification
6. **Base IterationDeck**: Component registration, slide metadata extraction
7. **IterationDeckSlide**: Simple wrapper (props are metadata only)
8. **Toolbar singleton**: Portal-based rendering with global state access

**Phase 3: Styling & Polish (30 minutes)**
9. **CSS design system**: Complete styles.css with all responsive breakpoints
10. **Example application**: Multi-deck demo with provider wrapper
11. **Icon fixes**: Use HTML entities (‹ ›) instead of Unicode arrows

### Critical Debugging Techniques

#### Toolbar Not Appearing Checklist
```bash
# 1. Check dev mode detection
console.log('Environment:', import.meta.env?.MODE)

# 2. Verify global state access  
console.log('Global state:', useGlobalIterationDeck())

# 3. Inspect DOM for container
document.getElementById('iteration-deck-toolbar-root')

# 4. Check for infinite render loops
# Look for rapid console.log repetition - indicates subscription issues
```

#### State Registration Issues
```tsx
// Add debug logging to track deck registration
export function IterationDeck({ id, ...props }) {
  useEffect(() => {
    console.log(`Registering deck: ${id}`, { props, slides: extractedSlides })
  }, [id])
  
  // Check if deck appears in global state
  const context = useIterationDeck()
  console.log('Current decks:', Object.keys(context.decks))
}
```

#### Portal Rendering Problems
```tsx
// Verify portal container creation
useEffect(() => {
  const container = document.getElementById('iteration-deck-toolbar-root')
  console.log('Toolbar container:', container, 'Mounted:', toolbarMounted)
}, [])
```

### Common Pitfalls & Solutions

❌ **Multiple Providers**: Each IterationDeck creating own provider
✅ **Single Provider**: Wrap entire app once, all decks register with same state

❌ **Context in Portal**: Trying to useContext across portal boundary  
✅ **Global State Access**: Use singleton with subscription system

❌ **Unicode Issues**: Arrow characters (←, →) corrupted in file transfer
✅ **HTML Entities**: Use ‹ and › or SVG components

❌ **Environment Detection**: Using only `process.env.NODE_ENV`
✅ **Bundler-Agnostic**: Check both `import.meta.env.MODE` and `process.env.NODE_ENV`

### Performance Monitoring

**Bundle Size Targets:**
- Total: <10kb gzipped  
- React component: ~8.5kb gzipped
- CSS: ~1.5kb gzipped

**Runtime Performance:**
- State updates should not cause full re-renders
- Toolbar should only re-render on actual state changes
- URL updates should be debounced/throttled

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
- **Optional keyboard shortcuts** (for power users):
  - `←/→`: Navigate slides in active deck (when toolbar focused)
  - `↑/↓`: Switch between decks when multiple present (when toolbar focused)
  - **Note**: Shortcuts work only when toolbar has focus to avoid conflicts with page interactions

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

#### Error Handling & Edge Cases (Design-Focused)
- **Loading states**: "Loading design variations..." with friendly messaging
- **Error states**: "Unable to load this variation" with suggestion to refresh
- **Empty states**: "No design variations added yet" with helpful guidance
- **Malformed content**: Hide broken slides gracefully, don't break entire deck
- **Graceful degradation**: Show first variation when JavaScript disabled
- **Too many slides**: Performance warnings in development, pagination suggestions
- **Missing labels**: Auto-generate friendly names ("Variation 1", "Variation 2")

#### Design Workflow Considerations  
- **Presentation mode**: Clean URLs for sharing with stakeholders
- **Design handoff**: Clear slide labels and descriptions for developer handoff
- **Version control friendly**: Minimal markup changes when slides are reordered
- **Screenshot/recording friendly**: High contrast toolbar that looks good in recordings
- **Demo mode**: Option to auto-advance slides for presentations

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
  --iteration-deck-toolbar-bg: #f8f9fa;        /* Light gray toolbar background */
  --iteration-deck-toolbar-interactive: #ffffff; /* White interactive areas */
  
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
    --iteration-deck-toolbar-bg: #2d2d2d;        /* Dark gray toolbar background */
    --iteration-deck-toolbar-interactive: #404040; /* Lighter interactive areas */
    
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

#### Pill-Shaped Toolbar Layout
```css
/* Main toolbar container */
.iteration-deck-toolbar {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  
  /* Pill shape */
  border-radius: 24px;
  padding: var(--iteration-deck-space-3);
  
  /* Layout */
  display: flex;
  align-items: center;
  gap: var(--iteration-deck-space-4);
  max-width: 480px;
  
  /* Visual styling */
  background: var(--iteration-deck-toolbar-bg);
  border: 1px solid var(--iteration-deck-border-light);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  
  /* Typography */
  font-family: var(--iteration-deck-font-family);
  font-size: var(--iteration-deck-font-size-sm);
  line-height: var(--iteration-deck-line-height-normal);
}

/* Interactive elements get white background */
.iteration-deck-toolbar button,
.iteration-deck-toolbar select {
  background: var(--iteration-deck-toolbar-interactive);
  border: 1px solid var(--iteration-deck-border-light);
  border-radius: 8px;
  padding: var(--iteration-deck-space-2) var(--iteration-deck-space-3);
  font-family: var(--iteration-deck-font-family);
  font-size: var(--iteration-deck-font-size-sm);
  cursor: pointer;
  transition: all var(--iteration-deck-timing-fast);
  
  /* Focus state */
  &:focus-visible {
    outline: 2px solid var(--iteration-deck-focus-ring);
    outline-offset: 2px;
  }
  
  /* Hover state */
  &:hover:not(:disabled) {
    background: var(--iteration-deck-hover-bg);
    border-color: var(--iteration-deck-accent);
  }
  
  /* Active state */
  &:active:not(:disabled) {
    background: var(--iteration-deck-active-bg);
    transform: translateY(1px);
  }
  
  /* Selected/current state */
  &[aria-selected="true"], &[aria-current="true"] {
    background: var(--iteration-deck-accent);
    color: white;
    border-color: var(--iteration-deck-accent);
  }
  
  /* Disabled state */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

/* Responsive adjustments */
@media (max-width: 1023px) {
  .iteration-deck-toolbar {
    bottom: 24px;
    right: 24px;
    gap: var(--iteration-deck-space-3);
  }
}

@media (max-width: 767px) {
  .iteration-deck-toolbar {
    bottom: 16px;
    right: 16px;
    border-radius: 16px;
    padding: var(--iteration-deck-space-2);
    gap: var(--iteration-deck-space-2);
    max-width: 320px;
  }
}
```

#### Toolbar Behavior & Visual Design
- **Position**: Fixed to lower-right corner of viewport (not full-width)
- **Spacing**: 24px from right and bottom edges on tablet+ devices
- **Shape**: Pill-shaped container with rounded corners (border-radius: 24px)
- **Background**: Light gray (#f8f9fa) with subtle shadow and backdrop blur
- **Interactive areas**: White background for buttons, dropdowns, and controls
- **Visual hierarchy**: Light container background, white interactive elements
- **Layering**: High z-index (9999) to appear above all content
- **Layout**: Horizontal flex layout with gap spacing between control groups
- **Responsive behavior**:
  - Desktop (≥1024px): Full pill layout, 24px from edges
  - Tablet (768px-1023px): Compact pill layout, 24px from edges
  - Mobile (≤767px): Reduced padding, 16px from edges, smaller border-radius

#### Designer-Friendly Features
- **Compact pill-shaped toolbar**: Fixed to lower-right corner, not full-width
- **Visual hierarchy**: Light gray background with white interactive areas
- **Visual slide indicators**: Dot navigation showing total slides and current position
- **Slide labels prominently displayed**: Current slide name always visible
- **Hover previews**: Quick visual preview of slides on hover (when feasible)
- **Clear visual feedback**: Obvious visual states for all interactive elements
- **Intuitive iconography**: Standard presentation/slideshow icons (‹, ›)
- **No technical jargon**: All UI text uses design/presentation terminology

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

### Web Components Bridge Strategy

**Why Web Components as Phase 2:**
- Universal compatibility across all frameworks
- Server-side rendering friendly
- Future-proofs the AI design workflow tooling
- Allows gradual adoption in mixed-framework codebases

**Technical Approach:**
```javascript
// Bridge implementation concept
class IterationDeckElement extends HTMLElement {
  private reactRoot: ReactRoot
  
  connectedCallback() {
    // Mount React component inside custom element
    this.reactRoot = createRoot(this)
    this.reactRoot.render(
      <IterationDeck 
        id={this.getAttribute('id')}
        label={this.getAttribute('label')}
        // ... other props from attributes
      >
        {this.parseSlotChildren()}
      </IterationDeck>
    )
  }
}
```

**Benefits:**
- ✅ Framework-agnostic usage
- ✅ Maintains full React feature set under the hood  
- ✅ Familiar custom element API
- ✅ Works with any bundler/build system
- ✅ Enables AI code generation for any framework

## Implementation Notes

### Core Philosophy
- Focus on simplicity over complex features
- Prioritize bundle size optimization (< 10kb per framework target)
- Use TypeScript throughout for better DX
- **Zero-config approach**: No providers or setup required - components work out of the box

### Technical Implementation
- Component registration happens automatically on mount/unmount
- Keyboard shortcuts operate on the currently active deck in dev mode
- Production detection should use `process.env.NODE_ENV`
- **Multi-deck support**: Automatic handling of multiple IterationDeck instances with deck selector UI
- **Framework-agnostic core**: All state management and URL handling shared across implementations
- **Progressive enhancement**: Web components bridge allows universal framework compatibility