// FlowerDetail — pure presentational component
// Receives all data via props from FlowerDetailContainer.
import { useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, UploadIcon } from '@radix-ui/react-icons';
import type { Availability, Flower, Toxicity } from '../../domain/Flower';
import {
  AVAILABILITY_LABEL,
  CLIMATE_LABEL,
  COLOR_HEX,
  FRAGRANCE_LABEL,
  FRAGRANCE_PIPS,
  TOXICITY_LABEL,
} from '../../domain/flowerDisplayMeta';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { FlowerSupplierList } from '../FlowerSupplierList/FlowerSupplierList';
import { EditButton } from '../EditButton/EditButton';
import { SaveButton } from '../SaveButton/SaveButton';
import { CancelButton } from '../CancelButton/CancelButton';
import styles from './FlowerDetail.module.css';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const tag = styles.tag ?? '';
const tagBrand = styles.tagBrand ?? '';
const tagWarning = styles.tagWarning ?? '';
const tagDanger = styles.tagDanger ?? '';

function availabilityTagClass(availability: Availability): string {
  if (availability === 'always') return `${tag} ${tagBrand}`;
  if (availability === 'limited') return `${tag} ${tagWarning}`;
  return tag;
}

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
}: FlowerDetailProps) {
  const fragrancePips = flower.fragranceLevel ? FRAGRANCE_PIPS[flower.fragranceLevel] : 0;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCareEditing, setIsCareEditing] = useState(false);
  const [draftCare, setDraftCare] = useState('');
  const careSaveInitiated = useRef(false);

  const [isNotesEditing, setIsNotesEditing] = useState(false);
  const [draftNotes, setDraftNotes] = useState('');
  const notesSaveInitiated = useRef(false);

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

  function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
    const img = e.currentTarget;
    const fallback = '/images/placeholder.svg';
    if (!img.src.endsWith(fallback)) img.src = fallback;
  }

  function handleUploadClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
      // Reset input so the same file can be picked again if needed
      e.target.value = '';
    }
  }

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

  return (
    <div className={styles.root}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button
            data-cy="back-button"
            className={styles.backButton}
            onClick={onBack}
            aria-label={`Back to ${backLabel}`}
          >
            <ChevronLeftIcon width={14} height={14} aria-hidden="true" />
            {backLabel}
          </button>
          <div className={styles.headerDivider} />
          <span className={styles.headerContext}>Flower Details</span>
        </div>
      </header>

      {/* ── Body ── */}
      <div className={styles.body}>

        {/* ── Left: image ── */}
        <section className={styles.imagePanel} aria-label="Flower image">
          <div className={styles.imageWrapper}>
            <img
              data-cy="flower-image"
              src={flower.imageUrl ?? '/images/placeholder.svg'}
              alt={flower.name}
              className={styles.image}
              onError={handleImgError}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className={styles.hiddenInput}
              onChange={handleFileChange}
              aria-label="Upload flower image"
            />
            <button
              data-cy="upload-image-button"
              type="button"
              className={styles.uploadButton}
              onClick={handleUploadClick}
              disabled={uploadingImage}
              aria-label="Upload new flower image"
            >
              <UploadIcon width={14} height={14} aria-hidden="true" />
              {uploadingImage ? 'Uploading…' : 'Replace image'}
            </button>
            {uploadError && (
              <p data-cy="upload-error" className={styles.uploadError}>{uploadError}</p>
            )}
          </div>
        </section>

        {/* ── Right: details ── */}
        <section
          className={styles.detailsPanel}
          aria-label="Flower details"
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
                <div className={styles.colorList}>
                  {flower.colors.map((color) => (
                    <div key={color} className={styles.colorChip}>
                      <div
                        className={styles.colorDot}
                        style={{ backgroundColor: COLOR_HEX[color] ?? '#e2e8f0' }}
                      />
                      {color}
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability + Seasons */}
              <div className={styles.fieldGrid}>
                <div className={styles.field}>
                  <span className={styles.fieldLabel}>Availability</span>
                  <div className={styles.tagList}>
                    <span className={availabilityTagClass(flower.availability)}>
                      {AVAILABILITY_LABEL[flower.availability]}
                    </span>
                  </div>
                </div>

                <div className={styles.field}>
                  <span className={styles.fieldLabel}>Season</span>
                  <div className={styles.tagList}>
                    {flower.season.map((s) => (
                      <span key={s} className={styles.tag}>{s}</span>
                    ))}
                  </div>
                </div>

                <div className={styles.field}>
                  <span className={styles.fieldLabel}>Climate</span>
                  <div className={styles.tagList}>
                    <span data-cy="flower-climate" className={styles.tag}>{CLIMATE_LABEL[flower.climate]}</span>
                  </div>
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

          {/* Complementary flowers */}
          {complementaryFlowers.length > 0 && (
            <div className={styles.section}>
              <SectionHeader label="Pairs Well With" />
              <div className={styles.pairings}>
                {complementaryFlowers.map((complementaryFlower) => (
                  <button
                    key={complementaryFlower.id}
                    type="button"
                    className={styles.pairingCard}
                    onClick={() => onFlowerSelect(complementaryFlower.id)}
                    aria-label={`View ${complementaryFlower.name}`}
                  >
                    <img
                      src={complementaryFlower.imageUrl ?? '/images/placeholder.svg'}
                      alt={complementaryFlower.name}
                      className={styles.pairingImage}
                      onError={handleImgError}
                    />
                    <span className={styles.pairingName}>{complementaryFlower.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
