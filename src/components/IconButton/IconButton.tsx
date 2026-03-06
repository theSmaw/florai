import { forwardRef } from 'react';
import styles from './IconButton.module.css';

// Circular, borderless icon-only button.
// Forwards its ref so it can be used as a Radix DropdownMenu.Trigger (asChild).
export const IconButton = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  function IconButton({ className, ...rest }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        className={className ? `${styles.iconButton} ${className}` : styles.iconButton}
        {...rest}
      />
    );
  },
);
