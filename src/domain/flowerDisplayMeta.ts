// Display metadata for Flower domain values.
// Single source of truth for labels and colour swatches used across the UI.
import type { Availability, Climate, Color, FragranceLevel, Toxicity } from './Flower';

/** Hex colour for each Color variant, used in swatches. */
export const COLOR_HEX: Record<Color, string> = {
  pink: '#f9a8d4',
  red: '#dc2626',
  blue: '#60a5fa',
  yellow: '#facc15',
  purple: '#c084fc',
  white: '#f1f5f9',
  orange: '#fb923c',
  green: '#4ade80',
};

/** Human-readable label for each Availability variant. */
export const AVAILABILITY_LABEL: Record<Availability, string> = {
  always: 'Always Available',
  seasonal: 'Seasonal',
  limited: 'Limited',
};

/** Human-readable label for each FragranceLevel variant. */
export const FRAGRANCE_LABEL: Record<FragranceLevel, string> = {
  none: 'None',
  light: 'Light',
  moderate: 'Moderate',
  strong: 'Strong',
};

/** Number of filled indicator pips (0–3) for each FragranceLevel. */
export const FRAGRANCE_PIPS: Record<FragranceLevel, number> = {
  none: 0,
  light: 1,
  moderate: 2,
  strong: 3,
};

/** Human-readable label for each Toxicity variant. */
export const TOXICITY_LABEL: Record<Toxicity, string> = {
  safe: 'Safe',
  mild: 'Mild',
  toxic: 'Toxic',
};

/** Human-readable label for each Climate variant. */
export const CLIMATE_LABEL: Record<Climate, string> = {
  tropical: 'Tropical',
  subtropical: 'Subtropical',
  mediterranean: 'Mediterranean',
  temperate: 'Temperate',
  alpine: 'Alpine',
};
