# Florai - Florist Flower Catalogue Project Setup Complete

## ✅ Project Initialized Successfully

Your **florai** project has been fully set up as a React + Redux application for building a florist flower catalogue management system.

## Project Structure

```
florai/src/
├── App.tsx                          # Root app with Redux Provider
├── main.ts                          # React entry point
├── style.css                        # Global styles
│
├── domain/
│   └── Flower.ts                    # Flower type definitions & domain logic
│
├── stores/
│   ├── store.ts                     # Redux store configuration
│   ├── index.ts                     # Store exports
│   └── flowers/
│       ├── slice.ts                 # Flowers reducers & actions
│       ├── selectors.ts             # Flowers selectors (filtering, grouping)
│       └── index.ts                 # Flowers store exports
│
├── views/
│   └── RootView.tsx                 # Main app view
│
├── containers/                      # (ready for feature containers)
├── components/                      # (ready for feature components)
├── hooks/                           # (ready for custom hooks)
└── api/                             # (ready for API layer)
```

## Tech Stack

- **Framework**: React 19.2.4
- **State Management**: Redux Toolkit 2.11.2 + React-Redux 9.2.0
- **Build Tool**: Vite 7.3.1
- **Language**: TypeScript 5.9.3
- **Architecture**: Laminar Data Flow

## Flowers Domain

### Data Model
The `Flower` type includes:
- **Basic Info**: id, name, color[], type
- **Pricing**: wholesalePrice, retailPrice
- **Sourcing**: supplier, origin, season[], availability
- **Inventory**: quantityOnHand
- **Care**: vaseLife, careInstructions, notes
- **Relationships**: complementaryFlowerIds

### Redux Store
- **State Shape**: `{ flowers: { flowers, filter, selectedFlowerId, isLoading, error } }`
- **Actions**: Load, filter, select, update, add, remove flowers
- **Selectors**:
  - Basic: `selectFlowersList`, `selectSelectedFlower`, `selectAllColors`
  - Filtered: `selectFilteredFlowers` (by color, availability, search)
  - Grouped: `selectGroupedFlowers` (by color, type, or none)
  - Relationships: `selectComplementaryFlowers`

## Laminar Data Flow

```
User Action (click, filter, edit)
    ↓
React Component/Container
    ↓
Dispatch Redux Action
    ↓
Flowers Slice Reducer
    ↓
Redux Store Update
    ↓
useSelector Hook (Container)
    ↓
Container passes props to Component
    ↓
Component Re-renders
    ↓
UI Updated
```

## Development Commands

```bash
# Development server (HMR enabled)
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Type checking
pnpm tsc
```

## File Extensions

- `.tsx` - React components with JSX
- `.ts` - Pure TypeScript (domain types, store logic, selectors, utilities)
- `.css` - Stylesheets

## Ready to Build

✅ Project structure: Complete  
✅ Redux store configured: Complete  
✅ Domain types defined: Complete  
✅ Selectors for filtering/grouping: Complete  
✅ Build system: Working  
✅ Dev server: Working  

## Next Steps

### Phase 1: List View
1. Create `FlowerList.tsx` component (pure UI)
2. Create `FilterPanel.tsx` component (pure UI)
3. Create `FlowerListContainer.tsx` container to wire components to store
4. Add mock flower data to Redux store
5. Implement filtering and grouping UI

### Phase 2: Detail View
1. Create `FlowerDetailView.tsx` component
2. Create `FlowerDetailContainer.tsx` container
3. Display selected flower details
4. Show complementary flowers

### Phase 3: Editing
1. Create `FlowerEditor.tsx` component
2. Create `FlowerEditorContainer.tsx` container
3. Implement edit actions
4. Add save/cancel flow

### Phase 4: Data Persistence
1. Create API layer in `api/flowerApi.ts`
2. Implement async thunks for fetch/save
3. Connect to backend

