// FlowerDetail — pure presentational component.
// Composes the detail page from per-section components; receives all data via props.
import { useState } from 'react';
import type { Flower } from '../../domain/Flower';
import type { Arrangement } from '../../domain/Arrangement';
import type { FlowerUpdate } from '../../api/updateUserFlower';
import { DetailLayout } from '../DetailLayout/DetailLayout';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { FlowerThumbnailList } from '../FlowerThumbnailList/FlowerThumbnailList';
import { FlowerIdentitySection } from './sections/FlowerIdentitySection';
import { FlowerGeneralSection } from './sections/FlowerGeneralSection';
import { FlowerSourcingSection } from './sections/FlowerSourcingSection';
import { FlowerPhysicalSection } from './sections/FlowerPhysicalSection';
import { TextSection } from '../TextSection/TextSection';
import { FlowerPairingsSection } from './sections/FlowerPairingsSection';
import styles from './FlowerDetail.module.css';

// Field sections persist through a single status (user_flowers for custom flowers,
// per-user overrides for global ones), so only one may be edited at a time. Care,
// notes and pairings each have their own endpoint and manage themselves.
type FieldSection = 'identity' | 'general' | 'sourcing' | 'physical';

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
  // Custom-flower / global-override field editing
  onFieldsUpdate: (updates: FlowerUpdate) => void;
  savingFields: boolean;
  fieldsError: string | null;
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
  onFieldsUpdate,
  savingFields,
  fieldsError,
}: FlowerDetailProps) {
  const isCustom = flower.isCustom === true;
  const [editingSection, setEditingSection] = useState<FieldSection | null>(null);

  const fieldProps = (section: FieldSection) => ({
    isEditing: editingSection === section,
    canEdit: editingSection === null,
    saving: savingFields,
    error: fieldsError,
    onEditStart: () => setEditingSection(section),
    onEditEnd: () => setEditingSection(null),
    onSave: onFieldsUpdate,
  });

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
      <FlowerIdentitySection flower={flower} {...fieldProps('identity')} />
      <FlowerGeneralSection flower={flower} {...fieldProps('general')} />
      <FlowerSourcingSection
        flower={flower}
        isCustom={isCustom}
        savingSupplier={savingSupplier}
        supplierError={supplierError}
        onAddSupplier={onAddSupplier}
        onUpdateSupplier={onUpdateSupplier}
        onRemoveSupplier={onRemoveSupplier}
        {...fieldProps('sourcing')}
      />
      <FlowerPhysicalSection flower={flower} {...fieldProps('physical')} />

      <TextSection
        label="Botanical Care"
        value={flower.careInstructions}
        emptyText="No care instructions yet. Click Edit to add your notes."
        saving={savingCare}
        error={saveCareError}
        onSave={onCareSave}
        editCy="edit-care-button"
        textareaCy="care-instructions-textarea"
        saveCy="save-care-button"
        cancelCy="cancel-care-button"
        errorCy="save-care-error"
        editAriaLabel="Edit care instructions"
      />
      <TextSection
        label="Sourcing Notes"
        value={flower.notes}
        emptyText="No sourcing notes yet. Click Edit to add your notes."
        saving={savingNotes}
        error={saveNotesError}
        onSave={onNotesSave}
        editCy="edit-notes-button"
        textareaCy="sourcing-notes-textarea"
        saveCy="save-notes-button"
        cancelCy="cancel-notes-button"
        errorCy="save-notes-error"
        editAriaLabel="Edit sourcing notes"
      />
      <FlowerPairingsSection
        flower={flower}
        complementaryFlowers={complementaryFlowers}
        allFlowers={allFlowers}
        saving={savingPairings}
        error={savePairingsError}
        onSave={onPairingsSave}
        onFlowerSelect={onFlowerSelect}
      />

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
