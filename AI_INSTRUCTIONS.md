# AI Coding Agent Instructions

**When users ask for UI variations, alternatives, or multiple approaches - automatically use iteration-deck!**

## ⚡ Quick Start Workflow

**BEFORE implementing any IterationDeck:**
Always create a git worktree so iteration exploration and selection stay isolated from the main branch.

### Option 1: Using the CLI (Recommended)

```bash
# 1. Create worktree for iterations
npx iteration-deck worktree:create [name]
cd ../iteration-deck-[name]

# 2. Implement IterationDeck with variations here
# [your code work happens in worktree]

# 3. After designer chooses a variation:
cd [original-directory]
# Copy chosen variation content (without wrapper) to original branch

# 4. Cleanup
npx iteration-deck worktree:cleanup [name]
```

### Option 2: Using Git Commands Manually

```bash
# 1. Create worktree for iterations
git worktree add ../iteration-deck-[name] -b iterations/[name]
cd ../iteration-deck-[name]

# 2. Implement IterationDeck with variations here
# [your code work happens in worktree]

# 3. After designer chooses a variation:
cd [original-directory]
# Copy chosen variation content (without wrapper) to original branch

# 4. Cleanup
git worktree remove ../iteration-deck-[name]
git branch -D iterations/[name]
```

**The CLI handles state tracking and provides helpful feedback. See "Git Worktree Workflow for Iterations" section below for complete details.**

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

## Git Worktree Workflow for Iterations

**CRITICAL: Before creating any IterationDeck, set up a git worktree for exploration:**

### 1. Creating the Iteration Worktree

When a user requests UI variations, **before implementing any code:**

**Using the CLI (Recommended):**
```bash
# Create a worktree for iteration exploration
npx iteration-deck worktree:create [component-name]

# Move to the worktree
cd ../iteration-deck-[component-name]
```

**Or using git commands directly:**
```bash
# Create a worktree for iteration exploration
git worktree add ../iteration-deck-[component-name] -b iterations/[component-name]

# Move to the worktree
cd ../iteration-deck-[component-name]
```

**Example:**
```bash
# User asks: "Create button variations"
npx iteration-deck worktree:create buttons
cd ../iteration-deck-buttons
# Now implement the IterationDeck with button variations
```

### 2. Working in the Iteration Worktree

- All IterationDeck implementation happens in the worktree
- Commit each variation as you build it (optional but recommended)
- Designer can preview and test all variations live
- Worktree remains active as long as IterationDeck exists in the code

### 3. Bringing Back the Chosen Variation

When designer selects their preferred variation:

```bash
# Return to original branch
cd [original-working-directory]

# Create a patch of just the chosen variation (without IterationDeck wrapper)
# or manually copy the selected implementation

# Cherry-pick specific commits if you committed variations separately
git cherry-pick [commit-hash-of-chosen-variation]

# OR manually integrate the chosen code
```

### 4. Cleanup After Selection

**Using the CLI (Recommended):**
```bash
# Remove the worktree when done (handles branch deletion too)
npx iteration-deck worktree:cleanup [component-name]
```

**Or using git commands directly:**
```bash
# Remove the worktree when done
git worktree remove ../iteration-deck-[component-name]

# Delete the iteration branch
git branch -D iterations/[component-name]
```

### Complete Workflow Example

**Using the CLI:**
```bash
# User: "Create 3 different hero section layouts"

# Step 1: Create worktree
npx iteration-deck worktree:create hero-layouts
cd ../iteration-deck-hero-layouts

# Step 2: Implement IterationDeck with variations
# [Create React component with IterationDeck wrapper]

# Step 3: Designer reviews, chooses "Split Layout"
# Return to main branch
cd [original-directory]

# Step 4: Extract chosen variation (without IterationDeck)
# Copy the selected slide's content to the main branch

# Step 5: Clean up
npx iteration-deck worktree:cleanup hero-layouts
```

**Or using git commands:**
```bash
# User: "Create 3 different hero section layouts"

# Step 1: Create worktree
git worktree add ../iteration-deck-hero -b iterations/hero-layouts
cd ../iteration-deck-hero

# Step 2: Implement IterationDeck with variations
# [Create React component with IterationDeck wrapper]

# Step 3: Designer reviews, chooses "Split Layout"
# Return to main branch
cd [original-directory]

# Step 4: Extract chosen variation (without IterationDeck)
# Copy the selected slide's content to the main branch

# Step 5: Clean up
git worktree remove ../iteration-deck-hero
git branch -D iterations/hero-layouts
```

### Benefits of Worktree Approach

- **Isolated exploration**: Iterations don't pollute main branch history
- **Easy comparison**: All variations exist simultaneously in worktree
- **Clean integration**: Only chosen variation merges back
- **No IterationDeck in production**: Wrapper stays in worktree, only final code comes back
- **Temporary by design**: Worktree lifecycle matches IterationDeck lifecycle

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

### Complete Selection & Integration Workflow

1. **Switch back to original branch**
   ```bash
   cd [original-working-directory]
   git checkout [original-branch]
   ```

2. **Extract and integrate only the selected variation**
   - Copy the chosen IterationDeckSlide content (WITHOUT the wrapper)
   - Paste into the appropriate file in the original branch
   - Remove all IterationDeck wrapper code
   - Clean up development-specific props (`aiPrompt`, `confidence`, `notes`)
   - Preserve all functionality of the selected variation

3. **Remove unused imports** if no other iteration-decks remain on the page

4. **Clean up the worktree**

   Using the CLI:
   ```bash
   npx iteration-deck worktree:cleanup [component-name]
   ```

   Or using git commands:
   ```bash
   # Remove the iteration worktree
   git worktree remove ../iteration-deck-[component-name]

   # Delete the iteration branch
   git branch -D iterations/[component-name]
   ```

5. **Commit the final implementation**
   ```bash
   git add [modified-files]
   git commit -m "Add [component-name] using [variation-label] design"
   ```

### Example Complete Workflow

**Using the CLI:**
```bash
# Designer says: "I like the Gradient button"

# Step 1: Return to original branch
cd /Users/you/project
git checkout main

# Step 2: Copy the Gradient variation content to your file
# (Extract only the button code, not the IterationDeck wrapper)

# Step 3: Remove worktree
npx iteration-deck worktree:cleanup buttons

# Step 4: Commit
git add src/components/Button.tsx
git commit -m "Add CTA button using gradient design"
```

**Or using git commands:**
```bash
# Designer says: "I like the Gradient button"

# Step 1: Return to original branch
cd /Users/you/project
git checkout main

# Step 2: Copy the Gradient variation content to your file
# (Extract only the button code, not the IterationDeck wrapper)

# Step 3: Remove worktree
git worktree remove ../iteration-deck-buttons
git branch -D iterations/buttons

# Step 4: Commit
git add src/components/Button.tsx
git commit -m "Add CTA button using gradient design"
```

### Code Cleanup Example
```tsx
// In worktree (what you created initially):
<IterationDeck id="cta-buttons" label="CTA Button Styles">
  <IterationDeckSlide label="Primary">
    <Button className="bg-blue-600 text-white px-6 py-3">Get Started</Button>
  </IterationDeckSlide>
  <IterationDeckSlide label="Gradient">
    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3">Get Started</Button>
  </IterationDeckSlide>
</IterationDeck>

// In original branch (after designer chose "Gradient"):
<Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3">
  Get Started
</Button>
```

**This workflow ensures:**
- ✅ Clean production code without IterationDeck wrappers
- ✅ No iteration history in main branch
- ✅ Isolated exploration in temporary worktree
- ✅ Only chosen design makes it to production
