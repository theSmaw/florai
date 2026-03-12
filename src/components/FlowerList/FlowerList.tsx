// Flower list component
// Pure UI - displays flowers in a grid, no business logic
import type { ReactNode } from 'react';
import type { Flower } from '../../domain/Flower';
import { FlowerCard } from '../FlowerCard/FlowerCard';
import styles from './FlowerList.module.css';

interface FlowerListProps {
  flowers: Flower[];
  groupedFlowers?: Record<string, Flower[]>;
  onCardClick: (flowerId: string) => void;
  isLoading?: boolean;
  /** Optional card rendered as the last item in the grid (e.g. AddFlowerCard). */
  addCard?: ReactNode;
}

export function FlowerList({ flowers, groupedFlowers, onCardClick, isLoading, addCard }: FlowerListProps) {
  if (isLoading) {
    return (
      <div className={styles.center}>
        <p data-cy="loading-indicator" className={styles.mutedText}>
          Loading flowers...
        </p>
      </div>
    );
  }

  // If grouped, show groups; otherwise show flat list
  if (groupedFlowers) {
    const groupKeys = Object.keys(groupedFlowers);
    return (
      <main data-cy="flower-list" className={styles.main}>
        {groupKeys.map((groupName, i) => (
          <div data-cy="flower-group" key={groupName} className={styles.group}>
            <h2 data-cy="group-title" className={styles.groupTitle}>
              {groupName}
            </h2>
            <div className={styles.grid}>
              {(groupedFlowers[groupName] ?? []).map((flower) => (
                <FlowerCard key={flower.id} flower={flower} onCardClick={onCardClick} />
              ))}
              {i === groupKeys.length - 1 && addCard}
            </div>
          </div>
        ))}
        {groupKeys.length === 0 && (
          <div className={styles.empty}>
            <p className={styles.mutedText}>No flowers found</p>
          </div>
        )}
      </main>
    );
  }

  // Flat list
  return (
    <main data-cy="flower-list" className={styles.main}>
      <div className={styles.grid}>
        {flowers.map((flower) => (
          <FlowerCard key={flower.id} flower={flower} onCardClick={onCardClick} />
        ))}
        {addCard}
      </div>
    </main>
  );
}
