import { forwardRef } from 'react';
import styles from './TextInput.module.css';

export const TextInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function TextInput(props, ref) {
    return <input ref={ref} {...props} className={styles.input} />;
  },
);
