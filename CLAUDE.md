# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important: Reference Files

**Always read these files when working on this project:**
- @.claude/TECHNICAL_SPEC.md - Complete API specifications, architecture, and usage examples
- @.claude/TASK_TRACKING.md - Complete list of tasks that have been identified, and how many agents are assigned to each phase
- @package.json - Dependencies, scripts, and build configuration

**CRITICAL: Task Status Updates**
When you start, complete, or become blocked on any task, you MUST immediately update the task status in @.claude/TASK_TRACKING.md:
- Starting: ⏳ → 🚧 (add your agent ID and timestamp)
- Completing: 🚧 → ✅ (add completion timestamp)
- Blocked: any status → ❌ (document the specific blocker)
- Needs Review: any status → 🔄 (specify what needs review)

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
- **Global state management**: Use Zustand for a framework agnostic state library that works well with many frameworks
- **CSS styling**: Use `vanilla-extract` to provide a `[component-name].css.ts` file per each component
- **Design system centralization**: All design tokens (spacing, colors, typography, etc.) must be imported from `/src/styles/design-tokens.css.ts` - never redeclare tokens in component files

### Code Quality Standards
- **Accessibility**: WCAG 2.2 AA compliance, proper ARIA attributes
- **TypeScript**: Strict mode throughout
- **Testing**: Unit + integration tests for critical paths

### Visual Design Principles
- **Designer-friendly**: Clean, neutral palette that doesn't compete with user designs
- **Pill-shaped toolbar**: Fixed lower-center position (not full-width)
- **Visual hierarchy**: Light gray background with transparency and frost effect
- **Auto theming**: `prefers-color-scheme` support for light/dark modes

### UI Design System Requirements
- **Spacing**: 8px base grid system (4px, 8px, 12px, 16px, 24px, 32px, 40px, 48px, 56px, 64px progression)
- **Colors**: Neutral gray scale with semantic variants ('gray50', 'gray100', 'gray200', 'gray300', 'gray400', 'gray500', 'gray600', 'gray700', 'gray800', 'gray900')
- **Touch targets**: 44px minimum for interactive elements
- **Typography**: System font stack matching OS/browser dev tools aesthetic



**Implementation details:** @.claude/TECHNICAL_SPEC.md
**Task tracking:** @.claude/TASK_TRACKING.md
