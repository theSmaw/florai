# Florist Flower Catalogue - Product Overview

## What We're Building

A comprehensive digital catalogue management system for florists to organize, view, and edit flower information with rich metadata and relationships.

## Core Features

### 1. Flower Catalogue (Main List View)
- Display all flowers in the inventory
- **Grouping & Filtering**:
  - Filter by color (single or multiple)
  - Filter by other attributes (season, type, sourcing method, etc.)
  - Group flowers by category/color
- Quick view of essential info (name, color, price)
- Add/remove flowers from catalogue

### 2. Flower Detail View
- **Complementary Flowers**: See which other flowers pair well with this flower
- **Metadata Fields**:
  - Name, color, family/type
  - Price (wholesale, retail)
  - Care instructions
  - Sourcing information (supplier, origin, season)
  - Availability
  - Quantity on hand
  - Notes/descriptions
- Edit all fields directly from detail view

### 3. Editing Capabilities
- Edit flower details inline or via form
- Add/remove flower pairings
- Update pricing and sourcing
- Add/edit care instructions
- Bulk edit operations (future)

## Data Model

### Flower Entity
```
{
  id: string
  name: string
  color: string[]           // Multiple colors (e.g., "red", "pink", "coral")
  type: string              // Rose, Tulip, etc.
  
  // Pricing
  wholesalePrice: number
  retailPrice: number
  
  // Sourcing
  supplier: string
  origin: string            // Country/region
  season: string[]          // Spring, Summer, etc.
  availability: "always" | "seasonal" | "limited"
  
  // Inventory
  quantityOnHand: number
  
  // Care & Details
  vaseLife: string          // "7-10 days"
  careInstructions: string
  notes: string
  
  // Relationships
  complementaryFlowerIds: string[]  // IDs of flowers that pair well
}
```

### Flower Pairings
- Many-to-many relationship
- Which flowers go well together
- Used for: bouquet suggestions, styling advice

## User Workflows

### View Catalogue
1. User sees list of all flowers
2. Can filter by color (dropdown/checkboxes)
3. Can group results by color
4. See quick info: name, colors, availability

### View Flower Details
1. Click on flower in list
2. See full metadata (price, care, sourcing, etc.)
3. See list of complementary flowers
4. Option to add/remove pairings

### Edit Flower
1. Click "Edit" on detail view
2. Update any fields
3. Add/remove complementary flowers
4. Save changes

## Technical Architecture

- **Frontend**: React + TypeScript
- **State Management**: Redux Toolkit + React-Redux
- **Architecture Pattern**: Laminar data flow
- **Build Tool**: Vite

### Laminar Flow for Flowers
```
User Action (filter, click, edit)
    ↓
Component (UI control)
    ↓
Container (orchestration)
    ↓
Redux Action (describe what happened)
    ↓
Redux Slice (update store)
    ↓
Selector (read state)
    ↓
Component re-renders
```

## File Structure

```
src/
├── stores/
│   ├── flowers/
│   │   ├── types.ts              # Flower, FlowerFilter types
│   │   ├── slice.ts              # Reducers & actions
│   │   ├── selectors.ts          # Selectors for filters, list, detail
│   │   └── index.ts              # Re-exports
│   └── ...
├── components/
│   ├── FlowerCard.tsx            # Display single flower summary
│   ├── FlowerDetailView.tsx       # Display flower details
│   ├── FlowerEditor.tsx           # Edit flower form
│   ├── FlowerList.tsx             # List of flowers
│   ├── FilterPanel.tsx            # Color/attribute filters
│   └── ...
├── containers/
│   ├── FlowerListContainer.tsx    # Wires list + filters to store
│   ├── FlowerDetailContainer.tsx  # Wires detail view to store
│   └── ...
├── views/
│   ├── RootView.tsx              # Main app layout
│   ├── CatalogueView.tsx          # Catalogue page
│   ├── FlowerDetailView.tsx       # Detail page
│   └── ...
└── ...
```

## Next Steps

1. **Phase 1: Data Structure**
   - Define Flower type
   - Create Redux slice for flowers
   - Create selectors

2. **Phase 2: List View**
   - Build FlowerList component
   - Build FilterPanel component
   - Implement filtering logic
   - Add grouping

3. **Phase 3: Detail View**
   - Build FlowerDetailView component
   - Show complementary flowers
   - Show all metadata

4. **Phase 4: Editing**
   - Build FlowerEditor component
   - Implement edit actions
   - Save/cancel flow

5. **Phase 5: Data Persistence**
   - Connect to API/backend
   - Async thunks for fetching/saving
   - Error handling

## Success Criteria

- ✅ User can view full flower catalogue with filtering
- ✅ User can group flowers by color
- ✅ User can click into any flower and see full details
- ✅ User can see complementary flowers
- ✅ User can edit all flower information
- ✅ Changes persist across sessions
- ✅ No DOM manipulation (all React)
- ✅ Clean laminar data flow

