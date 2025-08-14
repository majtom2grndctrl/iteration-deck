# Iteration Deck - API Documentation

Complete reference for all components, props, methods, events, and APIs in the Iteration Deck library.

## Installation

```bash
npm install iteration-deck
# or
yarn add iteration-deck
# or
pnpm add iteration-deck
```

## Web Component Loading

```typescript
// Auto-define custom elements (recommended)
import { defineCustomElements } from 'iteration-deck/loader';
defineCustomElements();

// Manual imports (advanced usage)
import { IterationDeck, IterationDeckSlide, IterationDeckToolbar } from 'iteration-deck/dist/components';
```

---

## `<iteration-deck>`

Main container component for managing UI variations.

### Properties

| Property | Attribute | Type | Default | Required | Description |
|----------|-----------|------|---------|----------|-------------|
| `deckId` | `deck-id` | `string` | - | ✅ | Unique identifier for this iteration deck |
| `label` | `label` | `string` | `undefined` | ❌ | Label displayed in toolbar dropdown |
| `prompt` | `prompt` | `string` | `undefined` | ❌ | AI prompt context for generation tracking |
| `description` | `description` | `string` | `undefined` | ❌ | Additional context for stakeholder presentations |
| `activeIndex` | `active-index` | `number` | `0` | ❌ | Currently active slide index |

### Methods

| Method | Description | Parameters | Returns |
|--------|-------------|------------|---------|
| `updateActiveState()` | Manually trigger update of active slide states | none | `void` |
| `scrollIntoView()` | Scroll deck into viewport | none | `void` |

### Events

| Event | Description | Detail Type |
|-------|-------------|-------------|
| `deckRegistered` | Fired when deck registers with global store | `{ deckId: string, label?: string }` |
| `slideChanged` | Fired when active slide changes | `{ deckId: string, oldIndex: number, newIndex: number }` |

### CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--iteration-deck-border-radius` | `8px` | Border radius for deck container |
| `--iteration-deck-margin` | `1rem 0` | Margin around deck |
| `--iteration-deck-glow-color` | `rgba(59, 130, 246, 0.4)` | Color for attention glow effect |
| `--iteration-deck-transition` | `0.3s ease` | Transition duration for state changes |

### Usage Examples

```html
<!-- Basic usage -->
<iteration-deck deck-id="hero-sections" label="Hero Layouts">
  <iteration-deck-slide label="Centered">
    <div class="hero-centered">...</div>
  </iteration-deck-slide>
  <iteration-deck-slide label="Split">
    <div class="hero-split">...</div>
  </iteration-deck-slide>
</iteration-deck>

<!-- AI-enhanced usage -->
<iteration-deck 
  deck-id="buttons" 
  label="CTA Buttons"
  prompt="Create accessible CTA buttons with 3 variations"
  description="Testing for conversion optimization">
  <iteration-deck-slide label="Primary" confidence="0.95">
    <button class="btn-primary">Get Started</button>
  </iteration-deck-slide>
  <iteration-deck-slide label="Outline" confidence="0.87">
    <button class="btn-outline">Get Started</button>
  </iteration-deck-slide>
</iteration-deck>
```

---

## `<iteration-deck-slide>`

Individual slide wrapper for UI variations.

### Properties

| Property | Attribute | Type | Default | Required | Description |
|----------|-----------|------|---------|----------|-------------|
| `label` | `label` | `string` | - | ✅ | Label for this slide/variation |
| `aiPrompt` | `ai-prompt` | `string` | `undefined` | ❌ | AI prompt for this specific variation |
| `notes` | `notes` | `string` | `undefined` | ❌ | Design rationale or iteration insights |
| `confidence` | `confidence` | `number` | `undefined` | ❌ | AI confidence score (0-1, dev mode only) |

### Methods

| Method | Description | Parameters | Returns |
|--------|-------------|------------|---------|
| `updateActiveState()` | Update active state based on parent deck | none | `void` |

### Events

| Event | Description | Detail Type |
|-------|-------------|-------------|
| `slideActivated` | Fired when slide becomes active | `{ slideIndex: number, label: string }` |
| `slideDeactivated` | Fired when slide becomes inactive | `{ slideIndex: number, label: string }` |

### CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--iteration-slide-transition` | `opacity 0.3s ease` | Transition for active state changes |
| `--iteration-slide-confidence-bg` | `rgba(16, 185, 129, 0.1)` | Background for confidence badge |
| `--iteration-slide-confidence-color` | `#10b981` | Text color for confidence badge |
| `--iteration-slide-notes-bg` | `rgba(59, 130, 246, 0.1)` | Background for notes button |
| `--iteration-slide-notes-color` | `#3b82f6` | Color for notes button |

### Confidence Score Guidelines

| Range | Meaning | Usage |
|-------|---------|-------|
| `0.9 - 1.0` | High confidence | Production-ready, minimal review needed |
| `0.7 - 0.89` | Good confidence | Minor tweaks may be needed |
| `0.5 - 0.69` | Medium confidence | Requires review before implementation |
| `0.0 - 0.49` | Low confidence | Experimental, needs significant work |

### Usage Examples

```html
<!-- Basic slide -->
<iteration-deck-slide label="Standard Button">
  <button class="btn-standard">Click Me</button>
</iteration-deck-slide>

<!-- AI-enhanced slide with metadata -->
<iteration-deck-slide 
  label="Material Design Button"
  ai-prompt="Create a button following Material Design 3 principles"
  confidence="0.92"
  notes="Passes WCAG 2.2 AA contrast requirements">
  <button class="btn-material">Click Me</button>
</iteration-deck-slide>

<!-- Slide with design notes -->
<iteration-deck-slide 
  label="User Feedback Version"
  notes="Updated based on user testing - increased font size">
  <button class="btn-feedback">Click Me</button>
</iteration-deck-slide>
```

---

## `<iteration-deck-toolbar>`

Global navigation toolbar (auto-created, singleton).

### Properties

*No configurable properties - automatically managed by the component.*

### Methods

| Method | Description | Parameters | Returns |
|--------|-------------|------------|---------|
| `handlePrevSlide()` | Navigate to previous slide | none | `void` |
| `handleNextSlide()` | Navigate to next slide | none | `void` |
| `handleDeckSelect()` | Switch active deck | `deckId: string` | `void` |

### Events

| Event | Description | Detail Type |
|-------|-------------|-------------|
| `toolbarCreated` | Fired when toolbar is first created | `{ timestamp: number }` |
| `deckSwitched` | Fired when active deck changes | `{ oldDeckId: string, newDeckId: string }` |

### Keyboard Shortcuts

| Shortcut | Action | Scope |
|----------|--------|-------|
| `Ctrl/Cmd + ←` | Previous slide | Active deck only |
| `Ctrl/Cmd + →` | Next slide | Active deck only |
| `Tab` | Navigate toolbar controls | Toolbar only |
| `Enter/Space` | Activate focused control | Toolbar only |

### CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--iteration-toolbar-bg` | `rgba(255, 255, 255, 0.95)` | Toolbar background |
| `--iteration-toolbar-backdrop` | `blur(10px)` | Backdrop filter effect |
| `--iteration-toolbar-shadow` | `0 4px 20px rgba(0, 0, 0, 0.15)` | Box shadow |
| `--iteration-toolbar-border-radius` | `24px` | Border radius |
| `--iteration-toolbar-z-index` | `1000` | Z-index for layering |
| `--iteration-toolbar-button-active` | `#3b82f6` | Active button background |
| `--iteration-toolbar-button-disabled` | `#e5e7eb` | Disabled button background |

---

## Global Store API

The library uses a Zustand store for state management across components.

### Store Interface

```typescript
interface GlobalDeckState {
  // State
  decks: Map<string, DeckInfo>;
  activeDeckId: string | null;
  activeSlideIndex: number;
  
  // Actions
  setActiveDeck: (deckId: string) => void;
  setActiveSlide: (index: number) => void;
  registerDeck: (deck: DeckInfo) => void;
  unregisterDeck: (deckId: string) => void;
  updateDeckSlides: (deckId: string, slides: SlideInfo[]) => void;
}

interface DeckInfo {
  id: string;
  label?: string;
  prompt?: string;
  description?: string;
  slides: SlideInfo[];
  slideCount: number;
  activeSlideIndex: number;
}

interface SlideInfo {
  label: string;
  aiPrompt?: string;
  notes?: string;
  confidence?: number;
}
```

