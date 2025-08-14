## Task Tracker

### Status Indicators
Use emojis to indicate task status at a glance:

- 📋 **To do** - Task not yet started
- 🚧 **In progress** - Currently working on this task
- 🚫 **Blocked** - Task is blocked by dependencies or issues
- ✅ **Done** - Task completed successfully

### Task Format
```
📋 Task name - Brief description
🚧 Another task - What's currently being worked on
🚫 Blocked task - Reason for blocking
✅ Completed task - What was accomplished
```

### Current Tasks

## Phase One: Development Server Setup

✅ **Setup basic project structure** - Create folder structure and basic files
- ✅ Created `src/lit/`, `src/react/`, `src/styles/`, `src/store/` directories
- ✅ Updated `package.json` with Lit, React, Zustand, @vanilla-extract dependencies (using pnpm)
- ✅ Configured Vite for library mode with multiple entry points and dev server routing
- **Completed**: Full project structure established with proper dependency management

✅ **Create Lit components demo page** - `/lit` route showing web components
- ✅ Created HTML page at `/lit.html` importing Lit components directly
- ✅ Demonstrated `<iteration-deck>` and `<iteration-deck-slide>` usage with multiple examples
- ✅ Added navigation between demo pages and comprehensive component showcase
- **Completed**: Demo page accessible at `http://localhost:3000/lit.html`

✅ **Create React wrappers demo page** - `/react` route showing React components  
- ✅ Created React page at `/react.html` with proper JSX syntax structure
- ✅ Set up page to use React wrapper components (ready for implementation)
- ✅ Added navigation matching Lit demo page layout
- **Completed**: Demo page accessible at `http://localhost:3000/react.html`

✅ **Implement basic Lit components** - Core web components without full functionality
- ✅ `<iteration-deck>`: Container with @property decorators for id/label props
- ✅ `<iteration-deck-slide>`: Slide wrapper with @property for label and children rendering
- ✅ `<iteration-deck-toolbar>`: Toolbar component with singleton pattern foundation
- **Completed**: All Lit components implemented with proper @customElement decorators

✅ **Implement React wrapper components** - Thin wrappers around Lit components
- ✅ `IterationDeck.tsx`: Manual React wrapper with full TypeScript interface support
- ✅ `IterationDeckSlide.tsx`: React wrapper with children support and prop mapping
- ✅ Proper prop passing to underlying Lit components with kebab-case conversion
- **Completed**: Manual React wrappers following TECHNICAL_SPEC.md exactly

✅ **Setup Zustand store** - Basic state management structure
- ✅ Created `src/store/iteration-store.ts` with exact interface from spec
- ✅ Implemented `activeDecks` state and `setActiveSlide` action with environment detection
- ✅ Added React hooks and Lit component integration methods
- **Completed**: Full state management system with cross-framework support

✅ **Configure dev server routing** - Multiple pages accessible during development
- ✅ Configured Vite to serve `/lit.html` and `/react.html` routes
- ✅ Module resolution working for TypeScript and proper imports
- ✅ Navigation between demo pages with landing page
- **Completed**: Dev server running at `http://localhost:3000/` with all routes functional

✅ **Basic styling setup** - @vanilla-extract/css foundation
- ✅ @vanilla-extract Vite plugin configured and operational
- ✅ Created component stylesheets (`iteration-deck.css.ts`, `iteration-deck-slide.css.ts`, `iteration-deck-toolbar.css.ts`)
- ✅ Styles reference design tokens and applied to both demo pages
- **Completed**: Zero-runtime CSS system with theme support and type safety

## Phase Two: Styling System Consistency

**⚠️ IMPORTANT: These tasks have dependencies and must be executed sequentially in the order listed to avoid conflicts.**

### Sequential Task Groups

#### 🥇 **Step 1: Foundation** (Execute First - Blocks All Others)
📋 **Resolve token file structure discrepancy** - Fix contradicting instructions between CLAUDE.md and TECHNICAL_SPEC.md
- Research which approach is better: single `tokens.ts` vs separate `tokens/*.ts` files
- Update documentation to be consistent across both instruction files
- Choose the approach that best supports @vanilla-extract theme contracts
- **Dependency**: None - Must complete BEFORE all other Phase Two tasks
- **Delegate with Task Tool**: Use `general-purpose` agent to analyze and resolve documentation conflicts

