import type { ReactNode } from 'react';
import styles from './StatList.module.css';

export interface Stat {
  label: string;
  value: ReactNode;
}

export interface StatListProps {
  items: Stat[];
}

/** A vertical list of label/value rows used across the detail pages. */
export function StatList({ items }: StatListProps) {
  return (
    <div className={styles.list}>
      {items.map((stat) => (
        <div key={stat.label} className={styles.item}>
          <span className={styles.label}>{stat.label}</span>
          <span className={styles.value}>{stat.value}</span>
        </div>
      ))}
    </div>
  );
}
