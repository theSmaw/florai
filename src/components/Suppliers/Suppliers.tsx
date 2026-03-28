import type { Supplier, NewSupplier } from '../../domain/Supplier';
import { SupplierCard } from '../SupplierCard/SupplierCard';
import { AddSupplierCard } from '../AddSupplierCard/AddSupplierCard';
import { SupplierModal } from '../SupplierModal/SupplierModal';
import styles from './Suppliers.module.css';

export interface SuppliersProps {
  suppliers: Supplier[];
  isLoading: boolean;
  isSaving: boolean;
  saveError: string | null;
  modalSupplier: Supplier | 'new' | null;
  onAddClick: () => void;
  onEditClick: (supplier: Supplier) => void;
  onSave: (data: NewSupplier, id?: string) => void;
  onDelete: (id: string) => void;
  onModalClose: () => void;
}

export function Suppliers({
  suppliers,
  isLoading,
  isSaving,
  saveError,
  modalSupplier,
  onAddClick,
  onEditClick,
  onSave,
  onDelete,
  onModalClose,
}: SuppliersProps) {
  const modalOpen = modalSupplier !== null;
  const editingSupplier = modalSupplier !== null && modalSupplier !== 'new' ? modalSupplier : undefined;

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1 className={styles.title} data-cy="page-title">Suppliers</h1>
      </div>

      <div className={styles.main}>
        {isLoading ? (
          <div className={styles.loading}>Loading…</div>
        ) : (
          <div className={styles.list}>
            {suppliers.length === 0 && (
              <p className={styles.empty} data-cy="suppliers-empty">No suppliers yet.</p>
            )}
            {suppliers.map((supplier) => (
              <SupplierCard
                key={supplier.id}
                supplier={supplier}
                onEdit={onEditClick}
                onDelete={onDelete}
              />
            ))}
            <AddSupplierCard onClick={onAddClick} />
          </div>
        )}
      </div>

      <SupplierModal
        open={modalOpen}
        onOpenChange={(open) => { if (!open) onModalClose(); }}
        {...(editingSupplier !== undefined ? { supplier: editingSupplier } : {})}
        saving={isSaving}
        error={saveError}
        onSave={onSave}
      />
    </div>
  );
}
