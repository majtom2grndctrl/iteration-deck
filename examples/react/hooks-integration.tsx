import React, { useState, useEffect, useRef, useCallback } from 'react';
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

// Custom hook for managing iteration deck state
interface UseIterationDeckOptions {
  onSlideChange?: (slideIndex: number) => void;
  initialSlide?: number;
}

const useIterationDeck = (deckId: string, options: UseIterationDeckOptions = {}) => {
  const [activeSlide, setActiveSlide] = useState(options.initialSlide || 0);
  const [slideCount, setSlideCount] = useState(0);
  const deckRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;

    // Count slides
    const slides = deck.querySelectorAll('iteration-deck-slide');
    setSlideCount(slides.length);

    // Listen for slide changes (if the web component emits events)
    const handleSlideChange = (event: CustomEvent) => {
      const newIndex = event.detail?.slideIndex || 0;
      setActiveSlide(newIndex);
      options.onSlideChange?.(newIndex);
    };

    deck.addEventListener('slideChanged', handleSlideChange as EventListener);

    return () => {
      deck.removeEventListener('slideChanged', handleSlideChange as EventListener);
    };
  }, [options]);

  const nextSlide = useCallback(() => {
    setActiveSlide(prev => Math.min(prev + 1, slideCount - 1));
  }, [slideCount]);

  const prevSlide = useCallback(() => {
    setActiveSlide(prev => Math.max(prev - 1, 0));
  }, []);

  const goToSlide = useCallback((index: number) => {
    setActiveSlide(Math.max(0, Math.min(index, slideCount - 1)));
  }, [slideCount]);

  return {
    activeSlide,
    slideCount,
    nextSlide,
    prevSlide,
    goToSlide,
    deckRef,
  };
};

// Dynamic form component with state
interface FormVariant {
  layout: 'vertical' | 'horizontal' | 'grid';
  style: 'modern' | 'classic' | 'minimal';
}

const DynamicForm: React.FC<FormVariant> = ({ layout, style }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const styles = {
    modern: {
      input: {
        border: '2px solid #e5e7eb',
        borderRadius: '8px',
        padding: '12px 16px',
        fontSize: '16px',
        transition: 'border-color 0.2s',
        background: 'white',
      },
      button: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
      },
    },
    classic: {
      input: {
        border: '1px solid #d1d5db',
        borderRadius: '4px',
        padding: '8px 12px',
        fontSize: '14px',
        background: '#f9fafb',
      },
      button: {
        background: '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '10px 20px',
        fontSize: '14px',
        cursor: 'pointer',
      },
    },
    minimal: {
      input: {
        border: 'none',
        borderBottom: '2px solid #e5e7eb',
        borderRadius: '0',
        padding: '8px 0',
        fontSize: '16px',
        background: 'transparent',
      },
      button: {
        background: 'transparent',
        color: '#3b82f6',
        border: '2px solid #3b82f6',
        borderRadius: '0',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
      },
    },
  };

  const layoutStyles = {
    vertical: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem',
      maxWidth: '400px',
    },
    horizontal: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'end',
      flexWrap: 'wrap' as const,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      maxWidth: '600px',
    },
  };

  if (submitted) {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        background: '#f0fdf4',
        border: '1px solid #22c55e',
        borderRadius: '8px',
        color: '#166534',
      }}>
        <h3>✅ Form Submitted Successfully!</h3>
        <p>Thank you for your message, {formData.name}!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={layoutStyles[layout]}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={styles[style].input}
          required
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={styles[style].input}
          required
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={3}
          style={{
            ...styles[style].input,
            resize: 'vertical' as const,
            fontFamily: 'inherit',
          }}
          required
        />
      </div>

      <button type="submit" style={styles[style].button}>
        Send Message
      </button>
    </form>
  );
};

