import { PlusIcon } from '@radix-ui/react-icons';
import styles from './AddSupplierCard.module.css';

export interface AddSupplierCardProps {
  onClick: () => void;
}

export function AddSupplierCard({ onClick }: AddSupplierCardProps) {
  return (
    <button
      type="button"
      className={styles.button}
      data-cy="add-supplier-card"
      aria-label="New supplier"
      onClick={onClick}
    >
      <PlusIcon aria-hidden="true" />
      New supplier
    </button>
  );
}
