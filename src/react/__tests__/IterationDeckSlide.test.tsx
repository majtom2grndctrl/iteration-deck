import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { IterationDeckSlide } from '../IterationDeckSlide'

describe('IterationDeckSlide', () => {
  it('should render children', () => {
    render(
      <IterationDeckSlide label="Test Slide">
        <div>Test Content</div>
      </IterationDeckSlide>
    )
    
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('should render with all props', () => {
    render(
      <IterationDeckSlide 
        label="Test Slide" 
        aiPrompt="Test AI prompt"
        notes="Test notes"
        confidence={0.95}
      >
        <div>Test Content</div>
      </IterationDeckSlide>
    )
    
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('should render complex children', () => {
    render(
      <IterationDeckSlide label="Complex Slide">
        <div>
          <h2>Title</h2>
          <p>Paragraph</p>
          <button>Button</button>
        </div>
      </IterationDeckSlide>
    )
    
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Paragraph')).toBeInTheDocument()
    expect(screen.getByText('Button')).toBeInTheDocument()
  })

  it('should render null children gracefully', () => {
    render(
      <IterationDeckSlide label="Null Slide">
        {null}
      </IterationDeckSlide>
    )
    
    // Should not crash, container should still exist
    expect(document.body).toBeInTheDocument()
  })

  it('should render multiple children', () => {
    render(
      <IterationDeckSlide label="Multiple Children">
        <div>First Child</div>
        <div>Second Child</div>
      </IterationDeckSlide>
    )
    
    expect(screen.getByText('First Child')).toBeInTheDocument()
    expect(screen.getByText('Second Child')).toBeInTheDocument()
  })
})