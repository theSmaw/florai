import styles from './SheetTitle.module.css';

interface SheetTitleProps {
  children: React.ReactNode;
}

export function SheetTitle({ children }: SheetTitleProps) {
  return <h2 className={styles.title}>{children}</h2>;
}
