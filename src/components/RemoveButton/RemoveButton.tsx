import styles from './RemoveButton.module.css';

export function RemoveButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={styles.removeButton} aria-label="Remove" {...props}>
      ×
    </button>
  );
}
