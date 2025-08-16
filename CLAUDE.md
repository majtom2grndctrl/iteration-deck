# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important: Reference Files

**Always read these files when working on this project:**
- @.claude/TECHNICAL_SPEC.md - Complete API specifications, architecture, and usage examples
- @.claude/TASK_TRACKER.md - List of tasks to be accomplished and status of each task - **always update task status after completing each task.**
- @package.json - Dependencies, scripts, and build configuration

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
- **Lit Web Components Foundation**: Lit-based web components with excellent performance and developer experience
- **Manual React Wrappers**: Thin React wrapper components for seamless React integration
- **Zustand State Management**: Global state management with Zustand for cross-component reactivity
- **Universal Compatibility**: Works with React, Astro, Vue, Angular, vanilla HTML, and any framework
- **Zero-Runtime CSS**: @vanilla-extract/css generates static CSS at build time with design tokens
  - **Do not use Lit for CSS**: Avoid Lit’s tagged template leterals for CSS—use @vanilla-extract/css for all styling

### Code Quality Standards
- **Accessibility**: WCAG 2.2 AA compliance, proper ARIA attributes
- **TypeScript**: Strict mode throughout with Lit's TypeScript decorators
- **Testing**: Comprehensive unit + integration tests for Lit components and React wrappers
- **Web Standards**: Custom elements, shadow DOM, and standard web APIs with Lit optimizations

### Visual Design Principles
- **Designer-friendly**: Clean, neutral palette that doesn't compete with user designs
- **Pill-shaped toolbar**: Fixed lower-center position with rounded corners (64px border-radius)
- **Visual hierarchy**: Light gray background, white interactive areas
- **Auto theming**: `prefers-color-scheme` support for light/dark modes
- **Type-safe CSS**: @vanilla-extract/css with TypeScript integration for styling

### UI Design System Requirements
Use Design Tokens defined as TypeScript files in `src/tokens/` and integrated with @vanilla-extract/css theme system for type-safe, zero-runtime styling.
- **Spacing**: 8px base grid system (4px, 8px, 12px, 16px, 24px, 32px, 40px, 48px, 56px, 64px progression)
- **Colors**: Neutral gray scale with semantic variants (50, 100, 200, 300, 400, 500, 600, 700, 800, 900)
- **Touch targets**: 44px minimum for interactive elements
- **Typography**: System font stack matching OS/browser dev tools aesthetic
- **Backdrop effects**: Modern blur and transparency effects for toolbar
- **Theme Variables**: vanilla-extract contract for consistent theming across components
- **Token Files**: Central design tokens organized by category in `src/tokens/` directory (colors.ts, spacing.ts, typography.ts, components.ts, animation.ts, zIndex.ts, breakpoints.ts) with central export via index.ts

### File Organization
```
src/
├── core/          # Framework-agnostic types and utilities
├── lit/           # Lit web components (foundation)
├── react/         # Manual React wrapper components
├── tokens/        # Design tokens (colors.ts, spacing.ts, typography.ts)
├── styles/        # @vanilla-extract/css component stylesheets
└── example/       # Demo application
```

**Implementation details:** @.claude/TECHNICAL_SPEC.md  
**Task tracker:** @.claude/TASK_TRACKER.md  
**Lit components:** @src/lit/*.ts  
**React wrappers:** @src/react/*.tsx  
**Component styles:** @src/styles/[component-name].css.ts  
**Design tokens:** @src/tokens/*.ts  
