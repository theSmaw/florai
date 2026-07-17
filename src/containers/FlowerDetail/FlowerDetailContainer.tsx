// FlowerDetail container
// Connects the Redux store to the FlowerDetail component.
// Handles navigation and resolves the flower from the URL param.
import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoadFlowersStatus } from '../../stores/flowers/selectors/selectLoadFlowersStatus';
import { selectFlowerById } from '../../stores/flowers/selectors/selectFlowerById';
import { selectComplementaryFlowersByFlowerId } from '../../stores/flowers/selectors/selectComplementaryFlowersByFlowerId';
import { selectFlowersExcluding } from '../../stores/flowers/selectors/selectFlowersExcluding';
import { loadFlowers } from '../../stores/flowers/asyncActions/loadFlowers';
import { overrideFlowerImage } from '../../stores/flowers/asyncActions/overrideFlowerImage';
import { addFlowerSupplier } from '../../stores/flowers/asyncActions/addFlowerSupplier';
import { updateFlowerSupplier } from '../../stores/flowers/asyncActions/updateFlowerSupplier';
import { removeFlowerSupplier } from '../../stores/flowers/asyncActions/removeFlowerSupplier';
import { updateCareInstructions } from '../../stores/flowers/asyncActions/updateCareInstructions';
import { updateSourcingNotes } from '../../stores/flowers/asyncActions/updateSourcingNotes';
import { updateComplementaryFlowers } from '../../stores/flowers/asyncActions/updateComplementaryFlowers';
import { updateUserFlower } from '../../stores/flowers/asyncActions/updateUserFlower';
import { uploadUserFlowerImage } from '../../stores/flowers/asyncActions/uploadUserFlowerImage';
import { updateFlowerOverride } from '../../stores/flowers/asyncActions/updateFlowerOverride';
import type { FlowerUpdate } from '../../api/updateUserFlower';
import { selectLoadArrangementsStatus } from '../../stores/arrangements/selectors/selectLoadArrangementsStatus';
import { selectArrangementsForFlower } from '../../stores/arrangements/selectors/selectArrangementsForFlower';
import { loadArrangements } from '../../stores/arrangements/asyncActions/loadArrangements';
import type { AppDispatch } from '../../stores/store';
import { useAsyncStatus } from '../../hooks/useAsyncStatus';
import { FlowerDetail } from '../../components/FlowerDetail/FlowerDetail';

