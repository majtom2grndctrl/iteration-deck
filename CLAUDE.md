# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important: Reference Files

**Always read these files when working on this project:**
- @.claude/TECHNICAL_SPEC.md - Complete API specifications, architecture, and usage examples
- @package.json - Dependencies, scripts, and build configuration

## Project Overview

This project builds an NPM module for **AI-first prototyping workflows**. The components `IterationDeck` and `IterationDeckSlide` enable rapid design iteration by wrapping AI-generated UI variations with intuitive controls for switching between them.

**Target Users:** Designers and Product Managers working with AI coding agents  
**Core Value:** Compare live, interactive prototypes directly in product context  
**Philosophy:** "Where are the designer tools for the AI era?"

**See @.claude/TECHNICAL_SPEC.md for complete API specifications and usage examples.**

## Development Commands

```bash
# Core workflows
pnpm build        # Stencil build for distribution  
pnpm build.watch  # Watch mode for development
pnpm test         # Run test suite (Stencil + Jest)
pnpm test.watch   # Watch mode for testing
pnpm lint         # Lint TypeScript code
```

## Implementation Guidelines

### Architecture Principles
- **Stencil Web Components Foundation**: Stencil.js-based web components with superior tooling and performance
- **Auto-Generated Framework Bindings**: Stencil automatically generates React, Vue, Angular wrappers
- **Vanilla State Management**: Custom event-based state system for framework-agnostic reactivity
- **Universal Compatibility**: Works with React, Astro, Vue, Angular, vanilla HTML, and any framework
- **vanilla-extract for CSS**: Use vanilla-extract for styling, with design tokens that exist as a JSON object in a .ts file.

### Code Quality Standards
- **Accessibility**: WCAG 2.2 AA compliance, proper ARIA attributes
- **TypeScript**: Strict mode throughout with Stencil's enhanced TypeScript support
- **Testing**: Comprehensive unit + integration tests for Stencil components and framework bindings
- **Web Standards**: Custom elements, shadow DOM, and standard web APIs with Stencil optimizations

### Visual Design Principles
- **Designer-friendly**: Clean, neutral palette that doesn't compete with user designs
- **Pill-shaped toolbar**: Fixed lower-center position with rounded corners (64px border-radius)
- **Visual hierarchy**: Light gray background, white interactive areas
- **Auto theming**: `prefers-color-scheme` support for light/dark modes
- **Scoped CSS**: CSS with Stencil's shadow DOM encapsulation and development-time optimization

### UI Design System Requirements
- **Spacing**: 8px base grid system (4px, 8px, 12px, 16px, 24px, 32px, 40px, 48px, 56px, 64px progression)
- **Colors**: Neutral gray scale with semantic variants (gray.50, gray.100, gray.200, gray.300, gray.400, gray.500, gray.600, gray.700, gray.800, gray.900) using string keys in TypeScript object to enable clean dot notation access
- **Touch targets**: 44px minimum for interactive elements
- **Typography**: System font stack matching OS/browser dev tools aesthetic
- **Backdrop effects**: Modern blur and transparency effects for toolbar

### File Organization
```
src/
├── core/          # Framework-agnostic types and utilities
├── components/    # Stencil web components (foundation)
├── styles/        # CSS files and theme management utilities
├── generated/     # Auto-generated framework bindings (React, Vue, Angular)
└── example/       # Demo application
```

**Implementation details:** @.claude/TECHNICAL_SPEC.md  
**Stencil components:** @src/components/*.tsx  
**Generated bindings:** @src/generated/react/, @src/generated/vue/, etc.
