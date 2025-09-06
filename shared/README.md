# Shared Styling System

This directory contains the shared styling system for Iteration Deck, providing consistency across React and Lit implementations.

## Files

### `styles.ts` - Shared Tailwind Classes
TypeScript constants containing Tailwind class strings for cross-framework consistency:

```typescript
import { toolbarStyles, deckStyles, confidenceStyles } from './styles';

// React usage
<div className={toolbarStyles.container}>

// Lit usage (for reference - actual Lit uses CSS-in-JS)
// These classes provide the equivalent styling patterns
```

### `tokens.ts` - Design Tokens
Core design system tokens (colors, spacing, typography, etc.) used by both implementations:

```typescript
import { tokens } from './tokens';

// Access design tokens
const primaryColor = tokens.colors.gray[700];
const spacing = tokens.spacing[4];
```

### `tokens-lit.ts` - Lit CSS Tagged Templates
Lit-specific CSS tagged template literals and theme tokens:

```typescript
import { themeTokens, spacing } from './tokens-lit';

// Use in Lit components
static styles = [
  themeTokens,
  css`
    :host {
      padding: ${unsafeCSS(spacing.spacing4)};
    }
  `
];
```

### `tailwind.css` - Tailwind Base Styles
Base Tailwind CSS file for import into projects that use the Tailwind classes.

## Usage Patterns

### React Components
Use shared Tailwind class constants for consistent styling:

```tsx
import { toolbarStyles } from '../shared/styles';

function MyToolbar() {
  return (
    <div className={toolbarStyles.container}>
      <button className={toolbarStyles.navigation.button}>
        Previous
      </button>
    </div>
  );
}
```

### Lit Components  
Import design tokens and use CSS-in-JS with shared reference:

```typescript
import { spacing, themeTokens } from '../shared/tokens-lit';
// import { toolbarStyles } from '../shared/styles'; // Available for reference

@customElement('my-toolbar')
export class MyToolbar extends LitElement {
  static styles = [
    themeTokens,
    css`
      :host {
        /* Equivalent to toolbarStyles.container */
        position: fixed;
        bottom: ${unsafeCSS(spacing.spacing2)};
        /* ... more styles matching Tailwind classes */
      }
    `
  ];
}
```

## Benefits

- **Single Source of Truth**: Design decisions defined once, used everywhere
- **TypeScript Safety**: Autocomplete and refactoring support
- **Framework Agnostic**: Works with React, Lit, and other frameworks
- **Tailwind Optimization**: Build-time purging and optimization
- **Consistency**: Visual and behavioral parity across implementations

## Tailwind Configuration

The project includes a `tailwind.config.js` that extends the default theme with design tokens:

- Colors mapped from design tokens
- Spacing scale integrated
- Custom shadows and animations
- Responsive breakpoints aligned with design system