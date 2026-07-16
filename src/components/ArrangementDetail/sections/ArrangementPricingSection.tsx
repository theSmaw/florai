import { useState } from 'react';
import { toNumber } from '../../../lib/toNumber';
import { EditableSection } from '../../EditableSection/EditableSection';
import { FormField } from '../../FormField/FormField';
import { TextInput } from '../../TextInput/TextInput';
import type { ArrangementSectionProps } from './types';
import styles from '../ArrangementDetail.module.css';

export function ArrangementPricingSection({
  arrangement,
  isEditing,
  canEdit,
  saving,
  error,
  onEditStart,
  onEditEnd,
  onSave,
}: ArrangementSectionProps) {
  const [draftWholesale, setDraftWholesale] = useState('');
  const [draftRetail, setDraftRetail] = useState('');

  function handleEditStart() {
    setDraftWholesale(arrangement.wholesaleCost?.toString() ?? '');
    setDraftRetail(arrangement.retailPrice?.toString() ?? '');
    onEditStart();
  }

  function handleSave() {
    onSave({
      wholesaleCost: toNumber(draftWholesale),
      retailPrice: toNumber(draftRetail),
    });
  }

  return (
    <EditableSection
      label="Pricing"
      isEditing={isEditing}
      canEdit={canEdit}
      saving={saving}
      error={error}
      onEditStart={handleEditStart}
      onEditEnd={onEditEnd}
      onSave={handleSave}
      editCy="edit-pricing-button"
      saveCy="save-section-button"
      cancelCy="cancel-section-button"
      errorCy="save-section-error"
      editAriaLabel="Edit pricing"
      editView={
        <div className={styles.editFieldGrid}>
          <FormField label="Wholesale cost ($)" htmlFor="arr-edit-wholesale">
            <TextInput
              id="arr-edit-wholesale"
              data-cy="arrangement-wholesale-input"
              type="number"
              min={0}
              step="0.01"
              value={draftWholesale}
              onChange={(e) => setDraftWholesale(e.target.value)}
              disabled={saving}
            />
          </FormField>
          <FormField label="Retail price ($)" htmlFor="arr-edit-retail">
            <TextInput
              id="arr-edit-retail"
              data-cy="arrangement-retail-input"
              type="number"
              min={0}
              step="0.01"
              value={draftRetail}
              onChange={(e) => setDraftRetail(e.target.value)}
              disabled={saving}
            />
          </FormField>
        </div>
      }
      readView={
        <div className={styles.statList}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Wholesale Cost</span>
            <span className={styles.statValue}>
              {arrangement.wholesaleCost !== undefined
                ? `$${arrangement.wholesaleCost.toFixed(2)}`
                : '—'}
            </span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Retail Price</span>
            <span className={styles.statValue}>
              {arrangement.retailPrice !== undefined
                ? `$${arrangement.retailPrice.toFixed(2)}`
                : '—'}
            </span>
          </div>
        </div>
      }
    />
  );
}
