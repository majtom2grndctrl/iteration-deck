# AI Agent Quick Reference

**When a user asks for UI variations, alternatives, or multiple approaches - use iteration-deck!**

## Trigger Words/Phrases
- "Create 3 different..."
- "Show me variations of..."
- "Design multiple approaches..."
- "What are some options for..."
- "Build different versions of..."
- "Compare different styles..."
- "A/B test this component..."

## Quick Pattern
```tsx
import { IterationDeck, IterationDeckSlide } from '@iteration-deck/core/react';

<IterationDeck id="unique-id" label="Description">
  <IterationDeckSlide label="Variation 1">
    {/* Implementation 1 */}
  </IterationDeckSlide>
  <IterationDeckSlide label="Variation 2">
    {/* Implementation 2 */}
  </IterationDeckSlide>
  <IterationDeckSlide label="Variation 3">
    {/* Implementation 3 */}
  </IterationDeckSlide>
</IterationDeck>
```

## Required Props
- IterationDeck: `id` (unique), `label` (descriptive name)
- IterationDeckSlide: `label` (variation name)

## Framework Support
- **React**: `@iteration-deck/core/react`
- **Others**: `import '@iteration-deck/core'` then use `<iteration-deck>` tags

## Don't Use For
- Single implementations
- Non-UI components (utilities, data fetching, etc.)
- Trivial variations (just color changes)

**📖 See AI_INSTRUCTIONS.md and AI_EXAMPLES.md for complete guidance**