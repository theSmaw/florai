import { forwardRef } from 'react';
import styles from './CancelButton.module.css';

export const CancelButton = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  function CancelButton(props, ref) {
    return (
      <button ref={ref} type="button" className={styles.cancelButton} {...props}>
        Cancel
      </button>
    );
  },
);
