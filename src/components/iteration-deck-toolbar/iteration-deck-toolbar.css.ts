import { style, globalStyle, keyframes } from '@vanilla-extract/css';
import { tokens } from '../../styles/design-tokens.css';
import { frostedGlass, pillShape, buttonReset, focusRing, flexBetween, flexCenter } from '../../styles/utilities.css';

// Host styles - fixed positioning at bottom center
export const host = style({
  position: 'fixed',
  bottom: tokens.space.space200,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: tokens.zIndex.overlay,
  pointerEvents: 'none', // Allow clicks to pass through
});

// Main toolbar container
export const toolbar = style([
  frostedGlass,
  pillShape,
  flexBetween,
  {
    pointerEvents: 'auto', // Re-enable pointer events for the toolbar itself
    padding: `${tokens.space.space100} ${tokens.space.space200}`,
    minHeight: tokens.sizes.toolbarHeight,
    minWidth: '200px',
    maxWidth: '400px',
    gap: tokens.space.space200,
    boxShadow: tokens.shadows.lg,
    // Animation will be applied via globalStyle below
  }
]);

// Deck selector dropdown
export const deckSelector = style([
  buttonReset,
  focusRing,
  {
    background: 'transparent',
    border: `1px solid ${tokens.colors.border}`,
    borderRadius: tokens.radii.base,
    padding: `${tokens.space.space75} ${tokens.space.space100}`,
    fontSize: tokens.fontSizes.sm,
    fontFamily: tokens.fonts.system,
    color: tokens.colors.text,
    cursor: 'pointer',
    transition: tokens.transitions.fast,
    minWidth: '120px',
    textAlign: 'left',
    
    selectors: {
      '&:hover': {
        background: tokens.colors.gray100,
      },
    }
  }
]);

// Navigation controls container
export const navControls = style([
  flexCenter,
  {
    gap: tokens.space.space50,
  }
]);

// Navigation buttons
export const navButton = style([
  buttonReset,
  focusRing,
  flexCenter,
  {
    width: tokens.sizes.touchTarget,
    height: tokens.sizes.touchTarget,
    borderRadius: tokens.radii.base,
    background: 'transparent',
    border: `1px solid ${tokens.colors.border}`,
    color: tokens.colors.gray600,
    fontSize: tokens.fontSizes.sm,
    transition: tokens.transitions.fast,
    cursor: 'pointer',
    
    selectors: {
      '&:hover': {
        background: tokens.colors.gray100,
        color: tokens.colors.gray700,
      },
      
      '&:disabled': {
        opacity: '0.5',
        cursor: 'not-allowed',
      },
      
      '&:disabled:hover': {
        background: 'transparent',
        color: tokens.colors.gray600,
      }
    }
  }
]);

// Slide info display
export const slideInfo = style({
  fontSize: tokens.fontSizes.sm,
  color: tokens.colors.gray700,
  fontWeight: tokens.fontWeights.medium,
  fontFamily: tokens.fonts.system,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '150px',
});

// Dropdown menu (when expanded)
export const dropdownMenu = style({
  position: 'absolute',
  bottom: '100%',
  left: 0,
  marginBottom: tokens.space.space100,
  background: tokens.colors.white,
  border: `1px solid ${tokens.colors.border}`,
  borderRadius: tokens.radii.lg,
  boxShadow: tokens.shadows.lg,
  backdropFilter: 'blur(12px)',
  minWidth: '200px',
  maxHeight: '200px',
  overflowY: 'auto',
  zIndex: tokens.zIndex.modal,
});

export const dropdownItem = style([
  buttonReset,
  focusRing,
  {
    display: 'block',
    width: '100%',
    padding: `${tokens.space.space100} ${tokens.space.space200}`,
    fontSize: tokens.fontSizes.sm,
    fontFamily: tokens.fonts.system,
    color: tokens.colors.text,
    textAlign: 'left',
    cursor: 'pointer',
    transition: tokens.transitions.fast,
    
    selectors: {
      '&:hover': {
        background: tokens.colors.gray50,
      },
      
      '&:first-child': {
        borderTopLeftRadius: tokens.radii.lg,
        borderTopRightRadius: tokens.radii.lg,
      },
      
      '&:last-child': {
        borderBottomLeftRadius: tokens.radii.lg,
        borderBottomRightRadius: tokens.radii.lg,
      }
    }
  }
]);

export const dropdownItemActive = style({
  background: tokens.colors.primary50,
  color: tokens.colors.primary700,
  fontWeight: tokens.fontWeights.medium,
});

// Animation keyframes

const slideUpToolbar = keyframes({
  from: {
    transform: 'translateX(-50%) translateY(20px)',
    opacity: 0,
  },
  to: {
    transform: 'translateX(-50%) translateY(0)',
    opacity: 1,
  }
});

// Apply the animation to the toolbar
globalStyle(`.${toolbar}`, {
  animation: `${slideUpToolbar} 300ms ease-out`,
});