import { useState } from 'react';
import { EditableSection } from '../EditableSection/EditableSection';
import styles from './TextSection.module.css';

export interface TextSectionProps {
  label: string;
  value: string;
  /** Placeholder shown in the read view when the value is empty. */
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
  rows?: number;
}

/**
 * A detail-page section wrapping a single free-text field (e.g. Notes, Care).
 * Persists through its own endpoint, so it manages its own open/closed state.
 */
export function TextSection({
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
  rows = 5,
}: TextSectionProps) {
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
          className={styles.textarea}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          disabled={saving}
          rows={rows}
        />
      }
      readView={
        <div className={styles.textBlock}>
          <p className={styles.textBlockContent}>
            {value || <span className={styles.empty}>{emptyText}</span>}
          </p>
        </div>
      }
    />
  );
}
