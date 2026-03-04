// FilterChipSection — generic single-select chip group (with optional "All" entry)
import { FilterChip } from '../FilterChip/FilterChip';
import styles from './FilterChipSection.module.css';

export interface FilterChipSectionProps<T extends string> {
  title: string;
  options: ReadonlyArray<{ value: T | undefined; label: string }>;
  currentValue: T | undefined;
  onChange: (value: T | undefined) => void;
  dataCy: string;
}

export function FilterChipSection<T extends string>({
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
            <FilterChip
              key={label}
              label={label}
              selected={selected}
              showClearIcon={selected && value !== undefined}
              onClick={() => onChange(selected ? undefined : value)}
              dataCy={dataCy}
              dataCyValue={value ?? 'all'}
            />
          );
        })}
      </div>
    </section>
  );
}
