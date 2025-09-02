# Task Tracker

Use this file to keep track of tasks as you work.

Remember to follow instructions in @../CLAUDE.md and @.TECHNICAL_SPEC.md

- Once you start a task, mark it as in progress
- If you get blocked and need to change tasks, update the task and mark it as blocked, with a reason for the blocker
- When you complete the task, mark it as complete

## Task Format
```
📋 Example To Do Task - Brief description
🚧 Example In Progress Task - What's currently being worked on
🚫 Example Blocked task - Reason for blocking
✅ Example Completed task - What was accomplished
```

# Current Tasks

## PROJECT CONTEXT FOR ALL AGENTS

**What we're building**: Iteration Deck is a web component system for AI-first prototyping that lets designers compare multiple UI variations side-by-side with a slide deck metaphor. Think "duplicate frame" for AI-generated code variations.

**Current state**: 
- ✅ **Lit web components implementation** - Fully functional, just needs reorganization
- ❌ **React thin wrappers** - Currently exist but require complex Next.js config, will be deleted
- 🎯 **Target**: Replace thin wrappers with pure React implementation

**Goal**: Create a single `iteration-deck` package where pure React components are the default export (for vibe coders) and the existing web components are available at `iteration-deck/wc` (for web standards enthusiasts).

**Execution approach**: Use Task Tool to delegate work to specialized agents who can work concurrently after Step 1 foundation is complete.

**Success criteria**: 
- Vibe coders can `npm install iteration-deck` and start comparing UI variations immediately (React by default)
- Web component users can import from `iteration-deck/wc` for standards-based implementation
- Both implementations look and behave identically (visual and functional consistency is crucial for your user’s AI UX Engineer brand)
- Simple mental model: React by default, web components as opt-in

**Key constraint**: Keep everything simple - this is a small utility library, not enterprise software. Every decision should favor "works immediately" over "technically superior."

**Upon completion of any task:** Update the status of that task on this task tracker.

---

## Single-Package Plan

✅ **Step 1** (Sequential - Foundation): Create shared design tokens and types
- Create internal `shared/` folder with JSON design tokens (colors, spacing, typography)
- Add TypeScript interfaces for props and API consistency
- Keep it tiny - just the essential values for visual/functional consistency between React and WC implementations
- **Must be completed first** - other steps depend on this foundation

---

**After Step 1 is complete, Steps 2-4 can run concurrently using Task Tool delegation:**

✅ **Step 2** (Concurrent): Build pure React implementation → **delegate to react-wrapper-engineer**
**Context**: This is the primary implementation that vibe coders will use. The current React thin wrappers will be deleted and replaced with pure React components.
**Your goal**: Create pure React components that become the default export of the package.
- **Delete existing React wrapper code** in `src/react/`
- Build new pure React implementation (no web components, no custom elements)
- Import shared tokens and types from Step 1 to ensure consistency  
- Simple component patterns - hooks for state, standard React patterns
- No complex abstractions - straightforward React components that vibe coders recognize
**Impact on success**: This is the main value proposition - if React developers can't immediately use this without configuration, the whole project fails.

✅ **Step 3** (Concurrent): Reorganize web components for `/wc` export → **delegate to lit-component-engineer**
**Context**: The existing Lit components work great but need to be reorganized to be available at `iteration-deck/wc` import path.
**Your goal**: Reorganize existing functional code to be the secondary export path.
- Move current Lit implementation to `src/wc/` structure
- Update to import shared tokens and types from Step 1 for consistency with React version
- Keep styling approach consistent with current implementation
- Don't over-engineer - this is working code, just needs reorganization
**Impact on success**: Web component users get clean import path while React users get the primary experience.

✅ **Step 4** (Concurrent): Configure single package build → **delegate to npm-library-packager**
**Context**: Need to configure a single package with dual exports - React as default, web components at `/wc`.
**Your goal**: Configure build system that makes both import paths work reliably.
- Configure package.json exports: `.` → React, `./wc` → Web Components
- Update build process to handle both implementations 
- Ensure clean TypeScript declarations for both export paths
- Remove old build configurations for separate packages
- Keep it simple - standard package structure that works everywhere
**Impact on success**: Poor exports configuration means the elegant API won't work for users.

## Key Principles for All Steps:
- **Simple > Complex**: Choose the straightforward approach over the "clever" one
- **Working > Perfect**: Get it working reliably, don't optimize prematurely  
- **Vibe Coder Friendly**: Every decision should make it easier for non-technical users
- **No Over-Engineering**: This is a small web component library, not enterprise software

## Task Guidelines

### Using Task Tool for Specialized Work
- **design-system-engineer**: CSS styling, design tokens, visual design systems, @vanilla-extract/css work
- **lit-component-engineer**: Lit web components, @vanilla-extract/css styling, Zustand integration
- **react-wrapper-engineer**: React wrapper components, hooks, context patterns
- **unit-test-specialist**: Unit tests for components and utilities
- **accessibility-auditor**: ARIA attributes, semantic HTML, WCAG compliance
- **npm-library-packager**: Package exports, build configuration, distribution

### Concurrent Execution Strategy
- Launch multiple specialized agents simultaneously for different components
- Each agent focuses on one specific component or area
- Parallel execution maximizes efficiency for multi-component tasks
