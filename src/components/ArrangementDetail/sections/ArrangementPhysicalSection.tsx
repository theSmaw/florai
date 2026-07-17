import { useState } from 'react';
import { toNumber } from '../../../lib/toNumber';
import { EditableSection } from '../../EditableSection/EditableSection';
import { FormField } from '../../FormField/FormField';
import { TextInput } from '../../TextInput/TextInput';
import { StatList } from '../../StatList/StatList';
import { FieldGrid } from '../../FieldGrid/FieldGrid';
import type { ArrangementSectionProps } from './types';

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
        <FieldGrid>
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
        </FieldGrid>
      }
      readView={
        <StatList
          items={[
            { label: 'Stem Count', value: statOrDash(arrangement.stemCount) },
            { label: 'Weight', value: statOrDash(arrangement.estimatedWeightGrams, ' g') },
            { label: 'Time to Build', value: statOrDash(arrangement.timeToBuildMinutes, ' min') },
            { label: 'Vase Life', value: statOrDash(arrangement.vaseLifeDays, ' days') },
          ]}
        />
      }
    />
  );
}
