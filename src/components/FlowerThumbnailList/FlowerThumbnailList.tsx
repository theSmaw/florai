import styles from './FlowerThumbnailList.module.css';

interface ThumbnailItem {
  id: string;
  name: string;
  imageUrl?: string;
}

interface FlowerThumbnailListProps {
  items: ThumbnailItem[];
  emptyText: string;
  onSelect: (id: string) => void;
}

export function FlowerThumbnailList({ items, emptyText, onSelect }: FlowerThumbnailListProps) {
  function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
    const img = e.currentTarget;
    const fallback = '/images/placeholder.svg';
    if (!img.src.endsWith(fallback)) img.src = fallback;
  }

  if (items.length === 0) {
    return (
      <div className={styles.hint}>
        <span className={styles.hintText}>{emptyText}</span>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={styles.card}
          onClick={() => onSelect(item.id)}
          aria-label={`View ${item.name}`}
        >
          <img
            src={item.imageUrl ?? '/images/placeholder.svg'}
            alt={item.name}
            className={styles.image}
            onError={handleImgError}
          />
          <span className={styles.name}>{item.name}</span>
        </button>
      ))}
    </div>
  );
}
