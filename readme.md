# Iteration Deck

[![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)](https://stenciljs.com)
[![npm version](https://img.shields.io/npm/v/iteration-deck.svg)](https://www.npmjs.com/package/iteration-deck)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**AI-first prototyping workflow components for comparing UI variations**

> **"Where are the designer tools for the AI era?"**

Iteration Deck enables designers and product managers to compare AI-generated UI variations directly in product context. Using a slide deck metaphor, each AI-generated variation becomes a "slide" that you can navigate between, test interactively, and present to stakeholders.

## Core Philosophy

Traditional design tools give you "duplicate frame" for static mockups. Iteration Deck gives you **"duplicate variation"** for live, interactive prototypes. Compare button styles, layout approaches, and interaction patterns side-by-side with full functionality intact.

**Target Users:** Designers and Product Managers working with AI coding agents  
**Core Value:** Compare live, interactive prototypes directly in product context  
**Philosophy:** Bring designer-friendly iteration workflows to the AI-assisted development era

## Quick Start

### Installation

```bash
pnpm add iteration-deck
# or
npm install iteration-deck
# or
yarn add iteration-deck
```

### Basic Setup

Import and register the web components in your application:

```javascript
// Load all components at once (recommended)
import { defineCustomElements } from 'iteration-deck/loader';

defineCustomElements();
```

### Basic Usage

```html
<!-- Compare UI variations with minimal setup -->
<iteration-deck deck-id="hero-layouts" label="Hero Sections">
  <iteration-deck-slide label="Centered Layout">
    <div class="hero-centered">
      <h1>Welcome</h1>
      <p>Centered hero layout</p>
      <button>Get Started</button>
    </div>
  </iteration-deck-slide>
  
  <iteration-deck-slide label="Split Layout">
    <div class="hero-split">
      <div class="content">
        <h1>Build amazing products</h1>
        <p>Split layout approach</p>
        <button>Learn More</button>
      </div>
      <div class="image">[Visual Content]</div>
    </div>
  </iteration-deck-slide>
</iteration-deck>
```

**That's it!** In development, you'll see:
- 🎛️ **Global toolbar** for navigation between variations
- ⌨️ **Keyboard shortcuts** (Ctrl/Cmd + Arrow keys) 
- ✨ **Visual feedback** when switching between decks
- 📊 **AI metadata** display for confidence scores and notes

In production, only the first slide renders (zero overhead).

## Framework Integration

Iteration Deck components are framework-agnostic web components that work seamlessly with any frontend framework.

### React

```tsx
import React from 'react';
import { defineCustomElements } from 'iteration-deck/loader';

// Register components once in your app root
defineCustomElements();

function App() {
  return (
    <div>
      <h2>Button Variations</h2>
      <iteration-deck deck-id="buttons" label="CTA Buttons">
        <iteration-deck-slide label="Primary">
          <MyButton variant="primary">Click Me</MyButton>
        </iteration-deck-slide>
        <iteration-deck-slide label="Secondary">
          <MyButton variant="secondary">Click Me</MyButton>
        </iteration-deck-slide>
      </iteration-deck>
    </div>
  );
}
```

### Vue 3

```vue
<template>
  <div>
    <h2>Navigation Variations</h2>
    <iteration-deck deck-id="nav" label="Navigation Styles">
      <iteration-deck-slide label="Horizontal">
        <NavBar orientation="horizontal" />
      </iteration-deck-slide>
      <iteration-deck-slide label="Sidebar">
        <NavBar orientation="sidebar" />
      </iteration-deck-slide>
    </iteration-deck>
  </div>
</template>

<script setup>
import { defineCustomElements } from 'iteration-deck/loader';

// Register once in your main.ts or component
defineCustomElements();
</script>
```

### Angular

```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { defineCustomElements } from 'iteration-deck/loader';

defineCustomElements();

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // ... other module config
})
export class AppModule { }
```

```html
<!-- component.html -->
<div>
  <h2>Form Variations</h2>
  <iteration-deck deck-id="forms" label="Contact Forms">
    <iteration-deck-slide label="Standard">
      <app-contact-form layout="standard"></app-contact-form>
    </iteration-deck-slide>
    <iteration-deck-slide label="Compact">
      <app-contact-form layout="compact"></app-contact-form>
    </iteration-deck-slide>
  </iteration-deck>
</div>
```

### Vanilla HTML

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="https://unpkg.com/iteration-deck@latest/dist/iteration-deck/iteration-deck.esm.js"></script>
</head>
<body>
  <iteration-deck deck-id="cards" label="Card Layouts">
    <iteration-deck-slide label="Grid">
      <div class="card-grid">...</div>
    </iteration-deck-slide>
    <iteration-deck-slide label="List">
      <div class="card-list">...</div>
    </iteration-deck-slide>
  </iteration-deck>
</body>
</html>
```

## AI-First Features

### Prompt Tracking & Metadata

```html
<!-- Track AI generation context and confidence -->
<iteration-deck 
  deck-id="cta-buttons" 
  label="Call to Action Buttons"
  prompt="Create modern, accessible CTA buttons with 3 style variations"
  description="Testing different button styles for conversion optimization">
  
  <iteration-deck-slide 
    label="Primary" 
    ai-prompt="Make it bold and attention-grabbing"
    confidence="0.95"
    notes="Highest AI confidence, great for hero sections">
    <button class="btn-primary">Get Started</button>
  </iteration-deck-slide>
  
  <iteration-deck-slide 
    label="Subtle" 
    ai-prompt="More understated, professional look"
    confidence="0.87"
    notes="Designer preferred for B2B contexts">
    <button class="btn-outline">Get Started</button>
  </iteration-deck-slide>
</iteration-deck>
```

### Development vs Production Behavior

**Development Mode** (localhost, dev servers):
- 🎛️ Interactive global toolbar for navigation
- 🔄 Switch between all variations using dropdown selector
- ⌨️ Keyboard shortcuts (Ctrl/Cmd + Arrow keys)
- 📊 AI confidence scores and metadata display
- ✨ Visual feedback and auto-scroll to active decks

**Production Mode** (deployed builds):
- 📦 Renders only the first slide (zero overhead)
- 🚫 No toolbar or development tools
- ⚡ Static rendering, minimal bundle size
- 🎯 Production-ready performance

### Presentation Mode

Perfect for stakeholder reviews and client presentations:

```html
<!-- In production, this renders as a clean, single layout -->
<iteration-deck deck-id="dashboard" label="Dashboard Layouts">
  <iteration-deck-slide label="Approved Design">
    <!-- This is what stakeholders see -->
    <Dashboard layout="approved" />
  </iteration-deck-slide>
  <iteration-deck-slide label="Alternative 1">
    <Dashboard layout="alt1" />
  </iteration-deck-slide>
  <iteration-deck-slide label="Alternative 2">
    <Dashboard layout="alt2" />
  </iteration-deck-slide>
</iteration-deck>
```

## Multi-Deck Support

When you have multiple iteration decks on the same page:

```html
<div>
  <h2>Header Section</h2>
  <iteration-deck deck-id="headers" label="Page Headers">
    <iteration-deck-slide label="Standard">...</iteration-deck-slide>
    <iteration-deck-slide label="Compact">...</iteration-deck-slide>
  </iteration-deck>

  <h2>Content Section</h2>
  <iteration-deck deck-id="content" label="Content Layouts">
    <iteration-deck-slide label="Single Column">...</iteration-deck-slide>
    <iteration-deck-slide label="Two Column">...</iteration-deck-slide>
  </iteration-deck>
</div>
```

**Smart Toolbar Behavior:**
- 📋 Single global toolbar shared between all decks
- 🎯 Deck selector dropdown appears automatically
- 🎚️ Active deck highlighted with visual feedback
- ⌨️ Keyboard shortcuts operate on currently selected deck
- 📱 Responsive design for mobile and desktop

## Keyboard Shortcuts

| Shortcut | Action |
|----------|---------|
| `Ctrl/Cmd + ←` | Previous slide in active deck |
| `Ctrl/Cmd + →` | Next slide in active deck |
| `Click deck` | Make deck active for keyboard navigation |

## API Documentation

### Components

- **[`<iteration-deck>`](src/components/iteration-deck/readme.md)** - Main container for UI variations
- **[`<iteration-deck-slide>`](src/components/iteration-deck-slide/readme.md)** - Individual variation wrapper
- **[`<iteration-deck-toolbar>`](src/components/iteration-deck-toolbar/readme.md)** - Global navigation (auto-created)

### Props Reference

#### `<iteration-deck>`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `deck-id` | `string` | ✅ | Unique identifier for this deck |
| `label` | `string` | - | Display name in toolbar dropdown |
| `prompt` | `string` | - | AI prompt context for generation tracking |
| `description` | `string` | - | Additional context for presentations |
| `active-index` | `number` | - | Currently active slide (default: 0) |

#### `<iteration-deck-slide>`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | `string` | ✅ | Display name for this variation |
| `ai-prompt` | `string` | - | AI prompt refinements for this slide |
| `confidence` | `number` | - | AI generation confidence (0-1) |
| `notes` | `string` | - | Design rationale or feedback |

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm start

# Run tests
pnpm test

# Build for production
pnpm build

# Type checking
pnpm typecheck
```

## Browser Support

- ✅ **Chrome/Chromium** (latest 2 versions)
- ✅ **Firefox** (latest 2 versions) 
- ✅ **Safari** (latest 2 versions)
- ✅ **Edge** (latest 2 versions)

Supports all browsers with [Custom Elements v1](https://caniuse.com/custom-elementsv1) support.

## License

MIT © [Iteration Deck Contributors](https://github.com/dhiester/iteration-deck/graphs/contributors)

---

## Why Iteration Deck?

**The Problem:** AI coding agents can generate multiple UI variations quickly, but designers lack tools to compare them effectively. Traditional design tools work with static mockups, but AI generates functional code.

**The Solution:** Iteration Deck bridges this gap by providing "duplicate frame" functionality for live, interactive prototypes. Compare variations with full functionality intact, test user interactions, and present to stakeholders seamlessly.

**Built for the AI Era:** As AI becomes central to UI development, we need designer-friendly tools that work with generated code, not against it. Iteration Deck is purpose-built for AI-assisted design workflows.

---

*Built with ❤️ for designers working in the age of AI*