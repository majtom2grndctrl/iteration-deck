# Task Tracker

Use this file to keep track of tasks as you work.

Remember to follow instructions in @../CLAUDE.md and @.TECHNICAL_SPEC.md

- Once you start a task, mark it as in progress
- If you get blocked and need to change tasks, update the task and mark it as blocked, with a reason for the blocker
- When you complete the task, market it as complete

## Task Format
```
📋 Example To Do Take - Brief description
🚧 Example In Progress Task - What's currently being worked on
🚫 Example Blocked task - Reason for blocking
✅ Example Completed task - What was accomplished
```

# Current Tasks

## Phase 1: Style System Refactoring (Using Task Tool for Component-Specific Agents)

📋 **[Task Tool - design-system-engineer]** Refactor IterationDeck component styling - Remove @vanilla-extract/css imports, implement CSS tagged template literals with design tokens from src/util/tokens/, use CSS custom properties for runtime-dynamic values (theme switching), ensure ShadowDOM encapsulation, maintain existing visual design and functionality

📋 **[Task Tool - design-system-engineer]** Refactor IterationDeckSlide component styling - Remove @vanilla-extract/css imports, implement CSS tagged template literals with design tokens, use CSS custom properties for slide transitions and AI metadata overlays, ensure ShadowDOM encapsulation, maintain slide transitions and visual states

📋 **[Task Tool - design-system-engineer]** Refactor IterationDeckToolbar component styling - Remove @vanilla-extract/css imports, implement CSS tagged template literals with design tokens, use CSS custom properties for toolbar theming and responsive behavior, ensure ShadowDOM encapsulation, maintain pill-shaped design and backdrop effects

📋 **[Task Tool - design-system-engineer]** Update design tokens system - Refactor existing token files in src/util/tokens/ to remove @vanilla-extract/css dependencies, ensure tokens are pure TypeScript constants for static values, verify compatibility with Lit CSS tagged template literals

📋 **[Task Tool - npm-library-packager]** Remove @vanilla-extract dependencies - Clean up package.json, vite.config.ts, and any remaining @vanilla-extract/css imports throughout the codebase, ensure build system no longer processes CSS at build time

**Concurrent Execution Strategy:**
- Use Task Tool to launch multiple design-system-engineer agents concurrently
- Each agent focuses on ONE component only (IterationDeck, IterationDeckSlide, or IterationDeckToolbar)
- All three component refactoring tasks can run in parallel for maximum efficiency
- Each agent works independently and completes their component refactoring

**Instructions for each design-system-engineer agent:**
- Focus on ONE component only (IterationDeck, IterationDeckSlide, or IterationDeckToolbar)
- Replace all @vanilla-extract/css imports with Lit CSS tagged template literals
- Import design tokens from `../util/tokens/index.js`
- Use TypeScript constants for static values (colors, spacing, typography)
- Use CSS custom properties for runtime-dynamic values (themes, user preferences)
- Ensure all styles are defined within the component's `static styles` property
- Maintain existing visual design and functionality
- Test that ShadowDOM encapsulation works properly
