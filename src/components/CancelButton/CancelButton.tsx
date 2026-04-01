import { forwardRef } from 'react';
import styles from './CancelButton.module.css';

export interface CancelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'md' | 'xs';
}

export const CancelButton = forwardRef<HTMLButtonElement, CancelButtonProps>(
  function CancelButton({ size = 'md', ...props }, ref) {
    const className = size === 'xs' ? styles.cancelButtonXs : styles.cancelButton;
    return (
      <button ref={ref} type="button" className={className} {...props}>
        Cancel
      </button>
    );
  },
);
