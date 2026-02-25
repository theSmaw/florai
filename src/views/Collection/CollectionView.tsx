import { HeaderMenu } from '../../components/HeaderMenu/HeaderMenu.tsx';
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
          <div className={styles.iconButtons}>
            <HeaderMenu />
            <button className={styles.iconButton}>
              <span className="material-icons">notifications_none</span>
            </button>
            <button className={styles.iconButton}>
              <span className="material-icons">account_circle</span>
            </button>
          </div>
        </div>
      </header>

      <main style={{ padding: '1rem' }}>
        <p style={{ color: '#334155' }}>This is a placeholder for the Collection page.</p>
      </main>
    </div>
  );
}
