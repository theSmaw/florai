import { forwardRef } from 'react';
import styles from './SelectInput.module.css';

export const SelectInput = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  function SelectInput(props, ref) {
    return <select ref={ref} {...props} className={styles.select} />;
  },
);
