// Flower domain types and interfaces

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

  // Care & Details
  vaseLife: string; // "7-10 days"
  careInstructions: string;
  notes: string;

  // Relationships
  complementaryFlowerIds: string[]; // IDs of flowers that pair well
}

export interface FlowerFilter {
  colors: string[]; // Empty = no filter
  availability?: 'always' | 'seasonal' | 'limited';
  searchTerm?: string;
  groupBy?: 'color' | 'type' | 'none';
}

export interface FlowerListState {
  flowers: Flower[];
  filter: FlowerFilter;
  selectedFlowerId: string | null;
  isLoading: boolean;
  error: string | null;
}

export const initialFlowerListState: FlowerListState = {
  flowers: [],
  filter: {
    colors: [],
    groupBy: 'none',
  },
  selectedFlowerId: null,
  isLoading: false,
  error: null,
};
