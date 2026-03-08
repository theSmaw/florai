import type {
  ArrangementFilter,
  ArrangementOccasion,
  ArrangementSize,
  ArrangementStyle,
} from '../../domain/Arrangement';
import { OCCASION_LABEL, SIZE_LABEL, STYLE_LABEL } from '../../domain/Arrangement';
import { FilterChipSection } from '../FilterChipSection/FilterChipSection';
import styles from './ArrangementFilterPanel.module.css';

const SIZES: ArrangementSize[] = ['small', 'medium', 'large', 'extra-large'];
const STYLES: ArrangementStyle[] = ['romantic', 'rustic', 'modern', 'wild', 'classic', 'contemporary'];
const OCCASIONS: ArrangementOccasion[] = ['wedding', 'birthday', 'funeral', 'everyday', 'sympathy', 'anniversary'];

const SIZE_OPTIONS: ReadonlyArray<{ value: ArrangementSize | undefined; label: string }> = [
  { value: undefined, label: 'All' },
  ...SIZES.map((s) => ({ value: s, label: SIZE_LABEL[s] })),
];

const STYLE_OPTIONS: ReadonlyArray<{ value: ArrangementStyle | undefined; label: string }> = [
  { value: undefined, label: 'All' },
  ...STYLES.map((s) => ({ value: s, label: STYLE_LABEL[s] })),
];

const OCCASION_OPTIONS: ReadonlyArray<{ value: ArrangementOccasion | undefined; label: string }> = [
  { value: undefined, label: 'All' },
  ...OCCASIONS.map((occ) => ({ value: occ, label: OCCASION_LABEL[occ] })),
];

const GROUP_BY_OPTIONS: ReadonlyArray<{ value: 'size' | 'occasion' | undefined; label: string }> = [
  { value: undefined, label: 'None' },
  { value: 'size', label: 'Size' },
  { value: 'occasion', label: 'Occasion' },
];

interface ArrangementFilterPanelProps {
  currentFilter: ArrangementFilter;
  onSizeChange: (size?: ArrangementSize) => void;
  onStyleChange: (style?: ArrangementStyle) => void;
  onOccasionChange: (occasion?: ArrangementOccasion) => void;
  onGroupByChange: (groupBy?: 'size' | 'occasion') => void;
  onApply: () => void;
}

export function ArrangementFilterPanel({
  currentFilter,
  onSizeChange,
  onStyleChange,
  onOccasionChange,
  onGroupByChange,
  onApply,
}: ArrangementFilterPanelProps) {
  return (
    <div data-cy="arrangement-filter-panel" className={styles.body}>
      <FilterChipSection
        title="Size"
        options={SIZE_OPTIONS}
        currentValue={currentFilter.size}
        onChange={onSizeChange}
        dataCy="arrangements-size-chip"
      />
      <FilterChipSection
        title="Style"
        options={STYLE_OPTIONS}
        currentValue={currentFilter.style}
        onChange={onStyleChange}
        dataCy="arrangements-style-chip"
      />
      <FilterChipSection
        title="Occasion"
        options={OCCASION_OPTIONS}
        currentValue={currentFilter.occasion}
        onChange={onOccasionChange}
        dataCy="arrangements-occasion-chip"
      />
      <FilterChipSection
        title="Group by"
        options={GROUP_BY_OPTIONS}
        currentValue={currentFilter.groupBy === 'none' ? undefined : currentFilter.groupBy}
        onChange={onGroupByChange}
        dataCy="arrangements-groupby-chip"
      />
      <button data-cy="apply-arrangement-filters-button" className={styles.applyButton} onClick={onApply}>
        Apply
      </button>
    </div>
  );
}
