// Flower domain types and interfaces

export type FragranceLevel = 'none' | 'light' | 'moderate' | 'strong';
export type Toxicity = 'safe' | 'mild' | 'toxic';

export interface Flower {
  id: string;
  name: string;
  colors: string[]; // Multiple colors (e.g., "red", "pink", "coral")
  type: string; // Rose, Tulip, etc.

  // Media
  imageUrl?: string; // Relative path to an image in /public (e.g., "/images/flowers/1.jpg")

  // Pricing
  wholesalePrice: number;
  retailPrice: number;

  // Sourcing
  supplier: string;
  origin: string; // Country/region
  season: string[]; // Spring, Summer, etc.
  availability: 'always' | 'seasonal' | 'limited';

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
  colors: string[]; // Empty = no filter
  availability?: 'always' | 'seasonal' | 'limited';
  type?: string; // Filter by flower type (Rose, Peony, etc.)
  season?: string; // Filter by season (Spring, Summer, etc.)
  fragranceLevel?: FragranceLevel; // Filter by fragrance level
  toxicity?: Toxicity; // Filter by toxicity (safety)
  searchTerm?: string;
  groupBy?: 'color' | 'type' | 'none';
}
