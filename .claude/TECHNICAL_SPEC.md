# React Design Iteration Tool - Technical Specification

## Overview

A simple wrapper component for rapid design iteration in React applications with development-mode controls for switching between variations.

## Component API

```tsx
interface UiIterationsProps {
  /** Unique identifier for this iteration group */
  id: string;
  /** Labels for each variation (optional, falls back to indices) */
  labels?: string[];
  /** Default variation index (0-based) */
  defaultIndex?: number;
  children: React.ReactNode[];
}

function UiIterations({ 
  id, 
  labels, 
  defaultIndex = 0,
  children 
}: UiIterationsProps): JSX.Element
```

### Usage Examples

```tsx
// Basic usage
<UiIterations id="hero-layouts">
  <HeroLayout1 />
  <HeroLayout2 />
  <HeroLayout3 />
</UiIterations>

// With custom labels
<UiIterations 
  id="cta-buttons" 
  labels={["Primary", "Secondary", "Gradient"]}
>
  <Button variant="primary">Get Started</Button>
  <Button variant="secondary">Get Started</Button>
  <Button variant="gradient">Get Started</Button>
</UiIterations>
```

### State Management

```tsx
interface IterationState {
  [iterationId: string]: {
    activeIndex: number;
    labels: string[];
  };
}

const IterationContext = createContext<{
  state: IterationState;
  setActiveIndex: (id: string, index: number) => void;
}>({});
```

## Development Toolbar

Simple development-only toolbar with:
- List of all iteration groups
- Previous/Next navigation for each group
- Keyboard shortcuts (Ctrl/Cmd + Arrow keys)

The toolbar accesses the `IterationContext` directly and uses `setActiveIndex` for all navigation.

## Production Behavior

In production builds, render only the first child by default:

```tsx
// Development: Shows controls and all variations
// Production: Renders only first child
<UiIterations id="hero">
  <HeroV1 />  // Only this renders in production
  <HeroV2 />  
  <HeroV3 />  
</UiIterations>
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
ui-iterations/
├── package.json
├── tsconfig.json
├── rollup.config.js
├── src/
│   ├── index.ts              # Main export
│   ├── UiIterations.tsx      # Main component
│   ├── context.ts            # Iteration context
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
pnpm add ui-iterations
```

### Import and Usage
```tsx
import { UiIterations } from 'ui-iterations';

// Basic usage
<UiIterations id="hero-layouts">
  <HeroLayout1 />
  <HeroLayout2 />
  <HeroLayout3 />
</UiIterations>
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
npm create vite@latest ui-iterations -- --template react-ts
cd ui-iterations
npm install
```

#### Copy Scaffolded Files to Project Root
Move the generated files from the nested folder to this project root:
```bash
cd ..
cp -r ui-iterations/* ./
rm -rf ui-iterations/
```

#### Post-Scaffolding Tasks
- [ ] Review and adjust generated configuration files for npm library distribution
- [ ] Update package.json with proper npm fields and library-specific scripts
- [ ] Configure Vite for library bundling instead of app bundling
- [ ] Install any additional dependencies required for ui-iterations component
- [ ] Update tsconfig.json for library builds if needed

### Phase 2: Core Development (Can run 2 agents concurrently)
**Agent A:** Core Component  
- [ ] UiIterations component with context
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