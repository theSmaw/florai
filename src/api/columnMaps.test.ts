import { describe, it, expect } from 'vitest';
import {
  ARRANGEMENT_COLUMN_BY_FIELD,
  FLOWER_COLUMN_BY_FIELD,
  SUPPLIER_COLUMN_BY_FIELD,
  fullColumnPayload,
  partialColumnPayload,
} from './columnMaps';

describe('partialColumnPayload', () => {
  it('writes only the keys present in updates, mapped to snake_case columns', () => {
    const payload = partialColumnPayload(
      { name: 'Rose', vaseLifeDays: 10 },
      FLOWER_COLUMN_BY_FIELD,
    );
    expect(payload).toEqual({ name: 'Rose', vase_life_days: 10 });
  });

  it('maps a present-but-undefined optional to null (clears the column)', () => {
    const payload = partialColumnPayload({ toxicity: undefined }, FLOWER_COLUMN_BY_FIELD);
    expect(payload).toEqual({ toxicity: null });
  });

  it('does not include columns for absent keys', () => {
    const payload = partialColumnPayload({ retailPrice: 99 }, ARRANGEMENT_COLUMN_BY_FIELD);
    expect(Object.keys(payload)).toEqual(['retail_price']);
  });
});

describe('fullColumnPayload', () => {
  it('writes every mapped column, defaulting absent/undefined to null', () => {
    const payload = fullColumnPayload(
      { name: 'Acme', emails: ['a@b.co'], phones: ['123'] },
      SUPPLIER_COLUMN_BY_FIELD,
    );
    expect(payload).toEqual({
      name: 'Acme',
      emails: ['a@b.co'],
      phones: ['123'],
      website: null,
      address: null,
      contact_person: null,
      payment_terms: null,
      notes: null,
    });
  });

  it('covers exactly the mapped columns for arrangements', () => {
    const payload = fullColumnPayload(
      { name: 'Bouquet', flowerIds: ['1'], size: 'medium' },
      ARRANGEMENT_COLUMN_BY_FIELD,
    );
    expect(Object.keys(payload).sort()).toEqual(Object.values(ARRANGEMENT_COLUMN_BY_FIELD).sort());
    expect(payload['flower_ids']).toEqual(['1']);
    expect(payload['stem_count']).toBeNull();
  });
});
