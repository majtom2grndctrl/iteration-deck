# Iteration Deck - Technical Specification

## Overview

Universal web components built with Lit for **AI-first prototyping workflows** that enable designers and PMs to compare AI-generated UI variations interactively. Uses a slide deck metaphor where each AI-generated variation is a "slide" in the deck.

**Core Philosophy:** Provide the "duplicate frame" equivalent for AI-generated code variations, allowing live comparison of interactive prototypes directly in product context.

**Architecture:** Lit web components with manual React wrappers, Zustand for state management, and ShadowDOM-encapsulated CSS using Lit's tagged template literals with design tokens. Works with any framework (React, Vue, Angular, Astro, vanilla HTML).

## Architecture Deep Dive

### Lit Web Components Foundation
The core functionality is implemented as Lit components with excellent performance and developer experience:
- `<iteration-deck>`: Main container component with Zustand state integration
- `<iteration-deck-slide>`: Individual slide wrapper with Lit @property decorators
- `<iteration-deck-toolbar>`: Development toolbar (singleton) with Zustand state

### ShadowDOM Styling System
ShadowDOM-encapsulated CSS using Lit's tagged template literals with design token integration:
- **Design Tokens**: TypeScript constants for static values (colors, spacing, typography scales) in `src/util/tokens/`
- **CSS Custom Properties**: Runtime-dynamic values (theme switching, user preferences) defined within components
- **ShadowDOM Encapsulation**: All styles isolated within component shadow roots for universal compatibility
- **Embedded Styles**: CSS defined within Lit components using `css` tagged template literals

### Zustand State Management
```typescript
interface IterationStore {
  activeDecks: Record<string, string>; // deckId -> activeSlideId
  setActiveSlide: (deckId: string, slideId: string) => void;
  isProduction: boolean;
}
```
- Lit components subscribe via `store.subscribe()`
- React components use `useIterationStore()` hook

### Manual React Wrapper Components
Thin React wrapper components for seamless integration:
```tsx
// Manual React wrapper around Lit component
import { IterationDeck } from '@iteration-deck/react';

// Direct web component usage for other frameworks
import '@iteration-deck/core';

// Astro integration
import { IterationDeck } from '@iteration-deck/astro';
```

### Universal Framework Support
- **React**: Manual React wrapper components with Zustand integration and proper TypeScript types
- **Vue**: Direct web component usage with reactive property binding
- **Angular**: Direct web component usage with proper change detection
- **Astro**: Custom Astro integration with SSR support
- **Vanilla HTML**: Import and use web components directly
- **Other frameworks**: Web components work universally with Lit optimizations

## Component API

```tsx
interface IterationDeckProps {
  /** Unique identifier for this iteration deck */
  id: string;
  /** Label for this deck in the toolbar */
  label?: string;
  /** Optional AI prompt context for generation tracking */
  prompt?: string;
  /** Additional context for stakeholder presentations */
  description?: string;
  children: React.ReactElement<IterationDeckSlideProps>[];
}

interface IterationDeckSlideProps {
  /** Label for this slide/variation */
  label: string;
  /** Optional AI prompt refinements for this specific variation */
  aiPrompt?: string;
  /** Design rationale, AI feedback, or iteration insights */
  notes?: string;
  /** AI generation confidence score (0-1, dev mode only) */
  confidence?: number;
  children: React.ReactNode;
}

function IterationDeck({ 
  id, 
  label, 
  prompt,
  description,
  children 
}: IterationDeckProps): JSX.Element

function IterationDeckSlide({ 
  label, 
  aiPrompt,
  notes,
  confidence,
  children 
}: IterationDeckSlideProps): JSX.Element
```

### Usage Examples

