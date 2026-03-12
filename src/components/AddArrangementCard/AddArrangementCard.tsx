import { PlusIcon } from '@radix-ui/react-icons';
import styles from './AddArrangementCard.module.css';

export interface AddArrangementCardProps {
  onClick: () => void;
}

export function AddArrangementCard({ onClick }: AddArrangementCardProps) {
  return (
    <button
      data-cy="add-arrangement-card"
      type="button"
      className={styles.card}
      onClick={onClick}
      aria-label="New arrangement"
    >
      <span className={styles.icon}>
        <PlusIcon width={28} height={28} aria-hidden="true" />
      </span>
      <span className={styles.label}>New arrangement</span>
    </button>
  );
}
