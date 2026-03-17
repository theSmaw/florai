// FlowerDetail — pure presentational component
// Receives all data via props from FlowerDetailContainer.
import { useEffect, useRef, useState } from 'react';
import type { Flower, Toxicity } from '../../domain/Flower';
import type { Arrangement } from '../../domain/Arrangement';
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
import { FlowerThumbnailList } from '../FlowerThumbnailList/FlowerThumbnailList';
import styles from './FlowerDetail.module.css';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const tag = styles.tag ?? '';
const tagBrand = styles.tagBrand ?? '';
const tagWarning = styles.tagWarning ?? '';
const tagDanger = styles.tagDanger ?? '';

function toxicityTagClass(toxicity: Toxicity): string {
  if (toxicity === 'safe') return `${tag} ${tagBrand}`;
  if (toxicity === 'toxic') return `${tag} ${tagDanger}`;
  return `${tag} ${tagWarning}`;
}

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
}: FlowerDetailProps) {
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
            <h1 data-cy="flower-name" className={styles.nameDisplay}>{flower.name}</h1>
            <div className={styles.identityMeta}>
              <span className={styles.typeLabel}>{flower.type}</span>
            </div>
          </div>

          {/* General */}
          <div className={styles.section}>
            <SectionHeader label="General" />
            <div className={styles.fieldGridSingle}>

              {/* Colors */}
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

              {/* Availability + Seasons */}
              <div className={styles.fieldGrid}>
                <div className={styles.field}>
                  <span className={styles.fieldLabel}>Availability</span>
                  <span className={styles.plainValue}>
                    {AVAILABILITY_LABEL[flower.availability]}
                  </span>
                </div>

                <div className={styles.field}>
                  <span className={styles.fieldLabel}>Season</span>
                  <span className={styles.plainValue}>
                    {flower.season.join(', ')}
                  </span>
                </div>

                <div className={styles.field}>
                  <span className={styles.fieldLabel}>Climate</span>
                  <span data-cy="flower-climate" className={styles.plainValue}>
                    {CLIMATE_LABEL[flower.climate]}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sourcing */}
          <div className={styles.section}>
            <SectionHeader label="Sourcing" />
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
          </div>

          {/* Physical characteristics */}
          {(flower.stemLengthCm !== undefined ||
            flower.vaseLifeDays !== undefined ||
            flower.fragranceLevel !== undefined ||
            flower.toxicity !== undefined) && (
            <div className={styles.section}>
              <SectionHeader label="Physical" />
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
              </div>
            </div>
          )}

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
                  <p data-cy="save-care-error" className={styles.careError}>{saveCareError}</p>
                )}
                <div className={styles.careEditActions}>
                  <SaveButton
                    data-cy="save-care-button"
                    saving={savingCare}
                    onClick={handleCareSave}
                  />
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
                  {flower.careInstructions || <span className={styles.careEmpty}>No care instructions yet. Click Edit to add your notes.</span>}
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
                  <p data-cy="save-notes-error" className={styles.careError}>{saveNotesError}</p>
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
                  {flower.notes || <span className={styles.careEmpty}>No sourcing notes yet. Click Edit to add your notes.</span>}
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
                      <option value="" disabled>Add a flower…</option>
                      {available.map((f) => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                      ))}
                    </select>
                  ) : null;
                })()}
                {savePairingsError && (
                  <p data-cy="save-pairings-error" className={styles.careError}>{savePairingsError}</p>
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
