import type { Arrangement } from '../../domain/Arrangement';
import { SIZE_LABEL } from '../../domain/Arrangement';
import type { Flower } from '../../domain/Flower';
import { MediaCard } from '../MediaCard/MediaCard';
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

  return (
    <MediaCard
      data-cy="arrangement-card"
      {...(arrangement.imageUrl !== undefined ? { imageUrl: arrangement.imageUrl } : {})}
      imageAlt={arrangement.name}
      onClick={() => onClick(arrangement.id)}
    >
      <h3 data-cy="arrangement-card-name" className={styles.title}>
        {arrangement.name}
      </h3>
      <div className={styles.meta}>
        <span className={`${tag} ${tagBrand}`}>{SIZE_LABEL[arrangement.size]}</span>
        {flowerCount > 0 && (
          <span className={styles.flowerCount}>
            {flowerCount} {flowerCount === 1 ? 'flower' : 'flowers'}
          </span>
        )}
      </div>
    </MediaCard>
  );
}
