import type { ReactNode } from 'react';
import styles from './FieldGrid.module.css';

export interface FieldGridProps {
  children: ReactNode;
}

/** A two-column responsive grid for laying out edit form fields. */
export function FieldGrid({ children }: FieldGridProps) {
  return <div className={styles.grid}>{children}</div>;
}
