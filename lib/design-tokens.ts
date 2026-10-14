/**
 * Vertex Design System Tokens
 * Version 1.0 - May 2025
 *
 * Centralized design tokens for the Vertex learning platform.
 * Clean, modern, focused on clarity, consistency and intuitive learning experiences.
 */

// ============================================================================
// COLORS
// ============================================================================

export const colors = {
  primary: {
    500: '#F39316',
    400: '#F8923C',
    300: '#FD8A74',
    200: '#FED7AA',
    100: '#FFEEE5',
  },
  neutral: {
    900: '#0F192A',
    700: '#334155',
    500: '#64748B',
    300: '#CBD5E1',
    200: '#E2E8F0',
    100: '#F1F5F9',
    50: '#FAFAFC',
  },
  white: '#FFFFFF',
} as const;

export type ColorToken = typeof colors;

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const typography = {
  fontFamily: {
    display: 'var(--font-playfair-display)',
    body: 'var(--font-inter)',
  },
  fontSize: {
    display1: ['48px', { lineHeight: '56px', fontWeight: '700' }],
    display2: ['36px', { lineHeight: '44px', fontWeight: '700' }],
    heading1: ['28px', { lineHeight: '36px', fontWeight: '600' }],
    heading2: ['22px', { lineHeight: '30px', fontWeight: '600' }],
    heading3: ['18px', { lineHeight: '26px', fontWeight: '500' }],
    bodyLarge: ['16px', { lineHeight: '24px', fontWeight: '400' }],
    body: ['14px', { lineHeight: '20px', fontWeight: '400' }],
    small: ['12px', { lineHeight: '16px', fontWeight: '400' }],
  },
} as const;

export type TypographyToken = typeof typography;

// ============================================================================
// SPACING
// ============================================================================

/**
 * Base spacing unit: 4px
 * All spacing values are multiples of 4px for consistent rhythm
 */
export const spacing = {
  0: '0',
  1: '4px',   // 0.25rem
  2: '8px',   // 0.5rem
  3: '12px',  // 0.75rem
  4: '16px',  // 1rem
  5: '20px',  // 1.25rem
  6: '24px',  // 1.5rem
  8: '32px',  // 2rem
  10: '40px', // 2.5rem
  12: '48px', // 3rem
  16: '64px', // 4rem
} as const;

export type SpacingToken = typeof spacing;

// ============================================================================
// RADIUS
// ============================================================================

export const radius = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  full: '9999px',
} as const;

export type RadiusToken = typeof radius;

// ============================================================================
// SHADOWS
// ============================================================================

export const shadows = {
  sm: '0 1px 2px 0 rgba(15, 23, 42, 0.05), 0 1px 2px 0 rgba(15, 23, 42, 0.08)',
  md: '0 4px 12px -2px rgba(15, 23, 42, 0.08), 0 2px 6px 0 rgba(15, 23, 42, 0.06)',
  lg: '0 12px 24px -4px rgba(15, 23, 42, 0.10), 0 4px 12px -2px rgba(15, 23, 42, 0.08)',
  xl: '0 20px 40px -8px rgba(15, 23, 42, 0.12), 0 8px 20px -4px rgba(15, 23, 42, 0.10)',
} as const;

export type ShadowToken = typeof shadows;

// ============================================================================
// ICON SPECS
// ============================================================================

export const iconSpecs = {
  size: 24,
  strokeWidth: 2,
} as const;

// ============================================================================
// COMPONENT SPECS
// ============================================================================

export const componentSpecs = {
  button: {
    height: {
      default: '44px',
      sm: '36px',
    },
    padding: {
      lg: '0 16px',
      md: '0 12px',
    },
    radius: '12px',
  },
  input: {
    height: '44px',
    padding: '0 16px',
    radius: '12px',
    borderWidth: '1px',
  },
  badge: {
    height: '24px',
    padding: '0 8px',
    radius: '6px',
  },
  card: {
    radius: {
      default: '16px',
      sm: '12px',
    },
    padding: '16px',
  },
  progressBar: {
    height: '8px',
  },
} as const;

export type ComponentSpecsToken = typeof componentSpecs;

// ============================================================================
// DESIGN PRINCIPLES
// ============================================================================

export const designPrinciples = {
  clarityFirst: 'Visual hierarchy should communicate clearly',
  consistency: 'Use unified patterns consistently across platform',
  focusAndCalm: 'Help users focus on what matters',
  accessible: 'Design with accessibility and inclusivity in mind',
} as const;

// ============================================================================
// EXPORTS
// ============================================================================

export const designTokens = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  iconSpecs,
  componentSpecs,
  designPrinciples,
} as const;

export default designTokens;
