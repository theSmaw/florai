import { forwardRef } from 'react';
import styles from './TextArea.module.css';

export const TextArea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function TextArea(props, ref) {
    return <textarea ref={ref} {...props} className={styles.textarea} />;
  },
);
