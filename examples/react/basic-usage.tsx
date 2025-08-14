import React, { useEffect } from 'react';
import { defineCustomElements } from 'iteration-deck/loader';

// Initialize the web components
defineCustomElements();

// TypeScript declarations for the custom elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'iteration-deck': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        id: string;
        label?: string;
        prompt?: string;
        description?: string;
        'active-index'?: number;
      };
      'iteration-deck-slide': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        label: string;
        'ai-prompt'?: string;
        notes?: string;
        confidence?: number;
      };
    }
  }
}

// Custom button component for examples
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'gradient';
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ variant, children, onClick }) => {
  const styles = {
    primary: {
      background: '#3b82f6',
      color: 'white',
      border: 'none',
    },
    secondary: {
      background: '#6b7280',
      color: 'white',
      border: 'none',
    },
    outline: {
      background: 'transparent',
      color: '#3b82f6',
      border: '2px solid #3b82f6',
    },
    gradient: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
  };

  return (
    <button
      style={{
        ...styles[variant],
        padding: '12px 24px',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'transform 0.2s',
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {children}
    </button>
  );
};

// Hero section component with different variants
interface HeroProps {
  variant: 'centered' | 'split' | 'minimal';
}

const Hero: React.FC<HeroProps> = ({ variant }) => {
  const variants = {
    centered: (
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '3rem 2rem',
        textAlign: 'center',
        borderRadius: '8px',
      }}>
        <h1 style={{ margin: '0 0 1rem 0', fontSize: '2.5rem' }}>
          Transform Your Workflow
        </h1>
        <p style={{ margin: '0 0 2rem 0', fontSize: '1.25rem', opacity: 0.9 }}>
          Powerful tools for modern teams
        </p>
        <Button variant="primary">Start Free Trial</Button>
      </div>
    ),
    split: (
      <div style={{
        background: '#f3f4f6',
        padding: '2rem',
        display: 'flex',
        gap: '2rem',
        borderRadius: '8px',
        alignItems: 'center',
      }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: '0 0 1rem 0', color: '#1f2937' }}>
            Build Amazing Products
          </h1>
          <p style={{ margin: '0 0 2rem 0', color: '#6b7280' }}>
            Split layout balances content with visual elements for better engagement.
          </p>
          <Button variant="primary">Learn More</Button>
        </div>
        <div style={{
          flex: 1,
          height: '200px',
          background: '#e5e7eb',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6b7280',
        }}>
          📊 Interactive Demo
        </div>
      </div>
    ),
    minimal: (
      <div style={{
        background: 'white',
        padding: '4rem 2rem',
        textAlign: 'center',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
      }}>
        <h1 style={{ margin: '0 0 1rem 0', color: '#1f2937', fontWeight: '400' }}>
          Simple. Powerful. Effective.
        </h1>
        <p style={{ margin: '0 0 2rem 0', color: '#6b7280' }}>
          Minimal design that lets your content shine
        </p>
        <Button variant="outline">Get Started</Button>
      </div>
    ),
  };

  return variants[variant];
};

// Product card component
interface ProductCardProps {
  variant: 'standard' | 'compact' | 'featured';
}

const ProductCard: React.FC<ProductCardProps> = ({ variant }) => {
  const variants = {
    standard: (
      <div style={{
        background: 'white',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        maxWidth: '300px',
      }}>
        <div style={{
          height: '200px',
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '18px',
        }}>
          📱 Product Image
        </div>
        <div style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Premium Plan</h3>
          <p style={{ margin: '0 0 1rem 0', color: '#6b7280' }}>
            Everything you need to scale your business
          </p>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
            $29/month
          </div>
        </div>
      </div>
    ),
    compact: (
      <div style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        padding: '1.5rem',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}>
          📱
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 0.25rem 0' }}>Premium Plan</h3>
          <p style={{ margin: '0 0 0.5rem 0', color: '#6b7280', fontSize: '14px' }}>
            Scale your business
          </p>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>
            $29/month
          </div>
        </div>
      </div>
    ),
    featured: (
      <div style={{ maxWidth: '300px', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: '-8px',
          right: '-8px',
          background: '#f59e0b',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 'bold',
        }}>
          POPULAR
        </div>
        <div style={{
          background: 'white',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}>
          <div style={{
            height: '200px',
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '18px',
          }}>
            ⭐ Featured
          </div>
          <div style={{ padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>Premium Plan</h3>
            <p style={{ margin: '0 0 1rem 0', color: '#6b7280' }}>
              Most popular choice for growing teams
            </p>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '1rem',
            }}>
              $29/month
            </div>
            <Button variant="gradient">Choose Plan</Button>
          </div>
        </div>
      </div>
    ),
  };

  return variants[variant];
};

