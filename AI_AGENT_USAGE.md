# AI Agent Usage Guide for Iteration Deck

This guide provides specific instructions for AI coding agents on how to effectively use the Iteration Deck library.

## 🎯 **When to Use Iteration Deck**

Use this library when:
- Creating multiple UI variations for comparison
- Prototyping different design approaches  
- Generating A/B test variants
- Building component variations for design systems
- Creating responsive design alternatives
- Testing different interaction patterns

## 🔧 **Basic Implementation Pattern**

Always follow this pattern when implementing Iteration Deck:

```tsx
import { IterationDeck, IterationDeckSlide } from 'iteration-deck'

// Step 1: Identify the component variations
// Step 2: Wrap them in IterationDeck with descriptive ID
// Step 3: Each variation goes in an IterationDeckSlide

<IterationDeck id="component-name-variations" label="Human Readable Label">
  <IterationDeckSlide label="Variation 1 Name">
    <YourComponent variant="option1" />
  </IterationDeckSlide>
  <IterationDeckSlide label="Variation 2 Name">
    <YourComponent variant="option2" />
  </IterationDeckSlide>
  <IterationDeckSlide label="Variation 3 Name">
    <YourComponent variant="option3" />
  </IterationDeckSlide>
</IterationDeck>
```

## 📋 **Common Use Cases with Examples**

### 1. Button Variations
```tsx
<IterationDeck id="cta-buttons" label="Call to Action Buttons">
  <IterationDeckSlide label="Primary">
    <Button variant="primary" size="large">Get Started</Button>
  </IterationDeckSlide>
  <IterationDeckSlide label="Secondary">
    <Button variant="secondary" size="large">Get Started</Button>
  </IterationDeckSlide>
  <IterationDeckSlide label="Outline">
    <Button variant="outline" size="large">Get Started</Button>
  </IterationDeckSlide>
</IterationDeck>
```

### 2. Layout Variations
```tsx
<IterationDeck id="hero-layouts" label="Hero Section Layouts">
  <IterationDeckSlide label="Centered">
    <div className="text-center">
      <h1>Centered Hero</h1>
      <p>Description here</p>
      <Button>CTA</Button>
    </div>
  </IterationDeckSlide>
  <IterationDeckSlide label="Split">
    <div className="grid grid-cols-2 gap-8">
      <div>
        <h1>Split Hero</h1>
        <p>Description</p>
        <Button>CTA</Button>
      </div>
      <div>
        <img src="hero.jpg" alt="Hero" />
      </div>
    </div>
  </IterationDeckSlide>
</IterationDeck>
```

### 3. Component State Variations
```tsx
<IterationDeck id="form-states" label="Form States">
  <IterationDeckSlide label="Default">
    <FormComponent />
  </IterationDeckSlide>
  <IterationDeckSlide label="Loading">
    <FormComponent loading={true} />
  </IterationDeckSlide>
  <IterationDeckSlide label="Error">
    <FormComponent error="Something went wrong" />
  </IterationDeckSlide>
  <IterationDeckSlide label="Success">
    <FormComponent success={true} />
  </IterationDeckSlide>
</IterationDeck>
```

### 4. Responsive Design Variations
```tsx
<IterationDeck id="card-responsive" label="Card Responsive Layouts">
  <IterationDeckSlide label="Mobile Stack">
    <div className="w-80">
      <Card layout="stack" />
    </div>
  </IterationDeckSlide>
  <IterationDeckSlide label="Tablet Grid">
    <div className="w-96">
      <Card layout="grid" />
    </div>
  </IterationDeckSlide>
  <IterationDeckSlide label="Desktop Horizontal">
    <div className="w-full">
      <Card layout="horizontal" />
    </div>
  </IterationDeckSlide>
</IterationDeck>
```

## 🎨 **AI Prompt Tracking Pattern**

When creating variations from AI prompts, include metadata:

