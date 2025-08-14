import { style, globalStyle } from '@vanilla-extract/css';
import { tokens } from '../../styles/design-tokens.css';
import { frostedGlass, pillShape, buttonReset, focusRing } from '../../styles/utilities.css';

// Host styles
export const host = style({
  display: 'block',
  position: 'relative',
});

export const deckContainer = style({
  position: 'relative',
  minHeight: '200px',
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
    
    ':hover': {
      background: tokens.colors.gray400,
      transform: 'scale(1.2)',
    },
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

// Global styles for slotted content
globalStyle(`${host}.development-mode ::slotted(iteration-deck-slide:not(.active))`, {
  display: 'none',
});

globalStyle(`${host}.production-mode ::slotted(iteration-deck-slide:not(:first-child))`, {
  display: 'none',
});