import { useState } from 'react';
import {
  Pencil1Icon,
  TrashIcon,
  EnvelopeClosedIcon,
  MobileIcon,
  GlobeIcon,
} from '@radix-ui/react-icons';
import type { Supplier } from '../../domain/Supplier';
import styles from './SupplierCard.module.css';

export interface SupplierCardProps {
  supplier: Supplier;
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: string) => void;
}

export function SupplierCard({ supplier, onEdit, onDelete }: SupplierCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className={styles.card} data-cy="supplier-card">
      <div className={styles.info}>
        <p className={styles.name}>{supplier.name}</p>
        {supplier.contactPerson && (
          <p className={styles.contactPerson}>{supplier.contactPerson}</p>
        )}
        <ul className={styles.metaList}>
          {supplier.emails.map((email) => (
            <li key={email} className={styles.metaRow}>
              <EnvelopeClosedIcon className={styles.metaIcon} aria-hidden="true" />
              <span className={styles.metaText}>{email}</span>
            </li>
          ))}
          {supplier.phones.map((phone) => (
            <li key={phone} className={styles.metaRow}>
              <MobileIcon className={styles.metaIcon} aria-hidden="true" />
              <span className={styles.metaText}>{phone}</span>
            </li>
          ))}
          {supplier.website && (
            <li className={styles.metaRow}>
              <GlobeIcon className={styles.metaIcon} aria-hidden="true" />
              <span className={styles.metaText}>{supplier.website}</span>
            </li>
          )}
        </ul>
        {supplier.notes && (
          <p className={styles.notes}>{supplier.notes}</p>
        )}
      </div>

      {confirmDelete ? (
        <div className={styles.deleteConfirm}>
          <span className={styles.deleteQuestion} data-cy="delete-confirm-question">
            Delete {supplier.name}?
          </span>
          <button
            type="button"
            className={styles.confirmButton}
            data-cy="delete-confirm-button"
            onClick={() => {
              setConfirmDelete(false);
              onDelete(supplier.id);
            }}
          >
            Confirm
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            data-cy="delete-cancel-button"
            onClick={() => setConfirmDelete(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.editButton}
            data-cy="edit-supplier-button"
            aria-label={`Edit ${supplier.name}`}
            onClick={() => onEdit(supplier)}
          >
            <Pencil1Icon aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.deleteButton}
            data-cy="delete-supplier-button"
            aria-label={`Delete ${supplier.name}`}
            onClick={() => setConfirmDelete(true)}
          >
            <TrashIcon aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
