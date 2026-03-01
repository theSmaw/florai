// FilterChipSection — generic single-select chip group (with optional "All" entry)
import { Cross2Icon } from '@radix-ui/react-icons';
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
            <button
              key={label}
              data-cy={dataCy}
              data-cy-value={value ?? 'all'}
              onClick={() => onChange(selected ? undefined : value)}
              className={`${styles.chip} ${selected ? styles.chipSelected : ''}`}
            >
              <span className={styles.chipLabel}>{label}</span>
              {selected && value !== undefined && (
                <Cross2Icon className={styles.chipIcon} width={10} height={10} aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
