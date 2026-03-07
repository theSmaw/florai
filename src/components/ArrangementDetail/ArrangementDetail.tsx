import { useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, UploadIcon } from '@radix-ui/react-icons';
import type { Arrangement } from '../../domain/Arrangement';
import {
  OCCASION_LABEL,
  SIZE_LABEL,
  STYLE_LABEL,
} from '../../domain/Arrangement';
import type { Flower } from '../../domain/Flower';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { EditButton } from '../EditButton/EditButton';
import { SaveButton } from '../SaveButton/SaveButton';
import { CancelButton } from '../CancelButton/CancelButton';
import styles from './ArrangementDetail.module.css';

const tag = styles.tag ?? '';
const tagBrand = styles.tagBrand ?? '';

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
  onFlowerSelect,
}: ArrangementDetailProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isNotesEditing, setIsNotesEditing] = useState(false);
  const [draftNotes, setDraftNotes] = useState('');
  const notesSaveInitiated = useRef(false);

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
      e.target.value = '';
    }
  }

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

  const arrangementFlowers = flowers.filter((f) => arrangement.flowerIds.includes(f.id));

  const hasPhysical =
    arrangement.stemCount !== undefined ||
    arrangement.estimatedWeightGrams !== undefined ||
    arrangement.timeToBuildMinutes !== undefined ||
    arrangement.vaseLifeDays !== undefined;

  const hasPricing =
    arrangement.wholesaleCost !== undefined || arrangement.retailPrice !== undefined;

  return (
    <div className={styles.root}>
      {/* Header */}
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
          <span className={styles.headerContext}>Arrangement Details</span>
        </div>
      </header>

      {/* Body */}
      <div className={styles.body}>
        {/* Left: image */}
        <section className={styles.imagePanel} aria-label="Arrangement image">
          <div className={styles.imageWrapper}>
            <img
              src={arrangement.imageUrl ?? '/images/placeholder.svg'}
              alt={arrangement.name}
              className={styles.image}
              onError={handleImgError}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className={styles.hiddenInput}
              onChange={handleFileChange}
              aria-label="Upload arrangement image"
            />
            <button
              data-cy="upload-image-button"
              type="button"
              className={styles.uploadButton}
              onClick={handleUploadClick}
              disabled={uploadingImage}
              aria-label="Upload new arrangement image"
            >
              <UploadIcon width={14} height={14} aria-hidden="true" />
              {uploadingImage ? 'Uploading…' : 'Replace image'}
            </button>
            {uploadError && (
              <p data-cy="upload-error" className={styles.uploadError}>{uploadError}</p>
            )}
          </div>
        </section>

        {/* Right: details */}
        <section className={styles.detailsPanel} aria-label="Arrangement details">
          {/* Identity */}
          <div className={styles.identity}>
            <h1 data-cy="arrangement-name" className={styles.nameDisplay}>
              {arrangement.name}
            </h1>
            <div className={styles.identityMeta}>
              <span className={`${tag} ${tagBrand}`}>{SIZE_LABEL[arrangement.size]}</span>
              {arrangement.style && (
                <span className={tag}>{STYLE_LABEL[arrangement.style]}</span>
              )}
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
          </div>

          {/* Flowers */}
          {arrangementFlowers.length > 0 && (
            <div className={styles.section}>
              <SectionHeader label="Flowers" />
              <div className={styles.flowerChips}>
                {arrangementFlowers.map((flower) => (
                  <button
                    key={flower.id}
                    type="button"
                    className={styles.flowerChip}
                    onClick={() => onFlowerSelect(flower.id)}
                    aria-label={`View ${flower.name}`}
                  >
                    {flower.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Physical */}
          {hasPhysical && (
            <div className={styles.section}>
              <SectionHeader label="Physical" />
              <div className={styles.statList}>
                {arrangement.stemCount !== undefined && (
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Stem Count</span>
                    <span className={styles.statValue}>{arrangement.stemCount}</span>
                  </div>
                )}
                {arrangement.estimatedWeightGrams !== undefined && (
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Weight</span>
                    <span className={styles.statValue}>{arrangement.estimatedWeightGrams} g</span>
                  </div>
                )}
                {arrangement.timeToBuildMinutes !== undefined && (
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Time to Build</span>
                    <span className={styles.statValue}>{arrangement.timeToBuildMinutes} min</span>
                  </div>
                )}
                {arrangement.vaseLifeDays !== undefined && (
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Vase Life</span>
                    <span className={styles.statValue}>{arrangement.vaseLifeDays} days</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Pricing */}
          {hasPricing && (
            <div className={styles.section}>
              <SectionHeader label="Pricing" />
              <div className={styles.statList}>
                {arrangement.wholesaleCost !== undefined && (
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Wholesale Cost</span>
                    <span className={styles.statValue}>${arrangement.wholesaleCost.toFixed(2)}</span>
                  </div>
                )}
                {arrangement.retailPrice !== undefined && (
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Retail Price</span>
                    <span className={styles.statValue}>${arrangement.retailPrice.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>
          )}

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
                  <p data-cy="save-notes-error" className={styles.notesError}>{saveNotesError}</p>
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
        </section>
      </div>
    </div>
  );
}
