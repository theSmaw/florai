// SupplierForm — inline add/edit form for a single flower supplier entry.
import { useState } from 'react';
import styles from './SupplierForm.module.css';

export interface SupplierFormProps {
  initialName?: string;
  initialPrice?: number | null;
  saving: boolean;
  onSave: (name: string, wholesalePrice: number | null) => void;
  onCancel: () => void;
}

export function SupplierForm({
  initialName = '',
  initialPrice = null,
  saving,
  onSave,
  onCancel,
}: SupplierFormProps) {
  const [name, setName] = useState(initialName);
  const [price, setPrice] = useState(initialPrice !== null ? String(initialPrice) : '');

  function handleSave() {
    const trimmed = name.trim();
    if (!trimmed) return;
    const parsed = price.trim() !== '' ? parseFloat(price) : null;
    onSave(trimmed, parsed !== null && !isNaN(parsed) ? parsed : null);
  }

  return (
    <div className={styles.form}>
      <input
        data-cy="supplier-name-input"
        type="text"
        className={styles.input}
        placeholder="Supplier name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={saving}
      />
      <input
        data-cy="supplier-price-input"
        type="number"
        min={0}
        step={0.01}
        className={styles.priceInput}
        placeholder="Price (optional)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        disabled={saving}
      />
      <div className={styles.formActions}>
        <button
          data-cy="save-supplier-button"
          type="button"
          className={styles.saveButton}
          onClick={handleSave}
          disabled={saving || name.trim() === ''}
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button
          data-cy="cancel-supplier-button"
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
          disabled={saving}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
