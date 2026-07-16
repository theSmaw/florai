import { useState } from 'react';
import type { Arrangement } from '../../../domain/Arrangement';
import { EditableSection } from '../../EditableSection/EditableSection';
import styles from '../ArrangementDetail.module.css';

interface Props {
  arrangement: Arrangement;
  onNotesSave: (notes: string) => void;
  savingNotes: boolean;
  saveNotesError: string | null;
}

/**
 * Notes persist through a dedicated endpoint (separate status from the other
 * field edits), so this section manages its own open/closed state.
 */
export function ArrangementNotesSection({
  arrangement,
  onNotesSave,
  savingNotes,
  saveNotesError,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState('');

  function handleEditStart() {
    setDraft(arrangement.notes ?? '');
    setIsEditing(true);
  }

  return (
    <EditableSection
      label="Notes"
      isEditing={isEditing}
      canEdit={!savingNotes}
      saving={savingNotes}
      error={saveNotesError}
      onEditStart={handleEditStart}
      onEditEnd={() => setIsEditing(false)}
      onSave={() => onNotesSave(draft)}
      editCy="edit-notes-button"
      saveCy="save-notes-button"
      cancelCy="cancel-notes-button"
      errorCy="save-notes-error"
      editAriaLabel="Edit notes"
      editView={
        <textarea
          data-cy="notes-textarea"
          className={styles.notesTextarea}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          disabled={savingNotes}
          rows={5}
        />
      }
      readView={
        <div className={styles.textBlock}>
          <p className={styles.textBlockContent}>
            {arrangement.notes || (
              <span className={styles.notesEmpty}>No notes yet. Click Edit to add.</span>
            )}
          </p>
        </div>
      }
    />
  );
}
