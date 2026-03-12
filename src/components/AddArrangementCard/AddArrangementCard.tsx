import { AddCard } from '../AddCard/AddCard';

export interface AddArrangementCardProps {
  onClick: () => void;
}

export function AddArrangementCard({ onClick }: AddArrangementCardProps) {
  return (
    <AddCard
      onClick={onClick}
      label="New arrangement"
      dataCy="add-arrangement-card"
      ariaLabel="New arrangement"
    />
  );
}
