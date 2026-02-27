// Filter panel component
// Pure UI - handles filter display and events, no store access
import type { FlowerFilter, FragranceLevel, Toxicity } from '../../domain/Flower';
import styles from './FilterPanel.module.css';

interface FilterPanelProps {
  availableColors: string[];
  availableSeasons: string[];
  availableTypes: string[];
  currentFilter: FlowerFilter;
  onColorToggle: (color: string) => void;
  onAvailabilityChange: (availability?: 'always' | 'seasonal' | 'limited') => void;
  onSeasonChange: (season?: string) => void;
  onTypeChange: (type?: string) => void;
  onFragranceLevelChange: (fragranceLevel?: FragranceLevel) => void;
  onToxicityChange: (toxicity?: Toxicity) => void;
  onGroupByChange: (groupBy?: 'color' | 'type' | 'none') => void;
  onApplyFilters: () => void;
}

const COLOR_SWATCHES: Record<string, string> = {
  pink: '#f9a8d4',
  red: '#dc2626',
  blue: '#60a5fa',
  yellow: '#facc15',
  purple: '#c084fc',
  white: '#f1f5f9',
  orange: '#fb923c',
  green: '#4ade80',
};

const AVAILABILITY_OPTIONS: {
  value: 'always' | 'seasonal' | 'limited' | undefined;
  label: string;
}[] = [
  { value: undefined, label: 'All' },
  { value: 'always', label: 'Always' },
  { value: 'seasonal', label: 'Seasonal' },
  { value: 'limited', label: 'Limited' },
];

const FRAGRANCE_OPTIONS: { value: FragranceLevel | undefined; label: string }[] = [
  { value: undefined, label: 'All' },
  { value: 'none', label: 'None' },
  { value: 'light', label: 'Light' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'strong', label: 'Strong' },
];

const TOXICITY_OPTIONS: { value: Toxicity | undefined; label: string }[] = [
  { value: undefined, label: 'All' },
  { value: 'safe', label: 'Safe' },
  { value: 'mild', label: 'Mild' },
  { value: 'toxic', label: 'Toxic' },
];

const GROUPBY_OPTIONS: { value: 'none' | 'color' | 'type'; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'color', label: 'Color' },
  { value: 'type', label: 'Type' },
];

export function FilterPanel({
  availableColors,
  availableSeasons,
  availableTypes,
  currentFilter,
  onColorToggle,
  onAvailabilityChange,
  onSeasonChange,
  onTypeChange,
  onFragranceLevelChange,
  onToxicityChange,
  onGroupByChange,
  onApplyFilters,
}: FilterPanelProps) {
  return (
    <div data-cy="filter-panel" className={styles.body}>
      {/* Colors */}
      {availableColors.length > 0 && (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Colors</h3>
          <div className={styles.chips}>
            {availableColors.map((color) => {
              const selected = currentFilter.colors.includes(color);
              return (
                <button
                  key={color}
                  data-cy="color-chip"
                  data-cy-color={color}
                  onClick={() => onColorToggle(color)}
                  className={`${styles.chip} ${selected ? styles.chipSelected : ''}`}
                >
                  <span
                    className={styles.colorDot}
                    style={{ background: COLOR_SWATCHES[color] ?? color }}
                  />
                  <span className={styles.chipLabel}>{color}</span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Season */}
      {availableSeasons.length > 0 && (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Season</h3>
          <div className={styles.chips}>
            {availableSeasons.map((season) => {
              const selected = currentFilter.season === season;
              return (
                <button
                  key={season}
                  data-cy="season-chip"
                  data-cy-value={season}
                  onClick={() => onSeasonChange(selected ? undefined : season)}
                  className={`${styles.chip} ${selected ? styles.chipSelected : ''}`}
                >
                  <span className={styles.chipLabel}>{season}</span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Type */}
      {availableTypes.length > 0 && (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Type</h3>
          <div className={styles.chips}>
            {availableTypes.map((type) => {
              const selected = currentFilter.type === type;
              return (
                <button
                  key={type}
                  data-cy="type-chip"
                  data-cy-value={type}
                  onClick={() => onTypeChange(selected ? undefined : type)}
                  className={`${styles.chip} ${selected ? styles.chipSelected : ''}`}
                >
                  <span className={styles.chipLabel}>{type}</span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Availability */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Availability</h3>
        <div className={styles.chips}>
          {AVAILABILITY_OPTIONS.map(({ value, label }) => {
            const selected = currentFilter.availability === value;
            return (
              <button
                key={label}
                data-cy="availability-chip"
                data-cy-value={value ?? 'all'}
                onClick={() => onAvailabilityChange(value)}
                className={`${styles.chip} ${selected ? styles.chipSelected : ''}`}
              >
                <span className={styles.chipLabel}>{label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Fragrance */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Fragrance</h3>
        <div className={styles.chips}>
          {FRAGRANCE_OPTIONS.map(({ value, label }) => {
            const selected = currentFilter.fragranceLevel === value;
            return (
              <button
                key={label}
                data-cy="fragrance-chip"
                data-cy-value={value ?? 'all'}
                onClick={() => onFragranceLevelChange(value)}
                className={`${styles.chip} ${selected ? styles.chipSelected : ''}`}
              >
                <span className={styles.chipLabel}>{label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Toxicity */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Safety</h3>
        <div className={styles.chips}>
          {TOXICITY_OPTIONS.map(({ value, label }) => {
            const selected = currentFilter.toxicity === value;
            return (
              <button
                key={label}
                data-cy="toxicity-chip"
                data-cy-value={value ?? 'all'}
                onClick={() => onToxicityChange(value)}
                className={`${styles.chip} ${selected ? styles.chipSelected : ''}`}
              >
                <span className={styles.chipLabel}>{label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Group By */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Group By</h3>
        <div className={styles.chips}>
          {GROUPBY_OPTIONS.map(({ value, label }) => {
            const selected = (currentFilter.groupBy ?? 'none') === value;
            return (
              <button
                key={value}
                data-cy="groupby-chip"
                data-cy-value={value}
                onClick={() => onGroupByChange(value)}
                className={`${styles.chip} ${selected ? styles.chipSelected : ''}`}
              >
                <span className={styles.chipLabel}>{label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Apply */}
      <button
        data-cy="apply-filters-button"
        onClick={onApplyFilters}
        className={styles.applyButton}
      >
        Apply Filters
      </button>
    </div>
  );
}
