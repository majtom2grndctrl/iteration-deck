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

📋 **Setup basic project structure** - Create folder structure and basic files
- Create `src/lit/`, `src/react/`, `src/styles/`, `src/store/` directories
- Set up basic `package.json` with Lit, React, Zustand, @vanilla-extract dependencies
- Configure Vite for library mode with multiple entry points
- **Delegate with Task Tool**: Use `general-purpose` agent to set up project structure

📋 **Create Lit components demo page** - `/lit` route showing web components
- Basic HTML page importing Lit components directly
- Demonstrate `<iteration-deck>` and `<iteration-deck-slide>` usage
- Include multiple deck examples and toolbar functionality
- **Delegate with Task Tool**: Use `general-purpose` agent to create Lit demo page

📋 **Create React wrappers demo page** - `/react` route showing React components  
- React page with proper JSX syntax
- Same functionality as Lit page but using React wrapper components
- Show identical behavior between Lit and React versions
- **Delegate with Task Tool**: Use `general-purpose` agent to create React demo page

📋 **Implement basic Lit components** - Core web components without full functionality
- `<iteration-deck>`: Basic container with id/label props
- `<iteration-deck-slide>`: Basic slide wrapper with label prop
- `<iteration-deck-toolbar>`: Basic toolbar (can be non-functional initially)
- **Delegate with Task Tool**: Use `general-purpose` agent to implement basic Lit components

📋 **Implement React wrapper components** - Thin wrappers around Lit components
- `IterationDeck.tsx`: React wrapper with proper TypeScript types
- `IterationDeckSlide.tsx`: React wrapper with children support
- Ensure proper prop passing to underlying Lit components
- **Delegate with Task Tool**: Use `general-purpose` agent to implement React wrappers

📋 **Setup Zustand store** - Basic state management structure
- Create `src/store/iteration-store.ts` with basic interface
- Implement `activeDecks` state and `setActiveSlide` action
- Add environment detection for production vs development
- **Delegate with Task Tool**: Use `general-purpose` agent to implement Zustand store

📋 **Configure dev server routing** - Multiple pages accessible during development
- Configure Vite to serve `/lit` and `/react` routes
- Ensure proper module resolution for both pages
- Add navigation between demo pages
- **Delegate with Task Tool**: Use `general-purpose` agent to configure dev server

📋 **Basic styling setup** - @vanilla-extract/css foundation
- Configure @vanilla-extract Vite plugin
- Create basic component stylesheets referencing tokens
- Ensure styles are applied to both Lit and React demos
- **Delegate with Task Tool**: Use `general-purpose` agent to setup styling system

### Launching Multiple Agents

To execute concurrent agents, launch them in a single message:
```typescript
// Example for Phase 2 - all launched simultaneously
[Task1_CoreComponents, Task2_ToolbarComponent, Task3_StylingImplementation]
```

This approach maximizes development velocity while maintaining clear separation of concerns and avoiding conflicts between concurrent work streams.