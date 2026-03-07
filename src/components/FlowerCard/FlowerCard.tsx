// Reusable flower card component
// Pure UI - no business logic or store access
import type { Flower } from '../../domain/Flower';
import { MediaCard } from '../MediaCard/MediaCard';
import styles from './FlowerCard.module.css';

interface FlowerCardProps {
  flower: Flower;
  onCardClick: (flowerId: string) => void;
}

export function FlowerCard({ flower, onCardClick }: FlowerCardProps) {
  return (
    <MediaCard
      data-cy="flower-card"
      {...(flower.imageUrl ? { imageUrl: flower.imageUrl } : {})}
      imageAlt={flower.name}
      onClick={() => onCardClick(flower.id)}
    >
      <h3 data-cy="flower-card-name" className={styles.title}>
        {flower.name}
      </h3>
    </MediaCard>
  );
}
