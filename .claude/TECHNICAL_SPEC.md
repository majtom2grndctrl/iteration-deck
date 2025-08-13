# Iteration Deck - Technical Specification

## Overview

Stencil web components for **AI-first prototyping workflows** that enable designers and PMs to compare AI-generated UI variations interactively. Uses a slide deck metaphor where each AI-generated variation is a "slide" in the deck.

**Core Philosophy:** Provide the "duplicate frame" equivalent for AI-generated code variations, allowing live comparison of interactive prototypes directly in product context.

## Web Component API

### Core Components

- `<iteration-deck>` - Container component for managing UI variations
- `<iteration-deck-slide>` - Individual variation/slide wrapper
- `<iteration-deck-toolbar>` - Global navigation toolbar (singleton, auto-created by first instance of `<iteration-deck>`)

### Properties & Attributes

```typescript
// iteration-deck component
@Component({
  tag: 'iteration-deck'
})
export class IterationDeck {
  /** Unique identifier for this iteration deck */
  @Prop() id!: string;
  
  /** Label for this deck in the toolbar */
  @Prop() label?: string;
  
  /** Optional AI prompt context for generation tracking */
  @Prop() prompt?: string;
  
  /** Additional context for stakeholder presentations */
  @Prop() description?: string;
  
  /** Currently active slide index */
  @Prop({ mutable: true }) activeIndex: number = 0;
}

// iteration-deck-slide component
@Component({
  tag: 'iteration-deck-slide'
})
export class IterationDeckSlide {
  /** Label for this slide/variation */
  @Prop() label!: string;
  
  /** Optional AI prompt refinements for this specific variation */
  @Prop() aiPrompt?: string;
  
  /** Design rationale, AI feedback, or iteration insights */
  @Prop() notes?: string;
  
  /** AI generation confidence score (0-1, dev mode only) */
  @Prop() confidence?: number;
}
```

### Usage Examples

```html
<!-- Basic usage -->
<iteration-deck id="hero-layouts" label="Hero Sections">
  <iteration-deck-slide label="Centered Layout">
    <div class="hero-centered">
      <h1>Welcome</h1>
      <p>Centered hero layout</p>
    </div>
  </iteration-deck-slide>
  <iteration-deck-slide label="Split Layout">
    <div class="hero-split">
      <div class="content">...</div>
      <div class="image">...</div>
    </div>
  </iteration-deck-slide>
  <iteration-deck-slide label="Full Width">
    <div class="hero-fullwidth">
      <h1>Full width hero</h1>
    </div>
  </iteration-deck-slide>
</iteration-deck>

<!-- AI-generated button variations with prompt tracking -->
<iteration-deck 
  id="cta-buttons" 
  label="Call to Action Buttons"
  prompt="Create a modern, accessible CTA button with 3 style variations">
  
  <iteration-deck-slide 
    label="Primary" 
    ai-prompt="Make it bold and attention-grabbing"
    confidence="0.95">
    <button class="btn-primary">Get Started</button>
  </iteration-deck-slide>
  
  <iteration-deck-slide 
    label="Subtle" 
    ai-prompt="More understated, professional look"
    confidence="0.87">
    <button class="btn-outline">Get Started</button>
  </iteration-deck-slide>
  
  <iteration-deck-slide 
    label="Gradient" 
    ai-prompt="Add visual interest with gradient background"
    confidence="0.92"
    notes="Designer preferred this for hero section">
    <button class="btn-gradient">Get Started</button>
  </iteration-deck-slide>
</iteration-deck>
```

### Framework Integration

```typescript
// React/JSX usage
import { defineCustomElements } from 'iteration-deck/loader';

defineCustomElements();

function App() {
  return (
    <div>
      <h2>Header Variations</h2>
      <iteration-deck id="headers" label="Page Headers">
        <iteration-deck-slide label="Standard">
          <Header variant="standard" />
        </iteration-deck-slide>
        <iteration-deck-slide label="Compact">
          <Header variant="compact" />
        </iteration-deck-slide>
      </iteration-deck>
      
      {/* 
        Toolbar automatically shows deck selector dropdown
        Keyboard shortcuts work on selected deck
        Zero configuration required
      */}
    </div>
  );
}
```

```vue
<!-- Vue usage -->
<template>
  <div>
    <h2>Button Variations</h2>
    <iteration-deck id="buttons" label="CTA Buttons">
      <iteration-deck-slide label="Primary">
        <MyButton variant="primary">Click Me</MyButton>
      </iteration-deck-slide>
      <iteration-deck-slide label="Secondary">
        <MyButton variant="secondary">Click Me</MyButton>
      </iteration-deck-slide>
    </iteration-deck>
  </div>
</template>

<script>
import { defineCustomElements } from 'iteration-deck/loader';
defineCustomElements();
</script>
```

## Designer Toolbar

Single global `<iteration-deck-toolbar>` component (singleton pattern, auto-created at runtime by the first deck component) with intelligent multi-deck support:
- **Deck selector dropdown** (appears when multiple iteration-deck elements are present)
- Previous/Next navigation for the currently active deck
- Current slide label display for active deck
- Keyboard shortcuts (Ctrl/Cmd + Arrow keys) operate on active deck only

### Multi-Deck Behavior
- Single toolbar instance auto-created at runtime and shared across all iteration-deck components
- Dropdown selector shows deck labels (falls back to deck IDs)
- Active deck highlighted in selector and responds to keyboard shortcuts
- Automatic cleanup when decks are disconnected from DOM

