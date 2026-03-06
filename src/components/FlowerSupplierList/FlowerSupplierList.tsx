// FlowerSupplierList — per-user supplier management for a single flower.
// Pure presentational component; all mutations are delegated via props.
import { useState } from 'react';
import type { FlowerSupplier } from '../../domain/Flower';
import { SupplierForm } from '../SupplierForm/SupplierForm';
import styles from './FlowerSupplierList.module.css';

export interface FlowerSupplierListProps {
  suppliers: FlowerSupplier[];
  defaultSupplier: string;
  defaultWholesalePrice: number;
  saving: boolean;
  error: string | null;
  onAdd: (name: string, wholesalePrice: number | null) => void;
  onUpdate: (id: string, name: string, wholesalePrice: number | null) => void;
  onRemove: (id: string) => void;
}

export function FlowerSupplierList({
  suppliers,
  defaultSupplier,
  defaultWholesalePrice,
  saving,
  error,
  onAdd,
  onUpdate,
  onRemove,
}: FlowerSupplierListProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  function handleAddSave(name: string, wholesalePrice: number | null) {
    onAdd(name, wholesalePrice);
    setIsAdding(false);
  }

  function handleEditSave(id: string, name: string, wholesalePrice: number | null) {
    onUpdate(id, name, wholesalePrice);
    setEditingId(null);
  }

  return (
    <div data-cy="supplier-list" className={styles.root}>
      {suppliers.length === 0 && !isAdding && (
        <div className={styles.hint}>
          <span className={styles.hintText}>
            Suggested: {defaultSupplier || 'No default'} — ${defaultWholesalePrice.toFixed(2)}
          </span>
        </div>
      )}

      {suppliers.map((supplier) =>
        editingId === supplier.id ? (
          <div key={supplier.id} data-cy="supplier-item" className={styles.item}>
            <SupplierForm
              initialName={supplier.name}
              initialPrice={supplier.wholesalePrice}
              saving={saving}
              onSave={(name, price) => handleEditSave(supplier.id, name, price)}
              onCancel={() => setEditingId(null)}
            />
          </div>
        ) : (
          <div key={supplier.id} data-cy="supplier-item" className={styles.item}>
            <div className={styles.itemInfo}>
              <span data-cy="supplier-name" className={styles.supplierName}>
                {supplier.name}
              </span>
              {supplier.wholesalePrice !== null && (
                <span data-cy="supplier-price" className={styles.supplierPrice}>
                  ${supplier.wholesalePrice.toFixed(2)}
                </span>
              )}
            </div>
            <div className={styles.itemActions}>
              <button
                data-cy="edit-supplier-button"
                type="button"
                className={styles.iconButton}
                onClick={() => setEditingId(supplier.id)}
                disabled={saving}
                aria-label={`Edit ${supplier.name}`}
              >
                Edit
              </button>
              <button
                data-cy="remove-supplier-button"
                type="button"
                className={`${styles.iconButton} ${styles.removeButton}`}
                onClick={() => onRemove(supplier.id)}
                disabled={saving}
                aria-label={`Remove ${supplier.name}`}
              >
                Remove
              </button>
            </div>
          </div>
        ),
      )}

      {isAdding && (
        <SupplierForm
          saving={saving}
          onSave={handleAddSave}
          onCancel={() => setIsAdding(false)}
        />
      )}

      {!isAdding && (
        <button
          data-cy="add-supplier-button"
          type="button"
          className={styles.addButton}
          onClick={() => setIsAdding(true)}
          disabled={saving}
        >
          + Add supplier
        </button>
      )}

      {error && (
        <p className={styles.error}>{error}</p>
      )}
    </div>
  );
}
