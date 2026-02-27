import styles from './WeddingsView.module.css';

/**
 * Weddings page (placeholder)
 * - Minimal content
 * - Reuses Catalogue styles for consistent look
 */
export function WeddingsView() {
  return (
    <div data-cy="weddings-view" className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <h1 data-cy="page-title" className={styles.title}>
            Weddings
          </h1>
        </div>
      </header>

      <main className={styles.main}>
        <p className={styles.placeholderText}>This is a placeholder for the Weddings page.</p>
      </main>
    </div>
  );
}