```tsx
// Basic usage
<IterationDeck id="hero-layouts" label="Hero Sections">
  <IterationDeckSlide label="Centered Layout">
    <HeroLayout1 />
  </IterationDeckSlide>
  <IterationDeckSlide label="Split Layout">
    <HeroLayout2 />
  </IterationDeckSlide>
  <IterationDeckSlide label="Full Width">
    <HeroLayout3 />
  </IterationDeckSlide>
</IterationDeck>

// AI-generated button variations with prompt tracking
<IterationDeck 
  id="cta-buttons" 
  label="Call to Action Buttons"
  prompt="Create a modern, accessible CTA button with 3 style variations"
>
  <IterationDeckSlide 
    label="Primary" 
    aiPrompt="Make it bold and attention-grabbing"
    confidence={0.95}
  >
    <Button variant="primary">Get Started</Button>
  </IterationDeckSlide>
  <IterationDeckSlide 
    label="Subtle" 
    aiPrompt="More understated, professional look"
    confidence={0.87}
  >
    <Button variant="outline">Get Started</Button>
  </IterationDeckSlide>
  <IterationDeckSlide 
    label="Gradient" 
    aiPrompt="Add visual interest with gradient background"
    confidence={0.92}
    notes="Designer preferred this for hero section"
  >
    <Button variant="gradient">Get Started</Button>
  </IterationDeckSlide>
</IterationDeck>

// Multiple decks on same page - automatic multi-deck support
function DesignSystemPage() {
  return (
    <div>
      <h2>Header Variations</h2>
      <IterationDeck id="headers" label="Page Headers">
        <IterationDeckSlide label="Standard">
          <Header variant="standard" />
        </IterationDeckSlide>
        <IterationDeckSlide label="Compact">
          <Header variant="compact" />
        </IterationDeckSlide>
      </IterationDeck>

      <h2>Footer Variations</h2>
      <IterationDeck id="footers" label="Page Footers">
        <IterationDeckSlide label="Full">
          <Footer variant="full" />
        </IterationDeckSlide>
        <IterationDeckSlide label="Minimal">
          <Footer variant="minimal" />
        </IterationDeckSlide>
      </IterationDeck>
      
      {/* 
        Toolbar automatically shows deck selector dropdown
        Keyboard shortcuts work on selected deck
        Zero configuration required
      */}
    </div>
  );
}
```

## Development Toolbar

Single global toolbar (singleton pattern) with intelligent multi-deck support:
- **Deck selector dropdown** (appears when multiple IterationDecks are present)
- Previous/Next navigation for the currently active deck
- Current slide label display for active deck
- Keyboard shortcuts (Cmd/Ctrl+Alt+[ or ]) operate on active deck only
- **ShadowDOM-encapsulated styling** via Lit CSS tagged template literals

### Multi-Deck Behavior
- Single toolbar instance shared across all IterationDecks
- Dropdown selector shows deck labels (falls back to deck IDs)
- Active deck highlighted in selector and responds to keyboard shortcuts
- Automatic cleanup when decks are unmounted

### Component Structure
```
src/
├── lit/
│   ├── iteration-deck.ts           # Lit component with embedded CSS
│   ├── iteration-deck-slide.ts     # Lit component with embedded CSS
│   └── iteration-deck-toolbar.ts   # Lit component with embedded CSS
├── react/
│   ├── IterationDeck.tsx
│   └── IterationDeckSlide.tsx
├── util/
│   ├── tokens/
│   │   ├── index.ts
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   └── typography.ts
│   └── store/
│       └── iteration-store.ts
└── example/
    └── demo.html
```

## Production Behavior

In production builds, render only the first child by default:

```tsx
// Development: Shows controls and all variations
// Production: Renders only first slide
<IterationDeck id="hero" label="Hero Variations">
  <IterationDeckSlide label="Version 1">
    <HeroV1 />  {/* Only this renders in production */}
  </IterationDeckSlide>
  <IterationDeckSlide label="Version 2">
    <HeroV2 />  
  </IterationDeckSlide>
  <IterationDeckSlide label="Version 3">
    <HeroV3 />  
  </IterationDeckSlide>
</IterationDeck>
```

## Core Implementation Requirements

### Environment Detection
```typescript
const isProduction = process.env.NODE_ENV === 'production';
// Production: render only first slide
// Development: show toolbar + all slides
```

### Lit Component Patterns
```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { colors, spacing } from '../util/tokens/index.js';

@customElement('iteration-deck')
export class IterationDeck extends LitElement {
  @property() id!: string;
  @property() label?: string;
  @state() private activeSlideId = '';
  
  static styles = css`
    :host {
      display: block;
      background-color: ${colors.gray[50]};
      border-radius: ${spacing.md};
      --theme-primary: var(--iteration-deck-primary, ${colors.blue[600]});
    }
  `;
  
  connectedCallback() {
    super.connectedCallback();
    // Subscribe to Zustand store
  }
}
```


