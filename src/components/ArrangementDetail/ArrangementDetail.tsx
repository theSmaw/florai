import { useState } from 'react';
import type { Arrangement } from '../../domain/Arrangement';
import type { ArrangementUpdate } from '../../api/updateArrangement';
import type { Flower } from '../../domain/Flower';
import { DetailLayout } from '../DetailLayout/DetailLayout';
import { ArrangementIdentitySection } from './sections/ArrangementIdentitySection';
import { ArrangementDescriptionSection } from './sections/ArrangementDescriptionSection';
import { ArrangementFlowersSection } from './sections/ArrangementFlowersSection';
import { ArrangementPhysicalSection } from './sections/ArrangementPhysicalSection';
import { ArrangementPricingSection } from './sections/ArrangementPricingSection';
import { TextSection } from '../TextSection/TextSection';

// Field sections persist through a single updateArrangement status, so only one
// may be edited at a time; Notes has its own endpoint and manages itself.
type FieldSection = 'identity' | 'description' | 'flowers' | 'physical' | 'pricing';

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
  onUpdate: (updates: ArrangementUpdate) => void;
  saving: boolean;
  saveError: string | null;
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
  onUpdate,
  saving,
  saveError,
  onFlowerSelect,
}: ArrangementDetailProps) {
  const [editingSection, setEditingSection] = useState<FieldSection | null>(null);

  // Common wiring for the coordinated field sections.
  const fieldProps = (section: FieldSection) => ({
    isEditing: editingSection === section,
    canEdit: editingSection === null,
    saving,
    error: saveError,
    onEditStart: () => setEditingSection(section),
    onEditEnd: () => setEditingSection(null),
    onSave: onUpdate,
  });

  return (
    <DetailLayout
      backLabel={backLabel}
      onBack={onBack}
      contextLabel="Arrangement Details"
      {...(arrangement.imageUrl !== undefined ? { imageUrl: arrangement.imageUrl } : {})}
      imageAlt={arrangement.name}
      uploadingImage={uploadingImage}
      uploadError={uploadError}
      onImageUpload={onImageUpload}
    >
      <ArrangementIdentitySection arrangement={arrangement} {...fieldProps('identity')} />
      <ArrangementDescriptionSection arrangement={arrangement} {...fieldProps('description')} />
      <ArrangementFlowersSection
        arrangement={arrangement}
        flowers={flowers}
        onFlowerSelect={onFlowerSelect}
        {...fieldProps('flowers')}
      />
      <ArrangementPhysicalSection arrangement={arrangement} {...fieldProps('physical')} />
      <ArrangementPricingSection arrangement={arrangement} {...fieldProps('pricing')} />
      <TextSection
        label="Notes"
        value={arrangement.notes ?? ''}
        emptyText="No notes yet. Click Edit to add."
        saving={savingNotes}
        error={saveNotesError}
        onSave={onNotesSave}
        editCy="edit-notes-button"
        textareaCy="notes-textarea"
        saveCy="save-notes-button"
        cancelCy="cancel-notes-button"
        errorCy="save-notes-error"
        editAriaLabel="Edit notes"
      />
    </DetailLayout>
  );
}
