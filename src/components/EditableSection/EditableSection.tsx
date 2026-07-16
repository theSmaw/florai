import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { EditButton } from '../EditButton/EditButton';
import { SaveButton } from '../SaveButton/SaveButton';
import { CancelButton } from '../CancelButton/CancelButton';
import styles from './EditableSection.module.css';

export interface EditableSectionProps {
  /** Heading shown by the section's SectionHeader. */
  label: string;
  /** Whether this section is currently in edit mode. */
  isEditing: boolean;
  /** Whether the Edit button is enabled (e.g. false while another section is being edited). */
  canEdit: boolean;
  /** True while a save is in flight — drives the Save spinner and disables Cancel. */
  saving: boolean;
  /** Save error, kept visible so the user can correct and retry. */
  error: string | null;
  /** Enter edit mode (the caller should seed its draft state here). */
  onEditStart: () => void;
  /** Leave edit mode (used by Cancel and after a successful save). */
  onEditEnd: () => void;
  /** Persist the current draft. */
  onSave: () => void;
  /** Read-only view, shown when not editing. */
  readView: ReactNode;
  /** Editable form fields, shown when editing (Save/Cancel and error are added around it). */
  editView: ReactNode;
  editCy: string;
  saveCy: string;
  cancelCy: string;
  errorCy?: string;
  editAriaLabel?: string;
}

/**
 * A detail-page section that toggles between a read view and an inline edit form.
 * Owns the shared boilerplate: header + Edit button, Save/Cancel actions, error
 * display, and closing itself once a save completes successfully.
 */
export function EditableSection({
  label,
  isEditing,
  canEdit,
  saving,
  error,
  onEditStart,
  onEditEnd,
  onSave,
  readView,
  editView,
  editCy,
  saveCy,
  cancelCy,
  errorCy,
  editAriaLabel,
}: EditableSectionProps) {
  const saveInitiated = useRef(false);

  // Close on a successful save (keep open on error so the message stays visible).
  useEffect(() => {
    if (saveInitiated.current && !saving) {
      saveInitiated.current = false;
      if (!error) {
        onEditEnd();
      }
    }
    // onEditEnd is a stable-enough handler; re-running only on save/error transitions.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saving, error]);

  function handleSave() {
    saveInitiated.current = true;
    onSave();
  }

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <SectionHeader label={label} />
        {!isEditing && (
          <EditButton
            data-cy={editCy}
            onClick={onEditStart}
            disabled={!canEdit}
            aria-label={editAriaLabel ?? `Edit ${label.toLowerCase()}`}
          />
        )}
      </div>
      {isEditing ? (
        <div>
          {editView}
          {error && (
            <p data-cy={errorCy} className={styles.error}>
              {error}
            </p>
          )}
          <div className={styles.actions}>
            <SaveButton data-cy={saveCy} saving={saving} onClick={handleSave} />
            <CancelButton data-cy={cancelCy} onClick={onEditEnd} disabled={saving} />
          </div>
        </div>
      ) : (
        readView
      )}
    </div>
  );
}
