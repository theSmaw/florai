import styles from './SaveButton.module.css';

interface SaveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  saving?: boolean;
}

export function SaveButton({ saving = false, disabled, ...rest }: SaveButtonProps) {
  return (
    <button
      type="button"
      className={styles.saveButton}
      disabled={disabled ?? saving}
      {...rest}
    >
      {saving ? 'Saving…' : 'Save'}
    </button>
  );
}
