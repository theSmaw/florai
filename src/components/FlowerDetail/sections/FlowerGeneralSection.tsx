import { useState } from 'react';
import type { Availability, Climate, Color, Season } from '../../../domain/Flower';
import { CLIMATES, COLORS, SEASONS } from '../../../domain/Flower';
import { AVAILABILITY_LABEL, CLIMATE_LABEL, COLOR_HEX } from '../../../domain/flowerDisplayMeta';
import { EditableSection } from '../../EditableSection/EditableSection';
import { FormField } from '../../FormField/FormField';
import { SelectInput } from '../../SelectInput/SelectInput';
import { ChipGroup } from '../../ChipGroup/ChipGroup';
import type { FlowerFieldSectionProps } from './types';
import styles from './FlowerGeneralSection.module.css';

const AVAILABILITIES: Availability[] = ['always', 'seasonal', 'limited'];

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export function FlowerGeneralSection({
  flower,
  isEditing,
  canEdit,
  saving,
  error,
  onEditStart,
  onEditEnd,
  onSave,
}: FlowerFieldSectionProps) {
  const [draftColors, setDraftColors] = useState<Color[]>([]);
  const [draftAvailability, setDraftAvailability] = useState<Availability>('always');
  const [draftSeason, setDraftSeason] = useState<Season[]>([]);
  const [draftClimate, setDraftClimate] = useState<Climate>('temperate');

  function handleEditStart() {
    setDraftColors([...flower.colors]);
    setDraftAvailability(flower.availability);
    setDraftSeason([...flower.season]);
    setDraftClimate(flower.climate);
    onEditStart();
  }

  function handleSave() {
    onSave({
      colors: draftColors,
      availability: draftAvailability,
      season: draftSeason,
      climate: draftClimate,
    });
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

  return (
    <EditableSection
      label="General"
      isEditing={isEditing}
      canEdit={canEdit}
      saving={saving}
      error={error}
      onEditStart={handleEditStart}
      onEditEnd={onEditEnd}
      onSave={handleSave}
      editCy="edit-general-button"
      saveCy="save-fields-button"
      cancelCy="cancel-fields-button"
      errorCy="save-fields-error"
      editAriaLabel="Edit general details"
      editView={
        <div className={styles.fieldEditColumn}>
          <FormField label="Colors">
            <ChipGroup
              options={COLORS as unknown as Color[]}
              selected={draftColors}
              onToggle={toggleColor}
              disabled={saving}
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
              disabled={saving}
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
              disabled={saving}
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
              disabled={saving}
            >
              {CLIMATES.map((c) => (
                <option key={c} value={c}>
                  {CLIMATE_LABEL[c]}
                </option>
              ))}
            </SelectInput>
          </FormField>
        </div>
      }
      readView={
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
      }
    />
  );
}
