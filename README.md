# Iteration Deck

[![npm version](https://badge.fury.io/js/@iteration-deck%2Fcore.svg)](https://badge.fury.io/js/@iteration-deck%2Fcore)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **AI-first prototyping web components for comparing interactive UI variations**

Iteration Deck enables designers and product managers to compare AI-generated UI variations side-by-side in live, interactive prototypes. Built with Lit web components and manual React wrappers, it works with any framework while providing excellent developer experience.

![Iteration Deck Demo](https://via.placeholder.com/800x400/6366f1/ffffff?text=Interactive+Prototype+Comparison)

## Features

- 🎯 **AI-First Design**: Built specifically for AI-generated UI variation workflows
- 🔧 **Universal Framework Support**: Works with React, Vue, Angular, Astro, and vanilla HTML
- ⚡ **Zero Runtime CSS**: Type-safe styling with @vanilla-extract/css
- 🎨 **Designer-Friendly**: Clean, pill-shaped toolbar that doesn't compete with your designs
- ⌨️ **Keyboard Navigation**: Cmd/Ctrl + Arrow keys for quick iteration switching
- 🌙 **Auto Theming**: Built-in light/dark mode support via `prefers-color-scheme`
- 📱 **Responsive**: Works seamlessly across desktop, tablet, and mobile
- ♿ **Accessible**: WCAG 2.2 AA compliant with proper ARIA attributes

## Quick Start

### Installation

```bash
# For React projects
npm install @iteration-deck/core

# For other frameworks
npm install @iteration-deck/core
```

### Basic Usage

Once the package is installed, prompt your coding agent to build out multiple versions of a feature. See examples below.

## AI Workflow Examples

### Working with AI Coding Agents

Iteration Deck is designed to work seamlessly with AI coding agents like Claude, ChatGPT, and others. 

**🤖 For AI Coding Agents:** See the included instruction files:
- [`AI_INSTRUCTIONS.md`](./AI_INSTRUCTIONS.md) - Complete guidance on when and how to use iteration-deck
- [`AI_EXAMPLES.md`](./AI_EXAMPLES.md) - Working code examples for common use cases  
- [`AI_QUICK_REFERENCE.md`](./AI_QUICK_REFERENCE.md) - Quick reference for trigger phrases and patterns

Here are example prompts and expected outputs:

#### Example 1: Creating Button Variations

**Prompt to AI:**
```
Create 3 button variations for a SaaS landing page using iteration-deck. 
Make them: primary (bold), secondary (outline), and gradient styles. 
Include hover states and accessibility features.
```

**Expected AI Output:**
```tsx
import { IterationDeck, IterationDeckSlide } from '@iteration-deck/core/react';

function ButtonVariations() {
  return (
    <IterationDeck 
      id="cta-buttons" 
      label="CTA Buttons"
      prompt="Create 3 button variations for SaaS landing page"
    >
      <IterationDeckSlide 
        label="Primary" 
        aiPrompt="Bold, attention-grabbing style"
        confidence={0.95}
      >
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
          Get Started
        </button>
      </IterationDeckSlide>
      
      <IterationDeckSlide 
        label="Secondary" 
        aiPrompt="Professional outline style"
        confidence={0.87}
      >
        <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
          Get Started
        </button>
      </IterationDeckSlide>
      
      <IterationDeckSlide 
        label="Gradient" 
        aiPrompt="Eye-catching gradient background"
        confidence={0.92}
        notes="Designer preferred this for hero section"
      >
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all">
          Get Started
        </button>
      </IterationDeckSlide>
    </IterationDeck>
  );
}
```

#### Example 2: Navigation Header Layouts

**Prompt to AI:**
```
Design 3 different navigation header layouts using iteration-deck: 
1) Traditional horizontal nav, 2) Sidebar toggle nav, 3) Centered logo with split nav. 
Include responsive behavior and proper accessibility.
```

**Expected AI Output:**
```tsx
import { IterationDeck, IterationDeckSlide } from '@iteration-deck/core/react';

function NavigationLayouts() {
  return (
    <IterationDeck 
      id="nav-headers" 
      label="Navigation Headers"
      description="Three responsive navigation approaches for modern web apps"
    >
      <IterationDeckSlide 
        label="Traditional Horizontal"
        aiPrompt="Classic horizontal navigation with logo left, links right"
      >
        <nav className="flex items-center justify-between p-4 bg-white shadow-sm">
          <div className="flex items-center space-x-8">
            <img src="/logo.svg" alt="Logo" className="h-8" />
            <ul className="hidden md:flex space-x-6">
              <li><a href="#" className="text-gray-700 hover:text-blue-600">Products</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600">Solutions</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600">Pricing</a></li>
            </ul>
          </div>
          <button className="md:hidden">☰</button>
        </nav>
      </IterationDeckSlide>
      
      <IterationDeckSlide 
        label="Sidebar Toggle"
        aiPrompt="Modern sidebar navigation with hamburger toggle"
      >
        <nav className="flex items-center justify-between p-4 bg-white shadow-sm">
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <span className="sr-only">Open menu</span>
            ☰
          </button>
          <img src="/logo.svg" alt="Logo" className="h-8" />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Sign In
          </button>
        </nav>
      </IterationDeckSlide>
      
      <IterationDeckSlide 
        label="Centered Logo Split"
        aiPrompt="Centered logo with navigation split on both sides"
      >
        <nav className="flex items-center justify-between p-4 bg-white shadow-sm">
          <ul className="hidden md:flex space-x-6">
            <li><a href="#" className="text-gray-700 hover:text-blue-600">Products</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-600">Solutions</a></li>
          </ul>
          <img src="/logo.svg" alt="Logo" className="h-8 mx-8" />
          <ul className="hidden md:flex space-x-6 items-center">
            <li><a href="#" className="text-gray-700 hover:text-blue-600">Pricing</a></li>
            <li><button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Sign In</button></li>
          </ul>
          <button className="md:hidden">☰</button>
        </nav>
      </IterationDeckSlide>
    </IterationDeck>
  );
}
```

#### Example 3: Dashboard Card Layouts

**Prompt to AI:**
```
Create 3 dashboard card variations using iteration-deck for displaying user metrics: 
1) Simple stat card, 2) Chart integration, 3) Progress indicator style. 
Make them responsive and include loading states.
```

**Expected AI Output:**
```tsx
import { IterationDeck, IterationDeckSlide } from '@iteration-deck/core/react';

function DashboardCards({ data, isLoading }) {
  return (
    <IterationDeck 
      id="dashboard-cards" 
      label="Metric Cards"
      prompt="Dashboard cards for user metrics with different visual approaches"
    >
      <IterationDeckSlide 
        label="Simple Stats"
        aiPrompt="Clean, minimal stat cards with large numbers"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="bg-white p-6 rounded-lg shadow animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
              <p className="text-3xl font-bold text-gray-900">12,543</p>
              <span className="text-sm text-green-600">+12% from last month</span>
            </div>
          )}
        </div>
      </IterationDeckSlide>
      
      <IterationDeckSlide 
        label="With Charts"
        aiPrompt="Cards with integrated mini charts and sparklines"
      >
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Revenue</h3>
              <p className="text-3xl font-bold text-gray-900">$45,231</p>
            </div>
            <div className="h-16 w-24 bg-blue-100 rounded flex items-end">
              {/* Mini chart placeholder */}
              <div className="w-full h-full bg-gradient-to-t from-blue-400 to-blue-200 rounded"></div>
            </div>
          </div>
        </div>
      </IterationDeckSlide>
      
      <IterationDeckSlide 
        label="Progress Style"
        aiPrompt="Cards with progress bars and goal completion"
      >
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Monthly Goal</h3>
          <div className="flex items-center mt-2">
            <p className="text-2xl font-bold text-gray-900">$32,450</p>
            <span className="ml-2 text-sm text-gray-500">/ $50,000</span>
          </div>
          <div className="mt-4">
            <div className="bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{width: '65%'}}></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">65% complete</p>
          </div>
        </div>
      </IterationDeckSlide>
    </IterationDeck>
  );
}
```

## API Reference

### IterationDeck

The main container component for grouping UI variations.

```tsx
interface IterationDeckProps {
  id: string;                    // Unique identifier for this deck
  label?: string;                // Display label in toolbar
  prompt?: string;               // AI prompt context for generation tracking
  description?: string;          // Additional context for stakeholders
  children: IterationDeckSlide[];
}
```

### IterationDeckSlide

Individual slide wrapper for each UI variation.

```tsx
interface IterationDeckSlideProps {
  label: string;                 // Label for this variation
  aiPrompt?: string;            // AI prompt refinements for this variation
  notes?: string;               // Design rationale or AI feedback
  confidence?: number;          // AI generation confidence (0-1, dev only)
  children: React.ReactNode;
}
```

## Advanced Usage

### Multiple Decks

Use multiple iteration decks on the same page for complex prototyping:

```tsx
function DesignSystemDemo() {
  return (
    <>
      <section>
        <h2>Header Variations</h2>
        <IterationDeck id="headers" label="Headers">
          <IterationDeckSlide label="Standard">
            <Header variant="standard" />
          </IterationDeckSlide>
          <IterationDeckSlide label="Compact">
            <Header variant="compact" />
          </IterationDeckSlide>
        </IterationDeck>
      </section>

      <section>
        <h2>Footer Variations</h2>
        <IterationDeck id="footers" label="Footers">
          <IterationDeckSlide label="Full">
            <Footer variant="full" />
          </IterationDeckSlide>
          <IterationDeckSlide label="Minimal">
            <Footer variant="minimal" />
          </IterationDeckSlide>
        </IterationDeck>
      </section>
    </>
  );
}
```

### Production Behavior

In production builds, only the first slide of each deck renders:

```tsx
// Development: Shows toolbar with all variations
// Production: Renders only the first slide (Version 1)
<IterationDeck id="hero" label="Hero Variations">
  <IterationDeckSlide label="Version 1">
    <HeroV1 />  {/* Only this renders in production */}
  </IterationDeckSlide>
  <IterationDeckSlide label="Version 2">
    <HeroV2 />  
  </IterationDeckSlide>
</IterationDeck>
```

### Keyboard Shortcuts

- **Cmd/Ctrl + ←**: Previous slide in active deck
- **Cmd/Ctrl + →**: Next slide in active deck
- **Click deck in toolbar**: Switch active deck (when multiple decks present)

## Framework Support

### React
```tsx
import { IterationDeck, IterationDeckSlide } from '@iteration-deck/core/react';
```

### Vue
```vue
<script setup>
import '@iteration-deck/core';
</script>

<template>
  <iteration-deck id="components" label="Variations">
    <iteration-deck-slide label="Version 1">
      <MyComponent />
    </iteration-deck-slide>
  </iteration-deck>
</template>
```

### Angular
```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@iteration-deck/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
```

```html
<!-- component.html -->
<iteration-deck id="components" label="Variations">
  <iteration-deck-slide label="Version 1">
    <app-my-component></app-my-component>
  </iteration-deck-slide>
</iteration-deck>
```

### Astro
```astro
---
import '@iteration-deck/core';
---

<iteration-deck id="components" label="Variations" client:load>
  <iteration-deck-slide label="Version 1">
    <MyComponent />
  </iteration-deck-slide>
</iteration-deck>
```

## Development

### Setup
```bash
git clone https://github.com/MajTom2GrndCtrl/iteration-deck.git
cd iteration-deck
pnpm install
```

### Commands
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm test         # Run test suite
pnpm test.watch   # Watch mode testing
pnpm lint         # TypeScript linting
```

### Project Structure
```
src/
├── components/           # Lit web components
│   ├── iteration-deck/
│   ├── iteration-deck-slide/
│   └── iteration-deck-toolbar/
├── react/               # React wrapper components
├── tokens/              # Design tokens
├── core/                # Framework-agnostic utilities
└── store/               # Zustand state management
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Run the test suite: `pnpm test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## License

MIT © 2025 [Dan Hiester](https://github.com/majtom2grndctrl)

---

**Built for the AI era of design and development.** Where are the designer tools for working with AI coding agents? Iteration Deck is the answer.