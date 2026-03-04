import { Cross2Icon } from '@radix-ui/react-icons';
import styles from './FilterChip.module.css';

interface FilterChipProps {
  label: string;
  selected?: boolean;
  /** Show the X clear icon (e.g. on active/selected chips that can be dismissed) */
  showClearIcon?: boolean;
  /** Hex colour string for colour-swatch chips */
  colorDot?: string;
  onClick: () => void;
  dataCy?: string;
  /** Rendered as data-cy-value */
  dataCyValue?: string;
  /** Rendered as data-cy-color (used by colour filter chips) */
  dataCyColor?: string;
}

export function FilterChip({
  label,
  selected = false,
  showClearIcon = false,
  colorDot,
  onClick,
  dataCy,
  dataCyValue,
  dataCyColor,
}: FilterChipProps) {
  return (
    <button
      data-cy={dataCy}
      data-cy-value={dataCyValue}
      data-cy-color={dataCyColor}
      onClick={onClick}
      className={`${styles.chip} ${selected ? styles.chipSelected : ''}`}
    >
      {colorDot !== undefined && (
        <span className={styles.colorDot} style={{ background: colorDot }} />
      )}
      <span className={styles.chipLabel}>{label}</span>
      {showClearIcon && (
        <Cross2Icon className={styles.chipIcon} width={10} height={10} aria-hidden="true" />
      )}
    </button>
  );
}
