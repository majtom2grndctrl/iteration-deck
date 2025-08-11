# Iteration Deck - Technical Specification

## Overview

A simple set of wrapper components for rapid design iteration in React applications with development-mode controls for switching between variations. Uses a slide deck metaphor where each variation is a "slide" in the deck.

## Component API

```tsx
interface IterationDeckProps {
  /** Unique identifier for this iteration deck */
  id: string;
  /** Label for this deck in the toolbar */
  label?: string;
  children: React.ReactElement<IterationDeckSlideProps>[];
}

interface IterationDeckSlideProps {
  /** Label for this slide/variation */
  label: string;
  children: React.ReactNode;
}

function IterationDeck({ 
  id, 
  label, 
  children 
}: IterationDeckProps): JSX.Element

function IterationDeckSlide({ 
  label, 
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

// Button variations
<IterationDeck 
  id="cta-buttons" 
  label="Call to Action Buttons"
>
  <IterationDeckSlide label="Primary">
    <Button variant="primary">Get Started</Button>
  </IterationDeckSlide>
  <IterationDeckSlide label="Secondary">
    <Button variant="secondary">Get Started</Button>
  </IterationDeckSlide>
  <IterationDeckSlide label="Gradient">
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

### State Management

```tsx
interface IterationDeckState {
  decks: {
    [deckId: string]: {
      activeIndex: number;
      label?: string;
      slides: Array<{ label: string }>;
    };
  };
  activeDeckId: string | null; // For multi-deck keyboard navigation
}

interface IterationDeckContextType {
  state: IterationDeckState;
  setActiveIndex: (id: string, index: number) => void;
  setActiveDeck: (id: string) => void;
  registerDeck: (id: string, label?: string) => void;
  unregisterDeck: (id: string) => void;
  registerSlide: (deckId: string, slideLabel: string) => void;
}

// Auto-created global context - no explicit provider needed
const IterationDeckContext = createContext<IterationDeckContextType>(defaultContextValue);
```

### Auto-Provider Pattern

Components automatically participate in global context without requiring explicit provider setup:

```tsx
// IterationDeck automatically registers/unregisters itself
const IterationDeck = ({ id, label, children }: IterationDeckProps) => {
  const context = useContext(IterationDeckContext);
  
  useEffect(() => {
    context.registerDeck(id, label);
    return () => context.unregisterDeck(id);
  }, [id, label]);

  // Component logic...
};

// Usage requires zero setup - just import and use
<IterationDeck id="hero" label="Hero Variations">
  {/* slides */}
</IterationDeck>
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

## NPM Module Structure

```
iteration-deck/
├── package.json
├── tsconfig.json
├── rollup.config.js
├── src/
│   ├── index.ts              # Main export
│   ├── IterationDeck.tsx     # Main component
│   ├── IterationDeckSlide.tsx # Slide wrapper component
│   ├── context.ts            # Iteration deck context
│   └── toolbar.tsx           # Development toolbar
├── dist/                     # Built files for npm
│   ├── index.js              # CommonJS build
│   ├── index.esm.js          # ES modules build
│   └── index.d.ts            # TypeScript declarations
└── example/                  # Demo application
    └── src/
        └── App.tsx
```

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
- Separate ESM and CJS builds
- Development vs production behavior detection
- Minimal bundle size (< 10kb gzipped)

### Package.json Fields
```json
{
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": ["dist/"],
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  }
}
```

## Implementation Plan

### Phase 1: NPM Module Setup

#### Initial Project Scaffolding
Run the following terminal command to scaffold the project:
```bash
npm create vite@latest iteration-deck -- --template react-ts
cd iteration-deck
npm install
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
- [ ] Update package.json with proper npm fields and library-specific scripts
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
- [ ] Demo app consuming the npm package
- [ ] Usage documentation and README
- [ ] Installation testing