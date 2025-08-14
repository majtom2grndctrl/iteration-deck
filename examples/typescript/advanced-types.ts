/**
 * Advanced TypeScript Integration with Iteration Deck Components
 * 
 * This example demonstrates type-safe usage patterns, custom interfaces,
 * and advanced TypeScript features with Iteration Deck components.
 */

import { defineCustomElements } from 'iteration-deck/loader';

// Initialize the web components
defineCustomElements();

// ============================================================================
// Type Definitions and Interfaces
// ============================================================================

/**
 * Comprehensive type definitions for Iteration Deck components
 */
interface IterationDeckElement extends HTMLElement {
  id: string;
  label?: string;
  prompt?: string;
  description?: string;
  activeIndex: number;
  // Add methods if the web component exposes them
  nextSlide?(): void;
  previousSlide?(): void;
  goToSlide?(index: number): void;
}

interface IterationDeckSlideElement extends HTMLElement {
  label: string;
  aiPrompt?: string;
  notes?: string;
  confidence?: number;
}

/**
 * AI-generated component variations with strict typing
 */
interface ComponentVariation<T = any> {
  id: string;
  label: string;
  aiPrompt: string;
  confidence: number;
  notes?: string;
  component: T;
  metadata: {
    generated: Date;
    model: string;
    tokens?: number;
    temperature?: number;
  };
}

/**
 * Design system component props with strict variants
 */
interface ButtonVariation {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  children: string;
}

interface CardVariation {
  layout: 'standard' | 'compact' | 'featured' | 'minimal';
  theme: 'light' | 'dark' | 'gradient' | 'outline';
  elevation: 0 | 1 | 2 | 3 | 4;
  interactive?: boolean;
  content: {
    title: string;
    description: string;
    image?: string;
    tags?: string[];
    meta?: Record<string, any>;
  };
}

interface FormVariation {
  layout: 'vertical' | 'horizontal' | 'grid' | 'inline';
  style: 'modern' | 'classic' | 'minimal' | 'neumorphism';
  validation: 'onBlur' | 'onChange' | 'onSubmit';
  fields: FormField[];
}

interface FormField {
  name: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'url' | 'textarea' | 'select' | 'checkbox' | 'radio';
  label: string;
  placeholder?: string;
  required: boolean;
  validation?: RegExp | ((value: any) => boolean | string);
  options?: string[]; // for select/radio
}

/**
 * AI workflow tracking types
 */
interface AIGenerationContext {
  session: string;
  model: string;
  temperature: number;
  maxTokens: number;
  prompt: string;
  systemPrompt?: string;
  userContext?: Record<string, any>;
  iterations: number;
  timestamp: Date;
}

interface ConfidenceScore {
  overall: number; // 0-1
  breakdown: {
    design: number;
    accessibility: number;
    performance: number;
    usability: number;
    brandConsistency: number;
  };
  reasoning: string[];
}

/**
 * Design review and feedback system
 */
interface DesignFeedback {
  reviewer: {
    name: string;
    role: 'designer' | 'pm' | 'engineer' | 'stakeholder';
    department?: string;
  };
  timestamp: Date;
  feedback: {
    rating: 1 | 2 | 3 | 4 | 5;
    comments: string;
    tags: ('approved' | 'needs-revision' | 'blocked' | 'favorite')[];
    suggestions?: string[];
  };
  slideId: string;
  deckId: string;
}

// ============================================================================
// Type-Safe Component Generators
// ============================================================================

/**
 * Type-safe button generator with AI context
 */
function generateButtonVariations(
  context: AIGenerationContext
): ComponentVariation<ButtonVariation>[] {
  return [
    {
      id: 'btn-primary-modern',
      label: 'Primary Modern',
      aiPrompt: 'Create a modern primary button with high contrast and accessibility',
      confidence: 0.95,
      notes: 'Excellent for main CTAs, passes WCAG AA',
      component: {
        variant: 'primary',
        size: 'md',
        children: 'Get Started',
      },
      metadata: {
        generated: new Date(),
        model: context.model,
        tokens: 150,
        temperature: context.temperature,
      },
    },
    {
      id: 'btn-outline-professional',
      label: 'Outline Professional',
      aiPrompt: 'Design a professional outline button for secondary actions',
      confidence: 0.87,
      notes: 'Great for secondary CTAs, subtle but clear',
      component: {
        variant: 'outline',
        size: 'md',
        children: 'Learn More',
      },
      metadata: {
        generated: new Date(),
        model: context.model,
        tokens: 140,
        temperature: context.temperature,
      },
    },
    {
      id: 'btn-ghost-minimal',
      label: 'Ghost Minimal',
      aiPrompt: 'Create a minimal ghost button for subtle interactions',
      confidence: 0.92,
      notes: 'Perfect for navigation, low visual weight',
      component: {
        variant: 'ghost',
        size: 'md',
        children: 'Cancel',
      },
      metadata: {
        generated: new Date(),
        model: context.model,
        tokens: 120,
        temperature: context.temperature,
      },
    },
  ];
}

