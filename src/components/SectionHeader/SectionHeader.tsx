import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  label: string;
  as?: 'h2' | 'h3';
}

export function SectionHeader({ label, as: Tag = 'h2' }: SectionHeaderProps) {
  return (
    <div className={styles.sectionHeader}>
      <Tag className={styles.sectionLabel}>{label}</Tag>
      <div className={styles.sectionLine} />
    </div>
  );
}
