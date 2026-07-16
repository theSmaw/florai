import { useState } from 'react';
import { EditableSection } from '../../EditableSection/EditableSection';
import type { ArrangementSectionProps } from './types';
import styles from '../ArrangementDetail.module.css';

export function ArrangementDescriptionSection({
  arrangement,
  isEditing,
  canEdit,
  saving,
  error,
  onEditStart,
  onEditEnd,
  onSave,
}: ArrangementSectionProps) {
  const [draft, setDraft] = useState('');

  function handleEditStart() {
    setDraft(arrangement.description ?? '');
    onEditStart();
  }

  function handleSave() {
    onSave({ description: draft.trim() === '' ? undefined : draft.trim() });
  }

  return (
    <EditableSection
      label="Description"
      isEditing={isEditing}
      canEdit={canEdit}
      saving={saving}
      error={error}
      onEditStart={handleEditStart}
      onEditEnd={onEditEnd}
      onSave={handleSave}
      editCy="edit-description-button"
      saveCy="save-section-button"
      cancelCy="cancel-section-button"
      errorCy="save-section-error"
      editAriaLabel="Edit description"
      editView={
        <textarea
          data-cy="description-textarea"
          className={styles.notesTextarea}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          disabled={saving}
          rows={3}
        />
      }
      readView={
        <div className={styles.textBlock}>
          <p className={styles.textBlockContent}>
            {arrangement.description || (
              <span className={styles.notesEmpty}>No description yet. Click Edit to add.</span>
            )}
          </p>
        </div>
      }
    />
  );
}
