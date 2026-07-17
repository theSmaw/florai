import { useEffect, useRef, useState } from 'react';
import type {
  ArrangementOccasion,
  ArrangementSize,
  ArrangementStyle,
} from '../../../domain/Arrangement';
import { OCCASION_LABEL, SIZE_LABEL, STYLE_LABEL } from '../../../domain/Arrangement';
import { EditButton } from '../../EditButton/EditButton';
import { SaveButton } from '../../SaveButton/SaveButton';
import { CancelButton } from '../../CancelButton/CancelButton';
import { FormField } from '../../FormField/FormField';
import { TextInput } from '../../TextInput/TextInput';
import { SelectInput } from '../../SelectInput/SelectInput';
import { ChipGroup } from '../../ChipGroup/ChipGroup';
import { Tag } from '../../Tag/Tag';
import type { ArrangementSectionProps } from './types';
import styles from './ArrangementIdentitySection.module.css';

const SIZES: ArrangementSize[] = ['small', 'medium', 'large', 'extra-large'];
const STYLES: ArrangementStyle[] = [
  'romantic',
  'rustic',
  'modern',
  'wild',
  'classic',
  'contemporary',
];
const OCCASIONS: ArrangementOccasion[] = [
  'wedding',
  'birthday',
  'funeral',
  'everyday',
  'sympathy',
  'anniversary',
];

/**
 * Identity block: the arrangement name (shown as the page title) plus size,
 * style and occasion. Bespoke rather than using EditableSection because the
 * "header" here is the h1 title itself.
 */
export function ArrangementIdentitySection({
  arrangement,
  isEditing,
  canEdit,
  saving,
  error,
  onEditStart,
  onEditEnd,
  onSave,
}: ArrangementSectionProps) {
  const [draftName, setDraftName] = useState('');
  const [draftSize, setDraftSize] = useState<ArrangementSize>('medium');
  const [draftStyle, setDraftStyle] = useState<ArrangementStyle | ''>('');
  const [draftOccasions, setDraftOccasions] = useState<ArrangementOccasion[]>([]);
  const saveInitiated = useRef(false);

  useEffect(() => {
    if (saveInitiated.current && !saving) {
      saveInitiated.current = false;
      if (!error) onEditEnd();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saving, error]);

  function handleEditStart() {
    setDraftName(arrangement.name);
    setDraftSize(arrangement.size);
    setDraftStyle(arrangement.style ?? '');
    setDraftOccasions(arrangement.occasion ?? []);
    onEditStart();
  }

  function handleSave() {
    if (draftName.trim() === '') return;
    saveInitiated.current = true;
    onSave({
      name: draftName.trim(),
      size: draftSize,
      style: draftStyle === '' ? undefined : draftStyle,
      occasion: draftOccasions.length > 0 ? draftOccasions : undefined,
    });
  }

  function toggleOccasion(occ: ArrangementOccasion) {
    setDraftOccasions((prev) =>
      prev.includes(occ) ? prev.filter((o) => o !== occ) : [...prev, occ],
    );
  }

  return (
    <div className={styles.identity}>
      <div className={styles.header}>
        {isEditing ? (
          <FormField label="Name" htmlFor="arr-edit-name" required>
            <TextInput
              id="arr-edit-name"
              data-cy="arrangement-name-input"
              type="text"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              disabled={saving}
            />
          </FormField>
        ) : (
          <h1 data-cy="arrangement-name" className={styles.nameDisplay}>
            {arrangement.name}
          </h1>
        )}
        {!isEditing && (
          <EditButton
            data-cy="edit-identity-button"
            onClick={handleEditStart}
            disabled={!canEdit}
            aria-label="Edit details"
          />
        )}
      </div>

      {isEditing ? (
        <div className={styles.editFields}>
          <FormField label="Size" htmlFor="arr-edit-size" required>
            <SelectInput
              id="arr-edit-size"
              data-cy="arrangement-size-select"
              value={draftSize}
              onChange={(e) => setDraftSize(e.target.value as ArrangementSize)}
              disabled={saving}
            >
              {SIZES.map((s) => (
                <option key={s} value={s}>
                  {SIZE_LABEL[s]}
                </option>
              ))}
            </SelectInput>
          </FormField>
          <FormField label="Style" htmlFor="arr-edit-style">
            <SelectInput
              id="arr-edit-style"
              data-cy="arrangement-style-select"
              value={draftStyle}
              onChange={(e) => setDraftStyle(e.target.value as ArrangementStyle | '')}
              disabled={saving}
            >
              <option value="">No style</option>
              {STYLES.map((s) => (
                <option key={s} value={s}>
                  {STYLE_LABEL[s]}
                </option>
              ))}
            </SelectInput>
          </FormField>
          <FormField label="Occasion">
            <ChipGroup
              options={OCCASIONS}
              selected={draftOccasions}
              onToggle={toggleOccasion}
              disabled={saving}
              dataCy="occasion-chips"
              getLabel={(occ) => OCCASION_LABEL[occ]}
              getOptionDataCy={(occ) => `occasion-chip-${occ}`}
            />
          </FormField>
          {error && (
            <p data-cy="save-section-error" className={styles.error}>
              {error}
            </p>
          )}
          <div className={styles.editActions}>
            <SaveButton data-cy="save-section-button" saving={saving} onClick={handleSave} />
            <CancelButton data-cy="cancel-section-button" onClick={onEditEnd} disabled={saving} />
          </div>
        </div>
      ) : (
        <>
          <div className={styles.identityMeta}>
            <Tag variant="brand">{SIZE_LABEL[arrangement.size]}</Tag>
            {arrangement.style && <Tag>{STYLE_LABEL[arrangement.style]}</Tag>}
          </div>
          {arrangement.occasion && arrangement.occasion.length > 0 && (
            <div className={styles.occasionChips}>
              {arrangement.occasion.map((occ) => (
                <span key={occ} className={styles.occasionChip}>
                  {OCCASION_LABEL[occ]}
                </span>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
