# Iteration Deck

[![npm version](https://badge.fury.io/js/iteration-deck.svg)](https://badge.fury.io/js/iteration-deck)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> AI-first prototyping tool that helps you rapidly compare iterations live in-browser.

One thing that Figma does really well is: It makes it easy to iterate quickly and non-destructively. When we design in code, we don’t have good ways to do that quite like in Figma.

Iteration Deck changes that, enabling designers to compare AI-generated UI variations in live, interactive prototypes. With versions built with React and Lit, Iteration Deck supports a wide range of web-based projects.

## Features

- 🎯 **AI-First Design**: Built specifically for AI-generated UI variation workflows
- 🔧 **Universal Framework Support**: Works with React, Vue, Angular, Astro, and vanilla HTML
- ⌨️ **Keyboard Navigation**: Cmd/Ctrl+Alt + [ ] keys for quick iteration switching

## Getting started

```
npm install iteration-deck
```

## Keyboard shortcuts

- **Cmd/Ctrl+Alt + [**: Previous slide in active deck
- **Cmd/Ctrl+Alt + ]**: Next slide in active deck
- **Click deck in toolbar**: Switch active deck (when multiple decks present)

## AI workflow examples

### Working with AI coding agents

Iteration Deck is built for designers who use AI coding agents like Claude Code, Cursor, Lovable, and others.

#### Example 1: Creating button variations

**Prompt to AI:**
```
Create 3 versions of a button for a SaaS landing page using iteration-deck. 
Make them: primary (bold), secondary (outline), and gradient styles. 
Include hover states and accessibility features.
```

**Expected AI Output:**
```tsx
import { IterationDeck, IterationDeckSlide } from 'iteration-deck/react';

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

#### Example 2: Navigation header layouts

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

#### Example 3: Dashboard card layouts

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

#### Example 4: Adding more variations to existing deck

**Prompt to AI:**
```
Add 2 more button variations to the existing CTA buttons deck: 
a ghost/text-only style and a loading state version.
```

**Expected AI Output:**
```tsx
// AI should add new IterationDeckSlide components to existing deck
<IterationDeck id="cta-buttons" label="CTA Buttons">
  {/* Existing slides remain unchanged */}
  <IterationDeckSlide label="Primary">...</IterationDeckSlide>
  <IterationDeckSlide label="Secondary">...</IterationDeckSlide>
  <IterationDeckSlide label="Gradient">...</IterationDeckSlide>
  
  {/* New slides added */}
  <IterationDeckSlide 
    label="Ghost" 
    aiPrompt="Minimal text-only style for subtle actions"
    confidence={0.90}
  >
    <button className="text-blue-600 hover:text-blue-800 font-semibold py-2 px-4 hover:bg-blue-50 rounded transition-colors">
      Get Started
    </button>
  </IterationDeckSlide>
  
  <IterationDeckSlide 
    label="Loading State" 
    aiPrompt="Primary button with loading spinner"
    confidence={0.93}
  >
    <button 
      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold opacity-75 cursor-not-allowed flex items-center gap-2"
      disabled
    >
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      Loading...
    </button>
  </IterationDeckSlide>
</IterationDeck>
```

## **🤖 For AI Coding Agents:** See the included instruction files:
- [`AI_INSTRUCTIONS.md`](./AI_INSTRUCTIONS.md) - Complete guidance on when and how to use iteration-deck
- [`AI_EXAMPLES.md`](./AI_EXAMPLES.md) - Working code examples for common use cases  

### Adding Variations to Existing Decks
When users want to add more designs to an existing iteration deck:
1. **Keep the same IterationDeck wrapper** with the same `id` and `label`
2. **Preserve all existing IterationDeckSlide components** unchanged
3. **Add new IterationDeckSlide components** at the end
4. **Use meaningful labels** that distinguish the new variations
5. **Include `aiPrompt` documentation** for the new variations

### Designer Selection Workflow
When a designer chooses a variation (e.g., "I like the second option", "Use the gradient version"):
1. **Remove the IterationDeck wrapper** completely
2. **Extract only the selected variation's content**
3. **Clean up development props** (`aiPrompt`, `confidence`, `notes`)
4. **Ask for confirmation** before making changes

This converts the prototyping tool back into clean production code. See [`AI_INSTRUCTIONS.md`](./AI_INSTRUCTIONS.md) for detailed cleanup examples.

## API reference

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

## Advanced usage

### Multiple decks

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

## Framework support

### React
```tsx
import { IterationDeck, IterationDeckSlide } from '@iteration-deck/core/react';
```

### Web Components (Alpha)
A web components version is also available for alpha testing in frameworks like Vue, Nuxt, Astro, Angular, Svelte, and any other framework that supports web components:

```javascript
import 'iteration-deck/wc';
```

Then use `<iteration-deck>` and `<iteration-deck-slide>` as standard HTML elements. See your framework's documentation for examples of how to integrate web components into your project.

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

### Project structure
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