```tsx
<IterationDeck 
  id="ai-generated-cards" 
  label="AI Generated Card Variations"
  prompt="Create 3 modern card designs for a SaaS product"
>
  <IterationDeckSlide 
    label="Minimalist"
    aiPrompt="Clean, minimal design with lots of whitespace"
    confidence={0.92}
  >
    <MinimalCard />
  </IterationDeckSlide>
  <IterationDeckSlide 
    label="Bold"
    aiPrompt="Bold colors and strong visual hierarchy"
    confidence={0.88}
    notes="High contrast for accessibility"
  >
    <BoldCard />
  </IterationDeckSlide>
  <IterationDeckSlide 
    label="Gradient"
    aiPrompt="Modern gradient background with subtle shadows"
    confidence={0.85}
    notes="Designer preferred this option"
  >
    <GradientCard />
  </IterationDeckSlide>
</IterationDeck>
```

## 🔑 **Naming Conventions**

### IDs should be:
- Descriptive: `button-variations`, `hero-layouts`, `form-states`
- Kebab-case: Use hyphens, not spaces or camelCase
- Unique: Each deck needs a unique ID on the page

### Labels should be:
- Human-readable: "Call to Action Buttons", "Hero Section Layouts"
- Descriptive: Help developers understand what's being compared

### Slide Labels should be:
- Concise: "Primary", "Secondary", "Large", "Mobile"
- Descriptive: "Centered Layout", "Split View", "Loading State"

## 🚀 **Performance Best Practices**

1. **Keep variations lightweight**: Don't put heavy components in multiple slides
2. **Use meaningful IDs**: They help with debugging and state management
3. **Limit slides per deck**: 2-6 slides work best for comparison
4. **Group related variations**: Don't mix buttons and layouts in one deck

## ⚡ **Integration Patterns**

### With Design Systems
```tsx
// Compare design system component variants
<IterationDeck id="button-sizes" label="Button Size Variations">
  <IterationDeckSlide label="Small">
    <Button size="sm">Small Button</Button>
  </IterationDeckSlide>
  <IterationDeckSlide label="Medium">
    <Button size="md">Medium Button</Button>
  </IterationDeckSlide>
  <IterationDeckSlide label="Large">
    <Button size="lg">Large Button</Button>
  </IterationDeckSlide>
</IterationDeck>
```

### With State Management
```tsx
// Compare different data states
<IterationDeck id="data-states" label="Data Loading States">
  <IterationDeckSlide label="Loading">
    <ProductList loading={true} />
  </IterationDeckSlide>
  <IterationDeckSlide label="Loaded">
    <ProductList data={mockData} />
  </IterationDeckSlide>
  <IterationDeckSlide label="Empty">
    <ProductList data={[]} />
  </IterationDeckSlide>
</IterationDeck>
```

### With Multiple Decks
```tsx
// Multiple decks on one page for comprehensive comparison
function DesignSystemDemo() {
  return (
    <div>
      <section>
        <h2>Buttons</h2>
        <IterationDeck id="buttons" label="Button Variants">
          <IterationDeckSlide label="Primary"><Button variant="primary">Click</Button></IterationDeckSlide>
          <IterationDeckSlide label="Secondary"><Button variant="secondary">Click</Button></IterationDeckSlide>
        </IterationDeck>
      </section>

      <section>
        <h2>Cards</h2>
        <IterationDeck id="cards" label="Card Layouts">
          <IterationDeckSlide label="Standard"><Card layout="standard" /></IterationDeckSlide>
          <IterationDeckSlide label="Compact"><Card layout="compact" /></IterationDeckSlide>
        </IterationDeck>
      </section>
    </div>
  )
}
```

## 🛠️ **Development vs Production Behavior**

- **Development**: Shows all variations with interactive toolbar
- **Production**: Automatically renders only the first slide
- **Zero Config**: No build configuration needed, works automatically

## ❌ **Common Mistakes to Avoid**

1. **Don't** put different component types in one deck
2. **Don't** use spaces in IDs (use `button-variations` not `button variations`)
3. **Don't** forget to add labels - they show in the toolbar
4. **Don't** nest IterationDecks inside each other
5. **Don't** use for components that change frequently - better for stable variations

## ✅ **Quick Checklist for AI Agents**

- [ ] Is this comparing variations of the same component/layout?
- [ ] Does each slide have a descriptive label?
- [ ] Is the deck ID unique and descriptive?
- [ ] Are there 2-6 meaningful variations to compare?
- [ ] Is the deck label human-readable?
- [ ] Would this help designers/developers compare options?

If you answered yes to all questions, IterationDeck is a perfect fit!