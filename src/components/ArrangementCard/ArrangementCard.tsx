import type { Arrangement } from '../../domain/Arrangement';
import { SIZE_LABEL } from '../../domain/Arrangement';
import type { Flower } from '../../domain/Flower';
import styles from './ArrangementCard.module.css';

const tag = styles.tag ?? '';
const tagBrand = styles.tagBrand ?? '';

export interface ArrangementCardProps {
  arrangement: Arrangement;
  flowers: Flower[];
  onClick: (id: string) => void;
}

export function ArrangementCard({ arrangement, flowers, onClick }: ArrangementCardProps) {
  const knownFlowers = flowers.filter((f) => arrangement.flowerIds.includes(f.id));
  const flowerCount = knownFlowers.length || arrangement.flowerIds.length;
  const sizeClass = `${tag} ${tagBrand}`;

  return (
    <button
      data-cy="arrangement-card"
      className={styles.card}
      onClick={() => onClick(arrangement.id)}
      type="button"
    >
      <div className={styles.media}>
        <img
          src={arrangement.imageUrl ?? '/images/placeholder.svg'}
          alt={arrangement.name}
          className={styles.img}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const img = e.currentTarget;
            const fallback = '/images/placeholder.svg';
            if (!img.src.endsWith(fallback)) img.src = fallback;
          }}
        />
      </div>
      <div className={styles.content}>
        <h3 data-cy="arrangement-card-name" className={styles.title}>
          {arrangement.name}
        </h3>
        <div className={styles.meta}>
          <span className={sizeClass}>{SIZE_LABEL[arrangement.size]}</span>
          {flowerCount > 0 && (
            <span className={styles.flowerCount}>
              {flowerCount} {flowerCount === 1 ? 'flower' : 'flowers'}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
