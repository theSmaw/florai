import { PlusIcon } from '@radix-ui/react-icons';
import styles from './AddFlowerCard.module.css';

export interface AddFlowerCardProps {
  onClick: () => void;
}

export function AddFlowerCard({ onClick }: AddFlowerCardProps) {
  return (
    <button
      data-cy="add-flower-card"
      type="button"
      className={styles.card}
      onClick={onClick}
      aria-label="New flower"
    >
      <span className={styles.icon}>
        <PlusIcon width={28} height={28} aria-hidden="true" />
      </span>
      <span className={styles.label}>New flower</span>
    </button>
  );
}
