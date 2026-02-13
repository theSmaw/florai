// Reusable flower card component
// Pure UI - no business logic or store access
import type { Flower } from '../../domain/Flower';
import styles from './FlowerCard.module.css';

interface FlowerCardProps {
  flower: Flower;
  onCardClick: (flowerId: string) => void;
}

export function FlowerCard({ flower, onCardClick }: FlowerCardProps) {
  const isOutOfStock = flower.quantityOnHand === 0;
  const colorDot = flower.color[0] || 'gray';

  // Map color names to utility classes for dynamic color dot background
  const colorClasses: Record<string, string> = {
    pink: 'bg-pink-400',
    red: 'bg-red-600',
    blue: 'bg-blue-400',
    yellow: 'bg-yellow-400',
    purple: 'bg-purple-400',
    white: 'bg-white',
    orange: 'bg-orange-400',
    green: 'bg-green-400',
  };

  const colorClass = colorClasses[colorDot.toLowerCase()] || 'bg-gray-400';

  return (
    <button
      onClick={() => onCardClick(flower.id)}
      className={`${styles.card} ${isOutOfStock ? styles.outOfStock : ''}`}
    >
      <div className={styles.media}>
        <img
          src="https://via.placeholder.com/300"
          alt={flower.name}
          className={`${styles.img} ${isOutOfStock ? styles.grayscale : ''}`}
        />
        {isOutOfStock ? (
          <div className={styles.overlay}>
            <span className={styles.outBadge}>
              OUT OF STOCK
            </span>
          </div>
        ) : (
          <div className={styles.stockBadge}>
            <span className={styles.stockDot}></span>
            STOCK: {flower.quantityOnHand}
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>
            {flower.name}
          </h3>
          <div className={`${styles.colorDot} ${colorClass}`}></div>
        </div>
        <p className={styles.meta}>
          {flower.season.length > 0 ? flower.season[0] : 'Year-round'}
        </p>
        <div className={styles.footerRow}>
          <span className={isOutOfStock ? styles.priceMuted : styles.price}>
            ${flower.wholesalePrice.toFixed(2)}
            <span className={styles.perStem}>/stem</span>
          </span>
          <button
            className={styles.moreBtn}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <span className="material-icons text-lg">more_vert</span>
          </button>
        </div>
      </div>
    </button>
  );
}
