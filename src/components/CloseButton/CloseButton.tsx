import { forwardRef } from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';
import styles from './CloseButton.module.css';

export const CloseButton = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  function CloseButton({ ...rest }, ref) {
    return (
      <button ref={ref} type="button" className={styles.closeButton} {...rest}>
        <Cross2Icon width={15} height={15} aria-hidden="true" />
      </button>
    );
  },
);
