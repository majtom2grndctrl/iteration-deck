import { useState } from 'react'
import { IterationDeck } from './react/IterationDeck'
import { IterationDeckSlide } from './react/IterationDeckSlide'
import './App.css'

// Demo components for different button variations
function PrimaryButton({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s',
      boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'
    }}>
      {children}
    </button>
  )
}

function OutlineButton({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{
      backgroundColor: 'transparent',
      color: '#3b82f6',
      padding: '12px 24px',
      border: '2px solid #3b82f6',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s'
    }}>
      {children}
    </button>
  )
}

function GradientButton({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
    }}>
      {children}
    </button>
  )
}

// Demo components for different card layouts
function StandardCard() {
  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px'
    }}>
      <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600' }}>
        Standard Card
      </h3>
      <p style={{ margin: '0', color: '#6b7280', lineHeight: '1.5' }}>
        This is a standard card layout with a simple border and subtle shadow.
      </p>
    </div>
  )
}

function ElevatedCard() {
  return (
    <div style={{
      backgroundColor: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '32px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
      maxWidth: '400px'
    }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: '700' }}>
        Elevated Card
      </h3>
      <p style={{ margin: '0', color: '#4b5563', lineHeight: '1.6' }}>
        This card has more pronounced elevation with deeper shadows and increased padding.
      </p>
    </div>
  )
}

function MinimalCard() {
  return (
    <div style={{
      backgroundColor: 'transparent',
      border: 'none',
      borderLeft: '4px solid #3b82f6',
      padding: '20px',
      maxWidth: '400px'
    }}>
      <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600' }}>
        Minimal Card
      </h3>
      <p style={{ margin: '0', color: '#6b7280', lineHeight: '1.5' }}>
        A minimal approach with just a colored border accent.
      </p>
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>
        Iteration Deck Demo
      </h1>
      
      <p style={{ textAlign: 'center', marginBottom: '60px', color: '#6b7280' }}>
        This demo shows multiple IterationDeck components. Use the toolbar at the bottom
        to navigate between variations. Try keyboard shortcuts: Ctrl/Cmd + Arrow Keys
      </p>

      <section style={{ marginBottom: '80px' }}>
        <h2 style={{ marginBottom: '32px' }}>Button Variations</h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <IterationDeck 
            id="cta-buttons" 
            label="Call to Action Buttons"
            prompt="Create a modern, accessible CTA button with 3 style variations"
          >
            <IterationDeckSlide 
              label="Primary" 
              aiPrompt="Make it bold and attention-grabbing"
              confidence={0.95}
            >
              <PrimaryButton>Get Started</PrimaryButton>
            </IterationDeckSlide>
            <IterationDeckSlide 
              label="Outline" 
              aiPrompt="More understated, professional look"
              confidence={0.87}
            >
              <OutlineButton>Get Started</OutlineButton>
            </IterationDeckSlide>
            <IterationDeckSlide 
              label="Gradient" 
              aiPrompt="Add visual interest with gradient background"
              confidence={0.92}
              notes="Designer preferred this for hero section"
            >
              <GradientButton>Get Started</GradientButton>
            </IterationDeckSlide>
          </IterationDeck>
        </div>
      </section>

      <section style={{ marginBottom: '80px' }}>
        <h2 style={{ marginBottom: '32px' }}>Card Layouts</h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <IterationDeck 
            id="card-layouts" 
            label="Card Components"
            prompt="Design 3 different card layout variations"
          >
            <IterationDeckSlide 
              label="Standard"
              aiPrompt="Traditional card with border and light shadow"
            >
              <StandardCard />
            </IterationDeckSlide>
            <IterationDeckSlide 
              label="Elevated"
              aiPrompt="More dramatic elevation with deeper shadows"
            >
              <ElevatedCard />
            </IterationDeckSlide>
            <IterationDeckSlide 
              label="Minimal"
              aiPrompt="Clean, minimal approach with accent border"
            >
              <MinimalCard />
            </IterationDeckSlide>
          </IterationDeck>
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '32px' }}>Interactive Counter</h2>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px' }}>
          <IterationDeck 
            id="counter-buttons" 
            label="Counter Buttons"
          >
            <IterationDeckSlide label="Primary Style">
              <PrimaryButton onClick={() => setCount(count + 1)}>
                Count: {count}
              </PrimaryButton>
            </IterationDeckSlide>
            <IterationDeckSlide label="Outline Style">
              <OutlineButton onClick={() => setCount(count + 1)}>
                Count: {count}
              </OutlineButton>
            </IterationDeckSlide>
            <IterationDeckSlide label="Gradient Style">
              <GradientButton onClick={() => setCount(count + 1)}>
                Count: {count}
              </GradientButton>
            </IterationDeckSlide>
          </IterationDeck>
          <button 
            onClick={() => setCount(0)}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#f3f4f6', 
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Reset
          </button>
        </div>
      </section>
    </div>
  )
}

export default App
