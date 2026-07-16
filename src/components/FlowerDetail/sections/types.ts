import type { Flower } from '../../../domain/Flower';
import type { FlowerUpdate } from '../../../api/updateUserFlower';

/**
 * Props shared by the coordinated flower field-sections (identity, general,
 * sourcing, physical). `saving`/`error` reflect the active field-save status —
 * custom flowers persist to user_flowers, global ones to per-user overrides.
 */
export interface FlowerFieldSectionProps {
  flower: Flower;
  isEditing: boolean;
  canEdit: boolean;
  saving: boolean;
  error: string | null;
  onEditStart: () => void;
  onEditEnd: () => void;
  onSave: (updates: FlowerUpdate) => void;
}
