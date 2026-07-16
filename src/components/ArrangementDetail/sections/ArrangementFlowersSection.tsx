import { useState } from 'react';
import type { Flower } from '../../../domain/Flower';
import { EditableSection } from '../../EditableSection/EditableSection';
import { FlowerThumbnailList } from '../../FlowerThumbnailList/FlowerThumbnailList';
import type { ArrangementSectionProps } from './types';
import styles from './ArrangementFlowersSection.module.css';

interface Props extends ArrangementSectionProps {
  flowers: Flower[];
  onFlowerSelect: (flowerId: string) => void;
}

export function ArrangementFlowersSection({
  arrangement,
  flowers,
  onFlowerSelect,
  isEditing,
  canEdit,
  saving,
  error,
  onEditStart,
  onEditEnd,
  onSave,
}: Props) {
  const [draftFlowerIds, setDraftFlowerIds] = useState<string[]>([]);

  function handleEditStart() {
    setDraftFlowerIds(arrangement.flowerIds);
    onEditStart();
  }

  function handleSave() {
    onSave({ flowerIds: draftFlowerIds });
  }

  function toggleFlower(id: string) {
    setDraftFlowerIds((prev) =>
      prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id],
    );
  }

  const arrangementFlowers = flowers.filter((f) => arrangement.flowerIds.includes(f.id));

  return (
    <EditableSection
      label="Flowers"
      isEditing={isEditing}
      canEdit={canEdit}
      saving={saving}
      error={error}
      onEditStart={handleEditStart}
      onEditEnd={onEditEnd}
      onSave={handleSave}
      editCy="edit-flowers-button"
      saveCy="save-section-button"
      cancelCy="cancel-section-button"
      errorCy="save-section-error"
      editAriaLabel="Edit flowers"
      editView={
        <div data-cy="flower-checklist" className={styles.flowerChecklist}>
          {flowers.map((flower) => (
            <label key={flower.id} className={styles.flowerCheckItem}>
              <input
                type="checkbox"
                data-cy={`flower-checkbox-${flower.id}`}
                checked={draftFlowerIds.includes(flower.id)}
                onChange={() => toggleFlower(flower.id)}
                disabled={saving}
              />
              <span>{flower.name}</span>
            </label>
          ))}
          {flowers.length === 0 && <p className={styles.empty}>No flowers in catalogue yet.</p>}
        </div>
      }
      readView={
        <FlowerThumbnailList
          items={arrangementFlowers}
          emptyText="No flowers in this arrangement."
          onSelect={onFlowerSelect}
        />
      }
    />
  );
}
