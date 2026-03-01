import styles from './FlowerDetail.module.css';

interface SectionHeaderProps {
  label: string;
}

export function SectionHeader({ label }: SectionHeaderProps) {
  return (
    <div className={styles.sectionHeader}>
      <span className={styles.sectionLabel}>{label}</span>
      <div className={styles.sectionLine} />
    </div>
  );
}
