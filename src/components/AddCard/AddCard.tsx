import { PlusIcon } from '@radix-ui/react-icons';
import styles from './AddCard.module.css';

export interface AddCardProps {
  onClick: () => void;
  label: string;
  dataCy: string;
  ariaLabel: string;
}

export function AddCard({ onClick, label, dataCy, ariaLabel }: AddCardProps) {
  return (
    <button
      data-cy={dataCy}
      type="button"
      className={styles.card}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <span className={styles.icon}>
        <PlusIcon width={28} height={28} aria-hidden="true" />
      </span>
      <span className={styles.label}>{label}</span>
    </button>
  );
}
