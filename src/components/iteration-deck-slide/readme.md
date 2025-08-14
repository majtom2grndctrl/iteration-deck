# iteration-deck-slide

Individual slide/variation wrapper component that contains a specific UI variation within an `iteration-deck`. Each slide represents one design iteration or AI-generated variation.

## Core Features

- **Slot-based content**: Accepts any HTML content as the slide variation
- **AI metadata support**: Tracks confidence scores, prompts, and design notes
- **Environment-aware rendering**: Only first slide renders in production mode
- **Active state management**: Automatically shows/hides based on parent deck state
- **Visual indicators**: Displays confidence scores and notes in development mode
- **Accessibility**: Proper ARIA labeling and keyboard navigation support

## Basic Usage

```html
<iteration-deck deck-id="example">
  <iteration-deck-slide label="Version 1">
    <div class="my-component-v1">
      <!-- Your component HTML here -->
    </div>
  </iteration-deck-slide>
  
  <iteration-deck-slide label="Version 2">
    <div class="my-component-v2">
      <!-- Alternative variation here -->
    </div>
  </iteration-deck-slide>
</iteration-deck>
```

## AI-Enhanced Usage

```html
<iteration-deck deck-id="ai-variations">
  <!-- High confidence variation -->
  <iteration-deck-slide 
    label="Recommended Design" 
    ai-prompt="Create a modern, accessible button"
    confidence="0.95"
    notes="AI recommended this as the most accessible option">
    <button class="btn-modern">Click Me</button>
  </iteration-deck-slide>
  
  <!-- Experimental variation -->
  <iteration-deck-slide 
    label="Experimental" 
    ai-prompt="Try something more creative and bold"
    confidence="0.78"
    notes="Needs user testing before implementation">
    <button class="btn-experimental">Click Me</button>
  </iteration-deck-slide>
</iteration-deck>
```

## Framework Integration

### React Components
```typescript
<iteration-deck deck-id="react-example">
  <iteration-deck-slide label="Material Design">
    <MaterialButton variant="contained">Save</MaterialButton>
  </iteration-deck-slide>
  
  <iteration-deck-slide label="Custom Design">
    <CustomButton theme="primary">Save</CustomButton>
  </iteration-deck-slide>
</iteration-deck>
```

### Vue Components
```vue
<iteration-deck deck-id="vue-example">
  <iteration-deck-slide label="Standard">
    <VButton type="primary">Save</VButton>
  </iteration-deck-slide>
  
  <iteration-deck-slide label="Compact">
    <VButton type="primary" size="small">Save</VButton>
  </iteration-deck-slide>
</iteration-deck>
```

## AI Metadata Features

### Confidence Scoring
The `confidence` prop accepts values from 0 to 1 representing AI generation confidence:

- **0.9-1.0**: High confidence, production-ready
- **0.7-0.89**: Good confidence, may need minor tweaks
- **0.5-0.69**: Medium confidence, requires review
- **0-0.49**: Low confidence, experimental only

```html
<iteration-deck-slide 
  label="High Confidence Design"
  confidence="0.92">
  <!-- Content here -->
</iteration-deck-slide>
```

### Design Notes
Use the `notes` prop to capture design rationale, user feedback, or implementation notes:

```html
<iteration-deck-slide 
  label="Designer Feedback Version"
  notes="Updated based on user testing feedback - increased contrast ratio">
  <!-- Content here -->
</iteration-deck-slide>
```

### AI Prompt Tracking
The `ai-prompt` prop stores the specific prompt used to generate this variation:

```html
<iteration-deck-slide 
  label="AI Generated Button"
  ai-prompt="Create a button that follows Material Design 3 principles">
  <!-- Content here -->
</iteration-deck-slide>
```

## Environment Behavior

### Development Mode
- **Active slide visible**: Only the currently active slide is displayed
- **Metadata overlay**: Shows confidence scores and notes icons
- **Smooth transitions**: Opacity transitions between slides
- **Interactive indicators**: Click notes icon to see full design notes

### Production Mode
- **First slide only**: Only the first slide in each deck renders
- **No metadata**: All development indicators hidden
- **Clean rendering**: Acts like a regular HTML container

## Visual States

### Active State
- **Visible**: `display: block` and `opacity: 1`
- **Interactive**: Responds to clicks and interactions normally

### Inactive State
- **Hidden**: `display: none` and `opacity: 0`
- **Non-interactive**: Does not respond to interactions

### Metadata Display
- **Confidence badge**: Green percentage indicator (top-right)
- **Notes icon**: Blue emoji button (top-left) with tooltip
- **Only in development**: All metadata hidden in production

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute    | Description                                                | Type                  | Default     |
| -------------------- | ------------ | ---------------------------------------------------------- | --------------------- | ----------- |
| `aiPrompt`           | `ai-prompt`  | Optional AI prompt refinements for this specific variation | `string \| undefined` | `undefined` |
| `confidence`         | `confidence` | AI generation confidence score (0-1, dev mode only)        | `number \| undefined` | `undefined` |
| `label` _(required)_ | `label`      | Label for this slide/variation                             | `string`              | `undefined` |
| `notes`              | `notes`      | Design rationale, AI feedback, or iteration insights       | `string \| undefined` | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