// Main App component
const App: React.FC = () => {
  useEffect(() => {
    console.log('🎛️ React Iteration Deck example loaded');
  }, []);

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      lineHeight: 1.6,
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      background: '#f8fafc',
    }}>
      <h1>🎛️ Iteration Deck - React Integration</h1>
      <p>
        This example demonstrates how to integrate Iteration Deck components 
        with React components and TypeScript.
      </p>

      <div style={{
        background: '#f1f5f9',
        padding: '1rem',
        borderRadius: '6px',
        margin: '1rem 0',
        fontSize: '14px',
        borderLeft: '4px solid #3b82f6',
      }}>
        <strong>💡 React Integration Tips:</strong>
        <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.25rem' }}>
          <li>Web components work seamlessly with React</li>
          <li>Use TypeScript declarations for type safety</li>
          <li>Initialize components in your app entry point</li>
          <li>Keyboard shortcuts work automatically</li>
        </ul>
      </div>

      {/* Hero Section Variations */}
      <div style={{
        margin: '3rem 0',
        padding: '2rem',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}>
        <h2>Hero Section Variations</h2>
        <p>React components wrapped in Iteration Deck slides</p>

        <iteration-deck
          id="react-heroes"
          label="React Hero Components"
          prompt="Create 3 React hero components with different layouts"
        >
          <iteration-deck-slide
            label="Centered"
            ai-prompt="Bold centered hero with gradient background"
            confidence={0.92}
            notes="High impact design for landing pages"
          >
            <Hero variant="centered" />
          </iteration-deck-slide>

          <iteration-deck-slide
            label="Split Layout"
            ai-prompt="Content left, visual right, professional look"
            confidence={0.87}
          >
            <Hero variant="split" />
          </iteration-deck-slide>

          <iteration-deck-slide
            label="Minimal"
            ai-prompt="Clean minimal design with subtle borders"
            confidence={0.95}
            notes="Best for B2B audiences, converts well"
          >
            <Hero variant="minimal" />
          </iteration-deck-slide>
        </iteration-deck>
      </div>

      {/* Button Variations */}
      <div style={{
        margin: '3rem 0',
        padding: '2rem',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}>
        <h2>Button Component Variations</h2>
        <p>Different button styles with React event handlers</p>

        <iteration-deck
          id="react-buttons"
          label="React Button Components"
          prompt="Create accessible React button component with style variants"
        >
          <iteration-deck-slide
            label="Primary"
            ai-prompt="Bold primary button, high contrast"
            confidence={0.95}
          >
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <Button
                variant="primary"
                onClick={() => alert('Primary button clicked!')}
              >
                Get Started
              </Button>
              <p style={{ marginTop: '1rem', color: '#6b7280', fontSize: '14px' }}>
                High contrast, excellent accessibility
              </p>
            </div>
          </iteration-deck-slide>

          <iteration-deck-slide
            label="Outline"
            ai-prompt="Subtle outline style, professional look"
            confidence={0.87}
          >
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <Button
                variant="outline"
                onClick={() => alert('Outline button clicked!')}
              >
                Get Started
              </Button>
              <p style={{ marginTop: '1rem', color: '#6b7280', fontSize: '14px' }}>
                Subtle, professional appearance
              </p>
            </div>
          </iteration-deck-slide>

          <iteration-deck-slide
            label="Gradient"
            ai-prompt="Eye-catching gradient with depth"
            confidence={0.92}
            notes="Great for hero sections and key CTAs"
          >
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <Button
                variant="gradient"
                onClick={() => alert('Gradient button clicked!')}
              >
                Get Started
              </Button>
              <p style={{ marginTop: '1rem', color: '#6b7280', fontSize: '14px' }}>
                Visual interest with gradient background
              </p>
            </div>
          </iteration-deck-slide>
        </iteration-deck>
      </div>

      {/* Product Card Variations */}
      <div style={{
        margin: '3rem 0',
        padding: '2rem',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}>
        <h2>Product Card Layouts</h2>
        <p>React component variations for product displays</p>

        <iteration-deck
          id="react-cards"
          label="React Product Cards"
          description="Card layouts for e-commerce and SaaS products"
        >
          <iteration-deck-slide label="Standard" confidence={0.91}>
            <ProductCard variant="standard" />
          </iteration-deck-slide>

          <iteration-deck-slide label="Compact" confidence={0.88}>
            <ProductCard variant="compact" />
          </iteration-deck-slide>

          <iteration-deck-slide
            label="Featured"
            confidence={0.93}
            notes="Popular badge increases conversion"
          >
            <ProductCard variant="featured" />
          </iteration-deck-slide>
        </iteration-deck>
      </div>

      {/* React Best Practices */}
      <div style={{
        margin: '3rem 0',
        padding: '2rem',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}>
        <h2>🔧 React Integration Best Practices</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginTop: '1rem',
        }}>
          <div style={{
            padding: '1.5rem',
            background: '#f0f9ff',
            border: '1px solid #0ea5e9',
            borderRadius: '8px',
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#0369a1' }}>
              🎯 Component Integration
            </h4>
            <ul style={{ margin: '0', paddingLeft: '1.25rem', color: '#075985' }}>
              <li>Initialize web components in your app root</li>
              <li>Use TypeScript declarations for type safety</li>
              <li>Wrap your React components in slides</li>
              <li>Event handlers work normally</li>
            </ul>
          </div>

          <div style={{
            padding: '1.5rem',
            background: '#f0fdf4',
            border: '1px solid #22c55e',
            borderRadius: '8px',
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#166534' }}>
              🚀 Performance Tips
            </h4>
            <ul style={{ margin: '0', paddingLeft: '1.25rem', color: '#15803d' }}>
              <li>Lazy load heavy components</li>
              <li>Use React.memo for optimization</li>
              <li>Leverage web component lifecycle</li>
              <li>Production builds hide dev tools</li>
            </ul>
          </div>

          <div style={{
            padding: '1.5rem',
            background: '#fef3c7',
            border: '1px solid #f59e0b',
            borderRadius: '8px',
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#92400e' }}>
              👥 Team Workflow
            </h4>
            <ul style={{ margin: '0', paddingLeft: '1.25rem', color: '#92400e' }}>
              <li>Share live React prototypes</li>
              <li>Compare component variants</li>
              <li>Track AI generation context</li>
              <li>Present to stakeholders</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;