# AI Agent Code Examples

Complete, working code examples for AI coding agents to reference when using `@iteration-deck/core`.

## Quick Reference Pattern

```tsx
import { IterationDeck, IterationDeckSlide } from '@iteration-deck/core/react';

<IterationDeck id="unique-id" label="Descriptive Name">
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

## Complete Examples

### Example 1: Button Component Variations

**User Request:** "Create different button styles for our app"

**AI Implementation:**
```tsx
import { IterationDeck, IterationDeckSlide } from '@iteration-deck/core/react';

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

### Example 2: Card Layout Variations

**User Request:** "Design different product card layouts"

**AI Implementation:**
```tsx
import { IterationDeck, IterationDeckSlide } from '@iteration-deck/core/react';

function ProductCardVariations({ product = { name: "Sample Product", price: "$99", image: "/product.jpg", description: "A great product for your needs." } }) {
  return (
    <IterationDeck 
      id="product-cards" 
      label="Product Card Layouts"
      prompt="Design different product card layouts"
    >
      <IterationDeckSlide 
        label="Vertical" 
        aiPrompt="Traditional vertical card with image on top"
      >
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
          <img className="w-full h-48 object-cover" src={product.image} alt={product.name} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{product.name}</div>
            <p className="text-gray-700 text-base">{product.description}</p>
            <div className="text-2xl font-bold text-blue-600 mt-4">{product.price}</div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full">
              Add to Cart
            </button>
          </div>
        </div>
      </IterationDeckSlide>
      
      <IterationDeckSlide 
        label="Horizontal" 
        aiPrompt="Side-by-side layout with image and content"
      >
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-md">
          <img className="w-1/3 object-cover" src={product.image} alt={product.name} />
          <div className="p-4 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{product.description}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xl font-bold text-blue-600">{product.price}</span>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </IterationDeckSlide>
      
      <IterationDeckSlide 
        label="Minimal" 
        aiPrompt="Clean, minimal design with subtle styling"
      >
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow max-w-sm">
          <img className="w-full h-32 object-cover rounded mb-4" src={product.image} alt={product.name} />
          <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
          <p className="text-gray-500 text-sm mb-4">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">{product.price}</span>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              Add to Cart →
            </button>
          </div>
        </div>
      </IterationDeckSlide>
    </IterationDeck>
  );
}
```

### Example 3: Navigation Header Variations

**User Request:** "Build different navigation header styles"

**AI Implementation:**
```tsx
import { IterationDeck, IterationDeckSlide } from '@iteration-deck/core/react';

function NavigationVariations() {
  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <IterationDeck 
      id="navigation-headers" 
      label="Navigation Headers"
      prompt="Build different navigation header styles"
    >
      <IterationDeckSlide 
        label="Traditional" 
        aiPrompt="Classic horizontal navigation bar"
      >
        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-7">
                <div>
                  <a href="#" className="flex items-center py-4 px-2">
                    <span className="font-semibold text-gray-500 text-lg">Logo</span>
                  </a>
                </div>
                <div className="hidden md:flex items-center space-x-1">
                  {navLinks.map((link) => (
                    <a key={link.href} href={link.href} className="py-4 px-2 text-gray-500 hover:text-green-500 transition duration-300">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-3">
                <a href="#" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">
                  Log In
                </a>
                <a href="#" className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">
                  Sign Up
                </a>
              </div>
              <div className="md:hidden flex items-center">
                <button className="outline-none mobile-menu-button">
                  <svg className="w-6 h-6 text-gray-500 hover:text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </IterationDeckSlide>
      
      <IterationDeckSlide 
        label="Centered" 
        aiPrompt="Centered logo with split navigation"
      >
        <nav className="bg-white shadow-md">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-center items-center py-4">
              <div className="hidden md:flex items-center space-x-8">
                {navLinks.slice(0, 2).map((link) => (
                  <a key={link.href} href={link.href} className="text-gray-600 hover:text-blue-600 transition duration-300">
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="mx-8">
                <a href="#" className="text-2xl font-bold text-gray-800">LOGO</a>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                {navLinks.slice(2).map((link) => (
                  <a key={link.href} href={link.href} className="text-gray-600 hover:text-blue-600 transition duration-300">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </IterationDeckSlide>
      
      <IterationDeckSlide 
        label="Minimal" 
        aiPrompt="Clean, minimal design with subtle interactions"
      >
        <nav className="bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center py-6">
              <div>
                <a href="#" className="text-xl font-light text-gray-800">brand</a>
              </div>
              <div className="hidden md:flex items-center space-x-12">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} className="text-sm text-gray-600 hover:text-gray-900 transition duration-200 relative group">
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-gray-900 transition-all duration-200 group-hover:w-full"></span>
                  </a>
                ))}
              </div>
              <div>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition duration-200">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </nav>
      </IterationDeckSlide>
    </IterationDeck>
  );
}
```

### Example 4: Form Layout Variations

**User Request:** "Create different contact form layouts"

