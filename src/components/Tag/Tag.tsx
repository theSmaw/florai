import type { ReactNode } from 'react';
import styles from './Tag.module.css';

export type TagVariant = 'default' | 'brand' | 'warning' | 'danger';

export interface TagProps {
  variant?: TagVariant;
  children: ReactNode;
}

const VARIANT_CLASS: Record<TagVariant, string> = {
  default: '',
  brand: styles.brand ?? '',
  warning: styles.warning ?? '',
  danger: styles.danger ?? '',
};

/** A small uppercase pill for semantic labels (size, style, toxicity, …). */
export function Tag({ variant = 'default', children }: TagProps) {
  return <span className={`${styles.tag} ${VARIANT_CLASS[variant]}`.trim()}>{children}</span>;
}
