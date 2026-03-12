import type { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { CloseButton } from '../CloseButton/CloseButton';
import { SheetTitle } from '../SheetTitle/SheetTitle';
import styles from './ModalShell.module.css';

export interface ModalShellProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  /** Scrollable body content */
  children: ReactNode;
  /** Footer content (cancel/save buttons) */
  footer: ReactNode;
  /** Disables the header close button while an async operation is in progress */
  closingDisabled?: boolean;
}

export function ModalShell({
  open,
  onOpenChange,
  title,
  children,
  footer,
  closingDisabled,
}: ModalShellProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content} aria-describedby={undefined}>
          <div className={styles.header}>
            <Dialog.Title asChild>
              <SheetTitle>{title}</SheetTitle>
            </Dialog.Title>
            <Dialog.Close asChild>
              <CloseButton aria-label="Close" disabled={closingDisabled} />
            </Dialog.Close>
          </div>
          <div className={styles.body}>{children}</div>
          <div className={styles.footer}>{footer}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
