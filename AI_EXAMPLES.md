# AI Agent Code Examples

Complete, working examples for AI agents. Copy these patterns when users request UI variations.

📖 **For imports, API reference, and framework setup, see README.md**

### Example 1: Button Component Variations

**User Request:** "Create different button styles for our app"

**AI Implementation:**
```tsx
import { IterationDeck, IterationDeckSlide } from 'iteration-deck';

function ButtonVariations() {
  return (
    <IterationDeck 
      id="app-buttons" 
      label="App Button Styles"
      prompt="Create different button styles for our app"
    >
      <IterationDeckSlide 
        label="Primary" 
        aiPrompt="Main call-to-action style"
        confidence={0.95}
      >
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
          aria-label="Primary action button"
        >
          Click Me
        </button>
      </IterationDeckSlide>
      
      <IterationDeckSlide 
        label="Secondary" 
        aiPrompt="Supporting action style"
        confidence={0.92}
      >
        <button 
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
          aria-label="Secondary action button"
        >
          Click Me
        </button>
      </IterationDeckSlide>
      
      <IterationDeckSlide 
        label="Outline" 
        aiPrompt="Subtle, outline-only style"
        confidence={0.88}
        notes="Good for secondary actions that need less visual weight"
      >
        <button 
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded transition-all duration-200"
          aria-label="Outline style button"
        >
          Click Me
        </button>
      </IterationDeckSlide>
    </IterationDeck>
  );
}
```

### Example 2: Layout Variations  

**User Request:** "Show me different hero section layouts"

**AI Implementation:**
```tsx
import { IterationDeck, IterationDeckSlide } from 'iteration-deck';

function HeroLayoutVariations() {
  return (
    <IterationDeck 
      id="hero-layouts" 
      label="Hero Section Layouts"
      prompt="Show me different hero section layouts"
    >
      <IterationDeckSlide 
        label="Centered" 
        aiPrompt="Center-aligned single column layout"
      >
        <div className="bg-gray-50 py-20">
          <div className="text-center max-w-2xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Our Platform
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Transform your workflow with our innovative solution designed for modern teams.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">
              Get Started
            </button>
          </div>
        </div>
      </IterationDeckSlide>
      
      <IterationDeckSlide 
        label="Split" 
        aiPrompt="Two-column layout with content and visual"
      >
        <div className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Welcome to Our Platform
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Transform your workflow with our innovative solution designed for modern teams.
                </p>
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">
                  Get Started
                </button>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-8 h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600">Hero Visual</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </IterationDeckSlide>
      
      <IterationDeckSlide 
        label="Minimal" 
        aiPrompt="Clean, minimal design with subtle styling"
      >
        <div className="bg-white py-24 border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 text-left">
            <h1 className="text-3xl font-light text-gray-900 mb-6">
              Welcome to Our Platform
            </h1>
            <p className="text-lg text-gray-500 mb-8 max-w-2xl">
              Transform your workflow with our innovative solution.
            </p>
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
              Get Started →
            </a>
          </div>
        </div>
      </IterationDeckSlide>
    </IterationDeck>
  );
}
```

### Example 3: Multiple Decks on Same Page

**User Request:** "Design variations for both header and footer components"

