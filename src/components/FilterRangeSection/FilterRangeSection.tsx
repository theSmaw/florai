// FilterRangeSection — labelled min/max range slider pair
import styles from './FilterRangeSection.module.css';

export interface FilterRangeSectionProps {
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

export function FilterRangeSection({
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
