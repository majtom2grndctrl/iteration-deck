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
pnpm build        # Build for distribution  
pnpm test         # Run test suite
pnpm typecheck    # Type checking
pnpm lint         # Lint TypeScript code
```

## Implementation Guidelines

### Architecture Principles
- **Global state management**: Use Zustand for a framework agnostic state library that works well with React
- **CSS Modules**: Individual `.module.css` file per component

### Code Quality Standards
- **Accessibility**: WCAG 2.2 AA compliance, proper ARIA attributes
- **TypeScript**: Strict mode throughout
- **Testing**: Unit + integration tests for critical paths

### Visual Design Principles
- **Designer-friendly**: Clean, neutral palette that doesn't compete with user designs
- **Pill-shaped toolbar**: Fixed lower-center position (not full-width)
- **Visual hierarchy**: Light gray background, white interactive areas
- **Auto theming**: `prefers-color-scheme` support for light/dark modes

### UI Design System Requirements
- **Spacing**: 8px base grid system (4px, 8px, 12px, 16px, 24px, 32px, 40px, 48px, 56px, 64px progression)
- **Colors**: Neutral gray scale with semantic variants (50, 100, 200, 300, 400, 500, 600, 700, 800, 900)
- **Touch targets**: 44px minimum for interactive elements
- **Typography**: System font stack matching OS/browser dev tools aesthetic

### File Organization
```
src/
├── core/          # Framework-agnostic types and utilities
├── react/         # React implementation with CSS modules
└── example/       # Demo application
```

**Implementation details:** @.claude/TECHNICAL_SPEC.md  
**CSS implementations:** @src/react/*.module.css
