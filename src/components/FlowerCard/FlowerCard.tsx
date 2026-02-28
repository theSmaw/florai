// Reusable flower card component
// Pure UI - no business logic or store access
import type { Flower } from '../../domain/Flower';
import styles from './FlowerCard.module.css';

interface FlowerCardProps {
  flower: Flower;
  onCardClick: (flowerId: string) => void;
}

export function FlowerCard({ flower, onCardClick }: FlowerCardProps) {
  return (
    <button data-cy="flower-card" onClick={() => onCardClick(flower.id)} className={styles.card}>
      <div className={styles.media}>
        <img
          src={flower.imageUrl || '/images/placeholder.svg'}
          alt={flower.name}
          className={styles.img}
          width={400}
          height={400}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const img = e.currentTarget;
            const fallback = '/images/placeholder.svg';
            if (!img.src.endsWith(fallback)) {
              img.src = fallback;
            }
          }}
        />
      </div>
      <div className={styles.content}>
        <h3 data-cy="flower-card-name" className={styles.title}>
          {flower.name}
        </h3>
      </div>
    </button>
  );
}
