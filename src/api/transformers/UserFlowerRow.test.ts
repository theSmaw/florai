import { describe, it, expect } from 'vitest';
import { userFlowerRowToFlower } from './UserFlowerRow';
import type { UserFlowerRow } from './UserFlowerRow';

function makeRow(overrides: Partial<UserFlowerRow> = {}): UserFlowerRow {
  return {
    id: 'uf1',
    name: 'Custom Rose',
    image_url: null,
    colors: ['pink'],
    type: 'Rose',
    wholesale_price: 3.0,
    supplier: 'My Supplier',
    season: ['Summer'],
    availability: 'seasonal',
    climate: 'tropical',
    stem_length_cm: null,
    fragrance_level: null,
    toxicity: null,
    vase_life_days: null,
    care_instructions: 'Water daily',
    notes: 'Personal stock',
    complementary_flower_ids: [],
    ...overrides,
  };
}

describe('userFlowerRowToFlower', () => {
  it('maps required fields', () => {
    const flower = userFlowerRowToFlower(makeRow());
    expect(flower.id).toBe('uf1');
    expect(flower.name).toBe('Custom Rose');
    expect(flower.colors).toEqual(['pink']);
    expect(flower.wholesalePrice).toBe(3.0);
    expect(flower.supplier).toBe('My Supplier');
    expect(flower.suppliers).toEqual([]);
    expect(flower.careInstructions).toBe('Water daily');
    expect(flower.notes).toBe('Personal stock');
  });

  it('omits optional fields when null', () => {
    const flower = userFlowerRowToFlower(makeRow());
    expect(flower.imageUrl).toBeUndefined();
    expect(flower.stemLengthCm).toBeUndefined();
    expect(flower.fragranceLevel).toBeUndefined();
    expect(flower.toxicity).toBeUndefined();
    expect(flower.vaseLifeDays).toBeUndefined();
  });

  it('maps optional fields when present', () => {
    const flower = userFlowerRowToFlower(makeRow({
      image_url: '/img/custom-rose.jpg',
      stem_length_cm: 50,
      fragrance_level: 'strong',
      toxicity: 'mild',
      vase_life_days: 10,
    }));
    expect(flower.imageUrl).toBe('/img/custom-rose.jpg');
    expect(flower.stemLengthCm).toBe(50);
    expect(flower.fragranceLevel).toBe('strong');
    expect(flower.toxicity).toBe('mild');
    expect(flower.vaseLifeDays).toBe(10);
  });

  it('falls back to empty string when supplier is null', () => {
    const flower = userFlowerRowToFlower(makeRow({ supplier: null }));
    expect(flower.supplier).toBe('');
  });

  it('falls back to empty string when care_instructions is null', () => {
    const flower = userFlowerRowToFlower(makeRow({ care_instructions: null }));
    expect(flower.careInstructions).toBe('');
  });

  it('falls back to empty string when notes is null', () => {
    const flower = userFlowerRowToFlower(makeRow({ notes: null }));
    expect(flower.notes).toBe('');
  });
});
