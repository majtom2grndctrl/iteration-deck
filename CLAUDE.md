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

Uses React Context pattern:
- Global state tracks all decks by ID
- Each deck maintains active slide index and slide metadata
- Context provides registration and navigation methods
- Development toolbar consumes context for all interactions

### Environment-Specific Behavior

**Development Mode:**
- Renders navigation toolbar
- Supports keyboard shortcuts (Ctrl/Cmd + Arrow keys)
- Shows all slide variations
- Registers with global context

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

## Implementation Notes

- Focus on simplicity over complex features
- Prioritize bundle size optimization
- Use TypeScript throughout for better DX
- Component registration happens automatically on mount
- Keyboard shortcuts should be globally available in dev mode
- Production detection should use `process.env.NODE_ENV`