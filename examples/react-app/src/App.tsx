import { useEffect } from 'react';
import { IterationDeck, IterationDeckSlide, useEnsureToolbar, useIterationStore } from 'iteration-deck';

// Import demo components
import { UserPreferencesVertical, UserPreferencesHorizontal, UserPreferencesCard } from './components/UserPreferences';
import { BudgetSummary, BudgetDetailed, BudgetVisual } from './components/BudgetDashboard';
import { ContactsCompact, ContactsDetailed, ContactsGrid } from './components/ContactsList';

function App() {

  // Get store to help with toolbar initialization
  const store = useIterationStore();
  
  // Debug toolbar state
  useEffect(() => {
    console.log('🔍 Toolbar Debug:', {
      isProduction: store.isProduction,
      interactiveDecks: store.getInteractiveDecks(),
      allDecks: store.getRegisteredDecks(),
      deckMetadata: store.deckMetadata
    });
  }, [store.isProduction, store.deckMetadata]);
  
  // Ensure the toolbar is rendered when there are interactive decks
  useEnsureToolbar();

  // Set initial selected deck after first render
  useEffect(() => {
    const interactiveDecks = store.getInteractiveDecks();
    if (interactiveDecks.length > 0 && !store.selectedDeckId) {
      store.setSelectedDeck(interactiveDecks[0]);
    }
  }, [store]);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Debug Panel */}
      <div className="bg-yellow-100 border-b-2 border-yellow-300 px-6 py-2">
        <details className="text-sm">
          <summary className="cursor-pointer font-mono text-yellow-800">🔍 Debug Info (click to expand)</summary>
          <div className="mt-2 p-2 bg-yellow-50 rounded text-xs font-mono space-y-1">
            <div><strong>isProduction:</strong> {String(store.isProduction)}</div>
            <div><strong>Interactive Decks:</strong> {store.getInteractiveDecks().join(', ')}</div>
            <div><strong>All Decks:</strong> {store.getRegisteredDecks().join(', ')}</div>
            <div><strong>Toolbar Element:</strong> {document.getElementById('iteration-deck-toolbar-singleton') ? '✅ Found' : '❌ Missing'}</div>
          </div>
        </details>
      </div>
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">React Iteration Deck Demo</h1>
          <p className="text-gray-600 mt-1">AI-first prototyping with React wrapper components</p>
          <div className="mt-2 flex flex-wrap">
            <span className="demo-badge">⚛️ React Components</span>
            <span className="demo-badge">🎨 Design Variations</span>
            <span className="demo-badge">🤖 AI-Generated</span>
            <span className="demo-badge">⚡ Live Switching</span>
            <span className="demo-badge">🔄 Multi-Deck Support</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Introduction */}
        <section className="mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">React Integration Demo</h2>
            <p className="text-blue-800 mb-3">
              This demo shows how to use the iteration-deck library with React components.
              The IterationDeck and IterationDeckSlide components provide a native React API while using Lit web components under the hood.
            </p>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• <strong>React Components:</strong> Full React wrapper with hooks integration</li>
              <li>• <strong>TypeScript Support:</strong> Complete type safety for props and events</li>
              <li>• <strong>React Patterns:</strong> forwardRef, useImperativeHandle, custom hooks</li>
              <li>• <strong>Zustand Integration:</strong> React hooks for state management</li>
              <li>• <strong>Event Handling:</strong> Native React event props</li>
            </ul>
          </div>
        </section>


        {/* Demo 1: User Preferences Form */}
        <section className="demo-section">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">1. User Preferences Form (React)</h2>
          <p className="text-gray-600 mb-4">Three different layout approaches built with React components inside IterationDeck wrapper.</p>
          
          <IterationDeck 
            id="react-user-preferences" 
            label="User Preferences (React)"
            prompt="Create a user preferences form with clean, modern styling and good UX"
          >
            <IterationDeckSlide 
              label="Vertical Layout"
              aiPrompt="Design a clean vertical form layout with good spacing"
              notes="Designer feedback: Good for mobile, clear hierarchy"
              confidence={0.92}
            >
              <UserPreferencesVertical />
            </IterationDeckSlide>

            <IterationDeckSlide 
              label="Horizontal Layout"
              aiPrompt="Create a horizontal layout with fields side by side for desktop"
              notes="Good for wide screens, efficient use of space"
              confidence={0.87}
            >
              <UserPreferencesHorizontal />
            </IterationDeckSlide>

            <IterationDeckSlide 
              label="Card Layout"
              aiPrompt="Design using separate cards for each preference section"
              notes="PM feedback: Easier to scan, good visual separation"
              confidence={0.95}
            >
              <UserPreferencesCard />
            </IterationDeckSlide>
          </IterationDeck>
        </section>

        {/* Demo 2: Budgeting Dashboard */}
        <section className="demo-section">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Budgeting Dashboard (React)</h2>
          <p className="text-gray-600 mb-4">Three different approaches to displaying budget information with React components.</p>
          
          <IterationDeck 
            id="react-budget-dashboard" 
            label="Budget Dashboard (React)"
            prompt="Design a personal budget dashboard that helps users understand their spending"
          >
            <IterationDeckSlide 
              label="Simple Summary"
              aiPrompt="Create a clean, minimal dashboard focusing on key metrics"
              notes="Great for quick overview, less cognitive load"
              confidence={0.89}
            >
              <BudgetSummary />
            </IterationDeckSlide>

            <IterationDeckSlide 
              label="Detailed Breakdown"
              aiPrompt="Show more detailed spending categories with progress bars"
              notes="Power users like the detail, good for budget tracking"
              confidence={0.84}
            >
              <BudgetDetailed />
            </IterationDeckSlide>

            <IterationDeckSlide 
              label="Visual Chart Focus"
              aiPrompt="Emphasize visual representation with charts and graphs"
              notes="Great for visual learners, makes trends obvious"
              confidence={0.91}
            >
              <BudgetVisual />
            </IterationDeckSlide>
          </IterationDeck>
        </section>

        {/* Demo 3: Contacts List */}
        <section className="demo-section">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Contacts List (React)</h2>
          <p className="text-gray-600 mb-4">Three different ways to present contact information with React components.</p>
          
          <IterationDeck 
            id="react-contacts-list" 
            label="Contacts List (React)"
            prompt="Design a contacts list that's easy to scan and interact with"
          >
            <IterationDeckSlide 
              label="Compact List"
              aiPrompt="Create a dense, scannable list view for many contacts"
              notes="Efficient for large contact lists, quick scanning"
              confidence={0.88}
            >
              <ContactsCompact />
            </IterationDeckSlide>

            <IterationDeckSlide 
              label="Detailed Cards"
              aiPrompt="Show more information in card format with actions"
              notes="Good for CRM use case, shows more context"
              confidence={0.85}
            >
              <ContactsDetailed />
            </IterationDeckSlide>

            <IterationDeckSlide 
              label="Grid Layout"
              aiPrompt="Arrange contacts in a grid for visual browsing"
              notes="Visual approach, good for team directories"
              confidence={0.82}
            >
              <ContactsGrid />
            </IterationDeckSlide>
          </IterationDeck>
        </section>

        {/* Demo 4: Production Override Example */}
        <section className="demo-section">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🚀 Production Override Demo</h2>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
            <h3 className="font-medium text-orange-900 mb-2">✨ New Feature: enableInProduction</h3>
            <p className="text-orange-800 text-sm mb-2">
              By default, IterationDeck only shows the first slide in production builds. 
              The <code className="bg-orange-100 px-1 rounded">enableInProduction</code> prop allows you to show all slides and the toolbar even in production.
            </p>
            <p className="text-orange-800 text-sm">
              This is useful for design reviews, A/B testing, or when you need iteration functionality in production environments.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">🚫 Default Production Behavior</h3>
              <p className="text-gray-600 text-sm mb-3">Only first slide shows, no toolbar</p>
              <IterationDeck 
                id="prod-default" 
                label="Default (Production)"
              >
                <IterationDeckSlide label="Primary Button">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900">Primary CTA</h4>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700">
                      Get Started
                    </button>
                  </div>
                </IterationDeckSlide>
                <IterationDeckSlide label="Secondary Button">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900">Secondary CTA</h4>
                    <button className="bg-gray-100 text-gray-900 px-4 py-2 rounded mt-2 hover:bg-gray-200">
                      Get Started
                    </button>
                  </div>
                </IterationDeckSlide>
              </IterationDeck>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-3">✅ With enableInProduction</h3>
              <p className="text-gray-600 text-sm mb-3">All slides available, toolbar appears</p>
              <IterationDeck 
                id="prod-enabled" 
                label="Enabled (Production)"
                enableInProduction={true}
              >
                <IterationDeckSlide label="Primary Button">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900">Primary CTA</h4>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700">
                      Get Started
                    </button>
                  </div>
                </IterationDeckSlide>
                <IterationDeckSlide label="Secondary Button">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900">Secondary CTA</h4>
                    <button className="bg-gray-100 text-gray-900 px-4 py-2 rounded mt-2 hover:bg-gray-200">
                      Get Started
                    </button>
                  </div>
                </IterationDeckSlide>
                <IterationDeckSlide label="Gradient Button">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900">Gradient CTA</h4>
                    <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded mt-2 hover:from-purple-600 hover:to-blue-600">
                      Get Started
                    </button>
                  </div>
                </IterationDeckSlide>
              </IterationDeck>
            </div>
          </div>
          
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">💡 Usage Examples</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <div><strong>Design Reviews:</strong> Show stakeholders different options in production</div>
              <div><strong>A/B Testing:</strong> Keep variations available for testing tools</div>
              <div><strong>Analytics:</strong> Compare performance of different designs live</div>
              <div><strong>Marketing:</strong> Let teams switch between campaign variations</div>
            </div>
          </div>
        </section>

        {/* React-Specific Features */}
        <section className="demo-section">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">React Integration Features</h2>
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-medium text-green-900 mb-2">⚛️ React Wrapper Benefits</h3>
              <ul className="text-green-800 text-sm space-y-1">
                <li>• <strong>Native React API:</strong> Components feel like regular React components</li>
                <li>• <strong>TypeScript Support:</strong> Full type safety for props and events</li>
                <li>• <strong>React Hooks:</strong> useIterationStore, useActiveSlide, useDeckNavigation</li>
                <li>• <strong>Event Handling:</strong> onSlideChange, onDeckRegistered props</li>
                <li>• <strong>Ref Support:</strong> forwardRef with imperative API access</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">🎯 State Management</h3>
              <p className="text-blue-800 text-sm">
                The React wrappers integrate with Zustand for state management. Multiple decks share the same 
                store instance, enabling synchronized navigation and global toolbar functionality.
              </p>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-medium text-purple-900 mb-2">🔧 Web Components Under the Hood</h3>
              <p className="text-purple-800 text-sm">
                While you write React code, the underlying implementation uses Lit web components for 
                maximum performance and universal framework compatibility.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-8 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600">
            React wrappers built on top of <strong>Lit</strong> web components with <strong>Zustand</strong> state management.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Check the debug events above and browser console for detailed component interactions.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;