## Installation & Usage

### Installation
```bash
# Framework-specific packages
pnpm add @iteration-deck/react     # For React projects (manual wrappers)
pnpm add @iteration-deck/astro     # For Astro projects with SSR support

# Universal web components package
pnpm add @iteration-deck/core      # For vanilla HTML and other frameworks
```

### Import and Usage

#### React Usage (Manual Wrappers)
```tsx
import { IterationDeck, IterationDeckSlide } from '@iteration-deck/react';

// Manual React wrapper components with Zustand integration
<IterationDeck id="hero-layouts" label="Hero Sections">
  <IterationDeckSlide label="Layout 1">
    <HeroLayout1 />
  </IterationDeckSlide>
  <IterationDeckSlide label="Layout 2">
    <HeroLayout2 />
  </IterationDeckSlide>
  <IterationDeckSlide label="Layout 3">
    <HeroLayout3 />
  </IterationDeckSlide>
</IterationDeck>
```

#### Astro Usage (Custom Integration)
```astro
---
// Component script - runs on the server
import { IterationDeck, IterationDeckSlide } from '@iteration-deck/astro';
---

<!-- SSR with client hydration for interactivity -->
<IterationDeck id="hero-layouts" label="Hero Sections" client:load>
  <IterationDeckSlide label="Layout 1">
    <MyHeroLayout variant="1" />
  </IterationDeckSlide>
  <IterationDeckSlide label="Layout 2">
    <MyHeroLayout variant="2" />
  </IterationDeckSlide>
  <IterationDeckSlide label="Layout 3">
    <MyHeroLayout variant="3" />
  </IterationDeckSlide>
</IterationDeck>

<style>
  /* Astro scoped styles work seamlessly */
  iteration-deck {
    margin: 2rem 0;
  }
</style>
```

#### Vanilla HTML Usage
```html
<!-- Direct web component usage in vanilla HTML -->
<script type="module">
  import '@iteration-deck/core';
</script>

<iteration-deck id="components" label="Component Variations">
  <iteration-deck-slide label="Version 1">
    <div class="my-component variant-1">Content 1</div>
  </iteration-deck-slide>
  <iteration-deck-slide label="Version 2">
    <div class="my-component variant-2">Content 2</div>
  </iteration-deck-slide>
</iteration-deck>
```

## Build Configuration
- **Vite**: Library mode with multiple entry points
- **TypeScript**: Strict mode with experimental decorators for Lit
- **ShadowDOM**: Built-in CSS encapsulation, no build-time CSS processing needed

## Environment-Specific Behavior

### Development Mode
- **Global toolbar**: Single Lit toolbar component for all IterationDeck instances
- **Multi-deck support**: Dropdown selector when multiple decks present
- **Keyboard shortcuts**: Cmd/Ctrl+Alt+[ or ] for navigation via Lit event listeners
- **All slides visible**: Shows active slide based on Zustand state store
- **MutationObserver**: Automatically detects dynamically added slides
- **Hot reload support**: Vite development server with instant updates

### Production Mode
- **First slide only**: Lit components render first child only
- **No toolbar**: Toolbar mounting prevented in production
- **ShadowDOM encapsulation**: All styles isolated within component shadow roots
- **Optimized bundles**: Tree-shaken, minified output with code splitting
- **Framework-specific optimizations**: Each package optimized for its target framework

## AI-First Features

### Design Collaboration
- **Shareable URLs**: Preserve exact deck/slide state for stakeholder reviews
- **Presentation mode**: Clean interface hiding AI metadata during presentations

### URL Parameters
```javascript
// Single deck with slide selection
https://myapp.com/dashboard?iteration-deck=button-variations&slide=hover-state

// With AI prompt context  
https://myapp.com/page?iteration-deck=cards&slide=modern&prompt=make-it-more-minimal
```

## Key Behaviors
1. **Single toolbar** globally across all decks (singleton pattern)
2. **Production mode** renders only first slide per deck
3. **Development mode** shows toolbar + slide navigation
4. **Keyboard shortcuts** (Cmd/Ctrl+Alt+[ or ]) for active deck
5. **Multi-deck support** via dropdown when >1 deck present