export function FlowerDetailContainer() {
  const { flowerId } = useParams<{ flowerId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const locationState = useLocation().state as { backLabel?: string } | null;
  const backLabel = locationState?.backLabel ?? 'Catalogue';

  const id = flowerId ?? '';
  const flower = useSelector(selectFlowerById(id));
  const complementaryFlowers = useSelector(selectComplementaryFlowersByFlowerId(id));
  const allFlowers = useSelector(selectFlowersExcluding(id));
  const appearingInArrangements = useSelector(selectArrangementsForFlower(id));
  const loadStatus = useSelector(selectLoadFlowersStatus);
  const loadArrangementsStatus = useSelector(selectLoadArrangementsStatus);
  const { pending: uploadingImage, error: uploadError } = useAsyncStatus(
    (s) => s.flowers.overrideImageStatus,
  );
  const { pending: savingSupplier, error: supplierError } = useAsyncStatus(
    (s) => s.flowers.supplierOperationStatus,
  );
  const { pending: savingCare, error: saveCareError } = useAsyncStatus(
    (s) => s.flowers.updateCareInstructionsStatus,
  );
  const { pending: savingNotes, error: saveNotesError } = useAsyncStatus(
    (s) => s.flowers.updateSourcingNotesStatus,
  );
  const { pending: savingPairings, error: savePairingsError } = useAsyncStatus(
    (s) => s.flowers.updateComplementaryFlowersStatus,
  );
  // Custom flowers persist every edit (fields, care, notes, pairings, image) through
  // updateUserFlower, so a single status drives all their editors.
  const { pending: savingCustom, error: customError } = useAsyncStatus(
    (s) => s.flowers.updateUserFlowerStatus,
  );
  // Global catalogue flowers persist field edits as per-user overrides.
  const { pending: savingOverride, error: overrideError } = useAsyncStatus(
    (s) => s.flowers.updateFlowerOverrideStatus,
  );

  const isCustom = flower?.isCustom === true;
  // Field editors (identity, general, sourcing, physical) route to user_flowers
  // for custom flowers, or to the per-user override table for global ones.
  const savingFields = isCustom ? savingCustom : savingOverride;
  const fieldsError = isCustom ? customError : overrideError;

  // loadStatus and loadArrangementsStatus are intentionally read at mount time only —
  // including them in deps would abort the in-flight request when status changes to 'pending'.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (loadStatus.status === 'idle') {
      const promise = dispatch(loadFlowers());
      return () => promise.abort();
    }
    return undefined;
  }, [dispatch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (loadArrangementsStatus.status === 'idle') {
      const promise = dispatch(loadArrangements());
      return () => promise.abort();
    }
    return undefined;
  }, [dispatch]);

  const handleBack = () => (locationState?.backLabel ? navigate(-1) : navigate('/catalogue'));
  const handleFlowerSelect = (fid: string) =>
    navigate(`/catalogue/${fid}`, { state: { backLabel: flower?.name ?? 'Flower' } });
  const handleArrangementSelect = (aid: string) =>
    navigate(`/arrangements/${aid}`, { state: { backLabel: flower?.name ?? 'Flower' } });

  function handleImageUpload(file: File) {
    if (!flowerId) return;
    const blobUrl = URL.createObjectURL(file);
    if (isCustom) {
      void dispatch(uploadUserFlowerImage({ id: flowerId, file, blobUrl }));
    } else {
      void dispatch(overrideFlowerImage({ flowerId, file, blobUrl }));
    }
  }

  function handleFieldsUpdate(updates: FlowerUpdate) {
    if (!flowerId) return;
    if (isCustom) {
      void dispatch(updateUserFlower({ id: flowerId, updates }));
    } else {
      void dispatch(updateFlowerOverride({ flowerId, updates }));
    }
  }

  function handleAddSupplier(name: string, wholesalePrice: number | null) {
    if (flowerId) {
      void dispatch(addFlowerSupplier({ flowerId, name, wholesalePrice }));
    }
  }

  function handleUpdateSupplier(sid: string, name: string, wholesalePrice: number | null) {
    if (flowerId) {
      void dispatch(updateFlowerSupplier({ flowerId, id: sid, name, wholesalePrice }));
    }
  }

  function handleRemoveSupplier(supplierId: string) {
    if (flowerId) {
      void dispatch(removeFlowerSupplier({ flowerId, supplierId }));
    }
  }

  function handleCareSave(careInstructions: string) {
    if (!flowerId) return;
    if (isCustom) {
      void dispatch(updateUserFlower({ id: flowerId, updates: { careInstructions } }));
    } else {
      void dispatch(updateCareInstructions({ flowerId, careInstructions }));
    }
  }

  function handleNotesSave(notes: string) {
    if (!flowerId) return;
    if (isCustom) {
      void dispatch(updateUserFlower({ id: flowerId, updates: { notes } }));
    } else {
      void dispatch(updateSourcingNotes({ flowerId, notes }));
    }
  }

  function handlePairingsSave(complementaryFlowerIds: string[]) {
    if (!flowerId) return;
    if (isCustom) {
      void dispatch(updateUserFlower({ id: flowerId, updates: { complementaryFlowerIds } }));
    } else {
      void dispatch(updateComplementaryFlowers({ flowerId, complementaryFlowerIds }));
    }
  }

  if (!flower) {
    return null;
  }

  return (
    <FlowerDetail
      flower={flower}
      complementaryFlowers={complementaryFlowers}
      uploadingImage={isCustom ? savingCustom : uploadingImage}
      uploadError={isCustom ? customError : uploadError}
      savingSupplier={savingSupplier}
      supplierError={supplierError}
      savingCare={isCustom ? savingCustom : savingCare}
      saveCareError={isCustom ? customError : saveCareError}
      savingNotes={isCustom ? savingCustom : savingNotes}
      saveNotesError={isCustom ? customError : saveNotesError}
      backLabel={backLabel}
      onBack={handleBack}
      onImageUpload={handleImageUpload}
      onAddSupplier={handleAddSupplier}
      onUpdateSupplier={handleUpdateSupplier}
      onRemoveSupplier={handleRemoveSupplier}
      onCareSave={handleCareSave}
      onNotesSave={handleNotesSave}
      onFlowerSelect={handleFlowerSelect}
      allFlowers={allFlowers}
      savingPairings={isCustom ? savingCustom : savingPairings}
      savePairingsError={isCustom ? customError : savePairingsError}
      onPairingsSave={handlePairingsSave}
      appearingInArrangements={appearingInArrangements}
      onArrangementSelect={handleArrangementSelect}
      onFieldsUpdate={handleFieldsUpdate}
      savingFields={savingFields}
      fieldsError={fieldsError}
    />
  );
}
