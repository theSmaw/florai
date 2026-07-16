import { useState } from 'react';
import { toNumber } from '../../../lib/toNumber';
import { EditableSection } from '../../EditableSection/EditableSection';
import { FormField } from '../../FormField/FormField';
import { TextInput } from '../../TextInput/TextInput';
import type { ArrangementSectionProps } from './types';
import styles from '../ArrangementDetail.module.css';

const statOrDash = (value: number | undefined, suffix = '') =>
  value !== undefined ? `${value}${suffix}` : '—';

export function ArrangementPhysicalSection({
  arrangement,
  isEditing,
  canEdit,
  saving,
  error,
  onEditStart,
  onEditEnd,
  onSave,
}: ArrangementSectionProps) {
  const [draftStemCount, setDraftStemCount] = useState('');
  const [draftWeight, setDraftWeight] = useState('');
  const [draftTime, setDraftTime] = useState('');
  const [draftVaseLife, setDraftVaseLife] = useState('');

  function handleEditStart() {
    setDraftStemCount(arrangement.stemCount?.toString() ?? '');
    setDraftWeight(arrangement.estimatedWeightGrams?.toString() ?? '');
    setDraftTime(arrangement.timeToBuildMinutes?.toString() ?? '');
    setDraftVaseLife(arrangement.vaseLifeDays?.toString() ?? '');
    onEditStart();
  }

  function handleSave() {
    onSave({
      stemCount: toNumber(draftStemCount),
      estimatedWeightGrams: toNumber(draftWeight),
      timeToBuildMinutes: toNumber(draftTime),
      vaseLifeDays: toNumber(draftVaseLife),
    });
  }

  return (
    <EditableSection
      label="Physical"
      isEditing={isEditing}
      canEdit={canEdit}
      saving={saving}
      error={error}
      onEditStart={handleEditStart}
      onEditEnd={onEditEnd}
      onSave={handleSave}
      editCy="edit-physical-button"
      saveCy="save-section-button"
      cancelCy="cancel-section-button"
      errorCy="save-section-error"
      editAriaLabel="Edit physical"
      editView={
        <div className={styles.editFieldGrid}>
          <FormField label="Stem count" htmlFor="arr-edit-stem">
            <TextInput
              id="arr-edit-stem"
              data-cy="arrangement-stem-count-input"
              type="number"
              min={0}
              value={draftStemCount}
              onChange={(e) => setDraftStemCount(e.target.value)}
              disabled={saving}
            />
          </FormField>
          <FormField label="Weight (g)" htmlFor="arr-edit-weight">
            <TextInput
              id="arr-edit-weight"
              data-cy="arrangement-weight-input"
              type="number"
              min={0}
              value={draftWeight}
              onChange={(e) => setDraftWeight(e.target.value)}
              disabled={saving}
            />
          </FormField>
          <FormField label="Time to build (min)" htmlFor="arr-edit-time">
            <TextInput
              id="arr-edit-time"
              data-cy="arrangement-time-input"
              type="number"
              min={0}
              value={draftTime}
              onChange={(e) => setDraftTime(e.target.value)}
              disabled={saving}
            />
          </FormField>
          <FormField label="Vase life (days)" htmlFor="arr-edit-vase">
            <TextInput
              id="arr-edit-vase"
              data-cy="arrangement-vase-life-input"
              type="number"
              min={0}
              value={draftVaseLife}
              onChange={(e) => setDraftVaseLife(e.target.value)}
              disabled={saving}
            />
          </FormField>
        </div>
      }
      readView={
        <div className={styles.statList}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Stem Count</span>
            <span className={styles.statValue}>{statOrDash(arrangement.stemCount)}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Weight</span>
            <span className={styles.statValue}>
              {statOrDash(arrangement.estimatedWeightGrams, ' g')}
            </span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Time to Build</span>
            <span className={styles.statValue}>
              {statOrDash(arrangement.timeToBuildMinutes, ' min')}
            </span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Vase Life</span>
            <span className={styles.statValue}>
              {statOrDash(arrangement.vaseLifeDays, ' days')}
            </span>
          </div>
        </div>
      }
    />
  );
}