### Store Access

```typescript
import { useIterationDeckStore } from 'iteration-deck/store';

// Get current state
const state = useIterationDeckStore.getState();

// Subscribe to changes
const unsubscribe = useIterationDeckStore.subscribe((state) => {
  console.log('State changed:', state);
});

// Programmatic control
state.setActiveDeck('my-deck-id');
state.setActiveSlide(2);
```

---

## Environment Detection

The library automatically detects development vs production environments:

### Detection Logic

```typescript
interface EnvironmentInfo {
  isProduction: boolean;
  isDevelopment: boolean;
  hostname: string;
  hasDevMarkers: boolean;
}

// Automatic detection
const env = detectEnvironment();
```

### Behavior Differences

| Feature | Development | Production |
|---------|-------------|------------|
| **Toolbar** | Visible and functional | Hidden (returns null) |
| **Slide rendering** | All slides (based on active state) | First slide only |
| **Metadata** | Confidence scores, notes visible | All metadata hidden |
| **Visual feedback** | Attention glow, transitions | Minimal styling |
| **Keyboard shortcuts** | Fully functional | Disabled |
| **Auto-scroll** | Enabled | Disabled |

---

## Accessibility Features

### WCAG 2.2 AA Compliance

- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader Support**: Proper ARIA labels and announcements
- **Touch Targets**: 44px minimum size for all interactive elements
- **Color Contrast**: Meets contrast ratio requirements
- **Focus Indicators**: Visible focus states for all controls

### ARIA Attributes

| Component | Attributes | Purpose |
|-----------|------------|---------|
| `iteration-deck` | `role="region"`, `aria-label` | Identify deck regions |
| `iteration-deck-slide` | `aria-hidden`, `aria-live` | Manage slide visibility |
| `iteration-deck-toolbar` | `role="toolbar"`, `aria-label` | Toolbar identification |
| Navigation buttons | `aria-label`, `aria-disabled` | Button states and purpose |
| Deck selector | `aria-label`, `aria-expanded` | Dropdown accessibility |

### Keyboard Support

```typescript
// Global shortcuts (development mode only)
Ctrl/Cmd + ← : Previous slide in active deck
Ctrl/Cmd + → : Next slide in active deck

// Toolbar navigation
Tab         : Move between toolbar controls
Enter/Space : Activate focused control
↑/↓         : Navigate dropdown options (when open)
Escape      : Close dropdown (when open)
```

---

## Framework Integration

### React

```typescript
import { defineCustomElements } from 'iteration-deck/loader';
import { useEffect } from 'react';

// Initialize once in your app root
defineCustomElements();

function MyComponent() {
  return (
    <iteration-deck deck-id="react-example" label="React Components">
      <iteration-deck-slide label="Material UI">
        <MaterialButton variant="contained">Save</MaterialButton>
      </iteration-deck-slide>
      <iteration-deck-slide label="Custom Button">
        <CustomButton theme="primary">Save</CustomButton>
      </iteration-deck-slide>
    </iteration-deck>
  );
}
```

### Vue 3

```vue
<template>
  <iteration-deck deck-id="vue-example" label="Vue Components">
    <iteration-deck-slide label="Vuetify">
      <v-btn color="primary">Save</v-btn>
    </iteration-deck-slide>
    <iteration-deck-slide label="Custom">
      <CustomButton type="primary">Save</CustomButton>
    </iteration-deck-slide>
  </iteration-deck>
</template>

<script setup>
import { defineCustomElements } from 'iteration-deck/loader';
import { onMounted } from 'vue';

onMounted(() => {
  defineCustomElements();
});
</script>
```

### Angular

