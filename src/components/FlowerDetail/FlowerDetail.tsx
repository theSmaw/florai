// FlowerDetail — pure presentational component
// Receives all data via props from FlowerDetailContainer.
import { useEffect, useRef, useState } from 'react';
import type {
  Availability,
  Climate,
  Color,
  Flower,
  FragranceLevel,
  Season,
  Toxicity,
} from '../../domain/Flower';
import { CLIMATES, COLORS, SEASONS } from '../../domain/Flower';
import type { Arrangement } from '../../domain/Arrangement';
import type { FlowerUpdate } from '../../api/updateUserFlower';
import {
  AVAILABILITY_LABEL,
  CLIMATE_LABEL,
  COLOR_HEX,
  FRAGRANCE_LABEL,
  FRAGRANCE_PIPS,
  TOXICITY_LABEL,
} from '../../domain/flowerDisplayMeta';
import { DetailLayout } from '../DetailLayout/DetailLayout';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { FlowerSupplierList } from '../FlowerSupplierList/FlowerSupplierList';
import { EditButton } from '../EditButton/EditButton';
import { SaveButton } from '../SaveButton/SaveButton';
import { CancelButton } from '../CancelButton/CancelButton';
import { FormField } from '../FormField/FormField';
import { TextInput } from '../TextInput/TextInput';
import { SelectInput } from '../SelectInput/SelectInput';
import { ChipGroup } from '../ChipGroup/ChipGroup';
import { FlowerThumbnailList } from '../FlowerThumbnailList/FlowerThumbnailList';
import styles from './FlowerDetail.module.css';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const tag = styles.tag ?? '';
const tagBrand = styles.tagBrand ?? '';
const tagWarning = styles.tagWarning ?? '';
const tagDanger = styles.tagDanger ?? '';

const AVAILABILITIES: Availability[] = ['always', 'seasonal', 'limited'];
const FRAGRANCES: FragranceLevel[] = ['none', 'light', 'moderate', 'strong'];
const TOXICITIES: Toxicity[] = ['safe', 'mild', 'toxic'];

