# UI Iterations - Claude Code Instructions

## Project Overview
This project builds an NPM module containing a React component called `UiIterations` that enables rapid design iteration by wrapping variations of UI components with development-mode controls for switching between them. The module will be published to npm for installation in consuming React applications.

## Package Details
- Package name: `ui-iterations`
- Main export: `UiIterations` component
- Built as TypeScript library with type definitions
- Supports both ES modules and CommonJS

## Key Component
- Main component: `UiIterations` (not `Iteration`)
- Props interface: `UiIterationsProps`
- State interface: `UiIterationsState`
- Context: `UiIterationsContext`
- Focuses on simplicity over complex features

## Development Guidelines
- Use TypeScript throughout
- Keep the API minimal and focused
- Production builds should render only the first child by default
- Development mode includes simple toolbar for navigation with keyboard shortcuts (Ctrl/Cmd + Arrow keys)
- Build for distribution with proper bundling
- Bundle size target: < 10kb gzipped

## Distribution
- Bundle component for npm distribution using Rollup
- Include TypeScript declarations (.d.ts files)
- Support tree-shaking with separate ESM and CJS builds
- Export configuration in package.json with proper "exports" field
- Minimal bundle size for production usage

## Testing
- Write component tests for basic rendering and state management
- Include integration tests for toolbar interaction
- Test production vs development behavior
- Test npm package installation and usage

## Build Commands
- `pnpm build` - Build for distribution
- `pnpm test` - Run test suite
- `pnpm lint` - Lint TypeScript code
- `pnpm typecheck` - Type checking
- `pnpm publish` - Publish to npm registry

## Notes
- This is a developer tool packaged as npm module
- Focus on ease of use over advanced features
- Optimized for consuming applications
- See TECHNICAL_SPEC.md for detailed component API