**AI Implementation:**
```tsx
import { IterationDeck, IterationDeckSlide } from '@iteration-deck/core/react';

function ContactFormVariations() {
  return (
    <IterationDeck 
      id="contact-forms" 
      label="Contact Form Layouts"
      prompt="Create different contact form layouts"
    >
      <IterationDeckSlide 
        label="Stacked" 
        aiPrompt="Traditional stacked form layout"
      >
        <form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Us</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Your Name" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="your@email.com" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32" id="message" placeholder="Your message..."></textarea>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit">
            Send Message
          </button>
        </form>
      </IterationDeckSlide>
      
      <IterationDeckSlide 
        label="Two Column" 
        aiPrompt="Two-column layout with side-by-side fields"
      >
        <form className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Get In Touch</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                First Name
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" placeholder="John" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" placeholder="Doe" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email2">
                Email
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email2" type="email" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                Phone
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="tel" placeholder="(555) 123-4567" />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message2">
              Message
            </label>
            <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32" id="message2" placeholder="Tell us about your project..."></textarea>
          </div>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline w-full" type="submit">
            Submit
          </button>
        </form>
      </IterationDeckSlide>
      
      <IterationDeckSlide 
        label="Inline" 
        aiPrompt="Compact inline form for quick contact"
      >
        <form className="max-w-4xl mx-auto bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">Quick Contact</h2>
          <div className="flex flex-wrap gap-4 items-end justify-center">
            <div className="flex-1 min-w-48">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nameInline">
                Name
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nameInline" type="text" placeholder="Your Name" />
            </div>
            <div className="flex-1 min-w-48">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emailInline">
                Email
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="emailInline" type="email" placeholder="your@email.com" />
            </div>
            <div className="flex-2 min-w-64">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="messageInline">
                Message
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="messageInline" type="text" placeholder="Quick message..." />
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline" type="submit">
              Send
            </button>
          </div>
        </form>
      </IterationDeckSlide>
    </IterationDeck>
  );
}
```

### Example 5: Multiple Decks on Same Page

**User Request:** "Design variations for both header and footer components"

**AI Implementation:**
```tsx
import { IterationDeck, IterationDeckSlide } from '@iteration-deck/core/react';

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
          <p className="text-gray-600 mb-4">This is the main content area. The header and footer variations can be compared independently using the toolbar.</p>
        </div>
      </main>

      {/* Footer Variations */}
      <IterationDeck id="page-footers" label="Page Footers">
        <IterationDeckSlide label="Detailed">
          <footer className="bg-gray-800 text-white p-8">
            <div className="max-w-6xl mx-auto grid grid-cols-4 gap-8">
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
                <h3 className="font-bold mb-4">Support</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-gray-300">Help Center</a></li>
                  <li><a href="#" className="hover:text-gray-300">Contact</a></li>
                  <li><a href="#" className="hover:text-gray-300">Status</a></li>
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
            <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-sm">
              © 2024 Company Name. All rights reserved.
            </div>
          </footer>
        </IterationDeckSlide>
        <IterationDeckSlide label="Simple">
          <footer className="bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <div className="text-gray-600 text-sm">
                © 2024 Company Name
              </div>
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

## Key Patterns to Remember

1. **Always use meaningful variations** - Each slide should offer a genuinely different approach
2. **Include realistic content** - Use actual text, images, and interactive elements
3. **Make it accessible** - Include proper ARIA labels, semantic HTML, and keyboard navigation
4. **Use descriptive labels** - Make slide labels clear and specific ("Primary Button" not "Button 1")
5. **Add AI context** - Use `aiPrompt` and `notes` props to document the reasoning behind each variation
6. **Keep it functional** - All variations should be fully working implementations, not just mockups

## Framework Adaptations

### Vue.js
```vue
<script setup>
import '@iteration-deck/core';
</script>

<template>
  <iteration-deck id="vue-buttons" label="Vue Button Styles">
    <iteration-deck-slide label="Primary">
      <button class="btn-primary">Click Me</button>
    </iteration-deck-slide>
    <iteration-deck-slide label="Secondary">
      <button class="btn-secondary">Click Me</button>
    </iteration-deck-slide>
  </iteration-deck>
</template>
```

### Angular
```typescript
// component.ts
import '@iteration-deck/core';

@Component({
  template: `
    <iteration-deck id="ng-buttons" label="Angular Button Styles">
      <iteration-deck-slide label="Primary">
        <button class="btn-primary">Click Me</button>
      </iteration-deck-slide>
      <iteration-deck-slide label="Secondary">
        <button class="btn-secondary">Click Me</button>
      </iteration-deck-slide>
    </iteration-deck>
  `
})
export class ButtonVariationsComponent { }
```

### Vanilla HTML
```html
<script type="module">
  import '@iteration-deck/core';
</script>

<iteration-deck id="html-buttons" label="HTML Button Styles">
  <iteration-deck-slide label="Primary">
    <button class="btn-primary">Click Me</button>
  </iteration-deck-slide>
  <iteration-deck-slide label="Secondary">
    <button class="btn-secondary">Click Me</button>
  </iteration-deck-slide>
</iteration-deck>
```