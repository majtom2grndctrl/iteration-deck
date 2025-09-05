import React from 'react';
import ReactDOM from 'react-dom/client';

// Import directly from our source - no build step needed!
import { IterationDeck, IterationDeckSlide } from '../components';

// Demo Component Styles
const demoSectionClass = "mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50";
const demoContentClass = "bg-white rounded-md p-6 mt-4 shadow-sm";

// Contact Avatar Component
function ContactAvatar({ initials, size = 40 }: { initials: string; size?: number }) {
  return (
    <div 
      className="bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold rounded-full"
      style={{ width: size, height: size, fontSize: size < 50 ? '0.875rem' : '1.2rem' }}
    >
      {initials}
    </div>
  );
}

// Chart Placeholder Component
function ChartPlaceholder() {
  return (
    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-md flex items-center justify-center text-gray-600 text-sm">
      📊 Interactive Budget Chart<br />
      <small>(Spending trends over time)</small>
    </div>
  );
}

function App() {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <section className="mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">React Implementation Demo</h2>
          <p className="text-blue-800 mb-3">
            This demo shows the same three iteration decks from the Lit demo, but implemented as pure React components.
            Use the toolbar at the bottom to switch between different variations and compare them live.
          </p>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• <strong>Keyboard Navigation:</strong> Use Ctrl/Cmd + Arrow keys to navigate</li>
            <li>• <strong>Multiple Decks:</strong> The toolbar dropdown lets you switch between different components</li>
            <li>• <strong>Development Mode:</strong> You're seeing the full development experience</li>
            <li>• <strong>Production Mode:</strong> In production, only the first variation renders</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-block px-2 py-1 bg-blue-200 text-blue-800 rounded text-xs font-medium">🎨 Design Variations</span>
            <span className="inline-block px-2 py-1 bg-blue-200 text-blue-800 rounded text-xs font-medium">⚛️ Pure React</span>
            <span className="inline-block px-2 py-1 bg-blue-200 text-blue-800 rounded text-xs font-medium">⚡ Live Switching</span>
            <span className="inline-block px-2 py-1 bg-blue-200 text-blue-800 rounded text-xs font-medium">🔄 Multi-Deck Support</span>
          </div>
        </div>
      </section>

      {/* Demo 1: User Preferences Form */}
      <section className={demoSectionClass}>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">1. User Preferences Form</h2>
        <p className="text-gray-600 mb-4">Three different layout approaches for a user preferences form - compare vertical vs horizontal vs card layouts.</p>
        
        <IterationDeck 
          id="user-preferences" 
          label="User Preferences Form"
          prompt="Create a user preferences form with clean, modern styling and good UX"
        >
          {/* Variation 1: Vertical Layout */}
          <IterationDeckSlide 
            label="Vertical Layout"
            aiPrompt="Design a clean vertical form layout with good spacing"
            notes="Designer feedback: Good for mobile, clear hierarchy"
            confidence={0.92}
          >
            <div className={demoContentClass} style={{ maxWidth: '400px' }}>
              <h3 className="text-lg font-semibold mb-4">Account Preferences</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    defaultValue="Sarah Johnson" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Notifications</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-2" />
                      <span className="text-sm">Product updates</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Marketing emails</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Theme Preference</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Light</option>
                    <option>Dark</option>
                    <option>System</option>
                  </select>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Save Preferences
                </button>
              </form>
            </div>
          </IterationDeckSlide>

          {/* Variation 2: Horizontal Layout */}
          <IterationDeckSlide 
            label="Horizontal Layout"
            aiPrompt="Create a horizontal layout with fields side by side for desktop"
            notes="Good for wide screens, efficient use of space"
            confidence={0.87}
          >
            <div className={demoContentClass}>
              <h3 className="text-lg font-semibold mb-4">Account Preferences</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue="Sarah Johnson" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Theme Preference</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Light</option>
                      <option>Dark</option>
                      <option>System</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Notifications</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-2" />
                      <span className="text-sm">Product updates</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Marketing emails</span>
                    </label>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Save Preferences
                  </button>
                </div>
              </form>
            </div>
          </IterationDeckSlide>

          {/* Variation 3: Card Layout */}
          <IterationDeckSlide 
            label="Card Layout"
            aiPrompt="Design using separate cards for each preference section"
            notes="PM feedback: Easier to scan, good visual separation"
            confidence={0.95}
          >
            <div className={`${demoContentClass} space-y-4`}>
              <h3 className="text-lg font-semibold mb-4">Account Preferences</h3>
              
              {/* Profile Card */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Profile Information</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    defaultValue="Sarah Johnson" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Notifications Card */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Email Notifications</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    <span className="text-sm">Product updates</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Marketing emails</span>
                  </label>
                </div>
              </div>

              {/* Appearance Card */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Appearance</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Theme Preference</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Light</option>
                    <option>Dark</option>
                    <option>System</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Save All Preferences
              </button>
            </div>
          </IterationDeckSlide>
        </IterationDeck>
      </section>

      {/* Demo 2: Budgeting Dashboard */}
      <section className={demoSectionClass}>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Budgeting Dashboard</h2>
        <p className="text-gray-600 mb-4">Three different approaches to displaying budget information - simple summary vs detailed breakdown vs visual chart focus.</p>
        
        <IterationDeck 
          id="budget-dashboard" 
          label="Budget Dashboard"
          prompt="Design a personal budget dashboard that helps users understand their spending"
        >
          {/* Variation 1: Simple Summary */}
          <IterationDeckSlide 
            label="Simple Summary"
            aiPrompt="Create a clean, minimal dashboard focusing on key metrics"
            notes="Great for quick overview, less cognitive load"
            confidence={0.89}
          >
            <div className={demoContentClass} style={{ maxWidth: '800px' }}>
              <h3 className="text-lg font-semibold mb-4">Budget Overview</h3>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">$2,847</div>
                  <div className="text-sm text-gray-500">Income</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">$2,156</div>
                  <div className="text-sm text-gray-500">Expenses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">$691</div>
                  <div className="text-sm text-gray-500">Remaining</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Housing</span>
                  <span className="font-medium">$1,200</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Food</span>
                  <span className="font-medium">$450</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Transportation</span>
                  <span className="font-medium">$320</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Other</span>
                  <span className="font-medium">$186</span>
                </div>
              </div>
            </div>
          </IterationDeckSlide>

          {/* Variation 2: Detailed Breakdown */}
          <IterationDeckSlide 
            label="Detailed Breakdown"
            aiPrompt="Show more detailed spending categories with progress bars"
            notes="Power users like the detail, good for budget tracking"
            confidence={0.84}
          >
            <div className={demoContentClass} style={{ maxWidth: '800px' }}>
              <h3 className="text-lg font-semibold mb-4">Budget Breakdown</h3>
              
              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-green-600">Total Income</div>
                  <div className="text-xl font-bold text-green-700">$2,847</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-sm text-red-600">Total Expenses</div>
                  <div className="text-xl font-bold text-red-700">$2,156</div>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Housing</span>
                    <span className="text-sm text-gray-500">$1,200 / $1,300</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Food & Dining</span>
                    <span className="text-sm text-gray-500">$450 / $500</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Transportation</span>
                    <span className="text-sm text-gray-500">$320 / $400</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Entertainment</span>
                    <span className="text-sm text-gray-500">$120 / $200</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Utilities</span>
                    <span className="text-sm text-gray-500">$66 / $150</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '44%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </IterationDeckSlide>

          {/* Variation 3: Visual Chart Focus */}
          <IterationDeckSlide 
            label="Visual Chart Focus"
            aiPrompt="Emphasize visual representation with charts and graphs"
            notes="Great for visual learners, makes trends obvious"
            confidence={0.91}
          >
            <div className={demoContentClass} style={{ maxWidth: '800px' }}>
              <h3 className="text-lg font-semibold mb-4">Budget Visualization</h3>
              
              {/* Chart Placeholder */}
              <div className="mb-6">
                <ChartPlaceholder />
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center bg-gray-50 p-3 rounded">
                  <div className="text-lg font-bold text-green-600">24%</div>
                  <div className="text-xs text-gray-500">Savings Rate</div>
                </div>
                <div className="text-center bg-gray-50 p-3 rounded">
                  <div className="text-lg font-bold text-blue-600">76%</div>
                  <div className="text-xs text-gray-500">Budget Used</div>
                </div>
              </div>

              {/* Visual Category List */}
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                  <span className="flex-1">Housing</span>
                  <span className="font-medium">42%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                  <span className="flex-1">Food</span>
                  <span className="font-medium">21%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded mr-3"></div>
                  <span className="flex-1">Transport</span>
                  <span className="font-medium">15%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-purple-500 rounded mr-3"></div>
                  <span className="flex-1">Other</span>
                  <span className="font-medium">22%</span>
                </div>
              </div>
            </div>
          </IterationDeckSlide>
        </IterationDeck>
      </section>

      {/* Demo 3: Contacts List */}
      <section className={demoSectionClass}>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Contacts List</h2>
        <p className="text-gray-600 mb-4">Three different ways to present contact information - compact list vs detailed cards vs grid layout.</p>
        
        <IterationDeck 
          id="contacts-list" 
          label="Contacts List"
          prompt="Design a contacts list that's easy to scan and interact with"
        >
          {/* Variation 1: Compact List */}
          <IterationDeckSlide 
            label="Compact List"
            aiPrompt="Create a dense, scannable list view for many contacts"
            notes="Efficient for large contact lists, quick scanning"
            confidence={0.88}
          >
            <div className={demoContentClass} style={{ maxWidth: '600px' }}>
              <h3 className="text-lg font-semibold mb-4">Contacts</h3>
              
              <div className="space-y-1">
                {[
                  { initials: 'AJ', name: 'Alice Johnson', email: 'alice@company.com', role: 'Designer' },
                  { initials: 'BS', name: 'Bob Smith', email: 'bob.smith@email.com', role: 'Developer' },
                  { initials: 'CD', name: 'Carol Davis', email: 'carol.d@startup.io', role: 'PM' },
                  { initials: 'DW', name: 'David Wilson', email: 'd.wilson@tech.com', role: 'Engineer' },
                  { initials: 'EB', name: 'Emma Brown', email: 'emma@creative.agency', role: 'Creative' }
                ].map((contact, i) => (
                  <div key={i} className="flex items-center py-2 px-3 hover:bg-gray-50 rounded">
                    <ContactAvatar initials={contact.initials} />
                    <div className="flex-1 ml-3">
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm text-gray-500">{contact.email}</div>
                    </div>
                    <div className="text-sm text-gray-400">{contact.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </IterationDeckSlide>

          {/* Variation 2: Detailed Cards */}
          <IterationDeckSlide 
            label="Detailed Cards"
            aiPrompt="Show more information in card format with actions"
            notes="Good for CRM use case, shows more context"
            confidence={0.85}
          >
            <div className={demoContentClass} style={{ maxWidth: '600px' }}>
              <h3 className="text-lg font-semibold mb-4">Contacts</h3>
              
              <div className="space-y-4">
                {[
                  { initials: 'AJ', name: 'Alice Johnson', title: 'Senior Product Designer', email: 'alice@company.com', phone: '+1 (555) 123-4567' },
                  { initials: 'BS', name: 'Bob Smith', title: 'Full Stack Developer', email: 'bob.smith@email.com', phone: '+1 (555) 987-6543' },
                  { initials: 'CD', name: 'Carol Davis', title: 'Product Manager', email: 'carol.d@startup.io', phone: '+1 (555) 456-7890' }
                ].map((contact, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <ContactAvatar initials={contact.initials} />
                      <div className="flex-1 ml-4">
                        <h4 className="font-medium">{contact.name}</h4>
                        <p className="text-sm text-gray-600">{contact.title}</p>
                        <p className="text-sm text-gray-500 mt-1">{contact.email}</p>
                        <p className="text-sm text-gray-500">{contact.phone}</p>
                        <div className="flex mt-3 space-x-2">
                          <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Email</button>
                          <button className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Call</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </IterationDeckSlide>

          {/* Variation 3: Grid Layout */}
          <IterationDeckSlide 
            label="Grid Layout"
            aiPrompt="Arrange contacts in a grid for visual browsing"
            notes="Visual approach, good for team directories"
            confidence={0.82}
          >
            <div className={demoContentClass} style={{ maxWidth: '600px' }}>
              <h3 className="text-lg font-semibold mb-4">Team Directory</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { initials: 'AJ', name: 'Alice Johnson', role: 'Designer', email: 'alice@company.com' },
                  { initials: 'BS', name: 'Bob Smith', role: 'Developer', email: 'bob.smith@email.com' },
                  { initials: 'CD', name: 'Carol Davis', role: 'PM', email: 'carol.d@startup.io' },
                  { initials: 'DW', name: 'David Wilson', role: 'Engineer', email: 'd.wilson@tech.com' }
                ].map((contact, i) => (
                  <div key={i} className="text-center border border-gray-200 rounded-lg p-4">
                    <div className="mx-auto mb-3">
                      <ContactAvatar initials={contact.initials} size={60} />
                    </div>
                    <h4 className="font-medium">{contact.name}</h4>
                    <p className="text-sm text-gray-600">{contact.role}</p>
                    <p className="text-xs text-gray-500 mt-1">{contact.email}</p>
                    <button className="mt-2 text-xs bg-blue-600 text-white px-3 py-1 rounded">Contact</button>
                  </div>
                ))}
              </div>
            </div>
          </IterationDeckSlide>
        </IterationDeck>
      </section>

      {/* Additional Demo Content to Ensure Scrolling */}
      <section className={demoSectionClass}>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Product Cards</h2>
        <p className="text-gray-600 mb-4">Different approaches to displaying product information with various layouts and emphasis.</p>
        
        <IterationDeck 
          id="product-cards" 
          label="Product Cards"
          prompt="Design product cards that showcase items effectively for e-commerce"
        >
          <IterationDeckSlide 
            label="Image Focus"
            aiPrompt="Emphasize product images with minimal text"
            confidence={0.91}
          >
            <div className={demoContentClass}>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { name: 'Wireless Headphones', price: '$129.99', image: '🎧' },
                  { name: 'Smart Watch', price: '$299.99', image: '⌚' },
                  { name: 'Laptop Stand', price: '$79.99', image: '💻' },
                  { name: 'Desk Lamp', price: '$49.99', image: '💡' }
                ].map((product, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="h-32 bg-gray-100 flex items-center justify-center text-4xl">
                      {product.image}
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-lg font-bold text-blue-600">{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </IterationDeckSlide>

          <IterationDeckSlide 
            label="List Format"
            aiPrompt="Show products in a detailed list format"
            confidence={0.86}
          >
            <div className={demoContentClass}>
              <div className="space-y-4">
                {[
                  { name: 'Wireless Headphones', price: '$129.99', desc: 'Premium noise-canceling headphones', rating: '4.8', image: '🎧' },
                  { name: 'Smart Watch', price: '$299.99', desc: 'Advanced fitness and health tracking', rating: '4.6', image: '⌚' },
                  { name: 'Laptop Stand', price: '$79.99', desc: 'Ergonomic adjustable aluminum stand', rating: '4.7', image: '💻' },
                  { name: 'Desk Lamp', price: '$49.99', desc: 'LED with adjustable brightness', rating: '4.5', image: '💡' }
                ].map((product, i) => (
                  <div key={i} className="flex items-center p-4 border border-gray-200 rounded-lg">
                    <div className="text-3xl mr-4">{product.image}</div>
                    <div className="flex-1">
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-gray-600">{product.desc}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">{product.price}</p>
                      <button className="mt-2 text-sm bg-blue-600 text-white px-3 py-1 rounded">Add to Cart</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </IterationDeckSlide>

          <IterationDeckSlide 
            label="Compact Grid"
            aiPrompt="Dense grid layout showing more products at once"
            confidence={0.83}
          >
            <div className={demoContentClass}>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: 'Wireless Headphones', price: '$129.99', image: '🎧' },
                  { name: 'Smart Watch', price: '$299.99', image: '⌚' },
                  { name: 'Laptop Stand', price: '$79.99', image: '💻' },
                  { name: 'Desk Lamp', price: '$49.99', image: '💡' },
                  { name: 'Bluetooth Speaker', price: '$89.99', image: '🔊' },
                  { name: 'Wireless Mouse', price: '$39.99', image: '🖱️' }
                ].map((product, i) => (
                  <div key={i} className="text-center border border-gray-200 rounded-lg p-3">
                    <div className="text-3xl mb-2">{product.image}</div>
                    <h5 className="text-sm font-medium mb-1">{product.name}</h5>
                    <p className="text-sm font-bold text-blue-600">{product.price}</p>
                    <button className="mt-2 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">View</button>
                  </div>
                ))}
              </div>
            </div>
          </IterationDeckSlide>
        </IterationDeck>
      </section>

      {/* Navigation Help Section */}
      <section className={demoSectionClass}>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Navigation Patterns</h2>
        <p className="text-gray-600 mb-4">Different approaches to website navigation with various layouts and interaction patterns.</p>
        
        <IterationDeck 
          id="navigation" 
          label="Navigation Patterns"
          prompt="Design main navigation that works well for different types of websites"
        >
          <IterationDeckSlide 
            label="Horizontal Menu"
            aiPrompt="Traditional horizontal navigation bar"
            confidence={0.94}
          >
            <div className={demoContentClass}>
              <nav className="border-b border-gray-200 pb-4">
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-blue-600">Brand</div>
                  <div className="hidden md:flex space-x-6">
                    <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
                    <a href="#" className="text-gray-700 hover:text-blue-600">Products</a>
                    <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
                    <a href="#" className="text-gray-700 hover:text-blue-600">Contact</a>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded">Get Started</button>
                </div>
              </nav>
              <div className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Welcome to Our Site</h3>
                <p className="text-gray-600">This demonstrates a traditional horizontal navigation layout that works well for most websites.</p>
              </div>
            </div>
          </IterationDeckSlide>

          <IterationDeckSlide 
            label="Sidebar Menu"
            aiPrompt="Vertical sidebar navigation for dashboard-style layouts"
            confidence={0.87}
          >
            <div className={demoContentClass}>
              <div className="flex">
                <nav className="w-48 border-r border-gray-200 pr-4">
                  <div className="text-lg font-bold text-blue-600 mb-6">Dashboard</div>
                  <div className="space-y-2">
                    <a href="#" className="block px-3 py-2 bg-blue-50 text-blue-700 rounded">Dashboard</a>
                    <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded">Analytics</a>
                    <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded">Projects</a>
                    <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded">Settings</a>
                    <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded">Help</a>
                  </div>
                </nav>
                <main className="flex-1 pl-6">
                  <h3 className="text-lg font-semibold mb-2">Main Content Area</h3>
                  <p className="text-gray-600">Sidebar navigation is perfect for applications with many sections or dashboard-style interfaces.</p>
                </main>
              </div>
            </div>
          </IterationDeckSlide>

          <IterationDeckSlide 
            label="Tab Navigation"
            aiPrompt="Tab-style navigation for sections within a page"
            confidence={0.90}
          >
            <div className={demoContentClass}>
              <div className="border-b border-gray-200">
                <nav className="flex space-x-6">
                  <button className="pb-2 border-b-2 border-blue-600 text-blue-600 font-medium">Overview</button>
                  <button className="pb-2 text-gray-500 hover:text-gray-700">Details</button>
                  <button className="pb-2 text-gray-500 hover:text-gray-700">Reviews</button>
                  <button className="pb-2 text-gray-500 hover:text-gray-700">Support</button>
                </nav>
              </div>
              <div className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Overview Tab Content</h3>
                <p className="text-gray-600 mb-4">Tab navigation works well for organizing related content within a single page or section.</p>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-gray-600">This tab contains the main overview information and key metrics.</p>
                </div>
              </div>
            </div>
          </IterationDeckSlide>
        </IterationDeck>
      </section>

      {/* Development Features */}
      <section className={demoSectionClass}>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Development Features</h2>
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-medium text-green-900 mb-2">✨ What You're Seeing</h3>
            <ul className="text-green-800 text-sm space-y-1">
              <li>• <strong>Five iteration decks</strong> with multiple variations each</li>
              <li>• <strong>Pure React components</strong> with no web component dependencies</li>
              <li>• <strong>Global toolbar</strong> at the bottom for navigation</li>
              <li>• <strong>Multi-deck support</strong> with dropdown selector</li>
              <li>• <strong>Keyboard shortcuts</strong> for quick navigation</li>
              <li>• <strong>AI metadata</strong> including prompts, notes, and confidence scores</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-medium text-yellow-900 mb-2">🎯 AI-First Workflow</h3>
            <p className="text-yellow-800 text-sm">
              Each variation represents a different AI prompt refinement. Designers and PMs can compare 
              live prototypes side-by-side, gather feedback, and iterate quickly without losing context.
            </p>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-medium text-purple-900 mb-2">🚀 Production Mode</h3>
            <p className="text-purple-800 text-sm">
              In production builds, only the first variation renders, ensuring clean deployments 
              while maintaining the development iteration experience.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">⚛️ React Implementation</h3>
            <p className="text-blue-800 text-sm">
              This demo shows the pure React implementation with no web component dependencies, 
              making it perfect for React projects that want immediate compatibility.
            </p>
          </div>
        </div>
      </section>

      {/* Footer spacing to ensure scroll */}
      <div className="h-24"></div>
    </div>
  );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('react-root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);