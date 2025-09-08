# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important: Reference Files

**Always read these files when working on this project:**
- @.claude/TECHNICAL_SPEC.md - Complete API specifications, architecture, and usage examples
- @.claude/TASK_TRACKER.md - List of tasks to be accomplished and status of each task - **always update task status after completing each task.**
- @package.json - Dependencies, scripts, build configuration, and export maps
- @vite.config.ts - Build system configuration with production optimizations
- @tsconfig.build.json - TypeScript declaration generation settings

## Project Overview

This project builds an NPM module for **AI-first prototyping workflows**. The web components `<iteration-deck>` and `<iteration-deck-slide>` enable rapid design iteration by wrapping AI-generated UI variations with intuitive controls for switching between them.

**Target Users:** Designers and Product Managers working with AI coding agents  
**Core Value:** Compare live, interactive prototypes directly in product context  
**Philosophy:** "Where are the designer tools for the AI era?"

**See @.claude/TECHNICAL_SPEC.md for complete API specifications and usage examples.**

## Development Commands

```bash
# Core workflows
pnpm build        # Vite build for distribution  
pnpm build.watch  # Watch mode for development (vite dev)
pnpm test         # Run test suite (Vitest)
pnpm test.watch   # Watch mode for testing
pnpm lint         # Lint TypeScript code
```

## Implementation Guidelines

### Architecture Principles
- **Pure React Primary**: Pure React implementation as the default export for maximum "vibe coder" compatibility
- **Lit Web Components Secondary**: Lit-based web components available at `/wc` export for web standards enthusiasts  
- **Single Package Dual Export**: One package, two implementations - React as default, web components as opt-in
- **Zustand State Management**: Global state management with Zustand for cross-component reactivity
- **Universal Compatibility**: React works everywhere React works, web components work everywhere
- **Shared Design System**: Common design tokens and types ensure visual/functional consistency
  - **Design Tokens**: Shared TypeScript constants in `src/shared/` for consistent styling
  - **CSS-in-JS**: React uses CSS-in-JS, web components use Lit CSS tagged template literals
  - **ShadowDOM for WC**: Web components get ShadowDOM isolation, React gets standard CSS scoping

### Code Quality Standards
- **Accessibility**: WCAG 2.2 AA compliance, proper ARIA attributes
- **TypeScript**: Strict mode throughout with Lit's TypeScript decorators
- **Testing**: Comprehensive unit + integration tests for Lit components and React wrappers
- **Web Standards**: Custom elements, shadow DOM, and standard web APIs with Lit optimizations
- **Logging**: Only log errors and warnings - designers get visual feedback from the browser, console should stay quiet unless something is wrong

### Visual Design Principles
- **Designer-friendly**: Clean, neutral palette that doesn't compete with user designs
- **Pill-shaped toolbar**: Fixed lower-center position with rounded corners (64px border-radius)
- **Visual hierarchy**: Light gray background, white interactive areas
- **Auto theming**: `prefers-color-scheme` support for light/dark modes
- **Type-safe CSS**: Lit CSS tagged template literals with TypeScript design tokens

### File Organization
```
src/
├── index.ts            # Main entry: pure React components (default export)
├── react/              # Pure React implementation
│   ├── components/     # React components with CSS-in-JS styling
│   └── dev/           # React development demo
├── wc/                # Web Components implementation  
│   ├── index.ts       # WC entry: Lit components (./wc export)
│   ├── components/    # Lit web components with embedded CSS
│   ├── store/         # Zustand store for WC state management
│   └── utils/         # WC-specific utilities
├── shared/            # Shared between React and WC
│   ├── index.ts       # Environment detection utilities
│   └── types.ts       # Common TypeScript interfaces
└── styles/            # Global styling utilities (if needed)
```  
