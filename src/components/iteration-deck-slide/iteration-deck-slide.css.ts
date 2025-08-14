import { style, keyframes } from '@vanilla-extract/css';
import { tokens } from '../../styles/design-tokens.css';
import { buttonReset, focusRing, flexCenter } from '../../styles/utilities.css';

// Animation keyframes
const slideIn = keyframes({
  'from': {
    opacity: 0,
    transform: 'translateY(10px)',
  },
  'to': {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

// Host styles
export const host = style({
  display: 'block',
  position: 'relative',
  width: '100%',
});

export const hostInactive = style({
  display: 'none',
});

export const hostActive = style({
  animation: `${slideIn} ${tokens.transitions.slow}`,
});

export const slideContent = style({
  width: '100%',
  minHeight: 'inherit',
});

export const slideMetadata = style({
  position: 'absolute',
  top: tokens.space.space100,
  right: tokens.space.space100,
  zIndex: tokens.zIndex.raised,
});

export const confidenceScore = style({
  background: `rgba(59, 130, 246, 0.9)`,
  color: tokens.colors.white,
  padding: `${tokens.space.space50} ${tokens.space.space100}`,
  borderRadius: tokens.radii.xl,
  fontSize: tokens.fontSizes.xs,
  fontWeight: tokens.fontWeights.medium,
  fontFamily: tokens.fonts.system,
  backdropFilter: 'blur(4px)',
});

export const slideNotes = style({
  position: 'absolute',
  bottom: tokens.space.space100,
  right: tokens.space.space100,
  zIndex: tokens.zIndex.raised,
});

export const notesToggle = style([
  buttonReset,
  focusRing,
  flexCenter,
  {
    background: 'rgba(255, 255, 255, 0.9)',
    border: `1px solid ${tokens.colors.border}`,
    borderRadius: tokens.radii.full,
    width: '32px',
    height: '32px',
    fontSize: tokens.fontSizes.sm,
    transition: tokens.transitions.fast,
    backdropFilter: 'blur(4px)',
    
    ':hover': {
      background: tokens.colors.white,
      transform: 'scale(1.1)',
    },
  }
]);