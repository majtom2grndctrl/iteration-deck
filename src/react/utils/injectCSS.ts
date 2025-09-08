/**
 * @emotion/css styles for iteration deck components
 * Provides better DX with familiar CSS-in-JS patterns while ensuring automatic bundling
 */

import { css } from '@emotion/css';

let stylesInjected = false;

// Base toolbar styles with responsive design and dark mode support
const toolbarStyles = css`
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  align-items: center;
  min-width: 320px;
  gap: 8px;
  padding: 8px;
  border-radius: 40px;
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 14px;
  line-height: 1;
  color: #374151;
  background-color: rgba(229, 231, 235, 0.8);
  border: 1px solid rgba(156, 163, 175, 0.3);

  @media (prefers-color-scheme: dark) {
    color: #e5e7eb;
    background-color: rgba(39, 39, 42, 0.8);
    border: 1px solid rgba(75, 85, 99, 0.3);
  }
`;


const separatorStyles = css`
  width: 1px;
  height: 20px;
  background-color: rgba(156, 163, 175, 0.6);

  @media (prefers-color-scheme: dark) {
    background-color: rgba(107, 114, 128, 0.7);
  }
`;

const navContainerStyles = css`
  display: flex;
  align-items: center;
  gap: 0;
`;

// Deck Selector Styles
const selectorContainerStyles = css`
  position: relative;
  display: flex;
  align-items: center;
`;

const hiddenSelectStyles = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
`;

const selectorDisplayStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 28px;
  min-width: 120px;
  gap: 12px;
  padding: 0 12px;
  background-color: white;
  border: 2px solid #d1d5db;
  border-radius: 24px;
  font-size: 14px;
  font-weight: normal;
  color: #374151;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: #f9fafb;
  }

  @media (prefers-color-scheme: dark) {
    background-color: #1f2937;
    border: 2px solid #4b5563;
    color: #e5e7eb;

    &:hover {
      background-color: #374151;
    }
  }
`;

const selectorLabelStyles = css`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const dropdownArrowStyles = css`
  font-size: 8px;
  color: #6b7280;
  pointer-events: none;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
`;

// Navigation Button Styles
const navigationContainerStyles = css`
  display: flex;
  align-items: center;
  border-radius: 24px;
  border: 2px solid #d1d5db;
  overflow: hidden;
  height: 28px;
  background-color: #e5e7eb;

  @media (prefers-color-scheme: dark) {
    border: 2px solid #4b5563;
    background-color: #4b5563;
  }
`;

const navigationButtonStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 100%;
  background-color: white;
  border: none;
  color: #6b7280;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  transition: all 0.15s ease-out;

  &:hover:not(:disabled) {
    background-color: #f3f4f6;
    color: #374151;
  }

  &:active:not(:disabled) {
    background-color: #e5e7eb;
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  @media (prefers-color-scheme: dark) {
    background-color: #1f2937;
    color: #d1d5db;

    &:hover:not(:disabled) {
      background-color: #374151;
      color: #e5e7eb;
    }

    &:active:not(:disabled) {
      background-color: #4b5563;
    }

    &:disabled {
      background-color: #374151;
      color: #6b7280;
    }
  }
`;

const previousButtonStyles = css`
  ${navigationButtonStyles};
  border-top-left-radius: 24px;
  border-bottom-left-radius: 24px;
`;

const nextButtonStyles = css`
  ${navigationButtonStyles};
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
`;

// Slide Info Styles
const slideInfoStyles = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 8px;
  max-width: 320px;
`;

const slideLabelStyles = css`
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  min-width: 20em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (prefers-color-scheme: dark) {
    color: #e5e7eb;
  }
`;

const slideIndicatorsStyles = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  width: 100%;
`;

const noSlidesStyles = css`
  font-size: 8px;
  color: #ef4444;

  @media (prefers-color-scheme: dark) {
    color: #f87171;
  }
`;

const slideDotStyles = css`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #9ca3af;
  transition: opacity 0.2s;
`;

const slideDotActiveStyles = css`
  ${slideDotStyles};
  opacity: 0.9;
`;

const slideDotInactiveStyles = css`
  ${slideDotStyles};
  opacity: 0.5;
`;

// Export all styles
export const iterationDeckStyles = {
  toolbar: toolbarStyles,
  separator: separatorStyles,
  navContainer: navContainerStyles,
  selectorContainer: selectorContainerStyles,
  hiddenSelect: hiddenSelectStyles,
  selectorDisplay: selectorDisplayStyles,
  selectorLabel: selectorLabelStyles,
  dropdownArrow: dropdownArrowStyles,
  navigationContainer: navigationContainerStyles,
  navigationButton: navigationButtonStyles,
  previousButton: previousButtonStyles,
  nextButton: nextButtonStyles,
  slideInfo: slideInfoStyles,
  slideLabel: slideLabelStyles,
  slideIndicators: slideIndicatorsStyles,
  noSlides: noSlidesStyles,
  slideDot: slideDotStyles,
  slideDotActive: slideDotActiveStyles,
  slideDotInactive: slideDotInactiveStyles,
};

/**
 * Initialize iteration deck styles
 * This ensures styles are automatically loaded when components are used
 * @emotion/css handles the injection automatically
 */
export function injectIterationDeckStyles() {
  if (stylesInjected || typeof document === 'undefined') {
    return;
  }

  // @emotion/css handles automatic style injection
  // Just mark as injected to prevent multiple calls
  stylesInjected = true;
}