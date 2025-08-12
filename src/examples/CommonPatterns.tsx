/**
 * Common patterns for IterationDeck usage
 * AI agents can reference these examples to understand proper usage
 */

import { IterationDeck, IterationDeckSlide, ComponentVariation, AI_PRESETS } from '../index'

// Example: Button variations - most common use case
export function ButtonVariationsExample() {
  return (
    <IterationDeck 
      id={AI_PRESETS.STYLE_VARIATIONS.suggestedId('Button')}
      label={AI_PRESETS.STYLE_VARIATIONS.suggestedLabel('Button')}
      prompt="Create modern button variations for a SaaS application"
    >
      <IterationDeckSlide label="Primary" aiPrompt="Bold primary button for main actions">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700">
          Get Started
        </button>
      </IterationDeckSlide>
      <IterationDeckSlide label="Secondary" aiPrompt="Subtle secondary button">
        <button className="bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-200">
          Learn More
        </button>
      </IterationDeckSlide>
      <IterationDeckSlide label="Outline" aiPrompt="Minimalist outline style">
        <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50">
          Contact Sales
        </button>
      </IterationDeckSlide>
    </IterationDeck>
  )
}

// Example: Card layout variations
export function CardLayoutExample() {
  const cardContent = {
    title: "Product Title",
    description: "This is a description of the product with some details about its features.",
    price: "$99",
    image: "https://via.placeholder.com/300x200"
  }

  return (
    <IterationDeck 
      id={AI_PRESETS.LAYOUT_VARIATIONS.suggestedId('Card')}
      label={AI_PRESETS.LAYOUT_VARIATIONS.suggestedLabel('Card')}
    >
      <IterationDeckSlide label="Vertical" aiPrompt="Standard vertical card layout">
        <div className="max-w-sm bg-white border rounded-lg shadow-md">
          <img src={cardContent.image} alt="" className="w-full h-48 object-cover rounded-t-lg" />
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{cardContent.title}</h3>
            <p className="text-gray-600 mb-4">{cardContent.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-blue-600">{cardContent.price}</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded">Buy Now</button>
            </div>
          </div>
        </div>
      </IterationDeckSlide>
      
      <IterationDeckSlide label="Horizontal" aiPrompt="Space-efficient horizontal layout">
        <div className="max-w-2xl bg-white border rounded-lg shadow-md">
          <div className="flex">
            <img src={cardContent.image} alt="" className="w-48 h-48 object-cover rounded-l-lg" />
            <div className="p-6 flex-1">
              <h3 className="text-xl font-bold mb-2">{cardContent.title}</h3>
              <p className="text-gray-600 mb-4">{cardContent.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">{cardContent.price}</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </IterationDeckSlide>
      
      <IterationDeckSlide label="Compact" aiPrompt="Minimalist compact version">
        <div className="max-w-sm bg-white border rounded-lg shadow-md">
          <div className="p-4">
            <div className="flex items-center space-x-4">
              <img src={cardContent.image} alt="" className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-bold">{cardContent.title}</h3>
                <p className="text-sm text-gray-600">{cardContent.description.slice(0, 50)}...</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-blue-600">{cardContent.price}</span>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Buy</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </IterationDeckSlide>
    </IterationDeck>
  )
}

// Example: Form state variations
export function FormStateExample() {
  return (
    <IterationDeck 
      id={AI_PRESETS.STATE_VARIATIONS.suggestedId('Form')}
      label={AI_PRESETS.STATE_VARIATIONS.suggestedLabel('Contact Form')}
    >
      <IterationDeckSlide label="Default" aiPrompt="Clean default form state">
        <form className="max-w-md bg-white p-6 border rounded-lg">
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <div className="space-y-4">
            <input type="email" placeholder="Your email" className="w-full p-3 border rounded" />
            <textarea placeholder="Your message" rows={4} className="w-full p-3 border rounded" />
            <button className="w-full bg-blue-600 text-white p-3 rounded font-medium">Send Message</button>
          </div>
        </form>
      </IterationDeckSlide>
      
      <IterationDeckSlide label="Loading" aiPrompt="Show loading state during submission">
        <form className="max-w-md bg-white p-6 border rounded-lg opacity-75">
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <div className="space-y-4">
            <input type="email" placeholder="Your email" className="w-full p-3 border rounded" disabled />
            <textarea placeholder="Your message" rows={4} className="w-full p-3 border rounded" disabled />
            <button className="w-full bg-blue-600 text-white p-3 rounded font-medium flex items-center justify-center" disabled>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Sending...
            </button>
          </div>
        </form>
      </IterationDeckSlide>
      
      <IterationDeckSlide label="Success" aiPrompt="Success confirmation state">
        <form className="max-w-md bg-white p-6 border rounded-lg">
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
            <div className="text-green-600 text-2xl mb-2">✓</div>
            <p className="text-green-800 font-medium">Message sent successfully!</p>
            <p className="text-green-600 text-sm">We'll get back to you soon.</p>
          </div>
          <button className="w-full bg-blue-600 text-white p-3 rounded font-medium mt-4">Send Another Message</button>
        </form>
      </IterationDeckSlide>
      
      <IterationDeckSlide label="Error" aiPrompt="Error state with helpful messaging">
        <form className="max-w-md bg-white p-6 border rounded-lg">
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <div className="space-y-4">
            <div>
              <input type="email" placeholder="Your email" className="w-full p-3 border border-red-300 rounded" />
              <p className="text-red-600 text-sm mt-1">Please enter a valid email address</p>
            </div>
            <textarea placeholder="Your message" rows={4} className="w-full p-3 border rounded" />
            <button className="w-full bg-blue-600 text-white p-3 rounded font-medium">Send Message</button>
          </div>
          <div className="bg-red-50 border border-red-200 p-3 rounded mt-4">
            <p className="text-red-800 text-sm">Please fix the errors above before submitting.</p>
          </div>
        </form>
      </IterationDeckSlide>
    </IterationDeck>
  )
}

// Example: Responsive navigation variations
export function NavigationExample() {
  return (
    <IterationDeck 
      id={AI_PRESETS.RESPONSIVE_VARIATIONS.suggestedId('Navigation')}
      label={AI_PRESETS.RESPONSIVE_VARIATIONS.suggestedLabel('Navigation')}
    >
      <IterationDeckSlide label="Desktop" aiPrompt="Full horizontal navigation for desktop">
        <nav className="bg-white border-b p-4">
          <div className="flex justify-between items-center max-w-6xl mx-auto">
            <div className="font-bold text-xl">Brand</div>
            <div className="flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Products</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Sign Up</button>
          </div>
        </nav>
      </IterationDeckSlide>
      
      <IterationDeckSlide label="Mobile" aiPrompt="Collapsed mobile navigation with hamburger">
        <nav className="bg-white border-b p-4">
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl">Brand</div>
            <button className="p-2">
              <div className="space-y-1">
                <div className="w-6 h-0.5 bg-gray-600"></div>
                <div className="w-6 h-0.5 bg-gray-600"></div>
                <div className="w-6 h-0.5 bg-gray-600"></div>
              </div>
            </button>
          </div>
          <div className="mt-4 space-y-2 border-t pt-4">
            <a href="#" className="block text-gray-600 py-2">Home</a>
            <a href="#" className="block text-gray-600 py-2">Products</a>
            <a href="#" className="block text-gray-600 py-2">About</a>
            <a href="#" className="block text-gray-600 py-2">Contact</a>
            <button className="w-full bg-blue-600 text-white py-2 rounded mt-4">Sign Up</button>
          </div>
        </nav>
      </IterationDeckSlide>
      
      <IterationDeckSlide label="Tablet" aiPrompt="Hybrid navigation for tablet screens">
        <nav className="bg-white border-b p-4">
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl">Brand</div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Products</a>
              <button className="p-2">
                <div className="space-y-1">
                  <div className="w-5 h-0.5 bg-gray-600"></div>
                  <div className="w-5 h-0.5 bg-gray-600"></div>
                  <div className="w-5 h-0.5 bg-gray-600"></div>
                </div>
              </button>
            </div>
          </div>
        </nav>
      </IterationDeckSlide>
    </IterationDeck>
  )
}

// Example: Modal size variations
export function ModalSizeExample() {
  return (
    <IterationDeck id="modal-sizes" label="Modal Size Variations">
      <IterationDeckSlide label="Small" aiPrompt="Compact modal for simple confirmations">
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Confirm Action</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to proceed?</p>
            <div className="flex space-x-3">
              <button className="flex-1 bg-gray-100 text-gray-900 py-2 rounded">Cancel</button>
              <button className="flex-1 bg-red-600 text-white py-2 rounded">Confirm</button>
            </div>
          </div>
        </div>
      </IterationDeckSlide>
      
      <IterationDeckSlide label="Medium" aiPrompt="Standard modal for forms and content">
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Create Account</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full p-3 border rounded" />
              <input type="email" placeholder="Email" className="w-full p-3 border rounded" />
              <input type="password" placeholder="Password" className="w-full p-3 border rounded" />
            </div>
            <div className="flex space-x-3 mt-6">
              <button className="flex-1 bg-gray-100 text-gray-900 py-2 rounded">Cancel</button>
              <button className="flex-1 bg-blue-600 text-white py-2 rounded">Create Account</button>
            </div>
          </div>
        </div>
      </IterationDeckSlide>
      
      <IterationDeckSlide label="Large" aiPrompt="Spacious modal for detailed content">
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
            <h3 className="text-2xl font-bold mb-6">Settings</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold mb-3">Profile Settings</h4>
                <div className="space-y-3">
                  <input type="text" placeholder="Display Name" className="w-full p-3 border rounded" />
                  <input type="email" placeholder="Email" className="w-full p-3 border rounded" />
                  <textarea placeholder="Bio" rows={3} className="w-full p-3 border rounded" />
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-3">Preferences</h4>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Email notifications
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    SMS notifications
                  </label>
                  <select className="w-full p-3 border rounded">
                    <option>Light theme</option>
                    <option>Dark theme</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex space-x-3 mt-8">
              <button className="bg-gray-100 text-gray-900 px-6 py-2 rounded">Cancel</button>
              <button className="bg-blue-600 text-white px-6 py-2 rounded">Save Changes</button>
            </div>
          </div>
        </div>
      </IterationDeckSlide>
    </IterationDeck>
  )
}