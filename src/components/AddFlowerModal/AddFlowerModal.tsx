import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import type {
  Availability,
  Climate,
  Color,
  FragranceLevel,
  Season,
  Toxicity,
} from '../../domain/Flower';
import {
  CLIMATES,
  COLORS,
  SEASONS,
} from '../../domain/Flower';
import type { NewFlower } from '../../domain/Flower';
import { FormField } from '../FormField/FormField';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { SheetTitle } from '../SheetTitle/SheetTitle';
import { SaveButton } from '../SaveButton/SaveButton';
import { CancelButton } from '../CancelButton/CancelButton';
import styles from './AddFlowerModal.module.css';

const FRAGRANCE_LEVELS: FragranceLevel[] = ['none', 'light', 'moderate', 'strong'];
const TOXICITY_LEVELS: Toxicity[] = ['safe', 'mild', 'toxic'];
const AVAILABILITY_OPTIONS: Availability[] = ['always', 'seasonal', 'limited'];

export interface AddFlowerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  saving: boolean;
  error: string | null;
  onSave: (data: NewFlower) => void;
}

export function AddFlowerModal({
  open,
  onOpenChange,
  saving,
  error,
  onSave,
}: AddFlowerModalProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [selectedColors, setSelectedColors] = useState<Color[]>([]);
  const [availability, setAvailability] = useState<Availability | ''>('');
  const [selectedSeasons, setSelectedSeasons] = useState<Season[]>([]);
  const [climate, setClimate] = useState<Climate | ''>('');
  const [stemLength, setStemLength] = useState('');
  const [vaseLife, setVaseLife] = useState('');
  const [fragranceLevel, setFragranceLevel] = useState<FragranceLevel | ''>('');
  const [toxicity, setToxicity] = useState<Toxicity | ''>('');
  const [wholesalePrice, setWholesalePrice] = useState('');
  const [supplier, setSupplier] = useState('');
  const [careInstructions, setCareInstructions] = useState('');
  const [notes, setNotes] = useState('');

  function resetForm() {
    setName('');
    setType('');
    setSelectedColors([]);
    setAvailability('');
    setSelectedSeasons([]);
    setClimate('');
    setStemLength('');
    setVaseLife('');
    setFragranceLevel('');
    setToxicity('');
    setWholesalePrice('');
    setSupplier('');
    setCareInstructions('');
    setNotes('');
  }

  function handleOpenChange(next: boolean) {
    if (!next) resetForm();
    onOpenChange(next);
  }

  function toggleColor(color: Color) {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );
  }

  function toggleSeason(season: Season) {
    setSelectedSeasons((prev) =>
      prev.includes(season) ? prev.filter((s) => s !== season) : [...prev, season],
    );
  }

  function handleSave() {
    if (!name.trim() || !type.trim() || selectedColors.length === 0) return;

    const data: NewFlower = {
      name: name.trim(),
      type: type.trim(),
      colors: selectedColors,
      wholesalePrice: wholesalePrice ? parseFloat(wholesalePrice) : 0,
      supplier: supplier.trim(),
      season: selectedSeasons,
      availability: availability || 'always',
      climate: climate || 'temperate',
      careInstructions: careInstructions.trim(),
      notes: notes.trim(),
    };

    if (stemLength) data.stemLengthCm = parseFloat(stemLength);
    if (vaseLife) data.vaseLifeDays = parseInt(vaseLife, 10);
    if (fragranceLevel) data.fragranceLevel = fragranceLevel;
    if (toxicity) data.toxicity = toxicity;

    onSave(data);
  }

  const isValid = name.trim().length > 0 && type.trim().length > 0 && selectedColors.length > 0;

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content
          className={styles.content}
          aria-describedby={undefined}
        >
          <div className={styles.header}>
            <Dialog.Title asChild><SheetTitle>New Flower</SheetTitle></Dialog.Title>
            <Dialog.Close asChild>
              <button className={styles.closeButton} aria-label="Close" disabled={saving}>
                <Cross2Icon width={15} height={15} aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>

          <div className={styles.body}>
            {/* Basic Info */}
            <div className={styles.section}>
              <SectionHeader label="Basic Info" as="h3" />

              <FormField label="Name" htmlFor="flower-name" required>
                <input
                  id="flower-name"
                  data-cy="flower-name-input"
                  type="text"
                  className={styles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={saving}
                  placeholder="e.g. Explorer Red Rose"
                />
              </FormField>

              <FormField label="Type" htmlFor="flower-type" required>
                <input
                  id="flower-type"
                  data-cy="flower-type-input"
                  type="text"
                  className={styles.input}
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  disabled={saving}
                  placeholder="e.g. Rose, Peony, Tulip"
                />
              </FormField>

              <FormField label="Colors" required>
                <div data-cy="color-chips" className={styles.chipGroup}>
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      data-cy={`color-chip-${color}`}
                      className={
                        selectedColors.includes(color)
                          ? `${styles.chip} ${styles.chipActive}`
                          : styles.chip
                      }
                      onClick={() => toggleColor(color)}
                      disabled={saving}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </FormField>

              <FormField label="Availability" htmlFor="flower-availability">
                <select
                  id="flower-availability"
                  data-cy="flower-availability-select"
                  className={styles.select}
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value as Availability | '')}
                  disabled={saving}
                >
                  <option value="">Select availability…</option>
                  {AVAILABILITY_OPTIONS.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </FormField>
            </div>

            {/* Growing */}
            <div className={styles.section}>
              <SectionHeader label="Growing" as="h3" />

              <FormField label="Season">
                <div data-cy="season-chips" className={styles.chipGroup}>
                  {SEASONS.map((season) => (
                    <button
                      key={season}
                      type="button"
                      data-cy={`season-chip-${season}`}
                      className={
                        selectedSeasons.includes(season)
                          ? `${styles.chip} ${styles.chipActive}`
                          : styles.chip
                      }
                      onClick={() => toggleSeason(season)}
                      disabled={saving}
                    >
                      {season}
                    </button>
                  ))}
                </div>
              </FormField>

              <FormField label="Climate" htmlFor="flower-climate">
                <select
                  id="flower-climate"
                  data-cy="flower-climate-select"
                  className={styles.select}
                  value={climate}
                  onChange={(e) => setClimate(e.target.value as Climate | '')}
                  disabled={saving}
                >
                  <option value="">Select climate…</option>
                  {CLIMATES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </FormField>
            </div>

            {/* Physical */}
            <div className={styles.section}>
              <SectionHeader label="Physical" as="h3" />
              <div className={styles.fieldGrid}>
                <FormField label="Stem length (cm)" htmlFor="flower-stem-length">
                  <input
                    id="flower-stem-length"
                    data-cy="flower-stem-length-input"
                    type="number"
                    className={styles.input}
                    value={stemLength}
                    onChange={(e) => setStemLength(e.target.value)}
                    disabled={saving}
                    min={0}
                  />
                </FormField>
                <FormField label="Vase life (days)" htmlFor="flower-vase-life">
                  <input
                    id="flower-vase-life"
                    data-cy="flower-vase-life-input"
                    type="number"
                    className={styles.input}
                    value={vaseLife}
                    onChange={(e) => setVaseLife(e.target.value)}
                    disabled={saving}
                    min={0}
                  />
                </FormField>
              </div>

              <div className={styles.fieldGrid}>
                <FormField label="Fragrance" htmlFor="flower-fragrance">
                  <select
                    id="flower-fragrance"
                    data-cy="flower-fragrance-select"
                    className={styles.select}
                    value={fragranceLevel}
                    onChange={(e) => setFragranceLevel(e.target.value as FragranceLevel | '')}
                    disabled={saving}
                  >
                    <option value="">No fragrance info</option>
                    {FRAGRANCE_LEVELS.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Toxicity" htmlFor="flower-toxicity">
                  <select
                    id="flower-toxicity"
                    data-cy="flower-toxicity-select"
                    className={styles.select}
                    value={toxicity}
                    onChange={(e) => setToxicity(e.target.value as Toxicity | '')}
                    disabled={saving}
                  >
                    <option value="">No toxicity info</option>
                    {TOXICITY_LEVELS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </FormField>
              </div>
            </div>

            {/* Pricing */}
            <div className={styles.section}>
              <SectionHeader label="Pricing" as="h3" />
              <div className={styles.fieldGrid}>
                <FormField label="Wholesale price ($)" htmlFor="flower-wholesale-price">
                  <input
                    id="flower-wholesale-price"
                    data-cy="flower-wholesale-price-input"
                    type="number"
                    className={styles.input}
                    value={wholesalePrice}
                    onChange={(e) => setWholesalePrice(e.target.value)}
                    disabled={saving}
                    min={0}
                    step="0.01"
                  />
                </FormField>
                <FormField label="Supplier" htmlFor="flower-supplier">
                  <input
                    id="flower-supplier"
                    data-cy="flower-supplier-input"
                    type="text"
                    className={styles.input}
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    disabled={saving}
                    placeholder="e.g. Holland Flowers"
                  />
                </FormField>
              </div>
            </div>

            {/* Care & Notes */}
            <div className={styles.section}>
              <SectionHeader label="Care & Notes" as="h3" />
              <FormField label="Care instructions" htmlFor="flower-care">
                <textarea
                  id="flower-care"
                  data-cy="flower-care-textarea"
                  className={styles.textarea}
                  value={careInstructions}
                  onChange={(e) => setCareInstructions(e.target.value)}
                  disabled={saving}
                  rows={3}
                  placeholder="e.g. Keep in cool water, re-cut stems at an angle…"
                />
              </FormField>
              <FormField label="Notes" htmlFor="flower-notes">
                <textarea
                  id="flower-notes"
                  data-cy="flower-notes-textarea"
                  className={styles.textarea}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  disabled={saving}
                  rows={3}
                  placeholder="Internal notes…"
                />
              </FormField>
            </div>

            {error && <p className={styles.error}>{error}</p>}
          </div>

          <div className={styles.footer}>
            <Dialog.Close asChild>
              <CancelButton data-cy="cancel-flower-button" disabled={saving} />
            </Dialog.Close>
            <SaveButton
              data-cy="save-flower-button"
              saving={saving}
              disabled={saving || !isValid}
              onClick={handleSave}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
