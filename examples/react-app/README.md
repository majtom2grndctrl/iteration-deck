# React Demo Application

This demo showcases the iteration-deck library's React wrapper components.

## Features

- **React Integration**: Full React wrapper components with TypeScript support
- **Real Library Import**: Imports directly from the library source code during development
- **Interactive Examples**: Three complete demo sections showing different UI patterns
- **State Management**: Demonstrates Zustand integration for deck state
- **Event Handling**: Shows custom event handling with React patterns

## Running the Demo

From the library root directory:

```bash
# Install dependencies and run the React demo
pnpm demo:react

# Or manually from this directory:
cd examples/react-app
pnpm install
pnpm dev
```

The demo will open at `http://localhost:3001`

## Demo Sections

1. **User Preferences Form** - Three layout variants (vertical, horizontal, card-based)
2. **Budget Dashboard** - Three information density levels (summary, detailed, visual)
3. **Contacts List** - Three presentation styles (compact, detailed cards, grid)

## Development

The demo imports directly from the library source code (`../../src/react/index.tsx`) during development, so changes to the library are immediately reflected in the demo.

## Building

```bash
pnpm build
```

Builds the demo for production deployment.