# AI Coding Agent Instructions

**When users ask for UI variations, alternatives, or multiple approaches - automatically use iteration-deck!**

## When to Use Iteration Deck

**Automatically use iteration-deck components when:**
- User requests "multiple versions," "variations," "alternatives," or "options" of UI components
- User asks to "compare different approaches" or "try different styles"
- User mentions "A/B testing," "prototyping," or "design exploration"
- User wants to see "different layouts," "styling options," or "design patterns"
- Any request that implies creating multiple implementations of similar functionality

**Trigger phrases that should prompt iteration-deck usage:**
- "Create 3 different..." / "Show me variations of..." / "Design multiple approaches for..."
- "Build different versions of..." / "Generate alternatives for..." / "Compare different styles of..."
- "What are some options for..." / "A/B test this component..." / "Try different layouts..."

**Trigger phrases for adding to existing iteration decks:**
- "Add another variation to..." / "Create one more version of..." / "Add a [style] variation to the existing deck..."
- "Can you make another [component] for the deck?" / "Add [description] to the button variations..."
- "I need one more option in the [deck name]..." / "Include a [style] version in the existing iterations..."

## Imports and Setup

**📖 See README.md for complete import examples, API reference, and framework integration guides.**

**Quick Reference:**
- **React**: `import { IterationDeck, IterationDeckSlide } from 'iteration-deck';`
- **Other frameworks**: `import 'iteration-deck/wc';` then use `<iteration-deck>` elements
- **Framework detection**: Look for React imports, .tsx/.jsx files, or JSX syntax

## Basic Implementation Pattern

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

📖 **For complete examples and API reference, see README.md and AI_EXAMPLES.md**

## Implementation Rules

1. **Always create actual working implementations** - Don't use placeholder comments or empty divs
2. **Make meaningful variations** - Each slide should offer a genuinely different approach, not just color changes
3. **Include proper accessibility** - All variations should be accessible with proper ARIA labels, keyboard navigation, etc.
4. **Use semantic HTML** - Maintain good HTML structure across all variations
5. **Make variations realistic** - Each should be production-ready, not just proof-of-concept
6. **Keep consistent functionality** - All variations should have the same core behavior, just different presentation

## Adding New Variations to Existing Decks

**When users request additional variations for existing iteration decks:**

1. **Preserve existing structure** - Keep the same IterationDeck wrapper with identical `id` and `label` props
2. **Keep all existing slides** - Never remove or modify existing IterationDeckSlide components
3. **Add new slides at the end** - Append new IterationDeckSlide components after existing ones
4. **Use distinctive labels** - Give new variations clear, descriptive labels that differentiate them
5. **Include AI context** - Add `aiPrompt` and optional `confidence`/`notes` props for new variations
6. **Maintain consistency** - New variations should follow the same component patterns and styling approach

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

## Interpreting User Requests

Instead of the user saying:
> "Create 3 button styles for our landing page"

You should interpret this as:
> "I need to create multiple button style variations using iteration-deck to compare different approaches for the landing page CTA"

And implement accordingly with IterationDeck wrapping the variations.

### Adding to Existing Decks

When the user says:
> "Add a loading state version to the button deck"

You should interpret this as:
> "I need to add a new IterationDeckSlide to the existing button IterationDeck, preserving all current slides and adding the loading state as a new variation"

**Example implementation pattern:**
```tsx
// Find the existing deck and add new slides while preserving existing ones
<IterationDeck id="existing-deck-id" label="Existing Label">
  {/* Keep all existing slides unchanged */}
  <IterationDeckSlide label="Existing Slide 1">...</IterationDeckSlide>
  <IterationDeckSlide label="Existing Slide 2">...</IterationDeckSlide>
  
  {/* Add new slide */}
  <IterationDeckSlide label="New Variation" aiPrompt="Description of new design">
    {/* New implementation */}
  </IterationDeckSlide>
</IterationDeck>
```

## After Designer Selection - Critical Workflow Step

**When a designer indicates they've chosen a variation (e.g., "I like the second option", "Use the gradient version", "Go with the minimal design"):**

1. **Remove the IterationDeck wrapper** completely
2. **Extract only the selected IterationDeckSlide content** 
3. **Clean up development-specific props** (remove `aiPrompt`, `confidence`, `notes`)
4. **Preserve all functionality** of the selected variation
5. **Remove unused imports** if no other iteration-decks remain on the page
6. **Ask for confirmation** before making the cleanup changes

### Example Cleanup Process
```tsx
// Before cleanup (what you created initially):
<IterationDeck id="cta-buttons" label="CTA Button Styles">
  <IterationDeckSlide label="Primary">
    <Button className="bg-blue-600 text-white px-6 py-3">Get Started</Button>
  </IterationDeckSlide>
  <IterationDeckSlide label="Gradient">
    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3">Get Started</Button>
  </IterationDeckSlide>
</IterationDeck>

// After cleanup (designer chose "Gradient"):
<Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3">
  Get Started
</Button>
```

**This cleanup step is essential** - it converts the development/prototyping tool back into clean production code.