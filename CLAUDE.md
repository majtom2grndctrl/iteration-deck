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
- **Lit Web Components Foundation**: Lit-based web components with excellent performance and developer experience
- **Manual React Wrappers**: Thin React wrapper components for seamless React integration
- **Zustand State Management**: Global state management with Zustand for cross-component reactivity
- **Universal Compatibility**: Works with React, Astro, Vue, Angular, vanilla HTML, and any framework
- **ShadowDOM Encapsulated Styling**: Lit CSS tagged template literals with design tokens and CSS custom properties
  - **Design Tokens**: Use TypeScript constants for values that never change at runtime (colors, spacing, typography scales)
  - **CSS Custom Properties**: Use for runtime-dynamic values (theme switching, user preferences, responsive behavior)
  - **ShadowDOM Isolation**: All styling encapsulated within component shadow roots for universal compatibility
  - **Mobile-First CSS**: Use progressive enhancement consistently to ensure performance across device types

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

### Design System
- **Design Tokens**: TypeScript constants in `src/tokens/` with automatic light/dark theming
- **ShadowDOM Styling**: Lit CSS tagged template literals with semantic CSS custom properties
- **Responsive Design**: Mobile-first breakpoints with touch-friendly interactions

### File Organization
```
src/
├── components/    # Lit web components with embedded CSS
├── react/         # React wrapper components  
├── tokens/        # Design tokens (colors, spacing, animation, breakpoints)
├── store/         # Zustand state management
└── core/          # Types and utilities
```  
