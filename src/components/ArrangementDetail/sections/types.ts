import type { Arrangement } from '../../../domain/Arrangement';
import type { ArrangementUpdate } from '../../../api/updateArrangement';

/** Props shared by every editable arrangement field-section. */
export interface ArrangementSectionProps {
  arrangement: Arrangement;
  isEditing: boolean;
  canEdit: boolean;
  saving: boolean;
  error: string | null;
  onEditStart: () => void;
  onEditEnd: () => void;
  onSave: (updates: ArrangementUpdate) => void;
}
