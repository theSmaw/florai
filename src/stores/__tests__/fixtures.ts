import type { Flower } from '../../domain/Flower';
import type { Arrangement } from '../../domain/Arrangement';
import type { Supplier } from '../../domain/Supplier';
import type { Session } from '@supabase/supabase-js';
import type { FlowersState } from '../flowers/state';
import type { AuthState } from '../auth/state';
import type { ArrangementsState } from '../arrangements/state';
import type { SuppliersState } from '../suppliers/state';
import { initialState as flowersInitial } from '../flowers/state';
import { initialState as authInitial } from '../auth/state';
import { initialState as arrangementsInitial } from '../arrangements/state';
import { initialState as suppliersInitial } from '../suppliers/state';

// RootState shape mirrored here to avoid importing store.ts (which initialises Supabase)
export interface TestRootState {
  flowers: FlowersState;
  auth: AuthState;
  arrangements: ArrangementsState;
  suppliers: SuppliersState;
}

export function makeFlower(overrides: { id?: string; name?: string; imageUrl?: string } = {}): Flower {
  const base: Flower = {
    id: overrides.id ?? 'f1',
    name: overrides.name ?? 'Rose',
    colors: ['red'],
    type: 'Rose',
    wholesalePrice: 2.5,
    supplier: 'Supplier A',
    suppliers: [],
    season: ['Spring'],
    availability: 'always',
    climate: 'temperate',
    careInstructions: 'Keep cool',
    notes: 'Classic flower',
    complementaryFlowerIds: [],
  };
  if (overrides.imageUrl !== undefined) {
    base.imageUrl = overrides.imageUrl;
  }
  return base;
}

export function makeArrangement(overrides: { id?: string; name?: string; imageUrl?: string; notes?: string } = {}): Arrangement {
  const base: Arrangement = {
    id: overrides.id ?? 'a1',
    name: overrides.name ?? 'Spring Bouquet',
    flowerIds: ['f1'],
    size: 'medium',
    createdAt: '2024-01-01T00:00:00Z',
  };
  if (overrides.imageUrl !== undefined) {
    base.imageUrl = overrides.imageUrl;
  }
  if (overrides.notes !== undefined) {
    base.notes = overrides.notes;
  }
  return base;
}

export function makeSupplier(overrides: { id?: string; name?: string } = {}): Supplier {
  return {
    id: overrides.id ?? 's1',
    name: overrides.name ?? 'Holland Flowers',
    emails: ['info@holland.com'],
    phones: ['+31 20 000 0000'],
    website: 'https://holland-flowers.com',
    address: '123 Tulip Lane, Amsterdam',
    contactPerson: 'Jan de Vries',
    paymentTerms: 'Net 30',
    notes: 'Primary supplier',
    createdAt: '2024-01-01T00:00:00Z',
  };
}

export function makeSession(): Session {
  return {
    access_token: 'test-access-token',
    token_type: 'bearer',
    expires_in: 3600,
    refresh_token: 'test-refresh-token',
    user: {
      id: 'u1',
      aud: 'authenticated',
      role: 'authenticated',
      email: 'test@example.com',
      app_metadata: {},
      user_metadata: {},
      created_at: '2024-01-01T00:00:00Z',
    },
  } as Session;
}

export function makeRootState(overrides: {
  flowers?: FlowersState;
  auth?: AuthState;
  arrangements?: ArrangementsState;
  suppliers?: SuppliersState;
} = {}): TestRootState {
  return {
    flowers: overrides.flowers ?? flowersInitial,
    auth: overrides.auth ?? authInitial,
    arrangements: overrides.arrangements ?? arrangementsInitial,
    suppliers: overrides.suppliers ?? suppliersInitial,
  };
}
