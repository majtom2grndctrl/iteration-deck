# Iteration Deck Examples

This directory contains comprehensive examples showing how to integrate Iteration Deck components across different frameworks and use cases.

## 📁 Directory Structure

```
examples/
├── README.md                    # This file
├── vanilla/                     # Pure HTML/JavaScript examples
├── react/                      # React framework examples
├── vue/                        # Vue framework examples
├── angular/                    # Angular framework examples
├── typescript/                 # TypeScript usage examples
├── styling/                    # CSS styling and theming examples
└── use-cases/                  # Real-world scenarios and AI workflows
```

## 🚀 Quick Start

### Installation
```bash
pnpm add iteration-deck
```

### Basic Setup (Any Framework)
```typescript
import { defineCustomElements } from 'iteration-deck/loader';
defineCustomElements();
```

## 📖 Example Categories

### 1. **Basic Usage** (`/vanilla/basic-usage.html`)
- Simple component integration
- Multi-deck scenarios
- Keyboard shortcuts demonstration

### 2. **Framework Integration**
- **React** (`/react/`) - JSX components, hooks, TypeScript
- **Vue** (`/vue/`) - Vue 3 composition API, TypeScript
- **Angular** (`/angular/`) - Angular components, services, TypeScript

### 3. **AI-First Workflows** (`/use-cases/`)
- Design iteration scenarios
- AI prompt tracking
- Confidence scoring
- Stakeholder presentation modes

### 4. **Advanced Features**
- Multi-deck page layouts
- Custom styling and theming
- Environment detection (dev vs production)
- TypeScript integration

## 🎯 Target Users

**Designers and Product Managers** working with AI coding agents to:
- Compare live, interactive prototypes
- Iterate on AI-generated UI variations
- Present design alternatives to stakeholders
- Track AI prompt context and confidence scores

## 🔗 Related Documentation

- [Technical Specification](../.claude/TECHNICAL_SPEC.md)
- [Project Overview](../CLAUDE.md)
- [Component API Documentation](../src/components/)

## 💡 Philosophy

> "Where are the designer tools for the AI era?"

Iteration Deck provides the "duplicate frame" equivalent for AI-generated code variations, enabling direct comparison of interactive prototypes in product context.