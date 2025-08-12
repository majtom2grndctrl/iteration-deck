# Iteration Deck - Technical Specification

## Overview

React TypeScript components for **AI-first prototyping workflows** that enable designers and PMs to compare AI-generated UI variations interactively. Uses a slide deck metaphor where each AI-generated variation is a "slide" in the deck.

**Core Philosophy:** Provide the "duplicate frame" equivalent for AI-generated code variations, allowing live comparison of interactive prototypes directly in product context.

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
- Keyboard shortcuts (Ctrl/Cmd + Arrow keys) operate on active deck only

### Multi-Deck Behavior
- Single toolbar instance shared across all IterationDecks
- Dropdown selector shows deck labels (falls back to deck IDs)
- Active deck highlighted in selector and responds to keyboard shortcuts
- Automatic cleanup when decks are unmounted

The toolbar accesses the `IterationDeckContext` directly and uses `setActiveIndex` and `setActiveDeck` for navigation.

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

## Testing

### Component Tests
- Basic rendering with variations
- Context state management
- Navigation between variations
- Production vs development behavior

### Integration Tests  
- Toolbar interaction
- Keyboard shortcuts
- Multiple iteration groups

## Bundle Configuration

### Build Targets
- **TypeScript declarations**: Full type safety
- **Dual builds**: ESM and CommonJS support

### Build Tools
- **Vite**: Library mode with multiple entry points
- **TypeScript**: Strict mode compilation
- **CSS Modules**: Component-scoped styling

## Installation & Usage

### Installation
```bash
pnpm add iteration-deck
```

### Import and Usage
```tsx
import { IterationDeck, IterationDeckSlide } from 'iteration-deck';

// Basic usage
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

## Bundle Configuration

### Build Requirements
- TypeScript compilation with declaration files
- Rollup bundling for optimal tree-shaking
- Development vs production behavior detection

## Environment-Specific Behavior

### Development Mode
- **Global toolbar**: Single toolbar for all IterationDeck instances
- **Multi-deck support**: Dropdown selector when multiple decks present
- **Keyboard shortcuts**: Ctrl/Cmd + Arrow keys for navigation
- **All slides visible**: Shows active slide based on state

### Production Mode
- **First slide only**: Renders `children[0]` automatically
- **No toolbar**: Environment detection prevents mounting
- **Zero overhead**: Minimal runtime footprint

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
1. **Environment detection**: Production vs development rendering
2. **Toolbar singleton**: Only one toolbar exists with multiple decks
3. **Global state**: Cross-component state synchronization
4. **URL synchronization**: State persists across page reloads
5. **Keyboard shortcuts**: Navigation works on active deck only

## Implementation Plan

### Phase 1: NPM Module Setup

#### Initial Project Scaffolding
Run the following terminal command to scaffold the project:
```bash
pnpm create vite@latest iteration-deck -- --template react-ts
cd iteration-deck
pnpm install
```

#### Copy Scaffolded Files to Project Root
Move the generated files from the nested folder to this project root:
```bash
cd ..
cp -r iteration-deck/* ./
rm -rf iteration-deck/
```

#### Post-Scaffolding Tasks
- [ ] Review and adjust generated configuration files for npm library distribution
- [ ] Update package.json with proper package fields and library-specific scripts
- [ ] Configure Vite for library bundling instead of app bundling
- [ ] Install any additional dependencies required for iteration-deck components
- [ ] Update tsconfig.json for library builds if needed

### Phase 2: Core Development (Can run 2 agents concurrently)
**Agent A:** Core Components  
- [ ] IterationDeck component with context
- [ ] IterationDeckSlide wrapper component
- [ ] Development environment detection logic
- [ ] Component test suite

**Agent B:** Development Toolbar
- [ ] Toolbar UI component
- [ ] Keyboard navigation logic
- [ ] Toolbar styling

### Phase 3: Distribution & Demo (Can run 2 agents concurrently) 
**Agent A:** Build & Publishing
- [ ] Connect toolbar to component context
- [ ] Build pipeline testing
- [ ] NPM publishing workflow

**Agent B:** Example Application
- [ ] Demo app consuming the pnpm package
- [ ] Usage documentation and README
- [ ] Installation testing