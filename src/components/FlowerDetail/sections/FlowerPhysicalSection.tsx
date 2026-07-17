import { useState } from 'react';
import type { FragranceLevel, Toxicity } from '../../../domain/Flower';
import { FRAGRANCE_LABEL, FRAGRANCE_PIPS, TOXICITY_LABEL } from '../../../domain/flowerDisplayMeta';
import { toNumber } from '../../../lib/toNumber';
import { EditableSection } from '../../EditableSection/EditableSection';
import { FormField } from '../../FormField/FormField';
import { TextInput } from '../../TextInput/TextInput';
import { SelectInput } from '../../SelectInput/SelectInput';
import { StatList } from '../../StatList/StatList';
import type { Stat } from '../../StatList/StatList';
import { Tag } from '../../Tag/Tag';
import type { TagVariant } from '../../Tag/Tag';
import type { FlowerFieldSectionProps } from './types';
import styles from './FlowerPhysicalSection.module.css';

const FRAGRANCES: FragranceLevel[] = ['none', 'light', 'moderate', 'strong'];
const TOXICITIES: Toxicity[] = ['safe', 'mild', 'toxic'];

function toxicityVariant(toxicity: Toxicity): TagVariant {
  if (toxicity === 'safe') return 'brand';
  if (toxicity === 'toxic') return 'danger';
  return 'warning';
}

export function FlowerPhysicalSection({
  flower,
  isEditing,
  canEdit,
  saving,
  error,
  onEditStart,
  onEditEnd,
  onSave,
}: FlowerFieldSectionProps) {
  const [draftStemLength, setDraftStemLength] = useState('');
  const [draftVaseLife, setDraftVaseLife] = useState('');
  const [draftFragrance, setDraftFragrance] = useState<FragranceLevel | ''>('');
  const [draftToxicity, setDraftToxicity] = useState<Toxicity | ''>('');

  function handleEditStart() {
    setDraftStemLength(flower.stemLengthCm?.toString() ?? '');
    setDraftVaseLife(flower.vaseLifeDays?.toString() ?? '');
    setDraftFragrance(flower.fragranceLevel ?? '');
    setDraftToxicity(flower.toxicity ?? '');
    onEditStart();
  }

  function handleSave() {
    onSave({
      stemLengthCm: toNumber(draftStemLength),
      vaseLifeDays: toNumber(draftVaseLife),
      fragranceLevel: draftFragrance === '' ? undefined : draftFragrance,
      toxicity: draftToxicity === '' ? undefined : draftToxicity,
    });
  }

  const fragrancePips = flower.fragranceLevel ? FRAGRANCE_PIPS[flower.fragranceLevel] : 0;

  const items: Stat[] = [];
  if (flower.stemLengthCm !== undefined) {
    items.push({ label: 'Stem Length', value: `${flower.stemLengthCm} cm` });
  }
  if (flower.vaseLifeDays !== undefined) {
    items.push({ label: 'Vase Life', value: `${flower.vaseLifeDays} days` });
  }
  if (flower.fragranceLevel !== undefined) {
    items.push({
      label: 'Fragrance',
      value: (
        <span className={styles.fragranceIndicator}>
          <span className={styles.fragrancePips}>
            {[1, 2, 3].map((level) => (
              <span
                key={level}
                className={
                  level <= fragrancePips
                    ? `${styles.fragrancePip} ${styles.fragrancePipActive}`
                    : styles.fragrancePip
                }
              />
            ))}
          </span>
          <span className={styles.fragranceText}>{FRAGRANCE_LABEL[flower.fragranceLevel]}</span>
        </span>
      ),
    });
  }
  if (flower.toxicity !== undefined) {
    items.push({
      label: 'Toxicity',
      value: (
        <Tag variant={toxicityVariant(flower.toxicity)}>{TOXICITY_LABEL[flower.toxicity]}</Tag>
      ),
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
      saveCy="save-fields-button"
      cancelCy="cancel-fields-button"
      errorCy="save-fields-error"
      editAriaLabel="Edit physical"
      editView={
        <div className={styles.fieldEditColumn}>
          <FormField label="Stem length (cm)" htmlFor="flower-edit-stem">
            <TextInput
              id="flower-edit-stem"
              data-cy="flower-stem-length-input"
              type="number"
              min={0}
              value={draftStemLength}
              onChange={(e) => setDraftStemLength(e.target.value)}
              disabled={saving}
            />
          </FormField>
          <FormField label="Vase life (days)" htmlFor="flower-edit-vase">
            <TextInput
              id="flower-edit-vase"
              data-cy="flower-vase-life-input"
              type="number"
              min={0}
              value={draftVaseLife}
              onChange={(e) => setDraftVaseLife(e.target.value)}
              disabled={saving}
            />
          </FormField>
          <FormField label="Fragrance" htmlFor="flower-edit-fragrance">
            <SelectInput
              id="flower-edit-fragrance"
              data-cy="flower-fragrance-select"
              value={draftFragrance}
              onChange={(e) => setDraftFragrance(e.target.value as FragranceLevel | '')}
              disabled={saving}
            >
              <option value="">Not set</option>
              {FRAGRANCES.map((f) => (
                <option key={f} value={f}>
                  {FRAGRANCE_LABEL[f]}
                </option>
              ))}
            </SelectInput>
          </FormField>
          <FormField label="Toxicity" htmlFor="flower-edit-toxicity">
            <SelectInput
              id="flower-edit-toxicity"
              data-cy="flower-toxicity-select"
              value={draftToxicity}
              onChange={(e) => setDraftToxicity(e.target.value as Toxicity | '')}
              disabled={saving}
            >
              <option value="">Not set</option>
              {TOXICITIES.map((t) => (
                <option key={t} value={t}>
                  {TOXICITY_LABEL[t]}
                </option>
              ))}
            </SelectInput>
          </FormField>
        </div>
      }
      readView={
        items.length > 0 ? (
          <StatList items={items} />
        ) : (
          <p className={styles.empty}>No physical details yet. Click Edit to add.</p>
        )
      }
    />
  );
}
