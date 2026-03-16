import { AddCard } from '../AddCard/AddCard';

export interface AddFlowerCardProps {
  onClick: () => void;
}

export function AddFlowerCard({ onClick }: AddFlowerCardProps) {
  return (
    <AddCard
      onClick={onClick}
      label="New flower"
      dataCy="add-flower-card"
      ariaLabel="New flower"
    />
  );
}
