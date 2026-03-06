import styles from './CancelButton.module.css';

export function CancelButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={styles.cancelButton} {...props}>
      Cancel
    </button>
  );
}
