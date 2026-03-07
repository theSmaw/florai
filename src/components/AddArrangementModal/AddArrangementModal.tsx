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
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content
          className={styles.content}
          aria-describedby={undefined}
        >
          <div className={styles.header}>
            <Dialog.Title className={styles.title}>New Arrangement</Dialog.Title>
            <Dialog.Close asChild>
              <button className={styles.closeButton} aria-label="Close" disabled={saving}>
                <Cross2Icon width={15} height={15} aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>

          <div className={styles.body}>
            {/* Basic info */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Basic Info</h3>

              <div className={styles.field}>
                <label htmlFor="arr-name" className={styles.label}>
                  Name <span className={styles.required}>*</span>
                </label>
                <input
                  id="arr-name"
                  data-cy="arrangement-name-input"
                  type="text"
                  className={styles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={saving}
                  placeholder="e.g. Spring Romance Bouquet"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="arr-size" className={styles.label}>
                  Size <span className={styles.required}>*</span>
                </label>
                <select
                  id="arr-size"
                  data-cy="arrangement-size-select"
                  className={styles.select}
                  value={size}
                  onChange={(e) => setSize(e.target.value as ArrangementSize | '')}
                  disabled={saving}
                >
                  <option value="">Select size…</option>
                  {SIZES.map((s) => (
                    <option key={s} value={s}>{SIZE_LABEL[s]}</option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="arr-style" className={styles.label}>Style</label>
                <select
                  id="arr-style"
                  data-cy="arrangement-style-select"
                  className={styles.select}
                  value={style}
                  onChange={(e) => setStyle(e.target.value as ArrangementStyle | '')}
                  disabled={saving}
                >
                  <option value="">No style</option>
                  {STYLES.map((s) => (
                    <option key={s} value={s}>{STYLE_LABEL[s]}</option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <span className={styles.label}>Occasion</span>
                <div data-cy="occasion-chips" className={styles.chipGroup}>
                  {OCCASIONS.map((occ) => (
                    <button
                      key={occ}
                      type="button"
                      data-cy={`occasion-chip-${occ}`}
                      className={
                        selectedOccasions.includes(occ)
                          ? `${styles.chip} ${styles.chipActive}`
                          : styles.chip
                      }
                      onClick={() => toggleOccasion(occ)}
                      disabled={saving}
                    >
                      {OCCASION_LABEL[occ]}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="arr-description" className={styles.label}>Description</label>
                <textarea
                  id="arr-description"
                  data-cy="arrangement-description-textarea"
                  className={styles.textarea}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={saving}
                  rows={3}
                  placeholder="Short description…"
                />
              </div>
            </div>

            {/* Flowers */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Flowers</h3>
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
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Physical</h3>
              <div className={styles.fieldGrid}>
                <div className={styles.field}>
                  <label htmlFor="arr-stem-count" className={styles.label}>Stem count</label>
                  <input
                    id="arr-stem-count"
                    data-cy="arrangement-stem-count-input"
                    type="number"
                    className={styles.input}
                    value={stemCount}
                    onChange={(e) => setStemCount(e.target.value)}
                    disabled={saving}
                    min={0}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="arr-weight" className={styles.label}>Weight (g)</label>
                  <input
                    id="arr-weight"
                    data-cy="arrangement-weight-input"
                    type="number"
                    className={styles.input}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    disabled={saving}
                    min={0}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="arr-time" className={styles.label}>Time to build (min)</label>
                  <input
                    id="arr-time"
                    data-cy="arrangement-time-input"
                    type="number"
                    className={styles.input}
                    value={timeToBuild}
                    onChange={(e) => setTimeToBuild(e.target.value)}
                    disabled={saving}
                    min={0}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="arr-vase-life" className={styles.label}>Vase life (days)</label>
                  <input
                    id="arr-vase-life"
                    data-cy="arrangement-vase-life-input"
                    type="number"
                    className={styles.input}
                    value={vaseLife}
                    onChange={(e) => setVaseLife(e.target.value)}
                    disabled={saving}
                    min={0}
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Pricing</h3>
              <div className={styles.fieldGrid}>
                <div className={styles.field}>
                  <label htmlFor="arr-wholesale" className={styles.label}>Wholesale cost ($)</label>
                  <input
                    id="arr-wholesale"
                    data-cy="arrangement-wholesale-input"
                    type="number"
                    className={styles.input}
                    value={wholesaleCost}
                    onChange={(e) => setWholesaleCost(e.target.value)}
                    disabled={saving}
                    min={0}
                    step="0.01"
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="arr-retail" className={styles.label}>Retail price ($)</label>
                  <input
                    id="arr-retail"
                    data-cy="arrangement-retail-input"
                    type="number"
                    className={styles.input}
                    value={retailPrice}
                    onChange={(e) => setRetailPrice(e.target.value)}
                    disabled={saving}
                    min={0}
                    step="0.01"
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Notes</h3>
              <div className={styles.field}>
                <textarea
                  data-cy="arrangement-notes-textarea"
                  className={styles.textarea}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  disabled={saving}
                  rows={4}
                  placeholder="Internal notes…"
                />
              </div>
            </div>

            {error && <p className={styles.error}>{error}</p>}
          </div>

          <div className={styles.footer}>
            <Dialog.Close asChild>
              <button
                type="button"
                data-cy="cancel-arrangement-button"
                className={styles.cancelButton}
                disabled={saving}
              >
                Cancel
              </button>
            </Dialog.Close>
            <button
              type="button"
              data-cy="save-arrangement-button"
              className={styles.saveButton}
              onClick={handleSave}
              disabled={saving || !isValid}
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
