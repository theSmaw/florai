// Filter panel component
// Pure UI - handles filter display and events, no store access
import type { FlowerFilter } from '../../domain/Flower';
import styles from './FilterPanel.module.css';

interface FilterPanelProps {
  availableColors: string[];
  currentFilter: FlowerFilter;
  onSearchChange: (searchTerm: string) => void;
  onColorToggle: (color: string) => void;
  onAvailabilityChange: (availability?: 'always' | 'seasonal' | 'limited') => void;
  onGroupByChange: (groupBy?: 'color' | 'type' | 'none') => void;
  onApplyFilters: () => void;
}

export function FilterPanel({
  availableColors,
  currentFilter,
  onSearchChange,
  onColorToggle,
  onAvailabilityChange,
  onGroupByChange,
  onApplyFilters,
}: FilterPanelProps) {
  return (
    <div data-cy="filter-panel" className={styles.root}>
      {/* Search */}
      <div>
        <label className={styles.label}>
          Search
        </label>
        <div className={styles.searchWrapper}>
          <span className={`material-icons ${styles.searchIcon}`}>
            search
          </span>
          <input
            data-cy="filter-panel-search"
            type="text"
            placeholder="Search flowers..."
            value={currentFilter.searchTerm || ''}
            onChange={(e) => onSearchChange(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Colors */}
      <div>
        <label className={styles.label}>
          Colors
        </label>
        <div className={styles.chips}>
          {availableColors.map((color) => (
            <button
              key={color}
              data-cy="color-chip"
              data-cy-color={color}
              onClick={() => onColorToggle(color)}
              className={`${styles.chip} ${currentFilter.colors.includes(color) ? styles.chipSelected : ''}`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <label className={styles.label}>
          Availability
        </label>
        <div className={styles.stack}>
          {['always', 'seasonal', 'limited'].map((avail) => (
            <label
              key={avail}
              className={styles.radioRow}
            >
              <input
                data-cy="availability-radio"
                type="radio"
                name="availability"
                value={avail}
                checked={currentFilter.availability === (avail as any)}
                onChange={() => onAvailabilityChange(avail as any)}
                className={styles.radioInput}
              />
              <span className="capitalize">{avail}</span>
            </label>
          ))}
          <label className={styles.radioRow}>
            <input
              type="radio"
              name="availability"
              checked={!currentFilter.availability}
              onChange={() => onAvailabilityChange(undefined)}
              className={styles.radioInput}
            />
            <span>All</span>
          </label>
        </div>
      </div>

      {/* Group By */}
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
          Group By
        </label>
        <div className="space-y-2">
          {['none', 'color', 'type'].map((group) => (
            <label
              key={group}
              className="flex items-center gap-2 cursor-pointer text-sm text-slate-600 dark:text-slate-400"
            >
              <input
                data-cy="groupby-radio"
                type="radio"
                name="groupBy"
                value={group}
                checked={(currentFilter.groupBy || 'none') === group}
                onChange={() => onGroupByChange(group as any)}
                className="w-4 h-4"
              />
              <span className="capitalize">{group}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <button
        data-cy="apply-filters-button"
        onClick={onApplyFilters}
        className="w-full bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );
}