**AI Implementation:**
```tsx  
import { IterationDeck, IterationDeckSlide } from 'iteration-deck';

function CompletePageVariations() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Variations */}
      <IterationDeck id="page-headers" label="Page Headers">
        <IterationDeckSlide label="Corporate">
          <header className="bg-blue-900 text-white p-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold">Corporate Brand</h1>
              <nav className="space-x-6">
                <a href="#" className="hover:text-blue-300">About</a>
                <a href="#" className="hover:text-blue-300">Services</a>
                <a href="#" className="hover:text-blue-300">Contact</a>
              </nav>
            </div>
          </header>
        </IterationDeckSlide>
        <IterationDeckSlide label="Modern">
          <header className="bg-white shadow-sm border-b p-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <div className="text-2xl font-light text-gray-800">modern</div>
              <nav className="flex space-x-8">
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">About</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Services</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Contact</a>
              </nav>
            </div>
          </header>
        </IterationDeckSlide>
      </IterationDeck>

      {/* Main content */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Page Content</h2>
          <p className="text-gray-600 mb-4">Header and footer variations can be compared independently using the toolbar.</p>
        </div>
      </main>

      {/* Footer Variations */}
      <IterationDeck id="page-footers" label="Page Footers">
        <IterationDeckSlide label="Detailed">
          <footer className="bg-gray-800 text-white p-8">
            <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold mb-4">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-gray-300">About Us</a></li>
                  <li><a href="#" className="hover:text-gray-300">Careers</a></li>
                  <li><a href="#" className="hover:text-gray-300">Press</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Products</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-gray-300">Features</a></li>
                  <li><a href="#" className="hover:text-gray-300">Pricing</a></li>
                  <li><a href="#" className="hover:text-gray-300">Security</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-gray-300">Privacy</a></li>
                  <li><a href="#" className="hover:text-gray-300">Terms</a></li>
                  <li><a href="#" className="hover:text-gray-300">Cookies</a></li>
                </ul>
              </div>
            </div>
          </footer>
        </IterationDeckSlide>
        <IterationDeckSlide label="Simple">
          <footer className="bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <div className="text-gray-600 text-sm">© 2024 Company Name</div>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-600 hover:text-gray-900">Privacy</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Terms</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
              </div>
            </div>
          </footer>
        </IterationDeckSlide>
      </IterationDeck>
    </div>
  );
}
```

### Example 4: Adding Variations to Existing Deck

**User Request:** "Add a ghost style and disabled state to the existing button variations"

**AI Implementation:**
```tsx
import { IterationDeck, IterationDeckSlide } from 'iteration-deck';

function ButtonVariations() {
  return (
    <IterationDeck 
      id="app-buttons" 
      label="App Button Styles"
      prompt="Create different button styles for our app"
    >
      {/* Existing variations preserved unchanged */}
      <IterationDeckSlide 
        label="Primary" 
        aiPrompt="Main call-to-action style"
        confidence={0.95}
      >
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
          aria-label="Primary action button"
        >
          Click Me
        </button>
      </IterationDeckSlide>
      
      <IterationDeckSlide 
        label="Secondary" 
        aiPrompt="Supporting action style"
        confidence={0.92}
      >
        <button 
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
          aria-label="Secondary action button"
        >
          Click Me
        </button>
      </IterationDeckSlide>
      
      <IterationDeckSlide 
        label="Outline" 
        aiPrompt="Subtle, outline-only style"
        confidence={0.88}
        notes="Good for secondary actions that need less visual weight"
      >
        <button 
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded transition-all duration-200"
          aria-label="Outline style button"
        >
          Click Me
        </button>
      </IterationDeckSlide>

      {/* New variations added to existing deck */}
      <IterationDeckSlide 
        label="Ghost" 
        aiPrompt="Minimal text-only style for subtle interactions"
        confidence={0.91}
        notes="Added per user request for ghost style"
      >
        <button 
          className="text-blue-600 hover:text-blue-800 font-semibold py-2 px-4 hover:bg-blue-50 rounded transition-colors duration-200"
          aria-label="Ghost style button"
        >
          Click Me
        </button>
      </IterationDeckSlide>
      
      <IterationDeckSlide 
        label="Disabled" 
        aiPrompt="Disabled state showing non-interactive appearance"
        confidence={0.89}
        notes="Added per user request for disabled state"
      >
        <button 
          className="bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded cursor-not-allowed opacity-60"
          aria-label="Disabled button"
          disabled
        >
          Click Me
        </button>
      </IterationDeckSlide>
    </IterationDeck>
  );
}
```

## Key Principles

1. **Always use meaningful variations** - Each slide should offer a genuinely different approach
2. **Include realistic content** - Use actual text, images, and interactive elements  
3. **Make it accessible** - Include proper ARIA labels, semantic HTML, and keyboard navigation
4. **Use descriptive labels** - Make slide labels clear ("Primary Button" not "Button 1")
5. **Add AI context** - Use `aiPrompt` and `notes` props to document reasoning
6. **Keep it functional** - All variations should be fully working implementations
7. **Preserve existing variations** - When adding to decks, never modify or remove existing slides