import { useEffect, useRef, useState } from 'react';
import type {
  Arrangement,
  ArrangementOccasion,
  ArrangementSize,
  ArrangementStyle,
} from '../../domain/Arrangement';
import { OCCASION_LABEL, SIZE_LABEL, STYLE_LABEL } from '../../domain/Arrangement';
import type { ArrangementUpdate } from '../../api/updateArrangement';
import type { Flower } from '../../domain/Flower';
import { DetailLayout } from '../DetailLayout/DetailLayout';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { EditButton } from '../EditButton/EditButton';
import { SaveButton } from '../SaveButton/SaveButton';
import { CancelButton } from '../CancelButton/CancelButton';
import { FormField } from '../FormField/FormField';
import { TextInput } from '../TextInput/TextInput';
import { SelectInput } from '../SelectInput/SelectInput';
import { ChipGroup } from '../ChipGroup/ChipGroup';
import { FlowerThumbnailList } from '../FlowerThumbnailList/FlowerThumbnailList';
import styles from './ArrangementDetail.module.css';

const tag = styles.tag ?? '';
const tagBrand = styles.tagBrand ?? '';

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

type EditableSection = 'identity' | 'flowers' | 'physical' | 'pricing' | 'description';

// Parses a numeric text input into a number, or undefined when blank (clears the field).
function toNumber(value: string): number | undefined {
  const trimmed = value.trim();
  if (trimmed === '') return undefined;
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : undefined;
}

export interface ArrangementDetailProps {
  arrangement: Arrangement;
  flowers: Flower[];
  backLabel: string;
  onBack: () => void;
  onImageUpload: (file: File) => void;
  uploadingImage: boolean;
  uploadError: string | null;
  onNotesSave: (notes: string) => void;
  savingNotes: boolean;
  saveNotesError: string | null;
  onUpdate: (updates: ArrangementUpdate) => void;
  saving: boolean;
  saveError: string | null;
  onFlowerSelect: (flowerId: string) => void;
}

