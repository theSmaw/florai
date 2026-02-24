// Filter panel component
// Pure UI - handles filter display and events, no store access
import type { FlowerFilter } from '../../domain/Flower';
import styles from './FilterPanel.module.css';

interface FilterPanelProps {
  availableColors: string[];
  currentFilter: FlowerFilter;
  onColorToggle: (color: string) => void;
  onAvailabilityChange: (availability?: 'always' | 'seasonal' | 'limited') => void;
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

const AVAILABILITY_OPTIONS: { value: 'always' | 'seasonal' | 'limited' | undefined; label: string }[] = [
  { value: undefined, label: 'All' },
  { value: 'always', label: 'Always' },
  { value: 'seasonal', label: 'Seasonal' },
  { value: 'limited', label: 'Limited' },
];

const GROUPBY_OPTIONS: { value: 'none' | 'color' | 'type'; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'color', label: 'Color' },
  { value: 'type', label: 'Type' },
];

export function FilterPanel({
  availableColors,
  currentFilter,
  onColorToggle,
  onAvailabilityChange,
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
