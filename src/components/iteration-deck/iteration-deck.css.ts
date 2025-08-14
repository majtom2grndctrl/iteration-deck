import { style, keyframes } from '@vanilla-extract/css';
import { tokens } from '../../styles/design-tokens.css';
import { frostedGlass, pillShape, buttonReset, focusRing } from '../../styles/utilities.css';

// Animation keyframes for pulsing glow effect
const pulseGlow = keyframes({
  '0%, 100%': {
    boxShadow: `0 0 0 0 rgba(59, 130, 246, 0.4)`,
  },
  '50%': {
    boxShadow: `0 0 0 8px rgba(59, 130, 246, 0)`,
  },
});

const gentlePulse = keyframes({
  '0%, 100%': {
    boxShadow: `0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.1)`,
  },
  '50%': {
    boxShadow: `0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(59, 130, 246, 0.2)`,
  },
});

// Host styles
export const host = style({
  display: 'block',
  position: 'relative',
  transition: tokens.transitions.base,
});

// Active deck glow effect (only in development mode)
export const hostActiveGlow = style({
  animation: `${gentlePulse} 2s infinite`,
  borderRadius: tokens.radii.lg,
});

// Intense glow effect for newly selected deck
export const hostSelectedGlow = style({
  animation: `${pulseGlow} 1.5s ease-out`,
  borderRadius: tokens.radii.lg,
});

export const deckContainer = style({
  position: 'relative',
  minHeight: '200px',
  transition: tokens.transitions.base,
});

// Container with highlight border for active deck
export const deckContainerActive = style({
  border: `2px solid ${tokens.colors.primary200}`,
  borderRadius: tokens.radii.lg,
  padding: tokens.space.space50,
  margin: `-${tokens.space.space50}`,
});

export const slideIndicator = style([
  frostedGlass,
  pillShape,
  {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.space.space100,
    marginTop: tokens.space.space200,
    padding: `${tokens.space.space100} ${tokens.space.space200}`,
    boxShadow: tokens.shadows.md,
  }
]);

export const slideDot = style([
  buttonReset,
  focusRing,
  {
    width: tokens.sizes.slideIndicatorSize,
    height: tokens.sizes.slideIndicatorSize,
    borderRadius: tokens.radii.full,
    background: tokens.colors.gray300,
    transition: tokens.transitions.fast,
    
    selectors: {
      '&:hover': {
        background: tokens.colors.gray400,
        transform: 'scale(1.2)',
      },
    }
  }
]);

export const slideDotActive = style({
  background: tokens.colors.primary500,
  transform: 'scale(1.3)',
});

export const slideLabel = style({
  fontSize: tokens.fontSizes.sm,
  color: tokens.colors.gray700,
  fontWeight: tokens.fontWeights.medium,
  marginLeft: tokens.space.space50,
  fontFamily: tokens.fonts.system,
});

// Note: Slide visibility is controlled by iteration-deck-slide component's own CSS
// No need for ::slotted() styles since slides have their own shadow DOM