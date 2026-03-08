import styles from './MediaCard.module.css';

export interface MediaCardProps {
  imageUrl?: string | undefined;
  imageAlt: string;
  onClick: () => void;
  'data-cy'?: string;
  children: React.ReactNode;
}

export function MediaCard({
  imageUrl,
  imageAlt,
  onClick,
  'data-cy': dataCy,
  children,
}: MediaCardProps) {
  return (
    <button data-cy={dataCy} className={styles.card} onClick={onClick} type="button">
      <div className={styles.media}>
        <img
          src={imageUrl ?? '/images/placeholder.svg'}
          alt={imageAlt}
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
      <div className={styles.content}>{children}</div>
    </button>
  );
}
