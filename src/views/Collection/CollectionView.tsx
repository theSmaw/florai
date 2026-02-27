import styles from './CollectionView.module.css';

/**
 * Dummy Collection page
 * - Minimal placeholder content
 * - Reuses Catalogue styles for consistent look
 */
export function CollectionView() {
  return (
    <div data-cy="collection-view" className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <h1 data-cy="page-title" className={styles.title}>
            Collection
          </h1>
        </div>
      </header>

      <main className={styles.main}>
        <p className={styles.placeholderText}>This is a placeholder for the Collection page.</p>
      </main>
    </div>
  );
}
