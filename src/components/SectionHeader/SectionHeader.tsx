import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  label: string;
}

export function SectionHeader({ label }: SectionHeaderProps) {
  return (
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionLabel}>{label}</h2>
      <div className={styles.sectionLine} />
    </div>
  );
}