/**
 * Type-safe card generator with confidence scoring
 */
function generateCardVariations(
  aiContext: AIGenerationContext,
  contentData: CardVariation['content']
): ComponentVariation<CardVariation>[] {
  return [
    {
      id: 'card-standard-light',
      label: 'Standard Light',
      aiPrompt: 'Design a clean, standard card with light theme and good readability',
      confidence: 0.91,
      component: {
        layout: 'standard',
        theme: 'light',
        elevation: 2,
        interactive: true,
        content: contentData,
      },
      metadata: {
        generated: new Date(),
        model: aiContext.model,
        tokens: 200,
        temperature: aiContext.temperature,
      },
    },
    {
      id: 'card-featured-gradient',
      label: 'Featured Gradient',
      aiPrompt: 'Create an eye-catching featured card with gradient background',
      confidence: 0.88,
      notes: 'High visual impact, use sparingly for featured content',
      component: {
        layout: 'featured',
        theme: 'gradient',
        elevation: 3,
        interactive: true,
        content: {
          ...contentData,
          tags: [...(contentData.tags || []), 'featured', 'popular'],
        },
      },
      metadata: {
        generated: new Date(),
        model: aiContext.model,
        tokens: 180,
        temperature: aiContext.temperature,
      },
    },
    {
      id: 'card-minimal-outline',
      label: 'Minimal Outline',
      aiPrompt: 'Design a minimal card with subtle outline for content-heavy layouts',
      confidence: 0.94,
      notes: 'Perfect for content lists, minimal visual distraction',
      component: {
        layout: 'minimal',
        theme: 'outline',
        elevation: 0,
        interactive: false,
        content: contentData,
      },
      metadata: {
        generated: new Date(),
        model: aiContext.model,
        tokens: 160,
        temperature: aiContext.temperature,
      },
    },
  ];
}

/**
 * Advanced confidence scoring with breakdown
 */
function calculateConfidenceScore(
  variation: ComponentVariation,
  userFeedback?: DesignFeedback[]
): ConfidenceScore {
  // Base confidence from AI generation
  const baseConfidence = variation.confidence;
  
  // User feedback influence
  const feedbackScore = userFeedback?.length 
    ? userFeedback.reduce((sum, fb) => sum + fb.feedback.rating, 0) / (userFeedback.length * 5)
    : 0.5;

  // Component-specific scoring logic
  const accessibilityScore = 0.9; // Would be calculated based on actual accessibility checks
  const performanceScore = 0.85;  // Would be calculated based on performance metrics
  const usabilityScore = 0.88;    // Would be calculated based on user testing
  const brandScore = 0.92;        // Would be calculated based on brand guidelines

  return {
    overall: (baseConfidence * 0.4) + (feedbackScore * 0.6),
    breakdown: {
      design: baseConfidence,
      accessibility: accessibilityScore,
      performance: performanceScore,
      usability: usabilityScore,
      brandConsistency: brandScore,
    },
    reasoning: [
      `AI confidence: ${(baseConfidence * 100).toFixed(1)}%`,
      `User feedback: ${feedbackScore ? `${(feedbackScore * 100).toFixed(1)}% (${userFeedback?.length} reviews)` : 'No feedback yet'}`,
      'Accessibility score based on WCAG 2.2 compliance',
      'Performance score based on bundle size and render time',
    ],
  };
}

// ============================================================================
// Type-Safe Iteration Deck Manager
// ============================================================================

/**
 * Comprehensive deck management with type safety
 */
class TypeSafeIterationDeckManager {
  private decks = new Map<string, IterationDeckElement>();
  private variations = new Map<string, ComponentVariation[]>();
  private feedback = new Map<string, DesignFeedback[]>();
  private aiContext: AIGenerationContext;

  constructor(aiContext: AIGenerationContext) {
    this.aiContext = aiContext;
  }

  /**
   * Register a deck with type checking
   */
  registerDeck(deckElement: IterationDeckElement): void {
    this.decks.set(deckElement.id, deckElement);
    console.log(`✅ Registered deck: ${deckElement.id} (${deckElement.label || 'Unlabeled'})`);
  }

  /**
   * Add variations with full type safety
   */
  addVariations<T>(deckId: string, variations: ComponentVariation<T>[]): void {
    if (!this.decks.has(deckId)) {
      throw new Error(`Deck ${deckId} not found. Register the deck first.`);
    }

    this.variations.set(deckId, variations);
    console.log(`🎛️ Added ${variations.length} variations to deck: ${deckId}`);
  }

  /**
   * Add feedback with validation
   */
  addFeedback(feedback: DesignFeedback): void {
    const key = `${feedback.deckId}-${feedback.slideId}`;
    const existing = this.feedback.get(key) || [];
    existing.push(feedback);
    this.feedback.set(key, existing);
    
    console.log(`💬 Added feedback from ${feedback.reviewer.name} (${feedback.reviewer.role})`);
  }