function toxicityTagClass(toxicity: Toxicity): string {
  if (toxicity === 'safe') return `${tag} ${tagBrand}`;
  if (toxicity === 'toxic') return `${tag} ${tagDanger}`;
  return `${tag} ${tagWarning}`;
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

// Parses a numeric text input into a number, or undefined when blank.
function toNumber(value: string): number | undefined {
  const trimmed = value.trim();
  if (trimmed === '') return undefined;
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : undefined;
}

type FieldSection = 'identity' | 'general' | 'sourcing' | 'physical';

// ─── Component ────────────────────────────────────────────────────────────────

export interface FlowerDetailProps {
  flower: Flower;
  complementaryFlowers: Flower[];
  uploadingImage: boolean;
  uploadError: string | null;
  savingSupplier: boolean;
  supplierError: string | null;
  savingCare: boolean;
  saveCareError: string | null;
  savingNotes: boolean;
  saveNotesError: string | null;
  backLabel: string;
  onBack: () => void;
  onImageUpload: (file: File) => void;
  onAddSupplier: (name: string, wholesalePrice: number | null) => void;
  onUpdateSupplier: (id: string, name: string, wholesalePrice: number | null) => void;
  onRemoveSupplier: (id: string) => void;
  onCareSave: (careInstructions: string) => void;
  onNotesSave: (notes: string) => void;
  onFlowerSelect: (flowerId: string) => void;
  allFlowers: Flower[];
  savingPairings: boolean;
  savePairingsError: string | null;
  onPairingsSave: (flowerIds: string[]) => void;
  appearingInArrangements: Arrangement[];
  onArrangementSelect: (arrangementId: string) => void;
  // Custom-flower editing (only meaningful when flower.isCustom)
  onFieldsUpdate: (updates: FlowerUpdate) => void;
  savingFields: boolean;
  fieldsError: string | null;
}

export function FlowerDetail({
  flower,
  complementaryFlowers,
  uploadingImage,
  uploadError,
  savingSupplier,
  supplierError,
  savingCare,
  saveCareError,
  savingNotes,
  saveNotesError,
  backLabel,
  onBack,
  onImageUpload,
  onAddSupplier,
  onUpdateSupplier,
  onRemoveSupplier,
  onCareSave,
  onNotesSave,
  onFlowerSelect,
  allFlowers,
  savingPairings,
  savePairingsError,
  onPairingsSave,
  appearingInArrangements,
  onArrangementSelect,
  onFieldsUpdate,
  savingFields,
  fieldsError,
}: FlowerDetailProps) {
  const isCustom = flower.isCustom === true;
  const fragrancePips = flower.fragranceLevel ? FRAGRANCE_PIPS[flower.fragranceLevel] : 0;

  const [isCareEditing, setIsCareEditing] = useState(false);
  const [draftCare, setDraftCare] = useState('');
  const careSaveInitiated = useRef(false);

  const [isNotesEditing, setIsNotesEditing] = useState(false);
  const [draftNotes, setDraftNotes] = useState('');
  const notesSaveInitiated = useRef(false);

  const [isPairingsEditing, setIsPairingsEditing] = useState(false);
  const [draftPairingIds, setDraftPairingIds] = useState<string[]>([]);
  const pairingsSaveInitiated = useRef(false);

  // Custom-flower field editing — one section at a time.
  const [editingSection, setEditingSection] = useState<FieldSection | null>(null);
  const fieldsSaveInitiated = useRef(false);
  const [draftName, setDraftName] = useState('');
  const [draftType, setDraftType] = useState('');
  const [draftColors, setDraftColors] = useState<Color[]>([]);
  const [draftAvailability, setDraftAvailability] = useState<Availability>('always');
  const [draftSeason, setDraftSeason] = useState<Season[]>([]);
  const [draftClimate, setDraftClimate] = useState<Climate>('temperate');
  const [draftSupplier, setDraftSupplier] = useState('');
  const [draftWholesale, setDraftWholesale] = useState('');
  const [draftStemLength, setDraftStemLength] = useState('');
  const [draftVaseLife, setDraftVaseLife] = useState('');
  const [draftFragrance, setDraftFragrance] = useState<FragranceLevel | ''>('');
  const [draftToxicity, setDraftToxicity] = useState<Toxicity | ''>('');

  // Close edit mode after a save completes (success only; keep open on error so the user sees it)
  useEffect(() => {
    if (careSaveInitiated.current && !savingCare) {
      careSaveInitiated.current = false;
      if (!saveCareError) {
        setIsCareEditing(false);
      }
    }
  }, [savingCare, saveCareError]);

  useEffect(() => {
    if (notesSaveInitiated.current && !savingNotes) {
      notesSaveInitiated.current = false;
      if (!saveNotesError) {
        setIsNotesEditing(false);
      }
    }
  }, [savingNotes, saveNotesError]);

  useEffect(() => {
    if (pairingsSaveInitiated.current && !savingPairings) {
      pairingsSaveInitiated.current = false;
      if (!savePairingsError) {
        setIsPairingsEditing(false);
      }
    }
  }, [savingPairings, savePairingsError]);

  useEffect(() => {
    if (fieldsSaveInitiated.current && !savingFields) {
      fieldsSaveInitiated.current = false;
      if (!fieldsError) {
        setEditingSection(null);
      }
    }
  }, [savingFields, fieldsError]);

  function handleCareEditClick() {
    setDraftCare(flower.careInstructions);
    setIsCareEditing(true);
  }

  function handleCareCancel() {
    setIsCareEditing(false);
  }

  function handleCareSave() {
    careSaveInitiated.current = true;
    onCareSave(draftCare);
  }

  function handleNotesEditClick() {
    setDraftNotes(flower.notes);
    setIsNotesEditing(true);
  }

  function handleNotesCancel() {
    setIsNotesEditing(false);
  }

  function handleNotesSave() {
    notesSaveInitiated.current = true;
    onNotesSave(draftNotes);
  }

  function handlePairingsEditClick() {
    setDraftPairingIds([...flower.complementaryFlowerIds]);
    setIsPairingsEditing(true);
  }

  function handlePairingsCancel() {
    setIsPairingsEditing(false);
  }

  function handlePairingRemove(id: string) {
    setDraftPairingIds((prev) => prev.filter((fId) => fId !== id));
  }

  function handlePairingAdd(id: string) {
    if (id && !draftPairingIds.includes(id)) {
      setDraftPairingIds((prev) => [...prev, id]);
    }
  }

  function handlePairingsSave() {
    pairingsSaveInitiated.current = true;
    onPairingsSave(draftPairingIds);
  }

  function startFieldEdit(section: FieldSection) {
    setDraftName(flower.name);
    setDraftType(flower.type);
    setDraftColors([...flower.colors]);
    setDraftAvailability(flower.availability);
    setDraftSeason([...flower.season]);
    setDraftClimate(flower.climate);
    setDraftSupplier(flower.supplier);
    setDraftWholesale(flower.wholesalePrice ? String(flower.wholesalePrice) : '');
    setDraftStemLength(flower.stemLengthCm?.toString() ?? '');
    setDraftVaseLife(flower.vaseLifeDays?.toString() ?? '');
    setDraftFragrance(flower.fragranceLevel ?? '');
    setDraftToxicity(flower.toxicity ?? '');
    setEditingSection(section);
  }

  function cancelFieldEdit() {
    setEditingSection(null);
  }

  function saveFieldSection() {
    let updates: FlowerUpdate;
    switch (editingSection) {
      case 'identity':
        if (draftName.trim() === '' || draftType.trim() === '') return;
        updates = { name: draftName.trim(), type: draftType.trim() };
        break;
      case 'general':
        updates = {
          colors: draftColors,
          availability: draftAvailability,
          season: draftSeason,
          climate: draftClimate,
        };
        break;
      case 'sourcing':
        updates = { supplier: draftSupplier.trim(), wholesalePrice: toNumber(draftWholesale) ?? 0 };
        break;
      case 'physical':
        updates = {
          stemLengthCm: toNumber(draftStemLength),
          vaseLifeDays: toNumber(draftVaseLife),
          fragranceLevel: draftFragrance === '' ? undefined : draftFragrance,
          toxicity: draftToxicity === '' ? undefined : draftToxicity,
        };
        break;
      default:
        return;
    }
    fieldsSaveInitiated.current = true;
    onFieldsUpdate(updates);
  }

  function toggleColor(color: Color) {
    setDraftColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );
  }

  function toggleSeason(season: Season) {
    setDraftSeason((prev) =>
      prev.includes(season) ? prev.filter((s) => s !== season) : [...prev, season],
    );
  }

  const fieldEditActions = (
    <div className={styles.careEditActions}>
      <SaveButton data-cy="save-fields-button" saving={savingFields} onClick={saveFieldSection} />
      <CancelButton
        data-cy="cancel-fields-button"
        onClick={cancelFieldEdit}
        disabled={savingFields}
      />
    </div>
  );

  function fieldEditButton(section: FieldSection, label: string) {
    // Every flower is editable: custom flowers persist to user_flowers, global
    // catalogue flowers to per-user overrides (routed in the container).
    if (editingSection === section) return null;
    return (
      <EditButton
        data-cy={`edit-${section}-button`}
        onClick={() => startFieldEdit(section)}
        disabled={savingFields || editingSection !== null}
        aria-label={label}
      />
    );
  }

  return (
    <DetailLayout
      backLabel={backLabel}
      onBack={onBack}
      contextLabel="Flower Details"
      {...(flower.imageUrl ? { imageUrl: flower.imageUrl } : {})}
      imageAlt={flower.name}
      imageCy="flower-image"
      uploadingImage={uploadingImage}
      uploadError={uploadError}
      onImageUpload={onImageUpload}
    >
      {/* Identity */}
      <div className={styles.identity}>
        <div className={styles.careHeader}>
          {editingSection === 'identity' ? (
            <div className={styles.fieldEditColumn}>
              <FormField label="Name" htmlFor="flower-edit-name" required>
                <TextInput
                  id="flower-edit-name"
                  data-cy="flower-name-input"
                  type="text"
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  disabled={savingFields}
                />
              </FormField>
              <FormField label="Type" htmlFor="flower-edit-type" required>
                <TextInput
                  id="flower-edit-type"
                  data-cy="flower-type-input"
                  type="text"
                  value={draftType}
                  onChange={(e) => setDraftType(e.target.value)}
                  disabled={savingFields}
                />
              </FormField>
              {fieldsError && (
                <p data-cy="save-fields-error" className={styles.careError}>
                  {fieldsError}
                </p>
              )}
              {fieldEditActions}
            </div>
          ) : (
            <>
              <div>
                <h1 data-cy="flower-name" className={styles.nameDisplay}>
                  {flower.name}
                </h1>
                <div className={styles.identityMeta}>
                  <span className={styles.typeLabel}>{flower.type}</span>
                </div>
              </div>
              {fieldEditButton('identity', 'Edit name and type')}
            </>
          )}
        </div>
      </div>

      {/* General */}
      <div className={styles.section}>
        <div className={styles.careHeader}>
          <SectionHeader label="General" />
          {fieldEditButton('general', 'Edit general details')}
        </div>
        {editingSection === 'general' ? (
          <div className={styles.fieldEditColumn}>
            <FormField label="Colors">
              <ChipGroup
                options={COLORS as unknown as Color[]}
                selected={draftColors}
                onToggle={toggleColor}
                disabled={savingFields}
                dataCy="color-chips"
                getLabel={(c) => capitalize(c)}
                getOptionDataCy={(c) => `color-chip-${c}`}
              />
            </FormField>
            <FormField label="Availability" htmlFor="flower-edit-availability">
              <SelectInput
                id="flower-edit-availability"
                data-cy="flower-availability-select"
                value={draftAvailability}
                onChange={(e) => setDraftAvailability(e.target.value as Availability)}
                disabled={savingFields}
              >
                {AVAILABILITIES.map((a) => (
                  <option key={a} value={a}>
                    {AVAILABILITY_LABEL[a]}
                  </option>
                ))}
              </SelectInput>
            </FormField>
            <FormField label="Season">
              <ChipGroup
                options={SEASONS as unknown as Season[]}
                selected={draftSeason}
                onToggle={toggleSeason}
                disabled={savingFields}
                dataCy="season-chips"
                getLabel={(s) => s}
                getOptionDataCy={(s) => `season-chip-${s}`}
              />
            </FormField>
            <FormField label="Climate" htmlFor="flower-edit-climate">
              <SelectInput
                id="flower-edit-climate"
                data-cy="flower-climate-select"
                value={draftClimate}
                onChange={(e) => setDraftClimate(e.target.value as Climate)}
                disabled={savingFields}
              >
                {CLIMATES.map((c) => (
                  <option key={c} value={c}>
                    {CLIMATE_LABEL[c]}
                  </option>
                ))}
              </SelectInput>
            </FormField>
            {fieldsError && (
              <p data-cy="save-fields-error" className={styles.careError}>
                {fieldsError}
              </p>
            )}
            {fieldEditActions}
          </div>
        ) : (
          <div className={styles.fieldGridSingle}>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Colors</span>
              <div className={styles.colorSwatches}>
                {flower.colors.map((color) => (
                  <span
                    key={color}
                    className={styles.colorSwatch}
                    style={{ backgroundColor: COLOR_HEX[color] ?? '#e2e8f0' }}
                    title={color}
                  />
                ))}
              </div>
            </div>
            <div className={styles.fieldGrid}>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Availability</span>
                <span className={styles.plainValue}>{AVAILABILITY_LABEL[flower.availability]}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Season</span>
                <span className={styles.plainValue}>{flower.season.join(', ')}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Climate</span>
                <span data-cy="flower-climate" className={styles.plainValue}>
                  {CLIMATE_LABEL[flower.climate]}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sourcing */}
      <div className={styles.section}>
        <div className={styles.careHeader}>
          <SectionHeader label="Sourcing" />
          {fieldEditButton('sourcing', 'Edit sourcing')}
        </div>
        {editingSection === 'sourcing' ? (
          <div className={styles.fieldEditColumn}>
            <FormField label="Supplier" htmlFor="flower-edit-supplier">
              <TextInput
                id="flower-edit-supplier"
                data-cy="flower-supplier-input"
                type="text"
                value={draftSupplier}
                onChange={(e) => setDraftSupplier(e.target.value)}
                disabled={savingFields}
              />
            </FormField>
            <FormField label="Wholesale price ($)" htmlFor="flower-edit-wholesale">
              <TextInput
                id="flower-edit-wholesale"
                data-cy="flower-wholesale-input"
                type="number"
                min={0}
                step="0.01"
                value={draftWholesale}
                onChange={(e) => setDraftWholesale(e.target.value)}
                disabled={savingFields}
              />
            </FormField>
            {fieldsError && (
              <p data-cy="save-fields-error" className={styles.careError}>
                {fieldsError}
              </p>
            )}
            {fieldEditActions}
          </div>
        ) : isCustom ? (
          <div className={styles.statList}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Supplier</span>
              <span className={styles.statValue}>{flower.supplier || '—'}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Wholesale Price</span>
              <span className={styles.statValue}>${flower.wholesalePrice.toFixed(2)}</span>
            </div>
          </div>
        ) : (
          <FlowerSupplierList
            suppliers={flower.suppliers}
            defaultSupplier={flower.supplier}
            defaultWholesalePrice={flower.wholesalePrice}
            saving={savingSupplier}
            error={supplierError}
            onAdd={onAddSupplier}
            onUpdate={onUpdateSupplier}
            onRemove={onRemoveSupplier}
          />
        )}
      </div>

      {/* Physical characteristics — always shown so any flower's stats can be edited */}
      {
        <div className={styles.section}>
          <div className={styles.careHeader}>
            <SectionHeader label="Physical" />
            {fieldEditButton('physical', 'Edit physical')}
          </div>
          {editingSection === 'physical' ? (
            <div className={styles.fieldEditColumn}>
              <FormField label="Stem length (cm)" htmlFor="flower-edit-stem">
                <TextInput
                  id="flower-edit-stem"
                  data-cy="flower-stem-length-input"
                  type="number"
                  min={0}
                  value={draftStemLength}
                  onChange={(e) => setDraftStemLength(e.target.value)}
                  disabled={savingFields}
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
                  disabled={savingFields}
                />
              </FormField>
              <FormField label="Fragrance" htmlFor="flower-edit-fragrance">
                <SelectInput
                  id="flower-edit-fragrance"
                  data-cy="flower-fragrance-select"
                  value={draftFragrance}
                  onChange={(e) => setDraftFragrance(e.target.value as FragranceLevel | '')}
                  disabled={savingFields}
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
                  disabled={savingFields}
                >
                  <option value="">Not set</option>
                  {TOXICITIES.map((t) => (
                    <option key={t} value={t}>
                      {TOXICITY_LABEL[t]}
                    </option>
                  ))}
                </SelectInput>
              </FormField>
              {fieldsError && (
                <p data-cy="save-fields-error" className={styles.careError}>
                  {fieldsError}
                </p>
              )}
              {fieldEditActions}
            </div>
          ) : (
            <div className={styles.statList}>
              {flower.stemLengthCm !== undefined && (
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Stem Length</span>
                  <span className={styles.statValue}>{flower.stemLengthCm} cm</span>
                </div>
              )}
              {flower.vaseLifeDays !== undefined && (
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Vase Life</span>
                  <span className={styles.statValue}>{flower.vaseLifeDays} days</span>
                </div>
              )}
              {flower.fragranceLevel !== undefined && (
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Fragrance</span>
                  <div className={styles.fragranceIndicator}>
                    <div className={styles.fragrancePips}>
                      {[1, 2, 3].map((level) => (
                        <div
                          key={level}
                          className={
                            level <= fragrancePips
                              ? `${styles.fragrancePip} ${styles.fragrancePipActive}`
                              : styles.fragrancePip
                          }
                        />
                      ))}
                    </div>
                    <span className={styles.fragranceText}>
                      {FRAGRANCE_LABEL[flower.fragranceLevel]}
                    </span>
                  </div>
                </div>
              )}
              {flower.toxicity !== undefined && (
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Toxicity</span>
                  <span className={toxicityTagClass(flower.toxicity)}>
                    {TOXICITY_LABEL[flower.toxicity]}
                  </span>
                </div>
              )}
              {flower.stemLengthCm === undefined &&
                flower.vaseLifeDays === undefined &&
                flower.fragranceLevel === undefined &&
                flower.toxicity === undefined && (
                  <p className={styles.careEmpty}>No physical details yet. Click Edit to add.</p>
                )}
            </div>
          )}
        </div>
      }

      {/* Care instructions — always rendered so users can add notes */}
      <div className={styles.section}>
        <div className={styles.careHeader}>
          <SectionHeader label="Botanical Care" />
          {!isCareEditing && (
            <EditButton
              data-cy="edit-care-button"
              onClick={handleCareEditClick}
              disabled={savingCare}
              aria-label="Edit care instructions"
            />
          )}
        </div>
        {isCareEditing ? (
          <div>
            <textarea
              data-cy="care-instructions-textarea"
              className={styles.careTextarea}
              value={draftCare}
              onChange={(e) => setDraftCare(e.target.value)}
              disabled={savingCare}
              rows={5}
            />
            {saveCareError && (
              <p data-cy="save-care-error" className={styles.careError}>
                {saveCareError}
              </p>
            )}
            <div className={styles.careEditActions}>
              <SaveButton data-cy="save-care-button" saving={savingCare} onClick={handleCareSave} />
              <CancelButton
                data-cy="cancel-care-button"
                onClick={handleCareCancel}
                disabled={savingCare}
              />
            </div>
          </div>
        ) : (
          <div className={styles.textBlock}>
            <p className={styles.textBlockContent}>
              {flower.careInstructions || (
                <span className={styles.careEmpty}>
                  No care instructions yet. Click Edit to add your notes.
                </span>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Sourcing notes — always rendered so users can add notes */}
      <div className={styles.section}>
        <div className={styles.careHeader}>
          <SectionHeader label="Sourcing Notes" />
          {!isNotesEditing && (
            <EditButton
              data-cy="edit-notes-button"
              onClick={handleNotesEditClick}
              disabled={savingNotes}
              aria-label="Edit sourcing notes"
            />
          )}
        </div>
        {isNotesEditing ? (
          <div>
            <textarea
              data-cy="sourcing-notes-textarea"
              className={styles.careTextarea}
              value={draftNotes}
              onChange={(e) => setDraftNotes(e.target.value)}
              disabled={savingNotes}
              rows={5}
            />
            {saveNotesError && (
              <p data-cy="save-notes-error" className={styles.careError}>
                {saveNotesError}
              </p>
            )}
            <div className={styles.careEditActions}>
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
              {flower.notes || (
                <span className={styles.careEmpty}>
                  No sourcing notes yet. Click Edit to add your notes.
                </span>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Complementary flowers — always rendered so users can add pairings */}
      <div className={styles.section}>
        <div className={styles.pairingsHeader}>
          <SectionHeader label="Pairs Well With" />
          {!isPairingsEditing && (
            <EditButton
              data-cy="edit-pairings-button"
              onClick={handlePairingsEditClick}
              disabled={savingPairings}
              aria-label="Edit pairings"
            />
          )}
        </div>
        {isPairingsEditing ? (
          <div>
            {draftPairingIds.length > 0 ? (
              <ul data-cy="pairings-edit-list" className={styles.pairingsEditList}>
                {draftPairingIds.map((id) => {
                  const pairedFlower = allFlowers.find((f) => f.id === id);
                  if (!pairedFlower) return null;
                  return (
                    <li key={id} className={styles.pairingsEditItem}>
                      <span className={styles.pairingsEditName}>{pairedFlower.name}</span>
                      <button
                        type="button"
                        data-cy="pairings-remove-button"
                        className={styles.pairingsRemoveButton}
                        onClick={() => handlePairingRemove(id)}
                        disabled={savingPairings}
                        aria-label={`Remove ${pairedFlower.name}`}
                      >
                        ✕
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className={styles.careEmpty}>No pairings selected.</p>
            )}
            {(() => {
              const available = allFlowers.filter((f) => !draftPairingIds.includes(f.id));
              return available.length > 0 ? (
                <select
                  data-cy="pairings-add-select"
                  className={styles.pairingsAddSelect}
                  value=""
                  onChange={(e) => handlePairingAdd(e.target.value)}
                  disabled={savingPairings}
                >
                  <option value="" disabled>
                    Add a flower…
                  </option>
                  {available.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>
              ) : null;
            })()}
            {savePairingsError && (
              <p data-cy="save-pairings-error" className={styles.careError}>
                {savePairingsError}
              </p>
            )}
            <div className={styles.careEditActions}>
              <SaveButton
                data-cy="save-pairings-button"
                saving={savingPairings}
                onClick={handlePairingsSave}
              />
              <CancelButton
                data-cy="cancel-pairings-button"
                onClick={handlePairingsCancel}
                disabled={savingPairings}
              />
            </div>
          </div>
        ) : (
          <FlowerThumbnailList
            items={complementaryFlowers}
            emptyText="No pairings added yet."
            onSelect={onFlowerSelect}
          />
        )}
      </div>
      {/* Appears in */}
      <div className={styles.section}>
        <SectionHeader label="Appears In" />
        <FlowerThumbnailList
          items={appearingInArrangements}
          emptyText="Not used in any arrangements yet."
          onSelect={onArrangementSelect}
        />
      </div>
    </DetailLayout>
  );
}
