# Iteration Deck

**React TypeScript components for AI-first prototyping workflows**

Iteration Deck enables designers and PMs to compare AI-generated UI variations interactively using a slide deck metaphor. Each AI-generated variation becomes a "slide" that you can navigate between with an intuitive development toolbar.

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)
![React](https://img.shields.io/badge/React-19+-green.svg)
![Tests](https://img.shields.io/badge/tests-44_passing-brightgreen.svg)

## 🚀 **Core Philosophy**

*"Where are the designer tools for the AI era?"*

Provide the "duplicate frame" equivalent for AI-generated code variations, allowing live comparison of interactive prototypes directly in product context.

## ✨ **Features**

- 🎯 **AI-First Design** - Built specifically for AI-generated UI variation workflows
- 🛠️ **Development Toolbar** - Pill-shaped, fixed bottom-center with deck selector and navigation
- 🔄 **Multi-Deck Support** - Handle multiple IterationDeck instances on one page intelligently
- ⌨️ **Keyboard Shortcuts** - Ctrl/Cmd + Arrow keys for slide navigation
- 🏗️ **Production Optimization** - Automatically renders only first slide in production builds
- 📘 **TypeScript** - Full type safety with generated declaration files
- 🎨 **Responsive Design** - Auto theming with light/dark mode support
- 🧪 **Comprehensive Tests** - 44 tests covering all functionality

## 📦 **Installation**

```bash
npm install iteration-deck
# or
pnpm add iteration-deck
# or
yarn add iteration-deck
```

## 🔧 **Basic Usage**

```tsx
import { IterationDeck, IterationDeckSlide } from 'iteration-deck'

function App() {
  return (
    <IterationDeck id="hero-layouts" label="Hero Sections">
      <IterationDeckSlide label="Centered Layout">
        <HeroLayout1 />
      </IterationDeckSlide>
      <IterationDeckSlide label="Split Layout">
        <HeroLayout2 />
      </IterationDeckSlide>
      <IterationDeckSlide label="Full Width">
        <HeroLayout3 />
      </IterationDeckSlide>
    </IterationDeck>
  )
}
```

## 🎯 **AI-Generated Variations Example**

```tsx
// AI-generated button variations with prompt tracking
<IterationDeck 
  id="cta-buttons" 
  label="Call to Action Buttons"
  prompt="Create a modern, accessible CTA button with 3 style variations"
>
  <IterationDeckSlide 
    label="Primary" 
    aiPrompt="Make it bold and attention-grabbing"
    confidence={0.95}
  >
    <Button variant="primary">Get Started</Button>
  </IterationDeckSlide>
  <IterationDeckSlide 
    label="Subtle" 
    aiPrompt="More understated, professional look"
    confidence={0.87}
  >
    <Button variant="outline">Get Started</Button>
  </IterationDeckSlide>
  <IterationDeckSlide 
    label="Gradient" 
    aiPrompt="Add visual interest with gradient background"
    confidence={0.92}
    notes="Designer preferred this for hero section"
  >
    <Button variant="gradient">Get Started</Button>
  </IterationDeckSlide>
</IterationDeck>
```

## 🔄 **Multi-Deck Support**

```tsx
function DesignSystemPage() {
  return (
    <div>
      <h2>Header Variations</h2>
      <IterationDeck id="headers" label="Page Headers">
        <IterationDeckSlide label="Standard">
          <Header variant="standard" />
        </IterationDeckSlide>
        <IterationDeckSlide label="Compact">
          <Header variant="compact" />
        </IterationDeckSlide>
      </IterationDeck>

      <h2>Footer Variations</h2>
      <IterationDeck id="footers" label="Page Footers">
        <IterationDeckSlide label="Full">
          <Footer variant="full" />
        </IterationDeckSlide>
        <IterationDeckSlide label="Minimal">
          <Footer variant="minimal" />
        </IterationDeckSlide>
      </IterationDeck>
      
      {/* 
        Toolbar automatically shows deck selector dropdown
        Keyboard shortcuts work on selected deck
        Zero configuration required
      */}
    </div>
  )
}
```

## 🤖 **For AI Coding Agents**

**Looking to integrate Iteration Deck with AI coding assistants?** Check out our comprehensive [AI Agent Usage Guide](./AI_AGENT_USAGE.md) for:

- 🎯 When and how to use Iteration Deck
- 📋 Common patterns and examples  
- 🔧 Integration with AI workflows
- ✅ Best practices and naming conventions
- 🚀 TypeScript utilities and helper functions

## 📖 **API Reference**

### `IterationDeck`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | ✅ | Unique identifier for this iteration deck |
| `label` | `string` | ❌ | Label for this deck in the toolbar |
| `prompt` | `string` | ❌ | AI prompt context for generation tracking |
| `description` | `string` | ❌ | Additional context for stakeholder presentations |
| `children` | `ReactElement<IterationDeckSlideProps>[]` | ✅ | Array of IterationDeckSlide components |

### `IterationDeckSlide`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | `string` | ✅ | Label for this slide/variation |
| `aiPrompt` | `string` | ❌ | AI prompt refinements for this specific variation |
| `notes` | `string` | ❌ | Design rationale, AI feedback, or iteration insights |
| `confidence` | `number` | ❌ | AI generation confidence score (0-1, dev mode only) |
| `children` | `ReactNode` | ✅ | The content to render for this slide |

## ⌨️ **Keyboard Shortcuts**

- **Ctrl/Cmd + →** - Next slide
- **Ctrl/Cmd + ←** - Previous slide

## 🏭 **Environment-Specific Behavior**

### Development Mode
- **Global toolbar** - Single toolbar for all IterationDeck instances
- **Multi-deck support** - Dropdown selector when multiple decks present
- **Keyboard shortcuts** - Navigation works on active deck only
- **All slides visible** - Shows active slide based on state

### Production Mode
- **First slide only** - Renders `children[0]` automatically
- **No toolbar** - Environment detection prevents mounting
- **Zero overhead** - Minimal runtime footprint

## 🛠️ **Development**

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Type checking
pnpm typecheck

# Lint code
pnpm lint

# Build library for distribution
pnpm build:lib
```

## 🧪 **Testing**

The project includes comprehensive tests:

- **44 tests** covering all functionality
- **Store tests** - Zustand state management
- **Component tests** - React rendering and behavior
- **Toolbar tests** - Navigation and keyboard shortcuts
- **Integration tests** - End-to-end functionality

```bash
pnpm test
```

## 🏗️ **Built With**

- **React 19** - UI framework
- **TypeScript 5.8** - Type safety
- **Zustand** - Global state management
- **Vite** - Build tool and dev server
- **Vitest** - Testing framework
- **CSS Modules** - Component-scoped styling

## 🤝 **Contributing**

This project was built as a learning exercise for AI-first development workflows. Feel free to fork and experiment!

## 📄 **License**

MIT License - see LICENSE file for details.

---

**Target Users:** Designers and Product Managers working with AI coding agents  
**Core Value:** Compare live, interactive prototypes directly in product context
