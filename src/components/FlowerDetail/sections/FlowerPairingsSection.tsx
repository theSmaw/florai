import { useState } from 'react';
import type { Flower } from '../../../domain/Flower';
import { EditableSection } from '../../EditableSection/EditableSection';
import { FlowerThumbnailList } from '../../FlowerThumbnailList/FlowerThumbnailList';
import styles from '../FlowerDetail.module.css';

interface Props {
  flower: Flower;
  complementaryFlowers: Flower[];
  allFlowers: Flower[];
  saving: boolean;
  error: string | null;
  onSave: (flowerIds: string[]) => void;
  onFlowerSelect: (flowerId: string) => void;
}

/** Complementary flowers ("Pairs Well With"). Persists through its own endpoint. */
export function FlowerPairingsSection({
  flower,
  complementaryFlowers,
  allFlowers,
  saving,
  error,
  onSave,
  onFlowerSelect,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftIds, setDraftIds] = useState<string[]>([]);

  function handleEditStart() {
    setDraftIds([...flower.complementaryFlowerIds]);
    setIsEditing(true);
  }

  function handleRemove(id: string) {
    setDraftIds((prev) => prev.filter((fId) => fId !== id));
  }

  function handleAdd(id: string) {
    if (id && !draftIds.includes(id)) {
      setDraftIds((prev) => [...prev, id]);
    }
  }

  const available = allFlowers.filter((f) => !draftIds.includes(f.id));

  return (
    <EditableSection
      label="Pairs Well With"
      isEditing={isEditing}
      canEdit={!saving}
      saving={saving}
      error={error}
      onEditStart={handleEditStart}
      onEditEnd={() => setIsEditing(false)}
      onSave={() => onSave(draftIds)}
      editCy="edit-pairings-button"
      saveCy="save-pairings-button"
      cancelCy="cancel-pairings-button"
      errorCy="save-pairings-error"
      editAriaLabel="Edit pairings"
      editView={
        <>
          {draftIds.length > 0 ? (
            <ul data-cy="pairings-edit-list" className={styles.pairingsEditList}>
              {draftIds.map((id) => {
                const pairedFlower = allFlowers.find((f) => f.id === id);
                if (!pairedFlower) return null;
                return (
                  <li key={id} className={styles.pairingsEditItem}>
                    <span className={styles.pairingsEditName}>{pairedFlower.name}</span>
                    <button
                      type="button"
                      data-cy="pairings-remove-button"
                      className={styles.pairingsRemoveButton}
                      onClick={() => handleRemove(id)}
                      disabled={saving}
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
          {available.length > 0 && (
            <select
              data-cy="pairings-add-select"
              className={styles.pairingsAddSelect}
              value=""
              onChange={(e) => handleAdd(e.target.value)}
              disabled={saving}
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
          )}
        </>
      }
      readView={
        <FlowerThumbnailList
          items={complementaryFlowers}
          emptyText="No pairings added yet."
          onSelect={onFlowerSelect}
        />
      }
    />
  );
}
