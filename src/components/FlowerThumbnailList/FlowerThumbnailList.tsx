import type { Flower } from '../../domain/Flower';
import styles from './FlowerThumbnailList.module.css';

interface FlowerThumbnailListProps {
  flowers: Flower[];
  emptyText: string;
  onFlowerSelect: (flowerId: string) => void;
}

export function FlowerThumbnailList({ flowers, emptyText, onFlowerSelect }: FlowerThumbnailListProps) {
  function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
    const img = e.currentTarget;
    const fallback = '/images/placeholder.svg';
    if (!img.src.endsWith(fallback)) img.src = fallback;
  }

  if (flowers.length === 0) {
    return (
      <div className={styles.hint}>
        <span className={styles.hintText}>{emptyText}</span>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {flowers.map((flower) => (
        <button
          key={flower.id}
          type="button"
          className={styles.card}
          onClick={() => onFlowerSelect(flower.id)}
          aria-label={`View ${flower.name}`}
        >
          <img
            src={flower.imageUrl ?? '/images/placeholder.svg'}
            alt={flower.name}
            className={styles.image}
            onError={handleImgError}
          />
          <span className={styles.name}>{flower.name}</span>
        </button>
      ))}
    </div>
  );
}
