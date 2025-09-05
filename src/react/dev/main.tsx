import React from 'react';
import ReactDOM from 'react-dom/client';

// Import directly from our source - no build step needed!
import { IterationDeck, IterationDeckSlide, useEnsureToolbar } from '../components';

// Demo components
function SimpleButton({ variant, children }: { variant: string; children: React.ReactNode }) {
  const baseClass = "px-4 py-2 rounded font-medium transition-colors";
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300", 
    outline: "border-2 border-gray-300 text-gray-700 hover:border-gray-400"
  };
  
  return (
    <button className={`${baseClass} ${variantClasses[variant as keyof typeof variantClasses] || variantClasses.primary}`}>
      {children}
    </button>
  );
}

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}

function App() {
  return (
    <div className="space-y-8">
      {/* Button Variations */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Button Variations</h2>
        <IterationDeck id="buttons" label="Button Styles">
          <IterationDeckSlide label="Primary">
            <DemoCard title="Primary Button">
              <SimpleButton variant="primary">Get Started</SimpleButton>
              <p className="text-sm text-gray-600 mt-2">Bold, attention-grabbing primary action</p>
            </DemoCard>
          </IterationDeckSlide>
          
          <IterationDeckSlide label="Secondary">
            <DemoCard title="Secondary Button">
              <SimpleButton variant="secondary">Learn More</SimpleButton>
              <p className="text-sm text-gray-600 mt-2">Subtle secondary action</p>
            </DemoCard>
          </IterationDeckSlide>
          
          <IterationDeckSlide label="Outline">
            <DemoCard title="Outline Button">
              <SimpleButton variant="outline">View Details</SimpleButton>
              <p className="text-sm text-gray-600 mt-2">Minimal outline style</p>
            </DemoCard>
          </IterationDeckSlide>
        </IterationDeck>
      </section>
      
      {/* Card Layouts */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Card Layouts</h2>
        <IterationDeck id="cards" label="Card Styles">
          <IterationDeckSlide label="Simple">
            <DemoCard title="Simple Card">
              <p className="text-gray-600">Clean and minimal card design with basic styling.</p>
              <SimpleButton variant="primary">Action</SimpleButton>
            </DemoCard>
          </IterationDeckSlide>
          
          <IterationDeckSlide label="With Shadow">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Enhanced Card</h3>
              <p className="text-gray-600 mb-4">Card with elevated shadow for more visual depth.</p>
              <SimpleButton variant="secondary">Action</SimpleButton>
            </div>
          </IterationDeckSlide>
          
          <IterationDeckSlide label="Gradient">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-4">Gradient Card</h3>
              <p className="text-blue-800 mb-4">Card with subtle gradient background.</p>
              <SimpleButton variant="outline">Action</SimpleButton>
            </div>
          </IterationDeckSlide>
        </IterationDeck>
      </section>
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