// Dashboard widget with live data
const DashboardWidget: React.FC<{ variant: 'simple' | 'detailed' | 'chart' }> = ({ variant }) => {
  const [data, setData] = useState({
    users: 1234,
    revenue: 45678,
    growth: 12.5,
  });

  const [isLoading, setIsLoading] = useState(false);

  // Simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        users: prev.users + Math.floor(Math.random() * 10),
        revenue: prev.revenue + Math.floor(Math.random() * 1000),
        growth: prev.growth + (Math.random() - 0.5) * 2,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setData({
        users: Math.floor(Math.random() * 10000),
        revenue: Math.floor(Math.random() * 100000),
        growth: (Math.random() - 0.5) * 50,
      });
      setIsLoading(false);
    }, 1000);
  };

  const variants = {
    simple: (
      <div style={{
        padding: '1.5rem',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        minWidth: '250px',
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#1f2937' }}>Quick Stats</h3>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>
          {data.users.toLocaleString()} users
        </div>
      </div>
    ),
    detailed: (
      <div style={{
        padding: '1.5rem',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        minWidth: '300px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, color: '#1f2937' }}>Dashboard</h3>
          <button
            onClick={refreshData}
            disabled={isLoading}
            style={{
              background: '#f3f4f6',
              border: 'none',
              borderRadius: '4px',
              padding: '4px 8px',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            {isLoading ? '⟳' : '🔄'}
          </button>
        </div>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>
              Total Users
            </div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>
              {data.users.toLocaleString()}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>
              Revenue
            </div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#059669' }}>
              ${data.revenue.toLocaleString()}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>
              Growth
            </div>
            <div style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: data.growth >= 0 ? '#059669' : '#dc2626',
            }}>
              {data.growth >= 0 ? '+' : ''}{data.growth.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    ),
    chart: (
      <div style={{
        padding: '1.5rem',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        minWidth: '350px',
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#1f2937' }}>Performance Chart</h3>
        <div style={{
          height: '120px',
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          marginBottom: '1rem',
        }}>
          📊 Live Chart ({data.users.toLocaleString()} users)
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
          <span style={{ color: '#6b7280' }}>Revenue: ${data.revenue.toLocaleString()}</span>
          <span style={{ color: data.growth >= 0 ? '#059669' : '#dc2626' }}>
            {data.growth >= 0 ? '↗' : '↘'} {Math.abs(data.growth).toFixed(1)}%
          </span>
        </div>
      </div>
    ),
  };

  return variants[variant];
};

// Main App component with hooks integration
const HooksIntegrationApp: React.FC = () => {
  // Custom hook usage
  const formDeck = useIterationDeck('form-variations', {
    onSlideChange: (index) => {
      console.log(`Form deck changed to slide ${index}`);
    },
  });

  const dashboardDeck = useIterationDeck('dashboard-widgets', {
    initialSlide: 1,
  });

  const [selectedFormStyle, setSelectedFormStyle] = useState<'modern' | 'classic' | 'minimal'>('modern');
  const [formSubmissions, setFormSubmissions] = useState(0);

  // Global state for demo
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    console.log('🎛️ React Hooks integration example loaded');
  }, []);

  // Simulate form submissions counter
  const handleFormSubmission = useCallback(() => {
    setFormSubmissions(prev => prev + 1);
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>🎛️ React Hooks Integration</h1>
          <p>Advanced React patterns with Iteration Deck components</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '14px' }}>
            <input
              type="checkbox"
              checked={demoMode}
              onChange={(e) => setDemoMode(e.target.checked)}
            />
            Demo Mode
          </label>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>
            Form Submissions: {formSubmissions}
          </div>
        </div>
      </div>

      {/* Hook State Display */}
      <div style={{
        background: '#f0f9ff',
        padding: '1rem',
        borderRadius: '6px',
        margin: '1rem 0',
        fontSize: '14px',
        borderLeft: '4px solid #3b82f6',
      }}>
        <strong>🔗 Hook State:</strong> Form deck slide {formDeck.activeSlide + 1}/{formDeck.slideCount}, 
        Dashboard deck slide {dashboardDeck.activeSlide + 1}/{dashboardDeck.slideCount}
      </div>

      {/* Form Variations with State */}
      <div style={{
        margin: '3rem 0',
        padding: '2rem',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>Interactive Form Variations</h2>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <label style={{ fontSize: '14px' }}>
              Style: 
              <select
                value={selectedFormStyle}
                onChange={(e) => setSelectedFormStyle(e.target.value as any)}
                style={{ marginLeft: '0.5rem', padding: '4px 8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
              >
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
                <option value="minimal">Minimal</option>
              </select>
            </label>
            <button
              onClick={formDeck.prevSlide}
              disabled={formDeck.activeSlide === 0}
              style={{
                background: '#f3f4f6',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 8px',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              ← Prev
            </button>
            <button
              onClick={formDeck.nextSlide}
              disabled={formDeck.activeSlide === formDeck.slideCount - 1}
              style={{
                background: '#f3f4f6',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 8px',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              Next →
            </button>
          </div>
        </div>

        <iteration-deck
          ref={formDeck.deckRef}
          id="form-variations"
          label="Interactive Forms"
          prompt="Create responsive form layouts with React state management"
        >
          <iteration-deck-slide
            label="Vertical Layout"
            ai-prompt="Stack form fields vertically for mobile-first design"
            confidence={0.94}
          >
            <DynamicForm layout="vertical" style={selectedFormStyle} />
          </iteration-deck-slide>

          <iteration-deck-slide
            label="Horizontal Layout"
            ai-prompt="Arrange fields horizontally for desktop efficiency"
            confidence={0.87}
          >
            <DynamicForm layout="horizontal" style={selectedFormStyle} />
          </iteration-deck-slide>

          <iteration-deck-slide
            label="Grid Layout"
            ai-prompt="Use CSS Grid for responsive form design"
            confidence={0.91}
            notes="Best for complex forms with many fields"
          >
            <DynamicForm layout="grid" style={selectedFormStyle} />
          </iteration-deck-slide>
        </iteration-deck>
      </div>

      {/* Dashboard Widgets with Live Data */}
      <div style={{
        margin: '3rem 0',
        padding: '2rem',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>Live Dashboard Widgets</h2>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {[0, 1, 2].map(index => (
              <button
                key={index}
                onClick={() => dashboardDeck.goToSlide(index)}
                style={{
                  background: dashboardDeck.activeSlide === index ? '#3b82f6' : '#f3f4f6',
                  color: dashboardDeck.activeSlide === index ? 'white' : '#374151',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                Widget {index + 1}
              </button>
            ))}
          </div>
        </div>

        <iteration-deck
          ref={dashboardDeck.deckRef}
          id="dashboard-widgets"
          label="Dashboard Components"
          prompt="Create dashboard widgets with real-time data updates"
        >
          <iteration-deck-slide
            label="Simple Widget"
            ai-prompt="Minimal widget showing key metric"
            confidence={0.92}
          >
            <DashboardWidget variant="simple" />
          </iteration-deck-slide>

          <iteration-deck-slide
            label="Detailed Widget"
            ai-prompt="Comprehensive widget with multiple metrics"
            confidence={0.89}
            notes="Includes refresh functionality"
          >
            <DashboardWidget variant="detailed" />
          </iteration-deck-slide>

          <iteration-deck-slide
            label="Chart Widget"
            ai-prompt="Visual widget with chart representation"
            confidence={0.86}
          >
            <DashboardWidget variant="chart" />
          </iteration-deck-slide>
        </iteration-deck>
      </div>

      {/* Hooks Integration Guide */}
      <div style={{
        margin: '3rem 0',
        padding: '2rem',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}>
        <h2>🔗 React Hooks Integration Patterns</h2>
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
              🎯 Custom Hooks
            </h4>
            <ul style={{ margin: '0', paddingLeft: '1.25rem', color: '#075985', fontSize: '14px' }}>
              <li>Create reusable deck state logic</li>
              <li>Handle slide change events</li>
              <li>Manage multiple deck instances</li>
              <li>Integrate with React lifecycle</li>
            </ul>
          </div>

          <div style={{
            padding: '1.5rem',
            background: '#f0fdf4',
            border: '1px solid #22c55e',
            borderRadius: '8px',
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#166534' }}>
              🚀 State Management
            </h4>
            <ul style={{ margin: '0', paddingLeft: '1.25rem', color: '#15803d', fontSize: '14px' }}>
              <li>useState for local component state</li>
              <li>useEffect for side effects</li>
              <li>useCallback for performance</li>
              <li>useRef for DOM access</li>
            </ul>
          </div>

          <div style={{
            padding: '1.5rem',
            background: '#fef3c7',
            border: '1px solid #f59e0b',
            borderRadius: '8px',
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#92400e' }}>
              👥 Advanced Patterns
            </h4>
            <ul style={{ margin: '0', paddingLeft: '1.25rem', color: '#92400e', fontSize: '14px' }}>
              <li>Context for global deck state</li>
              <li>Refs for imperative control</li>
              <li>Custom events for communication</li>
              <li>Memoization for performance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HooksIntegrationApp;