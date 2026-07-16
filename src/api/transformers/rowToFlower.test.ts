import { describe, it, expect } from 'vitest';
import { rowToFlower } from './rowToFlower';
import type { FlowerRow } from './rowToFlower';

type OverrideRow = FlowerRow['user_flower_overrides'][number];

// A fully-null override row (no overrides set); spread a partial to set specific fields.
function makeOverride(fields: Partial<OverrideRow> = {}): OverrideRow {
  return {
    image_url: null,
    care_instructions: null,
    notes: null,
    complementary_flower_ids: null,
    name: null,
    type: null,
    colors: null,
    wholesale_price: null,
    supplier: null,
    season: null,
    availability: null,
    climate: null,
    stem_length_cm: null,
    fragrance_level: null,
    toxicity: null,
    vase_life_days: null,
    ...fields,
  };
}

function makeRow(overrides: Partial<FlowerRow> = {}): FlowerRow {
  return {
    id: 'f1',
    name: 'Rose',
    image_url: null,
    colors: ['red'],
    type: 'Rose',
    wholesale_price: 2.5,
    supplier: 'Supplier A',
    season: ['Spring'],
    availability: 'always',
    climate: 'temperate',
    stem_length_cm: null,
    fragrance_level: null,
    toxicity: null,
    vase_life_days: null,
    care_instructions: 'Keep cool',
    notes: 'Classic flower',
    complementary_flower_ids: [],
    user_flower_overrides: [],
    flower_suppliers: [],
    ...overrides,
  };
}

describe('rowToFlower', () => {
  it('maps required fields', () => {
    const flower = rowToFlower(makeRow());
    expect(flower.id).toBe('f1');
    expect(flower.name).toBe('Rose');
    expect(flower.colors).toEqual(['red']);
    expect(flower.wholesalePrice).toBe(2.5);
    expect(flower.supplier).toBe('Supplier A');
    expect(flower.suppliers).toEqual([]);
    expect(flower.careInstructions).toBe('Keep cool');
    expect(flower.notes).toBe('Classic flower');
  });

  it('omits optional fields when null', () => {
    const flower = rowToFlower(makeRow());
    expect(flower.imageUrl).toBeUndefined();
    expect(flower.stemLengthCm).toBeUndefined();
    expect(flower.fragranceLevel).toBeUndefined();
    expect(flower.toxicity).toBeUndefined();
    expect(flower.vaseLifeDays).toBeUndefined();
  });

  it('maps optional fields when present', () => {
    const flower = rowToFlower(
      makeRow({
        image_url: '/img/rose.jpg',
        stem_length_cm: 60,
        fragrance_level: 'moderate',
        toxicity: 'safe',
        vase_life_days: 7,
      }),
    );
    expect(flower.imageUrl).toBe('/img/rose.jpg');
    expect(flower.stemLengthCm).toBe(60);
    expect(flower.fragranceLevel).toBe('moderate');
    expect(flower.toxicity).toBe('safe');
    expect(flower.vaseLifeDays).toBe(7);
  });

  it('maps flower_suppliers to FlowerSupplier domain objects', () => {
    const flower = rowToFlower(
      makeRow({
        flower_suppliers: [{ id: 's1', name: 'Kenya Blooms', wholesale_price: 1.5 }],
      }),
    );
    expect(flower.suppliers).toEqual([{ id: 's1', name: 'Kenya Blooms', wholesalePrice: 1.5 }]);
  });

  it('user override image_url wins over global image_url', () => {
    const flower = rowToFlower(
      makeRow({
        image_url: '/global.jpg',
        user_flower_overrides: [makeOverride({ image_url: '/override.jpg' })],
      }),
    );
    expect(flower.imageUrl).toBe('/override.jpg');
  });

  it('user override care_instructions and notes win over global', () => {
    const flower = rowToFlower(
      makeRow({
        care_instructions: 'Global care',
        notes: 'Global notes',
        user_flower_overrides: [
          makeOverride({ care_instructions: 'Override care', notes: 'Override notes' }),
        ],
      }),
    );
    expect(flower.careInstructions).toBe('Override care');
    expect(flower.notes).toBe('Override notes');
  });

  it('falls back to empty string when supplier is null', () => {
    const flower = rowToFlower(makeRow({ supplier: null }));
    expect(flower.supplier).toBe('');
  });

  it('user override of core and physical fields wins over global', () => {
    const flower = rowToFlower(
      makeRow({
        name: 'Global Rose',
        vase_life_days: 5,
        toxicity: null,
        user_flower_overrides: [
          makeOverride({ name: 'My Rose', vase_life_days: 21, toxicity: 'toxic' }),
        ],
      }),
    );
    expect(flower.name).toBe('My Rose');
    expect(flower.vaseLifeDays).toBe(21);
    expect(flower.toxicity).toBe('toxic');
  });
});