### State Management
The toolbar and deck components use Zustand for framework-agnostic global state management:
```typescript
// Zustand store for cross-component communication
interface GlobalDeckState {
  decks: Map<string, DeckInfo>;
  activeDeckId: string | null;
  activeSlideIndex: number;
  setActiveDeck: (deckId: string) => void;
  setActiveSlide: (index: number) => void;
  registerDeck: (deck: DeckInfo) => void;
  unregisterDeck: (deckId: string) => void;
}

// Store instance shared across all components
export const useIterationDeckStore = create<GlobalDeckState>((set) => ({
  // Store implementation
}));
```

## Production Behavior

In production builds, render only the first slide by default:

```html
<!-- Development: Shows controls and all variations -->
<!-- Production: Renders only first slide -->
<iteration-deck id="hero" label="Hero Variations">
  <iteration-deck-slide label="Version 1">
    <!-- Only this slide renders in production -->
    <div class="hero-v1">Hero Version 1</div>
  </iteration-deck-slide>
  <iteration-deck-slide label="Version 2">
    <div class="hero-v2">Hero Version 2</div>  
  </iteration-deck-slide>
  <iteration-deck-slide label="Version 3">
    <div class="hero-v3">Hero Version 3</div>  
  </iteration-deck-slide>
</iteration-deck>
```

### Environment Detection
Components must detect whether they're running in development or production mode and adjust behavior accordingly. The specific implementation should leverage Stencil's build system capabilities for environment detection.

## Testing

### Component Tests (using Stencil's Jest setup)
- Basic rendering with variations using `newSpecPage`
- Zustand store integration and state management
- Navigation between variations
- Production vs development behavior
- Slot content rendering

### End-to-End Tests (using Puppeteer)
- Toolbar interaction across multiple decks  
- Keyboard shortcuts functionality
- Multiple iteration groups on same page
- Cross-browser web component compatibility

## Bundle Configuration

### Build Targets (Stencil Configuration)
- **Web Components**: Standards-compliant custom elements
- **Framework Bundles**: React components that are thin wrappers around the base web components, to make them most easily consumable by engineers building with React
- **TypeScript Declarations**: Full type safety
- **Dist Targets**: Multiple output formats for different consumption patterns

### Build Tools
- **Stencil Compiler**: Optimized web component compilation
- **Rollup**: Bundling with tree-shaking
- **TypeScript**: Strict mode compilation
- **Vanilla Extract**: Type-safe CSS-in-JS styling

### Stencil Configuration Requirements
- **Namespace**: `iteration-deck` for component prefixing
- **Distribution Output**: Standard dist build with ESM loader for framework integration
- **Custom Elements Output**: Standalone web components with auto-define behavior
- **Documentation**: Auto-generated README files for each component
- **Development Server**: Local development environment with HMR
- **Testing Setup**: Jest unit tests with Puppeteer e2e testing using headless Chrome
- **TypeScript**: Strict compilation with declaration file generation
- **CSS Processing**: Vanilla Extract integration for type-safe styling

## Installation & Usage

### Installation
```bash
pnpm add iteration-deck
```

### Loading Web Components
```typescript
// Option 1: Auto-define (recommended)
import { defineCustomElements } from 'iteration-deck/loader';
defineCustomElements();

// Option 2: Manual imports
import { IterationDeck, IterationDeckSlide } from 'iteration-deck/dist/components';
```

## Environment-Specific Behavior

### Development Mode
- **Global toolbar**: Single `<iteration-deck-toolbar>` for all deck instances
- **Multi-deck support**: Dropdown selector when multiple decks present
- **Keyboard shortcuts**: Ctrl/Cmd + Arrow keys for navigation
- **All slides visible**: Shows active slide based on Zustand store state
- **Visual feedback**: 
  - Pulsing glow effect to indicate selected deck location
  - Auto-scroll to bring selected deck into top half of viewport
  - Smooth transitions between slides

### Production Mode
- **First slide only**: Renders first `<iteration-deck-slide>` automatically
- **No toolbar**: Environment detection prevents toolbar mounting
- **Zero overhead**: Minimal runtime footprint, no dev tools loaded
- **Static rendering**: Web components act like regular HTML containers

## AI-First Features

### Design Collaboration
- **Shareable URLs**: Preserve exact deck/slide state for stakeholder reviews
- **Presentation mode**: Clean interface hiding AI metadata during presentations
- **Bookmarkable sessions**: Designers can bookmark specific iteration states

### URL Parameters
```javascript
// Single deck with slide selection
https://myapp.com/dashboard?iteration-deck=button-variations&slide=hover-state

// With AI prompt context  
https://myapp.com/page?iteration-deck=cards&slide=modern&prompt=make-it-more-minimal
```


## Testing Requirements

### Critical Test Cases
1. **Environment detection**: Production vs development rendering behavior
2. **Toolbar singleton**: Only one toolbar exists with multiple decks
3. **Zustand state**: Cross-component state synchronization via Zustand store
4. **URL synchronization**: State persists across page reloads
5. **Keyboard shortcuts**: Navigation works on active deck only
6. **Web component lifecycle**: Proper registration/cleanup on connect/disconnect
7. **Framework compatibility**: Works with React, Vue, Angular, vanilla HTML
8. **Accessibility**: ARIA attributes, keyboard navigation, screen reader support

