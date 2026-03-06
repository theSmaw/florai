import { Pencil1Icon } from '@radix-ui/react-icons';
import styles from './EditButton.module.css';

export function EditButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={styles.editButton} {...props}>
      <Pencil1Icon width={13} height={13} aria-hidden="true" />
      Edit
    </button>
  );
}
