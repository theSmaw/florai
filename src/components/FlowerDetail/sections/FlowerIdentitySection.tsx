import { useEffect, useRef, useState } from 'react';
import { EditButton } from '../../EditButton/EditButton';
import { SaveButton } from '../../SaveButton/SaveButton';
import { CancelButton } from '../../CancelButton/CancelButton';
import { FormField } from '../../FormField/FormField';
import { TextInput } from '../../TextInput/TextInput';
import type { FlowerFieldSectionProps } from './types';
import styles from './FlowerIdentitySection.module.css';

/**
 * Flower identity: name (shown as the page title) and type. Bespoke rather than
 * using EditableSection because the "header" here is the h1 title itself.
 */
export function FlowerIdentitySection({
  flower,
  isEditing,
  canEdit,
  saving,
  error,
  onEditStart,
  onEditEnd,
  onSave,
}: FlowerFieldSectionProps) {
  const [draftName, setDraftName] = useState('');
  const [draftType, setDraftType] = useState('');
  const saveInitiated = useRef(false);

  useEffect(() => {
    if (saveInitiated.current && !saving) {
      saveInitiated.current = false;
      if (!error) onEditEnd();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saving, error]);

  function handleEditStart() {
    setDraftName(flower.name);
    setDraftType(flower.type);
    onEditStart();
  }

  function handleSave() {
    if (draftName.trim() === '' || draftType.trim() === '') return;
    saveInitiated.current = true;
    onSave({ name: draftName.trim(), type: draftType.trim() });
  }

  return (
    <div className={styles.identity}>
      <div className={styles.header}>
        {isEditing ? (
          <div className={styles.fieldEditColumn}>
            <FormField label="Name" htmlFor="flower-edit-name" required>
              <TextInput
                id="flower-edit-name"
                data-cy="flower-name-input"
                type="text"
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                disabled={saving}
              />
            </FormField>
            <FormField label="Type" htmlFor="flower-edit-type" required>
              <TextInput
                id="flower-edit-type"
                data-cy="flower-type-input"
                type="text"
                value={draftType}
                onChange={(e) => setDraftType(e.target.value)}
                disabled={saving}
              />
            </FormField>
            {error && (
              <p data-cy="save-fields-error" className={styles.error}>
                {error}
              </p>
            )}
            <div className={styles.editActions}>
              <SaveButton data-cy="save-fields-button" saving={saving} onClick={handleSave} />
              <CancelButton data-cy="cancel-fields-button" onClick={onEditEnd} disabled={saving} />
            </div>
          </div>
        ) : (
          <>
            <div>
              <h1 data-cy="flower-name" className={styles.nameDisplay}>
                {flower.name}
              </h1>
              <div className={styles.identityMeta}>
                <span className={styles.typeLabel}>{flower.type}</span>
              </div>
            </div>
            <EditButton
              data-cy="edit-identity-button"
              onClick={handleEditStart}
              disabled={!canEdit}
              aria-label="Edit name and type"
            />
          </>
        )}
      </div>
    </div>
  );
}
