import { HeaderMenu } from '../../components/HeaderMenu/HeaderMenu.tsx';
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
          <h1 data-cy="page-title" className={styles.title}>Weddings</h1>
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
        <p style={{ color: '#334155' }}>This is a placeholder for the Weddings page.</p>
      </main>
    </div>
  );
}