export function ArrangementDetail({
  arrangement,
  flowers,
  backLabel,
  onBack,
  onImageUpload,
  uploadingImage,
  uploadError,
  onNotesSave,
  savingNotes,
  saveNotesError,
  onUpdate,
  saving,
  saveError,
  onFlowerSelect,
}: ArrangementDetailProps) {
  const [isNotesEditing, setIsNotesEditing] = useState(false);
  const [draftNotes, setDraftNotes] = useState('');
  const notesSaveInitiated = useRef(false);

  // A single section may be edited at a time. Drafts are seeded when editing starts.
  const [editingSection, setEditingSection] = useState<EditableSection | null>(null);
  const sectionSaveInitiated = useRef(false);

  const [draftName, setDraftName] = useState('');
  const [draftSize, setDraftSize] = useState<ArrangementSize>('medium');
  const [draftStyle, setDraftStyle] = useState<ArrangementStyle | ''>('');
  const [draftOccasions, setDraftOccasions] = useState<ArrangementOccasion[]>([]);
  const [draftFlowerIds, setDraftFlowerIds] = useState<string[]>([]);
  const [draftStemCount, setDraftStemCount] = useState('');
  const [draftWeight, setDraftWeight] = useState('');
  const [draftTime, setDraftTime] = useState('');
  const [draftVaseLife, setDraftVaseLife] = useState('');
  const [draftWholesale, setDraftWholesale] = useState('');
  const [draftRetail, setDraftRetail] = useState('');
  const [draftDescription, setDraftDescription] = useState('');

  useEffect(() => {
    if (notesSaveInitiated.current && !savingNotes) {
      notesSaveInitiated.current = false;
      if (!saveNotesError) {
        setIsNotesEditing(false);
      }
    }
  }, [savingNotes, saveNotesError]);

  useEffect(() => {
    if (sectionSaveInitiated.current && !saving) {
      sectionSaveInitiated.current = false;
      if (!saveError) {
        setEditingSection(null);
      }
    }
  }, [saving, saveError]);

  function handleNotesEditClick() {
    setDraftNotes(arrangement.notes ?? '');
    setIsNotesEditing(true);
  }

  function handleNotesCancel() {
    setIsNotesEditing(false);
  }

  function handleNotesSave() {
    notesSaveInitiated.current = true;
    onNotesSave(draftNotes);
  }

  function startEdit(section: EditableSection) {
    setDraftName(arrangement.name);
    setDraftSize(arrangement.size);
    setDraftStyle(arrangement.style ?? '');
    setDraftOccasions(arrangement.occasion ?? []);
    setDraftFlowerIds(arrangement.flowerIds);
    setDraftStemCount(arrangement.stemCount?.toString() ?? '');
    setDraftWeight(arrangement.estimatedWeightGrams?.toString() ?? '');
    setDraftTime(arrangement.timeToBuildMinutes?.toString() ?? '');
    setDraftVaseLife(arrangement.vaseLifeDays?.toString() ?? '');
    setDraftWholesale(arrangement.wholesaleCost?.toString() ?? '');
    setDraftRetail(arrangement.retailPrice?.toString() ?? '');
    setDraftDescription(arrangement.description ?? '');
    setEditingSection(section);
  }

  function cancelEdit() {
    setEditingSection(null);
  }

  function saveSection() {
    let updates: ArrangementUpdate;
    switch (editingSection) {
      case 'identity':
        if (draftName.trim() === '') return;
        updates = {
          name: draftName.trim(),
          size: draftSize,
          style: draftStyle === '' ? undefined : draftStyle,
          occasion: draftOccasions.length > 0 ? draftOccasions : undefined,
        };
        break;
      case 'flowers':
        updates = { flowerIds: draftFlowerIds };
        break;
      case 'physical':
        updates = {
          stemCount: toNumber(draftStemCount),
          estimatedWeightGrams: toNumber(draftWeight),
          timeToBuildMinutes: toNumber(draftTime),
          vaseLifeDays: toNumber(draftVaseLife),
        };
        break;
      case 'pricing':
        updates = {
          wholesaleCost: toNumber(draftWholesale),
          retailPrice: toNumber(draftRetail),
        };
        break;
      case 'description':
        updates = {
          description: draftDescription.trim() === '' ? undefined : draftDescription.trim(),
        };
        break;
      default:
        return;
    }
    sectionSaveInitiated.current = true;
    onUpdate(updates);
  }

  function toggleOccasion(occ: ArrangementOccasion) {
    setDraftOccasions((prev) =>
      prev.includes(occ) ? prev.filter((o) => o !== occ) : [...prev, occ],
    );
  }

  function toggleFlower(id: string) {
    setDraftFlowerIds((prev) =>
      prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id],
    );
  }

  const arrangementFlowers = flowers.filter((f) => arrangement.flowerIds.includes(f.id));

  const editActions = (
    <div className={styles.notesEditActions}>
      <SaveButton data-cy="save-section-button" saving={saving} onClick={saveSection} />
      <CancelButton data-cy="cancel-section-button" onClick={cancelEdit} disabled={saving} />
    </div>
  );

  function editButtonFor(section: EditableSection, label: string) {
    return (
      <EditButton
        data-cy={`edit-${section}-button`}
        onClick={() => startEdit(section)}
        disabled={saving || editingSection !== null}
        aria-label={label}
      />
    );
  }

  const statOrDash = (value: number | undefined, suffix = '') =>
    value !== undefined ? `${value}${suffix}` : '—';

  return (
    <DetailLayout
      backLabel={backLabel}
      onBack={onBack}
      contextLabel="Arrangement Details"
      {...(arrangement.imageUrl !== undefined ? { imageUrl: arrangement.imageUrl } : {})}
      imageAlt={arrangement.name}
      uploadingImage={uploadingImage}
      uploadError={uploadError}
      onImageUpload={onImageUpload}
    >
      {/* Identity */}
      <div className={styles.identity}>
        <div className={styles.notesHeader}>
          {editingSection === 'identity' ? (
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
          {editingSection !== 'identity' && editButtonFor('identity', 'Edit details')}
        </div>

        {editingSection === 'identity' ? (
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
            {saveError && (
              <p data-cy="save-section-error" className={styles.notesError}>
                {saveError}
              </p>
            )}
            {editActions}
          </div>
        ) : (
          <>
            <div className={styles.identityMeta}>
              <span className={`${tag} ${tagBrand}`}>{SIZE_LABEL[arrangement.size]}</span>
              {arrangement.style && <span className={tag}>{STYLE_LABEL[arrangement.style]}</span>}
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

      {/* Description */}
      <div className={styles.section}>
        <div className={styles.notesHeader}>
          <SectionHeader label="Description" />
          {editingSection !== 'description' && editButtonFor('description', 'Edit description')}
        </div>
        {editingSection === 'description' ? (
          <div>
            <textarea
              data-cy="description-textarea"
              className={styles.notesTextarea}
              value={draftDescription}
              onChange={(e) => setDraftDescription(e.target.value)}
              disabled={saving}
              rows={3}
            />
            {saveError && (
              <p data-cy="save-section-error" className={styles.notesError}>
                {saveError}
              </p>
            )}
            {editActions}
          </div>
        ) : (
          <div className={styles.textBlock}>
            <p className={styles.textBlockContent}>
              {arrangement.description || (
                <span className={styles.notesEmpty}>No description yet. Click Edit to add.</span>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Flowers */}
      <div className={styles.section}>
        <div className={styles.notesHeader}>
          <SectionHeader label="Flowers" />
          {editingSection !== 'flowers' && editButtonFor('flowers', 'Edit flowers')}
        </div>
        {editingSection === 'flowers' ? (
          <div>
            <div data-cy="flower-checklist" className={styles.flowerChecklist}>
              {flowers.map((flower) => (
                <label key={flower.id} className={styles.flowerCheckItem}>
                  <input
                    type="checkbox"
                    data-cy={`flower-checkbox-${flower.id}`}
                    checked={draftFlowerIds.includes(flower.id)}
                    onChange={() => toggleFlower(flower.id)}
                    disabled={saving}
                  />
                  <span>{flower.name}</span>
                </label>
              ))}
              {flowers.length === 0 && (
                <p className={styles.notesEmpty}>No flowers in catalogue yet.</p>
              )}
            </div>
            {saveError && (
              <p data-cy="save-section-error" className={styles.notesError}>
                {saveError}
              </p>
            )}
            {editActions}
          </div>
        ) : (
          <FlowerThumbnailList
            items={arrangementFlowers}
            emptyText="No flowers in this arrangement."
            onSelect={onFlowerSelect}
          />
        )}
      </div>

      {/* Physical */}
      <div className={styles.section}>
        <div className={styles.notesHeader}>
          <SectionHeader label="Physical" />
          {editingSection !== 'physical' && editButtonFor('physical', 'Edit physical')}
        </div>
        {editingSection === 'physical' ? (
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
            {saveError && (
              <p data-cy="save-section-error" className={styles.notesError}>
                {saveError}
              </p>
            )}
            <div className={styles.gridActions}>{editActions}</div>
          </div>
        ) : (
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
        )}
      </div>

      {/* Pricing */}
      <div className={styles.section}>
        <div className={styles.notesHeader}>
          <SectionHeader label="Pricing" />
          {editingSection !== 'pricing' && editButtonFor('pricing', 'Edit pricing')}
        </div>
        {editingSection === 'pricing' ? (
          <div className={styles.editFieldGrid}>
            <FormField label="Wholesale cost ($)" htmlFor="arr-edit-wholesale">
              <TextInput
                id="arr-edit-wholesale"
                data-cy="arrangement-wholesale-input"
                type="number"
                min={0}
                step="0.01"
                value={draftWholesale}
                onChange={(e) => setDraftWholesale(e.target.value)}
                disabled={saving}
              />
            </FormField>
            <FormField label="Retail price ($)" htmlFor="arr-edit-retail">
              <TextInput
                id="arr-edit-retail"
                data-cy="arrangement-retail-input"
                type="number"
                min={0}
                step="0.01"
                value={draftRetail}
                onChange={(e) => setDraftRetail(e.target.value)}
                disabled={saving}
              />
            </FormField>
            {saveError && (
              <p data-cy="save-section-error" className={styles.notesError}>
                {saveError}
              </p>
            )}
            <div className={styles.gridActions}>{editActions}</div>
          </div>
        ) : (
          <div className={styles.statList}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Wholesale Cost</span>
              <span className={styles.statValue}>
                {arrangement.wholesaleCost !== undefined
                  ? `$${arrangement.wholesaleCost.toFixed(2)}`
                  : '—'}
              </span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Retail Price</span>
              <span className={styles.statValue}>
                {arrangement.retailPrice !== undefined
                  ? `$${arrangement.retailPrice.toFixed(2)}`
                  : '—'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Notes */}
      <div className={styles.section}>
        <div className={styles.notesHeader}>
          <SectionHeader label="Notes" />
          {!isNotesEditing && (
            <EditButton
              data-cy="edit-notes-button"
              onClick={handleNotesEditClick}
              disabled={savingNotes}
              aria-label="Edit notes"
            />
          )}
        </div>
        {isNotesEditing ? (
          <div>
            <textarea
              data-cy="notes-textarea"
              className={styles.notesTextarea}
              value={draftNotes}
              onChange={(e) => setDraftNotes(e.target.value)}
              disabled={savingNotes}
              rows={5}
            />
            {saveNotesError && (
              <p data-cy="save-notes-error" className={styles.notesError}>
                {saveNotesError}
              </p>
            )}
            <div className={styles.notesEditActions}>
              <SaveButton
                data-cy="save-notes-button"
                saving={savingNotes}
                onClick={handleNotesSave}
              />
              <CancelButton
                data-cy="cancel-notes-button"
                onClick={handleNotesCancel}
                disabled={savingNotes}
              />
            </div>
          </div>
        ) : (
          <div className={styles.textBlock}>
            <p className={styles.textBlockContent}>
              {arrangement.notes || (
                <span className={styles.notesEmpty}>No notes yet. Click Edit to add.</span>
              )}
            </p>
          </div>
        )}
      </div>
    </DetailLayout>
  );
}
