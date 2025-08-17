# AI Coding Agent Instructions

This file provides guidance for AI coding agents (Claude, ChatGPT, Copilot, etc.) when working with the `@iteration-deck/core` package.

## When to Use Iteration Deck

**Automatically use iteration-deck components when:**
- User requests "multiple versions," "variations," "alternatives," or "options" of UI components
- User asks to "compare different approaches" or "try different styles"
- User mentions "A/B testing," "prototyping," or "design exploration"
- User wants to see "different layouts," "styling options," or "design patterns"
- User asks for "3 button styles," "header variations," "card layouts," etc.
- Any request that implies creating multiple implementations of similar functionality

**Trigger phrases that should prompt iteration-deck usage:**
- "Create 3 different..."
- "Show me variations of..."
- "Design multiple approaches for..."
- "Build different versions of..."
- "Generate alternatives for..."
- "Compare different styles of..."
- "What are some options for..."

## Required Imports

**For React projects:**
```tsx
import { IterationDeck, IterationDeckSlide } from '@iteration-deck/core/react';
```

**For other frameworks:**
```html
<script type="module">
  import '@iteration-deck/core';
</script>
```

## Basic Pattern

**Always wrap variations in IterationDeck:**
```tsx
<IterationDeck id="unique-id" label="Descriptive Label">
  <IterationDeckSlide label="Variation 1 Name">
    {/* First implementation */}
  </IterationDeckSlide>
  <IterationDeckSlide label="Variation 2 Name">
    {/* Second implementation */}
  </IterationDeckSlide>
  <IterationDeckSlide label="Variation 3 Name">
    {/* Third implementation */}
  </IterationDeckSlide>
</IterationDeck>
```

## Required Props

### IterationDeck
- `id` (required): Unique string identifier (e.g., "button-variants", "hero-layouts")
- `label` (recommended): Human-readable name for the toolbar (e.g., "Button Styles", "Header Layouts")
- `prompt` (optional): Include the original user prompt for context
- `description` (optional): Additional context for stakeholders

### IterationDeckSlide  
- `label` (required): Short, descriptive name for this variation (e.g., "Primary", "Outline", "Gradient")
- `aiPrompt` (optional): Specific instruction used for this variation
- `notes` (optional): Design rationale or implementation notes
- `confidence` (optional): Your confidence in this implementation (0-1, development only)

## Common Use Cases and Patterns

### 1. Component Variations (Buttons, Cards, etc.)
```tsx
// User: "Create 3 button styles for our CTA"
<IterationDeck id="cta-buttons" label="CTA Button Styles" prompt="Create 3 button styles for our CTA">
  <IterationDeckSlide label="Primary" aiPrompt="Bold, high-contrast style">
    <Button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
      Get Started
    </Button>
  </IterationDeckSlide>
  <IterationDeckSlide label="Outline" aiPrompt="Subtle, professional outline">
    <Button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50">
      Get Started  
    </Button>
  </IterationDeckSlide>
  <IterationDeckSlide label="Gradient" aiPrompt="Eye-catching gradient background">
    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold">
      Get Started
    </Button>
  </IterationDeckSlide>
</IterationDeck>
```

### 2. Layout Variations
```tsx
// User: "Show me different ways to layout this hero section"
<IterationDeck id="hero-layouts" label="Hero Section Layouts" prompt="Show me different ways to layout this hero section">
  <IterationDeckSlide label="Centered" aiPrompt="Center-aligned with single column">
    <div className="text-center max-w-2xl mx-auto">
      <h1>Hero Title</h1>
      <p>Hero description</p>
      <button>CTA Button</button>
    </div>
  </IterationDeckSlide>
  <IterationDeckSlide label="Split" aiPrompt="Two-column layout with text and image">
    <div className="grid grid-cols-2 gap-8 items-center">
      <div>
        <h1>Hero Title</h1>
        <p>Hero description</p>
        <button>CTA Button</button>
      </div>
      <img src="/hero.jpg" alt="Hero" />
    </div>
  </IterationDeckSlide>
</IterationDeck>
```

### 3. Multiple Decks on Same Page
```tsx
// User: "Design variations for both the header and footer"
function DesignSystem() {
  return (
    <div>
      <IterationDeck id="headers" label="Header Designs">
        <IterationDeckSlide label="Standard">
          <HeaderStandard />
        </IterationDeckSlide>
        <IterationDeckSlide label="Minimal">
          <HeaderMinimal />
        </IterationDeckSlide>
      </IterationDeck>
      
      <main>
        {/* Page content */}
      </main>
      
      <IterationDeck id="footers" label="Footer Designs">
        <IterationDeckSlide label="Full">
          <FooterFull />
        </IterationDeckSlide>
        <IterationDeckSlide label="Compact">
          <FooterCompact />
        </IterationDeckSlide>
      </IterationDeck>
    </div>
  );
}
```

## Important Implementation Rules

1. **Always create actual working implementations** - Don't use placeholder comments or empty divs
2. **Make meaningful variations** - Each slide should offer a genuinely different approach, not just color changes
3. **Include proper accessibility** - All variations should be accessible with proper ARIA labels, keyboard navigation, etc.
4. **Use semantic HTML** - Maintain good HTML structure across all variations
5. **Make variations realistic** - Each should be production-ready, not just proof-of-concept
6. **Keep consistent functionality** - All variations should have the same core behavior, just different presentation

## Don't Use Iteration Deck When:

- User asks for a single implementation
- Variations would be trivial (just color/text changes)
- User specifically asks for one approach
- Building internal logic or utilities (not UI components)
- Creating forms with validation (unless specifically asked for multiple form layouts)

## Error Prevention

**Common mistakes to avoid:**
- Forgetting to import the components
- Using non-unique `id` props across different IterationDecks
- Creating slides with identical implementations
- Not providing meaningful `label` props
- Wrapping non-UI content (data fetching, business logic, etc.)

## Framework-Specific Notes

### React
- Use the React wrapper components from `@iteration-deck/core/react`
- All standard React patterns apply (hooks, state, props, etc.)
- Children can be any valid React nodes

### Other Frameworks
- Import the web components: `import '@iteration-deck/core'`
- Use the web component tags: `<iteration-deck>` and `<iteration-deck-slide>`
- Pass props as HTML attributes

## Example Revised Prompts

Instead of the user saying:
> "Create 3 button styles for our landing page"

You should interpret this as:
> "I need to create multiple button style variations using iteration-deck to compare different approaches for the landing page CTA"

And implement accordingly with IterationDeck wrapping the variations.