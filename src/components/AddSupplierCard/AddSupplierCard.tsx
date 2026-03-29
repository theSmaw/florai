import { PlusIcon } from '@radix-ui/react-icons';

export interface AddSupplierCardProps {
  onClick: () => void;
  className: string;
}

export function AddSupplierCard({ onClick, className }: AddSupplierCardProps) {
  return (
    <button
      type="button"
      className={className}
      data-cy="add-supplier-card"
      aria-label="New supplier"
      onClick={onClick}
    >
      <PlusIcon aria-hidden="true" />
      New supplier
    </button>
  );
}
