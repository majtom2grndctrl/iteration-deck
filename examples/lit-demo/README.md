# Lit Web Components Demo

This demo shows the Iteration Deck web components in action using vanilla HTML and CSS.

## Features Demonstrated

- **Three Interactive Decks**: User preferences form, budget dashboard, and contacts list
- **Multiple Variations**: Each deck contains 3-4 different design approaches
- **Global Toolbar**: Single toolbar managing all decks with keyboard shortcuts
- **AI Metadata**: Prompts, confidence scores, and designer notes
- **Responsive Design**: Mobile-first approach with desktop enhancements

## Running the Demo

From the project root:

```bash
# Install dependencies (if not already done)
pnpm install

# Start the Lit demo development server
pnpm dev:lit
```

Then open http://localhost:5173 in your browser.

## Usage

- **Toolbar Navigation**: Use the dropdown to switch between different decks
- **Keyboard Shortcuts**: Ctrl/Cmd + Alt + [ or ] to navigate slides in the active deck
- **Live Switching**: Compare variations in real-time without page refreshes
- **Multi-Deck Support**: All decks work simultaneously with shared state

## Development Mode vs Production

In development mode (what you see here):
- All variations are available
- Global toolbar is visible
- AI metadata is shown
- Full navigation features enabled

In production mode:
- Only the first variation of each deck renders
- No toolbar or development UI
- Clean deployment without debug features

## Web Components Import

This demo uses the web components directly from source:

```html
<script type="module" src="../../src/wc/index.ts"></script>
```

For published packages, you would use:

```html
<script type="module">
  import 'iteration-deck/wc';
</script>
```