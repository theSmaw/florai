import { describe, it, expect } from 'vitest';
import { rowToSupplier } from './rowToSupplier';
import type { SupplierRow } from './rowToSupplier';

function makeRow(overrides: Partial<SupplierRow> = {}): SupplierRow {
  return {
    id: 's1',
    user_id: 'u1',
    name: 'Holland Flowers',
    emails: ['info@holland.com'],
    phones: ['+31 20 000 0000'],
    website: null,
    address: null,
    contact_person: null,
    payment_terms: null,
    notes: null,
    created_at: '2024-01-01T00:00:00Z',
    ...overrides,
  };
}

describe('rowToSupplier', () => {
  it('maps required fields', () => {
    const supplier = rowToSupplier(makeRow());
    expect(supplier.id).toBe('s1');
    expect(supplier.name).toBe('Holland Flowers');
    expect(supplier.emails).toEqual(['info@holland.com']);
    expect(supplier.phones).toEqual(['+31 20 000 0000']);
    expect(supplier.createdAt).toBe('2024-01-01T00:00:00Z');
  });

  it('omits optional fields when null', () => {
    const supplier = rowToSupplier(makeRow());
    expect(supplier.website).toBeUndefined();
    expect(supplier.address).toBeUndefined();
    expect(supplier.contactPerson).toBeUndefined();
    expect(supplier.paymentTerms).toBeUndefined();
    expect(supplier.notes).toBeUndefined();
  });

  it('maps optional fields when present', () => {
    const supplier = rowToSupplier(makeRow({
      website: 'https://holland-flowers.com',
      address: '123 Tulip Lane, Amsterdam',
      contact_person: 'Jan de Vries',
      payment_terms: 'Net 30',
      notes: 'Primary supplier',
    }));
    expect(supplier.website).toBe('https://holland-flowers.com');
    expect(supplier.address).toBe('123 Tulip Lane, Amsterdam');
    expect(supplier.contactPerson).toBe('Jan de Vries');
    expect(supplier.paymentTerms).toBe('Net 30');
    expect(supplier.notes).toBe('Primary supplier');
  });

  it('maps empty arrays for emails and phones', () => {
    const supplier = rowToSupplier(makeRow({ emails: [], phones: [] }));
    expect(supplier.emails).toEqual([]);
    expect(supplier.phones).toEqual([]);
  });
});
