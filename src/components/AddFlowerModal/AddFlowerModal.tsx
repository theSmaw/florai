import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
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
import { ChipGroup } from '../ChipGroup/ChipGroup';
import { FormField } from '../FormField/FormField';
import { ModalShell } from '../ModalShell/ModalShell';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { SelectInput } from '../SelectInput/SelectInput';
import { TextArea } from '../TextArea/TextArea';
import { TextInput } from '../TextInput/TextInput';
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

  const footer = (
    <>
      <Dialog.Close asChild>
        <CancelButton data-cy="cancel-flower-button" disabled={saving} />
      </Dialog.Close>
      <SaveButton
        data-cy="save-flower-button"
        saving={saving}
        disabled={saving || !isValid}
        onClick={handleSave}
      />
    </>
  );

  return (
    <ModalShell
      open={open}
      onOpenChange={handleOpenChange}
      title="New Flower"
      footer={footer}
      closingDisabled={saving}
    >
      {/* Basic Info */}
      <div className={styles.section}>
        <SectionHeader label="Basic Info" as="h3" />

        <FormField label="Name" htmlFor="flower-name" required>
          <TextInput
            id="flower-name"
            data-cy="flower-name-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={saving}
            placeholder="e.g. Explorer Red Rose"
          />
        </FormField>

        <FormField label="Type" htmlFor="flower-type" required>
          <TextInput
            id="flower-type"
            data-cy="flower-type-input"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            disabled={saving}
            placeholder="e.g. Rose, Peony, Tulip"
          />
        </FormField>

        <FormField label="Colors" required>
          <ChipGroup
            options={COLORS}
            selected={selectedColors}
            onToggle={toggleColor}
            disabled={saving}
            dataCy="color-chips"
            getOptionDataCy={(color) => `color-chip-${color}`}
          />
        </FormField>

        <FormField label="Availability" htmlFor="flower-availability">
          <SelectInput
            id="flower-availability"
            data-cy="flower-availability-select"
            value={availability}
            onChange={(e) => setAvailability(e.target.value as Availability | '')}
            disabled={saving}
          >
            <option value="">Select availability…</option>
            {AVAILABILITY_OPTIONS.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </SelectInput>
        </FormField>
      </div>

      {/* Growing */}
      <div className={styles.section}>
        <SectionHeader label="Growing" as="h3" />

        <FormField label="Season">
          <ChipGroup
            options={SEASONS}
            selected={selectedSeasons}
            onToggle={toggleSeason}
            disabled={saving}
            dataCy="season-chips"
            getOptionDataCy={(season) => `season-chip-${season}`}
          />
        </FormField>

        <FormField label="Climate" htmlFor="flower-climate">
          <SelectInput
            id="flower-climate"
            data-cy="flower-climate-select"
            value={climate}
            onChange={(e) => setClimate(e.target.value as Climate | '')}
            disabled={saving}
          >
            <option value="">Select climate…</option>
            {CLIMATES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </SelectInput>
        </FormField>
      </div>

      {/* Physical */}
      <div className={styles.section}>
        <SectionHeader label="Physical" as="h3" />
        <div className={styles.fieldGrid}>
          <FormField label="Stem length (cm)" htmlFor="flower-stem-length">
            <TextInput
              id="flower-stem-length"
              data-cy="flower-stem-length-input"
              type="number"
              value={stemLength}
              onChange={(e) => setStemLength(e.target.value)}
              disabled={saving}
              min={0}
            />
          </FormField>
          <FormField label="Vase life (days)" htmlFor="flower-vase-life">
            <TextInput
              id="flower-vase-life"
              data-cy="flower-vase-life-input"
              type="number"
              value={vaseLife}
              onChange={(e) => setVaseLife(e.target.value)}
              disabled={saving}
              min={0}
            />
          </FormField>
        </div>

        <div className={styles.fieldGrid}>
          <FormField label="Fragrance" htmlFor="flower-fragrance">
            <SelectInput
              id="flower-fragrance"
              data-cy="flower-fragrance-select"
              value={fragranceLevel}
              onChange={(e) => setFragranceLevel(e.target.value as FragranceLevel | '')}
              disabled={saving}
            >
              <option value="">No fragrance info</option>
              {FRAGRANCE_LEVELS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </SelectInput>
          </FormField>
          <FormField label="Toxicity" htmlFor="flower-toxicity">
            <SelectInput
              id="flower-toxicity"
              data-cy="flower-toxicity-select"
              value={toxicity}
              onChange={(e) => setToxicity(e.target.value as Toxicity | '')}
              disabled={saving}
            >
              <option value="">No toxicity info</option>
              {TOXICITY_LEVELS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </SelectInput>
          </FormField>
        </div>
      </div>

      {/* Pricing */}
      <div className={styles.section}>
        <SectionHeader label="Pricing" as="h3" />
        <div className={styles.fieldGrid}>
          <FormField label="Wholesale price ($)" htmlFor="flower-wholesale-price">
            <TextInput
              id="flower-wholesale-price"
              data-cy="flower-wholesale-price-input"
              type="number"
              value={wholesalePrice}
              onChange={(e) => setWholesalePrice(e.target.value)}
              disabled={saving}
              min={0}
              step="0.01"
            />
          </FormField>
          <FormField label="Supplier" htmlFor="flower-supplier">
            <TextInput
              id="flower-supplier"
              data-cy="flower-supplier-input"
              type="text"
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
          <TextArea
            id="flower-care"
            data-cy="flower-care-textarea"
            value={careInstructions}
            onChange={(e) => setCareInstructions(e.target.value)}
            disabled={saving}
            rows={3}
            placeholder="e.g. Keep in cool water, re-cut stems at an angle…"
          />
        </FormField>
        <FormField label="Notes" htmlFor="flower-notes">
          <TextArea
            id="flower-notes"
            data-cy="flower-notes-textarea"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={saving}
            rows={3}
            placeholder="Internal notes…"
          />
        </FormField>
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </ModalShell>
  );
}
