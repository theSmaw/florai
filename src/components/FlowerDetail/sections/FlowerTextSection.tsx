import { useState } from 'react';
import { EditableSection } from '../../EditableSection/EditableSection';
import styles from '../FlowerDetail.module.css';

interface Props {
  label: string;
  value: string;
  emptyText: string;
  saving: boolean;
  error: string | null;
  onSave: (value: string) => void;
  editCy: string;
  textareaCy: string;
  saveCy: string;
  cancelCy: string;
  errorCy: string;
  editAriaLabel: string;
}

/**
 * A free-text section (Botanical Care, Sourcing Notes). Each persists through
 * its own endpoint, so it manages its own open/closed state.
 */
export function FlowerTextSection({
  label,
  value,
  emptyText,
  saving,
  error,
  onSave,
  editCy,
  textareaCy,
  saveCy,
  cancelCy,
  errorCy,
  editAriaLabel,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState('');

  function handleEditStart() {
    setDraft(value);
    setIsEditing(true);
  }

  return (
    <EditableSection
      label={label}
      isEditing={isEditing}
      canEdit={!saving}
      saving={saving}
      error={error}
      onEditStart={handleEditStart}
      onEditEnd={() => setIsEditing(false)}
      onSave={() => onSave(draft)}
      editCy={editCy}
      saveCy={saveCy}
      cancelCy={cancelCy}
      errorCy={errorCy}
      editAriaLabel={editAriaLabel}
      editView={
        <textarea
          data-cy={textareaCy}
          className={styles.careTextarea}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          disabled={saving}
          rows={5}
        />
      }
      readView={
        <div className={styles.textBlock}>
          <p className={styles.textBlockContent}>
            {value || <span className={styles.careEmpty}>{emptyText}</span>}
          </p>
        </div>
      }
    />
  );
}
