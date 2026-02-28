import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FilterChipSection } from './FilterChipSection';
import type { Availability, FragranceLevel, Season, Toxicity } from '../../domain/Flower';

const meta: Meta = {
  title: 'Components/FilterChipSection',
  tags: ['autodocs'],
};

export default meta;

// ---------------------------------------------------------------------------
// Availability
// ---------------------------------------------------------------------------

const AVAILABILITY_OPTIONS: ReadonlyArray<{ value: Availability | undefined; label: string }> = [
  { value: undefined, label: 'All' },
  { value: 'always', label: 'Always' },
  { value: 'seasonal', label: 'Seasonal' },
  { value: 'limited', label: 'Limited' },
];

export const AvailabilitySection: StoryObj = {
  name: 'Availability',
  render: () => {
    const [value, setValue] = useState<Availability | undefined>(undefined);
    return (
      <div style={{ padding: 24, maxWidth: 360 }}>
        <FilterChipSection
          title="Availability"
          options={AVAILABILITY_OPTIONS}
          currentValue={value}
          onChange={setValue}
          dataCy="availability-chip"
        />
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Season
// ---------------------------------------------------------------------------

const SEASON_OPTIONS: ReadonlyArray<{ value: Season | undefined; label: string }> = [
  { value: undefined, label: 'All' },
  { value: 'Spring', label: 'Spring' },
  { value: 'Summer', label: 'Summer' },
  { value: 'Autumn', label: 'Autumn' },
  { value: 'Winter', label: 'Winter' },
  { value: 'Year-round', label: 'Year-round' },
];

export const SeasonSection: StoryObj = {
  name: 'Season',
  render: () => {
    const [value, setValue] = useState<Season | undefined>(undefined);
    return (
      <div style={{ padding: 24, maxWidth: 360 }}>
        <FilterChipSection
          title="Season"
          options={SEASON_OPTIONS}
          currentValue={value}
          onChange={setValue}
          dataCy="season-chip"
        />
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Fragrance
// ---------------------------------------------------------------------------

const FRAGRANCE_OPTIONS: ReadonlyArray<{ value: FragranceLevel | undefined; label: string }> = [
  { value: undefined, label: 'All' },
  { value: 'none', label: 'None' },
  { value: 'light', label: 'Light' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'strong', label: 'Strong' },
];

export const FragranceSection: StoryObj = {
  name: 'Fragrance',
  render: () => {
    const [value, setValue] = useState<FragranceLevel | undefined>(undefined);
    return (
      <div style={{ padding: 24, maxWidth: 360 }}>
        <FilterChipSection
          title="Fragrance"
          options={FRAGRANCE_OPTIONS}
          currentValue={value}
          onChange={setValue}
          dataCy="fragrance-chip"
        />
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Safety (Toxicity)
// ---------------------------------------------------------------------------

const TOXICITY_OPTIONS: ReadonlyArray<{ value: Toxicity | undefined; label: string }> = [
  { value: undefined, label: 'All' },
  { value: 'safe', label: 'Safe' },
  { value: 'mild', label: 'Mild' },
  { value: 'toxic', label: 'Toxic' },
];

export const SafetySection: StoryObj = {
  name: 'Safety',
  render: () => {
    const [value, setValue] = useState<Toxicity | undefined>(undefined);
    return (
      <div style={{ padding: 24, maxWidth: 360 }}>
        <FilterChipSection
          title="Safety"
          options={TOXICITY_OPTIONS}
          currentValue={value}
          onChange={setValue}
          dataCy="toxicity-chip"
        />
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Pre-selected state
// ---------------------------------------------------------------------------

export const WithSelection: StoryObj = {
  name: 'With a pre-selected value',
  render: () => {
    const [value, setValue] = useState<Availability | undefined>('seasonal');
    return (
      <div style={{ padding: 24, maxWidth: 360 }}>
        <FilterChipSection
          title="Availability"
          options={AVAILABILITY_OPTIONS}
          currentValue={value}
          onChange={setValue}
          dataCy="availability-chip"
        />
      </div>
    );
  },
};
