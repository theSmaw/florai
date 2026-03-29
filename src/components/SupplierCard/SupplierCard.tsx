import { useState } from 'react';
import {
  EnvelopeClosedIcon,
  MobileIcon,
  GlobeIcon,
} from '@radix-ui/react-icons';
import type { Supplier } from '../../domain/Supplier';
import { EditButton } from '../EditButton/EditButton';
import { DeleteButton } from '../DeleteButton/DeleteButton';
import { CancelButton } from '../CancelButton/CancelButton';
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
        <h3 className={styles.name}>{supplier.name}</h3>
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
          <div className={styles.confirmActions}>
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
            <CancelButton
              data-cy="delete-cancel-button"
              onClick={() => setConfirmDelete(false)}
            />
          </div>
        </div>
      ) : (
        <div className={styles.actions}>
          <EditButton
            data-cy="edit-supplier-button"
            aria-label={`Edit ${supplier.name}`}
            onClick={() => onEdit(supplier)}
          />
          <DeleteButton
            data-cy="delete-supplier-button"
            aria-label={`Delete ${supplier.name}`}
            onClick={() => setConfirmDelete(true)}
          />
        </div>
      )}
    </div>
  );
}
