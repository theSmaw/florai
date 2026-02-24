// Flower list component
// Pure UI - displays flowers in a grid, no business logic
import type { Flower } from '../../domain/Flower';
import { FlowerCard } from '../FlowerCard/FlowerCard';
import styles from './FlowerList.module.css';

interface FlowerListProps {
  flowers: Flower[];
  groupedFlowers?: Record<string, Flower[]>;
  onCardClick: (flowerId: string) => void;
  isLoading?: boolean;
}

export function FlowerList({
  flowers,
  groupedFlowers,
  onCardClick,
  isLoading,
}: FlowerListProps) {
  if (isLoading) {
    return (
      <div className={styles.center}>
        <p data-cy="loading-indicator" className={styles.mutedText}>Loading flowers...</p>
      </div>
    );
  }

  // If grouped, show groups; otherwise show flat list
  if (groupedFlowers) {
    return (
      <main data-cy="flower-list" className={styles.main}>
        {Object.entries(groupedFlowers).map(([groupName, groupFlowers]) => (
          <div data-cy="flower-group" key={groupName} className={styles.group}>
            <h2 data-cy="group-title" className={styles.groupTitle}>
              {groupName}
            </h2>
            <div className={styles.grid}>
              {groupFlowers.map((flower) => (
                <FlowerCard key={flower.id} flower={flower} onCardClick={onCardClick} />
              ))}
            </div>
          </div>
        ))}
        {Object.keys(groupedFlowers).length === 0 && (
          <div className={styles.empty}>
            <p className={styles.mutedText}>No flowers found</p>
          </div>
        )}
      </main>
    );
  }

  // Flat list
  if (flowers.length === 0) {
    return (
      <main className={styles.main}>
        <div className={styles.empty}>
          <p className={styles.mutedText}>No flowers found</p>
        </div>
      </main>
    );
  }

  return (
    <main data-cy="flower-list" className={styles.main}>
      <div className={styles.grid}>
        {flowers.map((flower) => (
          <FlowerCard key={flower.id} flower={flower} onCardClick={onCardClick} />
        ))}
      </div>
    </main>
  );
}
