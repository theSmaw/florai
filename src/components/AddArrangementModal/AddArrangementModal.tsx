import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import type { Flower } from '../../domain/Flower';
import type {
  ArrangementOccasion,
  ArrangementSize,
  ArrangementStyle,
  NewArrangement,
} from '../../domain/Arrangement';
import {
  OCCASION_LABEL,
  SIZE_LABEL,
  STYLE_LABEL,
} from '../../domain/Arrangement';
import { ChipGroup } from '../ChipGroup/ChipGroup';
import { FormField } from '../FormField/FormField';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { SheetTitle } from '../SheetTitle/SheetTitle';
import { SaveButton } from '../SaveButton/SaveButton';
import { CancelButton } from '../CancelButton/CancelButton';
import baseStyles from '../../styles/dialogModal.module.css';
import styles from './AddArrangementModal.module.css';

export interface AddArrangementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  flowers: Flower[];
  saving: boolean;
  error: string | null;
  onSave: (data: NewArrangement) => void;
}

const SIZES: ArrangementSize[] = ['small', 'medium', 'large', 'extra-large'];
const STYLES: ArrangementStyle[] = ['romantic', 'rustic', 'modern', 'wild', 'classic', 'contemporary'];
const OCCASIONS: ArrangementOccasion[] = ['wedding', 'birthday', 'funeral', 'everyday', 'sympathy', 'anniversary'];