  /**
   * Get comprehensive analysis for a variation
   */
  getVariationAnalysis(deckId: string, variationId: string): {
    variation: ComponentVariation;
    confidence: ConfidenceScore;
    feedback: DesignFeedback[];
    recommendations: string[];
  } {
    const variations = this.variations.get(deckId);
    if (!variations) {
      throw new Error(`No variations found for deck: ${deckId}`);
    }

    const variation = variations.find(v => v.id === variationId);
    if (!variation) {
      throw new Error(`Variation ${variationId} not found in deck: ${deckId}`);
    }

    const feedbackKey = `${deckId}-${variationId}`;
    const feedback = this.feedback.get(feedbackKey) || [];
    const confidence = calculateConfidenceScore(variation, feedback);

    const recommendations: string[] = [];
    
    // Generate recommendations based on confidence scores
    if (confidence.breakdown.accessibility < 0.8) {
      recommendations.push('🔴 Improve accessibility: Add ARIA labels, check color contrast');
    }
    
    if (confidence.breakdown.performance < 0.8) {
      recommendations.push('🟡 Optimize performance: Consider code splitting or lazy loading');
    }
    
    if (feedback.length === 0) {
      recommendations.push('💡 Get stakeholder feedback: Share this variation for review');
    }
    
    if (confidence.overall > 0.9) {
      recommendations.push('✅ Ready for production: High confidence score');
    }

    return {
      variation,
      confidence,
      feedback,
      recommendations,
    };
  }

  /**
   * Export analysis report as JSON
   */
  exportAnalysisReport(): Record<string, any> {
    const report: Record<string, any> = {
      meta: {
        generated: new Date().toISOString(),
        aiContext: this.aiContext,
        totalDecks: this.decks.size,
        totalVariations: Array.from(this.variations.values()).flat().length,
        totalFeedback: Array.from(this.feedback.values()).flat().length,
      },
      decks: {},
    };

    for (const [deckId, variations] of this.variations) {
      report.decks[deckId] = {
        variations: variations.map(variation => ({
          ...variation,
          analysis: this.getVariationAnalysis(deckId, variation.id),
        })),
      };
    }

    return report;
  }
}

// ============================================================================
// Usage Examples and Demo Setup
// ============================================================================

/**
 * Demo setup with full type safety
 */
function setupTypeScriptDemo(): void {
  // Create AI context
  const aiContext: AIGenerationContext = {
    session: 'demo-session-' + Date.now(),
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2000,
    prompt: 'Generate modern, accessible UI components following design system principles',
    systemPrompt: 'You are a senior UI/UX designer with expertise in accessibility and modern design patterns.',
    iterations: 1,
    timestamp: new Date(),
  };

  // Initialize deck manager
  const deckManager = new TypeSafeIterationDeckManager(aiContext);

  // Sample content data
  const productCardContent: CardVariation['content'] = {
    title: 'Premium Plan',
    description: 'Everything you need to scale your business',
    image: '/images/product-premium.jpg',
    tags: ['popular', 'recommended'],
    meta: {
      price: '$29/month',
      features: ['Unlimited users', 'Advanced analytics', '24/7 support'],
      badge: 'Most Popular',
    },
  };

  // Generate variations
  const buttonVariations = generateButtonVariations(aiContext);
  const cardVariations = generateCardVariations(aiContext, productCardContent);

  // Register decks (this would happen when DOM elements are created)
  console.log('🎛️ TypeScript demo setup complete');
  console.log('Generated variations:');
  console.log('- Buttons:', buttonVariations.length);
  console.log('- Cards:', cardVariations.length);

  // Example feedback
  const sampleFeedback: DesignFeedback = {
    reviewer: {
      name: 'Sarah Johnson',
      role: 'designer',
      department: 'Product Design',
    },
    timestamp: new Date(),
    feedback: {
      rating: 4,
      comments: 'Great accessibility compliance, but could use more visual hierarchy',
      tags: ['approved'],
      suggestions: ['Increase font weight for titles', 'Add subtle shadow for depth'],
    },
    slideId: 'btn-primary-modern',
    deckId: 'button-variations',
  };

  // This demonstrates the type safety - uncomment to see TypeScript errors:
  // const invalidFeedback: DesignFeedback = {
  //   reviewer: {
  //     name: 'Invalid',
  //     role: 'invalid-role', // ❌ TypeScript error
  //   },
  //   feedback: {
  //     rating: 6, // ❌ TypeScript error - rating must be 1-5
  //   }
  // };

  console.log('✅ TypeScript integration demo loaded successfully');
}

// Initialize the demo
setupTypeScriptDemo();

// ============================================================================
// Export types for use in other files
// ============================================================================

export type {
  IterationDeckElement,
  IterationDeckSlideElement,
  ComponentVariation,
  ButtonVariation,
  CardVariation,
  FormVariation,
  FormField,
  AIGenerationContext,
  ConfidenceScore,
  DesignFeedback,
};

export {
  TypeSafeIterationDeckManager,
  generateButtonVariations,
  generateCardVariations,
  calculateConfidenceScore,
};