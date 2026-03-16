import styles from './ChipGroup.module.css';

export interface ChipGroupProps<T extends string> {
  options: readonly T[];
  selected: T[];
  onToggle: (value: T) => void;
  disabled?: boolean;
  dataCy?: string;
  getLabel?: (value: T) => string;
  getOptionDataCy?: (value: T) => string;
}

export function ChipGroup<T extends string>({
  options,
  selected,
  onToggle,
  disabled,
  dataCy,
  getLabel,
  getOptionDataCy,
}: ChipGroupProps<T>) {
  return (
    <div data-cy={dataCy} className={styles.chipGroup}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          data-cy={getOptionDataCy ? getOptionDataCy(option) : undefined}
          className={
            selected.includes(option)
              ? `${styles.chip} ${styles.chipActive}`
              : styles.chip
          }
          onClick={() => onToggle(option)}
          disabled={disabled}
        >
          {getLabel ? getLabel(option) : option}
        </button>
      ))}
    </div>
  );
}