export function AddArrangementModal({
  open,
  onOpenChange,
  flowers,
  saving,
  error,
  onSave,
}: AddArrangementModalProps) {
  const [name, setName] = useState('');
  const [selectedFlowerIds, setSelectedFlowerIds] = useState<string[]>([]);
  const [size, setSize] = useState<ArrangementSize | ''>('');
  const [style, setStyle] = useState<ArrangementStyle | ''>('');
  const [selectedOccasions, setSelectedOccasions] = useState<ArrangementOccasion[]>([]);
  const [stemCount, setStemCount] = useState('');
  const [weight, setWeight] = useState('');
  const [timeToBuild, setTimeToBuild] = useState('');
  const [vaseLife, setVaseLife] = useState('');
  const [wholesaleCost, setWholesaleCost] = useState('');
  const [retailPrice, setRetailPrice] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');

  function resetForm() {
    setName('');
    setSelectedFlowerIds([]);
    setSize('');
    setStyle('');
    setSelectedOccasions([]);
    setStemCount('');
    setWeight('');
    setTimeToBuild('');
    setVaseLife('');
    setWholesaleCost('');
    setRetailPrice('');
    setDescription('');
    setNotes('');
  }

  function handleOpenChange(next: boolean) {
    if (!next) resetForm();
    onOpenChange(next);
  }

  function toggleFlower(id: string) {
    setSelectedFlowerIds((prev) =>
      prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id],
    );
  }

  function toggleOccasion(occ: ArrangementOccasion) {
    setSelectedOccasions((prev) =>
      prev.includes(occ) ? prev.filter((o) => o !== occ) : [...prev, occ],
    );
  }

  function handleSave() {
    if (!name.trim() || !size) return;

    const data: NewArrangement = {
      name: name.trim(),
      flowerIds: selectedFlowerIds,
      size,
    };

    if (style) data.style = style;
    if (selectedOccasions.length > 0) data.occasion = selectedOccasions;
    if (stemCount) data.stemCount = parseInt(stemCount, 10);
    if (weight) data.estimatedWeightGrams = parseInt(weight, 10);
    if (timeToBuild) data.timeToBuildMinutes = parseInt(timeToBuild, 10);
    if (vaseLife) data.vaseLifeDays = parseInt(vaseLife, 10);
    if (wholesaleCost) data.wholesaleCost = parseFloat(wholesaleCost);
    if (retailPrice) data.retailPrice = parseFloat(retailPrice);
    if (description.trim()) data.description = description.trim();
    if (notes.trim()) data.notes = notes.trim();

    onSave(data);
  }

  const isValid = name.trim().length > 0 && size !== '';

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={baseStyles.overlay} />
        <Dialog.Content
          className={baseStyles.content}
          aria-describedby={undefined}
        >
          <div className={baseStyles.header}>
            <Dialog.Title asChild><SheetTitle>New Arrangement</SheetTitle></Dialog.Title>
            <Dialog.Close asChild>
              <button className={baseStyles.closeButton} aria-label="Close" disabled={saving}>
                <Cross2Icon width={15} height={15} aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>

          <div className={baseStyles.body}>
            {/* Basic info */}
            <div className={baseStyles.section}>
              <SectionHeader label="Basic Info" as="h3" />

              <FormField label="Name" htmlFor="arr-name" required>
                <input
                  id="arr-name"
                  data-cy="arrangement-name-input"
                  type="text"
                  className={baseStyles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={saving}
                  placeholder="e.g. Spring Romance Bouquet"
                />
              </FormField>

              <FormField label="Size" htmlFor="arr-size" required>
                <select
                  id="arr-size"
                  data-cy="arrangement-size-select"
                  className={baseStyles.select}
                  value={size}
                  onChange={(e) => setSize(e.target.value as ArrangementSize | '')}
                  disabled={saving}
                >
                  <option value="">Select size…</option>
                  {SIZES.map((s) => (
                    <option key={s} value={s}>{SIZE_LABEL[s]}</option>
                  ))}
                </select>
              </FormField>

              <FormField label="Style" htmlFor="arr-style">
                <select
                  id="arr-style"
                  data-cy="arrangement-style-select"
                  className={baseStyles.select}
                  value={style}
                  onChange={(e) => setStyle(e.target.value as ArrangementStyle | '')}
                  disabled={saving}
                >
                  <option value="">No style</option>
                  {STYLES.map((s) => (
                    <option key={s} value={s}>{STYLE_LABEL[s]}</option>
                  ))}
                </select>
              </FormField>

              <FormField label="Occasion">
                <ChipGroup
                  options={OCCASIONS}
                  selected={selectedOccasions}
                  onToggle={toggleOccasion}
                  disabled={saving}
                  dataCy="occasion-chips"
                  getLabel={(occ) => OCCASION_LABEL[occ]}
                  getOptionDataCy={(occ) => `occasion-chip-${occ}`}
                />
              </FormField>

              <FormField label="Description" htmlFor="arr-description">
                <textarea
                  id="arr-description"
                  data-cy="arrangement-description-textarea"
                  className={baseStyles.textarea}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={saving}
                  rows={3}
                  placeholder="Short description…"
                />
              </FormField>
            </div>

            {/* Flowers */}
            <div className={baseStyles.section}>
              <SectionHeader label="Flowers" as="h3" />
              <div data-cy="flower-checklist" className={styles.flowerList}>
                {flowers.map((flower) => (
                  <label key={flower.id} className={styles.flowerItem}>
                    <input
                      type="checkbox"
                      data-cy={`flower-checkbox-${flower.id}`}
                      checked={selectedFlowerIds.includes(flower.id)}
                      onChange={() => toggleFlower(flower.id)}
                      disabled={saving}
                      className={styles.checkbox}
                    />
                    <span className={styles.flowerName}>{flower.name}</span>
                  </label>
                ))}
                {flowers.length === 0 && (
                  <p className={styles.emptyHint}>No flowers in catalogue yet.</p>
                )}
              </div>
            </div>

            {/* Physical */}
            <div className={baseStyles.section}>
              <SectionHeader label="Physical" as="h3" />
              <div className={baseStyles.fieldGrid}>
                <FormField label="Stem count" htmlFor="arr-stem-count">
                  <input
                    id="arr-stem-count"
                    data-cy="arrangement-stem-count-input"
                    type="number"
                    className={baseStyles.input}
                    value={stemCount}
                    onChange={(e) => setStemCount(e.target.value)}
                    disabled={saving}
                    min={0}
                  />
                </FormField>
                <FormField label="Weight (g)" htmlFor="arr-weight">
                  <input
                    id="arr-weight"
                    data-cy="arrangement-weight-input"
                    type="number"
                    className={baseStyles.input}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    disabled={saving}
                    min={0}
                  />
                </FormField>
                <FormField label="Time to build (min)" htmlFor="arr-time">
                  <input
                    id="arr-time"
                    data-cy="arrangement-time-input"
                    type="number"
                    className={baseStyles.input}
                    value={timeToBuild}
                    onChange={(e) => setTimeToBuild(e.target.value)}
                    disabled={saving}
                    min={0}
                  />
                </FormField>
                <FormField label="Vase life (days)" htmlFor="arr-vase-life">
                  <input
                    id="arr-vase-life"
                    data-cy="arrangement-vase-life-input"
                    type="number"
                    className={baseStyles.input}
                    value={vaseLife}
                    onChange={(e) => setVaseLife(e.target.value)}
                    disabled={saving}
                    min={0}
                  />
                </FormField>
              </div>
            </div>

            {/* Pricing */}
            <div className={baseStyles.section}>
              <SectionHeader label="Pricing" as="h3" />
              <div className={baseStyles.fieldGrid}>
                <FormField label="Wholesale cost ($)" htmlFor="arr-wholesale">
                  <input
                    id="arr-wholesale"
                    data-cy="arrangement-wholesale-input"
                    type="number"
                    className={baseStyles.input}
                    value={wholesaleCost}
                    onChange={(e) => setWholesaleCost(e.target.value)}
                    disabled={saving}
                    min={0}
                    step="0.01"
                  />
                </FormField>
                <FormField label="Retail price ($)" htmlFor="arr-retail">
                  <input
                    id="arr-retail"
                    data-cy="arrangement-retail-input"
                    type="number"
                    className={baseStyles.input}
                    value={retailPrice}
                    onChange={(e) => setRetailPrice(e.target.value)}
                    disabled={saving}
                    min={0}
                    step="0.01"
                  />
                </FormField>
              </div>
            </div>

            {/* Notes */}
            <div className={baseStyles.section}>
              <SectionHeader label="Notes" as="h3" />
              <textarea
                data-cy="arrangement-notes-textarea"
                className={baseStyles.textarea}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={saving}
                rows={4}
                placeholder="Internal notes…"
              />
            </div>

            {error && <p className={baseStyles.error}>{error}</p>}
          </div>

          <div className={baseStyles.footer}>
            <Dialog.Close asChild>
              <CancelButton data-cy="cancel-arrangement-button" disabled={saving} />
            </Dialog.Close>
            <SaveButton
              data-cy="save-arrangement-button"
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
