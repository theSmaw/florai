// Filter panel component
// Pure UI - handles filter display and events, no store access
import type {
  Availability,
  Color,
  FlowerFilter,
  FragranceLevel,
  GroupBy,
  Season,
  Toxicity,
} from '../../domain/Flower';
import styles from './FilterPanel.module.css';

// ---------------------------------------------------------------------------
// Reusable chip section (single-select with optional "All" entry)
// ---------------------------------------------------------------------------

interface FilterChipSectionProps<T extends string> {
  title: string;
  options: ReadonlyArray<{ value: T | undefined; label: string }>;
  currentValue: T | undefined;
  onChange: (value: T | undefined) => void;
  dataCy: string;
}

function FilterChipSection<T extends string>({
  title,
  options,
  currentValue,
  onChange,
  dataCy,
}: FilterChipSectionProps<T>) {
  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      <div className={styles.chips}>
        {options.map(({ value, label }) => {
          const selected = currentValue === value;
          return (
            <button
              key={label}
              data-cy={dataCy}
              data-cy-value={value ?? 'all'}
              onClick={() => onChange(value)}
              className={`${styles.chip} ${selected ? styles.chipSelected : ''}`}
            >
              <span className={styles.chipLabel}>{label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Reusable range slider section (min + max sliders)
// ---------------------------------------------------------------------------

interface FilterRangeSectionProps {
  title: string;
  unit: string;
  min: number;
  max: number;
  currentMin: number;
  currentMax: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  dataCyMin: string;
  dataCyMax: string;
}

function FilterRangeSection({
  title,
  unit,
  min,
  max,
  currentMin,
  currentMax,
  onMinChange,
  onMaxChange,
  dataCyMin,
  dataCyMax,
}: FilterRangeSectionProps) {
  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      <div className={styles.rangeGroup}>
        <div className={styles.rangeRow}>
          <span className={styles.rangeLabel}>
            <span>Min</span>
            <span className={styles.rangeValue}>
              {currentMin} {unit}
            </span>
          </span>
          <input
            type="range"
            data-cy={dataCyMin}
            className={styles.rangeInput}
            min={min}
            max={max}
            value={currentMin}
            onChange={(e) => onMinChange(Number(e.target.value))}
          />
        </div>
        <div className={styles.rangeRow}>
          <span className={styles.rangeLabel}>
            <span>Max</span>
            <span className={styles.rangeValue}>
              {currentMax} {unit}
            </span>
          </span>
          <input
            type="range"
            data-cy={dataCyMax}
            className={styles.rangeInput}
            min={min}
            max={max}
            value={currentMax}
            onChange={(e) => onMaxChange(Number(e.target.value))}
          />
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Static option lists
// ---------------------------------------------------------------------------

const COLOR_SWATCHES: Record<Color, string> = {
  pink: '#f9a8d4',
  red: '#dc2626',
  blue: '#60a5fa',
  yellow: '#facc15',
  purple: '#c084fc',
  white: '#f1f5f9',
  orange: '#fb923c',
  green: '#4ade80',
};

const AVAILABILITY_OPTIONS: ReadonlyArray<{ value: Availability | undefined; label: string }> = [
  { value: undefined, label: 'All' },
  { value: 'always', label: 'Always' },
  { value: 'seasonal', label: 'Seasonal' },
  { value: 'limited', label: 'Limited' },
];

const FRAGRANCE_OPTIONS: ReadonlyArray<{ value: FragranceLevel | undefined; label: string }> = [
  { value: undefined, label: 'All' },
  { value: 'none', label: 'None' },
  { value: 'light', label: 'Light' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'strong', label: 'Strong' },
];

const TOXICITY_OPTIONS: ReadonlyArray<{ value: Toxicity | undefined; label: string }> = [
  { value: undefined, label: 'All' },
  { value: 'safe', label: 'Safe' },
  { value: 'mild', label: 'Mild' },
  { value: 'toxic', label: 'Toxic' },
];

const GROUPBY_OPTIONS: ReadonlyArray<{ value: GroupBy; label: string }> = [
  { value: 'none', label: 'None' },
  { value: 'color', label: 'Color' },
  { value: 'type', label: 'Type' },
];

// ---------------------------------------------------------------------------
// FilterPanel
// ---------------------------------------------------------------------------

interface FilterPanelProps {
  availableColors: Color[];
  availableSeasons: Season[];
  availableTypes: string[];
  stemLengthBounds: { min: number; max: number };
  vaseLifeBounds: { min: number; max: number };
  currentFilter: FlowerFilter;
  onColorToggle: (color: Color) => void;
  onAvailabilityChange: (availability?: Availability) => void;
  onSeasonChange: (season?: Season) => void;
  onTypeChange: (type?: string) => void;
  onFragranceLevelChange: (fragranceLevel?: FragranceLevel) => void;
  onToxicityChange: (toxicity?: Toxicity) => void;
  onStemLengthChange: (min: number, max: number) => void;
  onVaseLifeChange: (min: number, max: number) => void;
  onGroupByChange: (groupBy?: GroupBy) => void;
  onApplyFilters: () => void;
}

export function FilterPanel({
  availableColors,
  availableSeasons,
  availableTypes,
  stemLengthBounds,
  vaseLifeBounds,
  currentFilter,
  onColorToggle,
  onAvailabilityChange,
  onSeasonChange,
  onTypeChange,
  onFragranceLevelChange,
  onToxicityChange,
  onStemLengthChange,
  onVaseLifeChange,
  onGroupByChange,
  onApplyFilters,
}: FilterPanelProps) {
  const stemMin = currentFilter.stemLengthRange?.min ?? stemLengthBounds.min;
  const stemMax = currentFilter.stemLengthRange?.max ?? stemLengthBounds.max;
  const vaseMin = currentFilter.vaseLifeRange?.min ?? vaseLifeBounds.min;
  const vaseMax = currentFilter.vaseLifeRange?.max ?? vaseLifeBounds.max;

  const seasonOptions: ReadonlyArray<{ value: Season | undefined; label: string }> = [
    { value: undefined, label: 'All' },
    ...availableSeasons.map((s) => ({ value: s, label: s })),
  ];

  const typeOptions: ReadonlyArray<{ value: string | undefined; label: string }> = [
    { value: undefined, label: 'All' },
    ...availableTypes.map((t) => ({ value: t, label: t })),
  ];

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
                  <span className={styles.colorDot} style={{ background: COLOR_SWATCHES[color] }} />
                  <span className={styles.chipLabel}>{color}</span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Season */}
      {availableSeasons.length > 0 && (
        <FilterChipSection
          title="Season"
          options={seasonOptions}
          currentValue={currentFilter.season}
          onChange={onSeasonChange}
          dataCy="season-chip"
        />
      )}

      {/* Type */}
      {availableTypes.length > 0 && (
        <FilterChipSection
          title="Type"
          options={typeOptions}
          currentValue={currentFilter.type}
          onChange={onTypeChange}
          dataCy="type-chip"
        />
      )}

      {/* Availability */}
      <FilterChipSection
        title="Availability"
        options={AVAILABILITY_OPTIONS}
        currentValue={currentFilter.availability}
        onChange={onAvailabilityChange}
        dataCy="availability-chip"
      />

      {/* Fragrance */}
      <FilterChipSection
        title="Fragrance"
        options={FRAGRANCE_OPTIONS}
        currentValue={currentFilter.fragranceLevel}
        onChange={onFragranceLevelChange}
        dataCy="fragrance-chip"
      />

      {/* Safety */}
      <FilterChipSection
        title="Safety"
        options={TOXICITY_OPTIONS}
        currentValue={currentFilter.toxicity}
        onChange={onToxicityChange}
        dataCy="toxicity-chip"
      />

      {/* Stem length */}
      <FilterRangeSection
        title="Stem Length"
        unit="cm"
        min={stemLengthBounds.min}
        max={stemLengthBounds.max}
        currentMin={stemMin}
        currentMax={stemMax}
        onMinChange={(v) => onStemLengthChange(v, stemMax)}
        onMaxChange={(v) => onStemLengthChange(stemMin, v)}
        dataCyMin="stem-length-min"
        dataCyMax="stem-length-max"
      />

      {/* Vase life */}
      <FilterRangeSection
        title="Vase Life"
        unit="days"
        min={vaseLifeBounds.min}
        max={vaseLifeBounds.max}
        currentMin={vaseMin}
        currentMax={vaseMax}
        onMinChange={(v) => onVaseLifeChange(v, vaseMax)}
        onMaxChange={(v) => onVaseLifeChange(vaseMin, v)}
        dataCyMin="vase-life-min"
        dataCyMax="vase-life-max"
      />

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