### Install Prisma or equivalent ORM
When you move from local mock data (e.g., `db.json`) to a real database, "Install Prisma or equivalent ORM" means:
- Introduce a data access layer for a real database (SQLite locally; PostgreSQL/MySQL in staging/prod).
- Use an ORM to define the schema, run migrations, and query the DB from a backend service.
- Expose data to this React app via a clean API (REST/GraphQL/tRPC) consumed by `api/flowerApi.ts` and async thunks.

Why now
- During early UI work, `db.json` or in-memory mocks are fine.
- Once you need persistence across sessions, multi-user editing, or server-side rules, install an ORM and wire up a backend.

Recommended minimal local setup (Prisma + SQLite)
1) Install dependencies
   - pnpm add -D prisma
   - pnpm add @prisma/client
2) Initialize Prisma
   - pnpm prisma init --datasource-provider sqlite
   - This creates `prisma/schema.prisma` and `.env` with `DATABASE_URL="file:./dev.db"`.
3) Model your data (example)
   - In `prisma/schema.prisma`, define a `Flower` model reflecting the domain:
     model Flower {
       id                  String   @id @default(cuid())
       name                String
       color               String[]
       type                String
       wholesalePrice      Float
       retailPrice         Float
       supplier            String?
       origin              String?
       season              String[]
       availability        Boolean  @default(true)
       quantityOnHand      Int      @default(0)
       vaseLife            Int?
       careInstructions    String?
       notes               String?
       complementaryFlowerIds String[]
       createdAt           DateTime @default(now())
       updatedAt           DateTime @updatedAt
     }
4) Create and apply the first migration
   - pnpm prisma migrate dev --name init
   - This also generates the Prisma Client used by your backend code.
5) Seed data (optional)
   - Add a `prisma/seed.ts` and run with `pnpm prisma db seed` to import from `db.json` if useful.
6) Build a minimal backend
   - Choose a server (e.g., Express, Fastify, NestJS, or Next.js API routes).
   - Example (Express pseudo-code):
     import { PrismaClient } from '@prisma/client';
     const prisma = new PrismaClient();
     app.get('/api/flowers', async (req, res) => {
       const flowers = await prisma.flower.findMany();
       res.json(flowers);
     });
     app.post('/api/flowers', async (req, res) => {
       const flower = await prisma.flower.create({ data: req.body });
       res.status(201).json(flower);
     });
7) Connect the frontend API layer
   - Implement `api/flowerApi.ts` to call your backend endpoints.
   - Update async thunks in the flowers slice to use these API calls instead of local mocks.

Environments and configuration
- Local dev (recommended): SQLite (`DATABASE_URL="file:./dev.db"`).
- Staging/Production: Postgres (e.g., `DATABASE_URL="postgresql://user:pass@host:5432/db?schema=public"`).
- Store secrets in `.env` and never commit actual credentials.

Alternatives to Prisma (choose based on team preference)
- Drizzle ORM: Lightweight, schema-as-code, great with Postgres/SQLite.
- TypeORM: Mature, decorators, works with many SQL engines.
- Sequelize: Widely used, JavaScript-first, good docs.
- Kysely/Objection.js: Query builders with optional model patterns.

Selection guidance
- Prefer Prisma for strong TypeScript DX, migrations, and tooling.
- Prefer Drizzle if you want ultra-lightweight, SQL-first ergonomics.
- Prefer TypeORM if you like entity decorators and Active Record patterns.

What this DOES NOT do
- It does not change React code directly. The React app continues to use `api/flowerApi.ts` and async thunks; only their implementation switches from mock data to HTTP calls backed by a DB.

## Architecture References

- **Laminar Flow**: See `ARCHITECTURE.md`
- **Coding Conventions**: See `CODING_CONVENTIONS.md`
- **Product Overview**: See `PRODUCT_OVERVIEW.md`
- **Development Workflow**: See `DEVELOPMENT_WORKFLOW.md`

---

All systems ready! Happy coding! 🌸