```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { defineCustomElements } from 'iteration-deck/loader';

defineCustomElements();

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // ... other config
})
export class AppModule {}

// component.ts
@Component({
  template: `
    <iteration-deck deck-id="angular-example" label="Angular Components">
      <iteration-deck-slide label="Material">
        <button mat-raised-button color="primary">Save</button>
      </iteration-deck-slide>
      <iteration-deck-slide label="Custom">
        <app-custom-button type="primary">Save</app-custom-button>
      </iteration-deck-slide>
    </iteration-deck>
  `
})
export class MyComponent {}
```

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="https://unpkg.com/iteration-deck/dist/iteration-deck/iteration-deck.esm.js"></script>
</head>
<body>
  <iteration-deck deck-id="vanilla-example" label="Vanilla Components">
    <iteration-deck-slide label="Standard">
      <button class="btn-standard">Save</button>
    </iteration-deck-slide>
    <iteration-deck-slide label="Styled">
      <button class="btn-styled">Save</button>
    </iteration-deck-slide>
  </iteration-deck>
</body>
</html>
```

---

## TypeScript Support

Full TypeScript definitions are included:

```typescript
// Component interfaces
interface IterationDeck extends HTMLElement {
  deckId: string;
  label?: string;
  prompt?: string;
  description?: string;
  activeIndex: number;
}

interface IterationDeckSlide extends HTMLElement {
  label: string;
  aiPrompt?: string;
  notes?: string;
  confidence?: number;
}

// Store types
import type { 
  GlobalDeckState, 
  DeckInfo, 
  SlideInfo 
} from 'iteration-deck/types';

// Environment utilities
import type { EnvironmentInfo } from 'iteration-deck/utils';
```

---

## Performance Considerations

### Bundle Size
- **Core library**: ~15KB gzipped
- **With Zustand**: ~18KB gzipped
- **Tree-shakeable**: Only used components bundled

### Runtime Performance
- **Lazy loading**: Components loaded on-demand
- **Minimal re-renders**: Optimized state updates
- **Memory efficient**: Automatic cleanup on disconnect
- **No framework dependencies**: Pure web components

### Best Practices

1. **Unique deck IDs**: Always provide unique `deck-id` values
2. **Meaningful labels**: Use descriptive labels for accessibility
3. **Production builds**: Components automatically optimize for production
4. **Framework integration**: Call `defineCustomElements()` once per app
5. **Memory management**: Components auto-cleanup on DOM removal

---

## Migration & Versioning

### Breaking Changes Policy
- **Major versions**: Breaking changes with migration guides
- **Minor versions**: New features, backward compatible
- **Patch versions**: Bug fixes only

### Version Support
- **Current major**: Full support and active development
- **Previous major**: Security fixes for 12 months
- **Older versions**: Community support only

### Upgrade Path
```bash
# Check current version
npm list iteration-deck

# Upgrade to latest
npm update iteration-deck

# Upgrade to specific version
npm install iteration-deck@^2.0.0
```

---

## Troubleshooting

### Common Issues

#### Components Not Rendering
```typescript
// Ensure custom elements are defined
import { defineCustomElements } from 'iteration-deck/loader';
defineCustomElements();
```

#### Toolbar Not Appearing
- Check if running in development mode
- Ensure at least one `iteration-deck` is present
- Verify no console errors blocking execution

#### Keyboard Shortcuts Not Working
- Shortcuts only work in development mode
- Ensure a deck is active (visible in toolbar)
- Check browser console for JavaScript errors

#### TypeScript Errors
```typescript
// Add to your types
declare namespace JSX {
  interface IntrinsicElements {
    'iteration-deck': any;
    'iteration-deck-slide': any;
    'iteration-deck-toolbar': any;
  }
}
```

### Debug Mode

Enable debug logging:

```typescript
// Set before importing components
window.ITERATION_DECK_DEBUG = true;

import { defineCustomElements } from 'iteration-deck/loader';
defineCustomElements();
```

---

## Contributing

### Development Setup
```bash
git clone https://github.com/your-org/iteration-deck
cd iteration-deck
pnpm install
pnpm start
```

### Component Guidelines
- Follow Stencil best practices
- Include comprehensive tests
- Update documentation
- Maintain accessibility standards

### Reporting Issues
Include:
- Browser and version
- Framework and version
- Minimal reproduction case
- Expected vs actual behavior

---

*For more examples and advanced usage, see the [examples directory](./examples/) and [Technical Specification](./.claude/TECHNICAL_SPEC.md).*