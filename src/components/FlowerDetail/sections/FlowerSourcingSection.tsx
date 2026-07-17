import { useState } from 'react';
import { toNumber } from '../../../lib/toNumber';
import { EditableSection } from '../../EditableSection/EditableSection';
import { FlowerSupplierList } from '../../FlowerSupplierList/FlowerSupplierList';
import { FormField } from '../../FormField/FormField';
import { TextInput } from '../../TextInput/TextInput';
import { StatList } from '../../StatList/StatList';
import type { FlowerFieldSectionProps } from './types';
import styles from './FlowerSourcingSection.module.css';

interface Props extends FlowerFieldSectionProps {
  isCustom: boolean;
  savingSupplier: boolean;
  supplierError: string | null;
  onAddSupplier: (name: string, wholesalePrice: number | null) => void;
  onUpdateSupplier: (id: string, name: string, wholesalePrice: number | null) => void;
  onRemoveSupplier: (id: string) => void;
}

/**
 * Sourcing. The default supplier + wholesale price are editable (override for
 * global flowers, direct for custom). Custom flowers show them as plain stats;
 * global flowers show the per-user supplier list beneath the same editor.
 */
export function FlowerSourcingSection({
  flower,
  isCustom,
  isEditing,
  canEdit,
  saving,
  error,
  onEditStart,
  onEditEnd,
  onSave,
  savingSupplier,
  supplierError,
  onAddSupplier,
  onUpdateSupplier,
  onRemoveSupplier,
}: Props) {
  const [draftSupplier, setDraftSupplier] = useState('');
  const [draftWholesale, setDraftWholesale] = useState('');

  function handleEditStart() {
    setDraftSupplier(flower.supplier);
    setDraftWholesale(flower.wholesalePrice ? String(flower.wholesalePrice) : '');
    onEditStart();
  }

  function handleSave() {
    onSave({ supplier: draftSupplier.trim(), wholesalePrice: toNumber(draftWholesale) ?? 0 });
  }

  const readView = isCustom ? (
    <StatList
      items={[
        { label: 'Supplier', value: flower.supplier || '—' },
        { label: 'Wholesale Price', value: `$${flower.wholesalePrice.toFixed(2)}` },
      ]}
    />
  ) : (
    <FlowerSupplierList
      suppliers={flower.suppliers}
      defaultSupplier={flower.supplier}
      defaultWholesalePrice={flower.wholesalePrice}
      saving={savingSupplier}
      error={supplierError}
      onAdd={onAddSupplier}
      onUpdate={onUpdateSupplier}
      onRemove={onRemoveSupplier}
    />
  );

  return (
    <EditableSection
      label="Sourcing"
      isEditing={isEditing}
      canEdit={canEdit}
      saving={saving}
      error={error}
      onEditStart={handleEditStart}
      onEditEnd={onEditEnd}
      onSave={handleSave}
      editCy="edit-sourcing-button"
      saveCy="save-fields-button"
      cancelCy="cancel-fields-button"
      errorCy="save-fields-error"
      editAriaLabel="Edit sourcing"
      editView={
        <div className={styles.fieldEditColumn}>
          <FormField label="Supplier" htmlFor="flower-edit-supplier">
            <TextInput
              id="flower-edit-supplier"
              data-cy="flower-supplier-input"
              type="text"
              value={draftSupplier}
              onChange={(e) => setDraftSupplier(e.target.value)}
              disabled={saving}
            />
          </FormField>
          <FormField label="Wholesale price ($)" htmlFor="flower-edit-wholesale">
            <TextInput
              id="flower-edit-wholesale"
              data-cy="flower-wholesale-input"
              type="number"
              min={0}
              step="0.01"
              value={draftWholesale}
              onChange={(e) => setDraftWholesale(e.target.value)}
              disabled={saving}
            />
          </FormField>
        </div>
      }
      readView={readView}
    />
  );
}
