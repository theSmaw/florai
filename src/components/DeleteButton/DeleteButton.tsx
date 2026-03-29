import { TrashIcon } from '@radix-ui/react-icons';
import styles from './DeleteButton.module.css';

export function DeleteButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={styles.deleteButton} {...props}>
      <TrashIcon width={13} height={13} aria-hidden="true" />
      Delete
    </button>
  );
}
