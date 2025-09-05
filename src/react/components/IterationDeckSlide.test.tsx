/**
 * IterationDeckSlide Component Tests
 * 
 * Tests the React IterationDeckSlide component functionality:
 * - Basic rendering and props handling
 * - Data attributes for slide metadata
 * - Imperative handle interface
 * - Accessibility features
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { IterationDeckSlide, type IterationDeckSlideRef } from './IterationDeckSlide';

describe('IterationDeckSlide', () => {
  describe('Basic Rendering', () => {
    test('renders children correctly', () => {
      render(
        <IterationDeckSlide label="Test Slide">
          <div>Slide Content</div>
        </IterationDeckSlide>
      );

      expect(screen.getByText('Slide Content')).toBeInTheDocument();
    });

    test('renders with all metadata props', () => {
      render(
        <IterationDeckSlide 
          label="Test Slide"
          aiPrompt="Make it blue"
          notes="Designer feedback"
          confidence={0.85}
        >
          <div>Content</div>
        </IterationDeckSlide>
      );

      const slideElement = screen.getByText('Content').parentElement;
      
      expect(slideElement).toHaveAttribute('data-iteration-deck-slide', 'true');
      expect(slideElement).toHaveAttribute('data-slide-label', 'Test Slide');
      expect(slideElement).toHaveAttribute('data-slide-ai-prompt', 'Make it blue');
      expect(slideElement).toHaveAttribute('data-slide-notes', 'Designer feedback');
      expect(slideElement).toHaveAttribute('data-slide-confidence', '0.85');
    });

    test('handles missing optional props gracefully', () => {
      render(
        <IterationDeckSlide label="Test Slide">
          <div>Content</div>
        </IterationDeckSlide>
      );

      const slideElement = screen.getByText('Content').parentElement;
      
      expect(slideElement).toHaveAttribute('data-slide-label', 'Test Slide');
      // React doesn't render undefined attributes at all
      expect(slideElement).not.toHaveAttribute('data-slide-ai-prompt');
      expect(slideElement).not.toHaveAttribute('data-slide-notes');  
      expect(slideElement).not.toHaveAttribute('data-slide-confidence');
    });

    test('applies className and style props', () => {
      const customStyle = { backgroundColor: 'blue', margin: '10px' };
      
      render(
        <IterationDeckSlide 
          label="Test Slide"
          className="custom-slide-class"
          style={customStyle}
        >
          <div>Content</div>
        </IterationDeckSlide>
      );

      const slideElement = screen.getByText('Content').parentElement as HTMLElement;
      
      expect(slideElement).toHaveClass('custom-slide-class');
      expect(slideElement.style.backgroundColor).toBe('blue');
      expect(slideElement.style.margin).toBe('10px');
    });

    test('forwards other HTML props', () => {
      render(
        <IterationDeckSlide 
          label="Test Slide"
          data-testid="custom-slide"
          role="tabpanel"
        >
          <div>Content</div>
        </IterationDeckSlide>
      );

      const slideElement = screen.getByTestId('custom-slide');
      expect(slideElement).toHaveAttribute('role', 'tabpanel');
    });
  });

  describe('Content Rendering', () => {
    test('renders text content', () => {
      render(
        <IterationDeckSlide label="Text Slide">
          Simple text content
        </IterationDeckSlide>
      );

      expect(screen.getByText('Simple text content')).toBeInTheDocument();
    });

    test('renders complex JSX content', () => {
      render(
        <IterationDeckSlide label="Complex Slide">
          <div>
            <h2>Title</h2>
            <p>Paragraph content</p>
            <button>Action Button</button>
          </div>
        </IterationDeckSlide>
      );

      expect(screen.getByRole('heading', { name: 'Title' })).toBeInTheDocument();
      expect(screen.getByText('Paragraph content')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Action Button' })).toBeInTheDocument();
    });

    test('renders multiple child elements', () => {
      render(
        <IterationDeckSlide label="Multi-child Slide">
          <span>First child</span>
          <span>Second child</span>
          <span>Third child</span>
        </IterationDeckSlide>
      );

      expect(screen.getByText('First child')).toBeInTheDocument();
      expect(screen.getByText('Second child')).toBeInTheDocument();
      expect(screen.getByText('Third child')).toBeInTheDocument();
    });

    test('handles null/undefined children', () => {
      render(
        <IterationDeckSlide label="Empty Slide">
          {null}
          {undefined}
        </IterationDeckSlide>
      );

      // Should render without crashing
      const slideElement = document.querySelector('[data-iteration-deck-slide="true"]');
      expect(slideElement).toBeInTheDocument();
    });
  });

  describe('Imperative Handle', () => {
    test('provides getSlideData method via ref', () => {
      const slideRef = React.createRef<IterationDeckSlideRef>();
      
      render(
        <IterationDeckSlide 
          ref={slideRef}
          label="Test Slide"
          aiPrompt="Test prompt"
          notes="Test notes"
          confidence={0.9}
        >
          <div>Content</div>
        </IterationDeckSlide>
      );

      const slideData = slideRef.current?.getSlideData();
      
      expect(slideData).toEqual({
        label: 'Test Slide',
        aiPrompt: 'Test prompt',
        notes: 'Test notes',
        confidence: 0.9
      });
    });

    test('provides element access via ref', () => {
      const slideRef = React.createRef<IterationDeckSlideRef>();
      
      render(
        <IterationDeckSlide ref={slideRef} label="Test Slide">
          <div>Content</div>
        </IterationDeckSlide>
      );

      const element = slideRef.current?.element;
      
      expect(element).toBeInstanceOf(HTMLDivElement);
      expect(element).toHaveAttribute('data-iteration-deck-slide', 'true');
      expect(element).toContainHTML('<div>Content</div>');
    });

    test('handles partial metadata in getSlideData', () => {
      const slideRef = React.createRef<IterationDeckSlideRef>();
      
      render(
        <IterationDeckSlide 
          ref={slideRef}
          label="Minimal Slide"
          // aiPrompt, notes, confidence omitted
        >
          <div>Content</div>
        </IterationDeckSlide>
      );

      const slideData = slideRef.current?.getSlideData();
      
      expect(slideData).toEqual({
        label: 'Minimal Slide',
        aiPrompt: undefined,
        notes: undefined,
        confidence: undefined
      });
    });
  });

  describe('Data Attributes', () => {
    test('sets correct data attributes for AI metadata', () => {
      render(
        <IterationDeckSlide 
          label="AI Generated Button"
          aiPrompt="Create a modern, accessible button with hover effects"
          notes="Designer approved with minor spacing adjustments"
          confidence={0.92}
        >
          <button>Click me</button>
        </IterationDeckSlide>
      );

      const slideElement = screen.getByRole('button').parentElement;
      
      expect(slideElement).toHaveAttribute('data-slide-label', 'AI Generated Button');
      expect(slideElement).toHaveAttribute('data-slide-ai-prompt', 'Create a modern, accessible button with hover effects');
      expect(slideElement).toHaveAttribute('data-slide-notes', 'Designer approved with minor spacing adjustments');
      expect(slideElement).toHaveAttribute('data-slide-confidence', '0.92');
    });

    test('handles special characters in metadata', () => {
      render(
        <IterationDeckSlide 
          label='Slide with "quotes" & symbols'
          aiPrompt="Prompt with <tags> and & symbols"
          notes="Notes with émojis 🚀 and special chars"
        >
          <div>Content</div>
        </IterationDeckSlide>
      );

      const slideElement = screen.getByText('Content').parentElement;
      
      expect(slideElement).toHaveAttribute('data-slide-label', 'Slide with "quotes" & symbols');
      expect(slideElement).toHaveAttribute('data-slide-ai-prompt', 'Prompt with <tags> and & symbols');
      expect(slideElement).toHaveAttribute('data-slide-notes', 'Notes with émojis 🚀 and special chars');
    });

    test('converts numeric confidence to string', () => {
      render(
        <IterationDeckSlide 
          label="Test"
          confidence={1}
        >
          <div>Content</div>
        </IterationDeckSlide>
      );

      const slideElement = screen.getByText('Content').parentElement;
      expect(slideElement).toHaveAttribute('data-slide-confidence', '1');
    });

    test('handles zero confidence value', () => {
      render(
        <IterationDeckSlide 
          label="Test"
          confidence={0}
        >
          <div>Content</div>
        </IterationDeckSlide>
      );

      const slideElement = screen.getByText('Content').parentElement;
      expect(slideElement).toHaveAttribute('data-slide-confidence', '0');
    });
  });

  describe('Component Structure', () => {
    test('uses div as root element', () => {
      render(
        <IterationDeckSlide label="Test">
          <span>Content</span>
        </IterationDeckSlide>
      );

      const slideElement = screen.getByText('Content').parentElement;
      expect(slideElement?.tagName.toLowerCase()).toBe('div');
    });

    test('maintains proper nesting structure', () => {
      render(
        <IterationDeckSlide label="Test">
          <div className="inner-wrapper">
            <p>Nested content</p>
          </div>
        </IterationDeckSlide>
      );

      const slideElement = document.querySelector('[data-iteration-deck-slide="true"]');
      const innerWrapper = slideElement?.querySelector('.inner-wrapper');
      const paragraph = innerWrapper?.querySelector('p');
      
      expect(slideElement).toBeInTheDocument();
      expect(innerWrapper).toBeInTheDocument();
      expect(paragraph).toHaveTextContent('Nested content');
    });

    test('preserves child component props', () => {
      const CustomComponent = ({ className, children }: { className?: string; children?: React.ReactNode }) => (
        <div className={className}>{children}</div>
      );

      render(
        <IterationDeckSlide label="Test">
          <CustomComponent className="preserved-class">
            Component content
          </CustomComponent>
        </IterationDeckSlide>
      );

      expect(document.querySelector('.preserved-class')).toHaveTextContent('Component content');
    });
  });

  describe('Display Name', () => {
    test('has correct displayName for debugging', () => {
      expect(IterationDeckSlide.displayName).toBe('IterationDeckSlide');
    });
  });
});