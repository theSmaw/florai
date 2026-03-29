import styles from './AddFieldButton.module.css';

export interface AddFieldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export function AddFieldButton({ label, ...rest }: AddFieldButtonProps) {
  return (
    <button type="button" className={styles.addFieldButton} {...rest}>
      + {label}
    </button>
  );
}