#### 🥈 **Step 2: Token System** (Execute After Step 1 - Can Run Concurrently)
📋 **Restructure design tokens for @vanilla-extract integration** - Implement proper theme contract pattern
- Create `src/tokens/` directory structure with separate token files (colors.ts, spacing.ts, typography.ts, etc.)
- Update existing `src/tokens.ts` to re-export from individual token files for backward compatibility
- Ensure tokens work properly with @vanilla-extract theme contracts in `src/styles/theme.css.ts`
- **Dependency**: Requires Step 1 completion
- **Delegate with Task Tool**: Use `general-purpose` agent to restructure token system

📋 **Implement missing design system requirements** - Add token categories specified in CLAUDE.md
- Create separate token files: `src/tokens/colors.ts`, `src/tokens/spacing.ts`, `src/tokens/typography.ts`
- Implement backdrop effects tokens for toolbar transparency/blur
- Add touch target tokens (44px minimum) and ensure compliance across components
- **Dependency**: Requires Step 1 completion, coordinates with token restructuring
- **Delegate with Task Tool**: Use `general-purpose` agent to implement missing token categories

#### 🥉 **Step 3: Theme Integration** (Execute After Step 2)
📋 **Validate @vanilla-extract theme contract integration** - Ensure tokens work with theme system
- Test that all component stylesheets properly use theme contract variables
- Verify light/dark theme switching works with all token references
- Ensure `prefers-color-scheme` automatic theming functions correctly
- **Dependency**: Requires Step 2 completion (needs finalized token structure)
- **Delegate with Task Tool**: Use `general-purpose` agent to validate theme integration

#### 🏅 **Step 4: Component Updates** (Execute After Step 3)
📋 **Update Lit components to use proper token references** - Replace any hardcoded values with token references
- Audit all Lit component templates for @vanilla-extract class usage
- Ensure components reference token-based styles, not hardcoded CSS values
- Verify environment detection works correctly with styling system
- **Dependency**: Requires Step 3 completion (needs working theme integration)
- **Delegate with Task Tool**: Use `general-purpose` agent to update component token usage

#### 🎖️ **Step 5: Validation** (Execute After Step 4)
📋 **Validate Visual Design Principles compliance** - Ensure implementation matches CLAUDE.md requirements
- Verify pill-shaped toolbar with 64px border-radius from tokens
- Confirm neutral gray palette doesn't compete with user designs
- Test visual hierarchy (light gray background, white interactive areas)
- **Dependency**: Requires Step 4 completion (needs updated components)
- **Delegate with Task Tool**: Use `general-purpose` agent to validate design principle compliance

#### 🏆 **Step 6: Final Tasks** (Execute After Step 5 - Can Run Concurrently)
📋 **Audit and fix component stylesheet naming** - Ensure all stylesheets follow `[component-name].css.ts` pattern
- Move each component into their own folder
- Verify `iteration-deck.css.ts`, `iteration-deck-slide.css.ts`, `iteration-deck-toolbar.css.ts` follow naming convention
- Move each stylesheet to be in the same folder as the component that it styles, and update all imports so they work correctly
- Check that all component stylesheets properly import and use design tokens
- Ensure consistent class naming patterns across all stylesheets
- **Dependency**: Requires Step 5 completion (needs finalized system to audit)
- **Delegate with Task Tool**: Use `general-purpose` agent to audit stylesheet naming consistency

📋 **Create comprehensive styling documentation** - Document the finalized @vanilla-extract system
- Document token usage patterns and theme contract integration
- Create examples of proper component stylesheet structure
- Add guidelines for maintaining consistency across future components
- **Dependency**: Requires Step 5 completion (needs complete system to document)
- **Delegate with Task Tool**: Use `general-purpose` agent to create styling documentation

### ⚠️ Execution Guidelines

**Sequential execution required due to:**
- File modification conflicts (token files)
- Import dependency chains (tokens → themes → components)
- Testing dependencies (can't validate incomplete systems)

**Only Steps 2, and Step 6 tasks can be executed concurrently within their respective steps.**