import styles from './ConfirmButton.module.css';

export function ConfirmButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={styles.confirmButton} {...props}>
      Confirm
    </button>
  );
}
