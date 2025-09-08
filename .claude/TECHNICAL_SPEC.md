# Iteration Deck - Technical Specification

## Overview

Universal web components built with Lit for **AI-first prototyping workflows** that enable designers and PMs to compare AI-generated UI variations interactively. Uses a slide deck metaphor where each AI-generated variation is a "slide" in the deck.

**Core Philosophy:** Provide the "duplicate frame" equivalent for AI-generated code variations, allowing live comparison of interactive prototypes directly in product context.

**Architecture:** Single package with dual exports - pure React components as default export, Lit web components at `/wc` export. Shared design tokens and types ensure consistency. Zustand for state management across both implementations.

## Architecture Deep Dive

### Single Package, Dual Exports
- **Primary Export (`.`)**: Pure React components that work immediately in any React environment
- **Secondary Export (`./wc`)**: Lit web components for web standards enthusiasts and non-React frameworks
- **Shared Foundation**: Common design tokens and types ensure visual/functional consistency

### Pure React Implementation
Primary implementation using standard React patterns:
- `IterationDeck`: Pure React component with CSS-in-JS styling
- `IterationDeckSlide`: Pure React component for individual slides
- `IterationDeckToolbar`: Automatically managed by IterationDeck (singleton pattern)
- **No web components**: Standard React hooks and components only
- **CSS-in-JS**: Styled using React patterns, not ShadowDOM

### Lit Web Components (Secondary)
Alternative implementation for web standards enthusiasts:
- `<iteration-deck>`: Main container component with Zustand state integration
- `<iteration-deck-slide>`: Individual slide wrapper with Lit @property decorators  
- `<iteration-deck-toolbar>`: Development toolbar (singleton) with Zustand state
- **ShadowDOM Encapsulation**: All styles isolated within component shadow roots

### Shared Design System
Common foundation used by both implementations:
- **Shared Types**: TypeScript interfaces in `src/shared/types.ts` 
- **Environment Detection**: Utilities in `src/shared/index.ts`
- **Design Tokens**: Consistent styling values (colors, spacing, etc.)

### Zustand State Management
Shared state management across both implementations:
```typescript
interface IterationStore {
  activeDecks: Record<string, string>; // deckId -> activeSlideId
  setActiveSlide: (deckId: string, slideId: string) => void;
  isProduction: boolean;
}
```
- React: `useIterationStore()` hook and store utilities
- Web Components: Direct store subscription via `store.subscribe()`

### Framework Support
- **React**: Pure React implementation (primary) - works everywhere React works
- **Vanilla HTML**: Web components (secondary) - universal custom elements
- **Vue/Angular/Svelte**: Web components (secondary) - standard web components integration
- **Astro**: Web components (secondary) - SSR-friendly custom elements

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
├── index.ts                     # Main entry: pure React components (default export)
├── react/                       # Pure React implementation
│   ├── components/
│   │   ├── IterationDeck.tsx
│   │   ├── IterationDeckSlide.tsx
│   │   ├── IterationDeckToolbar.tsx
│   │   ├── store.ts            # React store hooks
│   │   └── index.tsx           # React component exports
│   └── dev/                    # React development demo
├── wc/                         # Web Components implementation  
│   ├── index.ts                # WC entry: Lit components (./wc export)
│   ├── components/
│   │   ├── iteration-deck/
│   │   ├── iteration-deck-slide/
│   │   └── iteration-deck-toolbar/
│   ├── store/                  # Zustand store for WC
│   └── utils/                  # WC-specific utilities
├── shared/                     # Shared between React and WC
│   ├── index.ts                # Environment detection utilities
│   └── types.ts                # Common TypeScript interfaces
└── styles/                     # Global styling utilities (if needed)
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
# Single package with dual exports
pnpm add iteration-deck
```

### Import and Usage

#### React Usage (Primary - Default Export)
```tsx
// Pure React components (default export)
import { IterationDeck, IterationDeckSlide } from 'iteration-deck';

// Works immediately in any React environment
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

#### Web Components Usage (Secondary - /wc Export)
```html
<!-- Vanilla HTML with web components -->
<script type="module">
  import 'iteration-deck/wc';
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

#### Framework Integration
```tsx
// React (primary)
import { IterationDeck } from 'iteration-deck';

// Vue/Svelte/Angular (web components)
import 'iteration-deck/wc';

// Astro (web components with SSR)
import 'iteration-deck/wc';
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

