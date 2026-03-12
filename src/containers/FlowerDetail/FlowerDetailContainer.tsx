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
import { selectLoadArrangementsStatus } from '../../stores/arrangements/selectors/selectLoadArrangementsStatus';
import { selectArrangementsForFlower } from '../../stores/arrangements/selectors/selectArrangementsForFlower';
import { loadArrangements } from '../../stores/arrangements/asyncActions/loadArrangements';
import type { AppDispatch, RootState } from '../../stores/store';
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
  const uploadingImage =
    useSelector((state: RootState) => state.flowers.overrideImageStatus.status) === 'pending';
  const uploadError = useSelector((state: RootState) => {
    const s = state.flowers.overrideImageStatus;
    return s.status === 'rejected' ? s.errorMessage : null;
  });
  const savingSupplier =
    useSelector((state: RootState) => state.flowers.supplierOperationStatus.status) === 'pending';
  const supplierError = useSelector((state: RootState) => {
    const s = state.flowers.supplierOperationStatus;
    return s.status === 'rejected' ? s.errorMessage : null;
  });
  const savingCare =
    useSelector((state: RootState) => state.flowers.updateCareInstructionsStatus.status) ===
    'pending';
  const saveCareError = useSelector((state: RootState) => {
    const s = state.flowers.updateCareInstructionsStatus;
    return s.status === 'rejected' ? s.errorMessage : null;
  });
  const savingNotes =
    useSelector((state: RootState) => state.flowers.updateSourcingNotesStatus.status) === 'pending';
  const saveNotesError = useSelector((state: RootState) => {
    const s = state.flowers.updateSourcingNotesStatus;
    return s.status === 'rejected' ? s.errorMessage : null;
  });
  const savingPairings =
    useSelector((state: RootState) => state.flowers.updateComplementaryFlowersStatus.status) === 'pending';
  const savePairingsError = useSelector((state: RootState) => {
    const s = state.flowers.updateComplementaryFlowersStatus;
    return s.status === 'rejected' ? s.errorMessage : null;
  });

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

  const handleBack = () =>
    locationState?.backLabel ? navigate(-1) : navigate('/catalogue');
  const handleFlowerSelect = (fid: string) =>
    navigate(`/catalogue/${fid}`, { state: { backLabel: flower?.name ?? 'Flower' } });
  const handleArrangementSelect = (aid: string) =>
    navigate(`/arrangements/${aid}`, { state: { backLabel: flower?.name ?? 'Flower' } });

  function handleImageUpload(file: File) {
    if (flowerId) {
      void dispatch(overrideFlowerImage({ flowerId, file, blobUrl: URL.createObjectURL(file) }));
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
    if (flowerId) {
      void dispatch(updateCareInstructions({ flowerId, careInstructions }));
    }
  }

  function handleNotesSave(notes: string) {
    if (flowerId) {
      void dispatch(updateSourcingNotes({ flowerId, notes }));
    }
  }

  function handlePairingsSave(complementaryFlowerIds: string[]) {
    if (flowerId) {
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
      uploadingImage={uploadingImage}
      uploadError={uploadError}
      savingSupplier={savingSupplier}
      supplierError={supplierError}
      savingCare={savingCare}
      saveCareError={saveCareError}
      savingNotes={savingNotes}
      saveNotesError={saveNotesError}
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
      savingPairings={savingPairings}
      savePairingsError={savePairingsError}
      onPairingsSave={handlePairingsSave}
      appearingInArrangements={appearingInArrangements}
      onArrangementSelect={handleArrangementSelect}
    />
  );
}
