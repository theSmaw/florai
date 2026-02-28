// Flower domain types and interfaces

export const COLORS = [
  'pink',
  'red',
  'blue',
  'yellow',
  'purple',
  'white',
  'orange',
  'green',
] as const;
export type Color = (typeof COLORS)[number];

export const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter', 'Year-round'] as const;
export type Season = (typeof SEASONS)[number];

export type Availability = 'always' | 'seasonal' | 'limited';
export type GroupBy = 'color' | 'type' | 'none';
export type FlowerType = string; // Dynamic category — e.g. Rose, Peony, Tulip
export type FragranceLevel = 'none' | 'light' | 'moderate' | 'strong';
export type Toxicity = 'safe' | 'mild' | 'toxic';

export interface Flower {
  id: string;
  name: string;
  colors: Color[]; // Multiple colors (e.g., "red", "pink", "coral")
  type: FlowerType; // Rose, Tulip, etc.

  // Media
  imageUrl?: string; // Relative path to an image in /public (e.g., "/images/flowers/1.jpg")

  // Pricing
  wholesalePrice: number;
  retailPrice: number;

  // Sourcing
  supplier: string;
  origin: string; // Country/region
  season: Season[]; // Spring, Summer, etc.
  availability: Availability;

  // Inventory
  quantityOnHand: number;

  // Physical characteristics
  stemLengthCm?: number; // Typical stem length in cm (e.g., 60 for roses, 30 for lavender)
  fragranceLevel?: FragranceLevel; // For fragrance-sensitive venues and event planning
  toxicity?: Toxicity; // Safety — relevant for arrangements around children/pets

  // Care & Details
  vaseLifeDays?: number; // Minimum expected vase life in days (for event timing filters)
  careInstructions: string;
  notes: string;

  // Relationships
  complementaryFlowerIds: string[]; // IDs of flowers that pair well
}

export interface FlowerFilter {
  colors: Color[]; // Empty = no filter
  availability?: Availability;
  type?: FlowerType; // Filter by flower type (Rose, Peony, etc.)
  season?: Season; // Filter by season (Spring, Summer, etc.)
  fragranceLevel?: FragranceLevel; // Filter by fragrance level
  toxicity?: Toxicity; // Filter by toxicity (safety)
  stemLengthRange?: { min: number; max: number }; // Filter by stem length in cm
  vaseLifeRange?: { min: number; max: number }; // Filter by vase life in days
  searchTerm?: string;
  groupBy?: GroupBy;
}
