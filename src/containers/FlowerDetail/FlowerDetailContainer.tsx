// FlowerDetail container
// Connects the Redux store to the FlowerDetail component.
// Handles navigation and resolves the flower from the URL param.
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectFlowersList, selectLoadFlowersStatus } from '../../stores/flowers/selectors';
import { loadFlowers } from '../../stores/flowers/asyncActions/loadFlowers';
import { overrideFlowerImage } from '../../stores/flowers/asyncActions/overrideFlowerImage';
import { addFlowerSupplier } from '../../stores/flowers/asyncActions/addFlowerSupplier';
import { updateFlowerSupplier } from '../../stores/flowers/asyncActions/updateFlowerSupplier';
import { removeFlowerSupplier } from '../../stores/flowers/asyncActions/removeFlowerSupplier';
import { updateCareInstructions } from '../../stores/flowers/asyncActions/updateCareInstructions';
import { updateSourcingNotes } from '../../stores/flowers/asyncActions/updateSourcingNotes';
import type { AppDispatch, RootState } from '../../stores/store';
import { FlowerDetail } from '../../components/FlowerDetail/FlowerDetail';

export function FlowerDetailContainer() {
  const { flowerId } = useParams<{ flowerId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const flowers = useSelector(selectFlowersList);
  const loadStatus = useSelector(selectLoadFlowersStatus);
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

  // Ensure flowers are loaded if this page is visited directly via URL.
  // loadStatus.status is intentionally read at mount time only — including it
  // in deps would abort the in-flight request when status changes to 'pending'.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (loadStatus.status === 'idle') {
      const promise = dispatch(loadFlowers());
      return () => promise.abort();
    }
    return undefined;
  }, [dispatch]);

  const flower = flowers.find((f) => f.id === flowerId) ?? null;
  const complementaryFlowers = flower
    ? flowers.filter((f) => flower.complementaryFlowerIds.includes(f.id))
    : [];

  const handleBack = () => navigate('/catalogue');
  const handleFlowerSelect = (id: string) => navigate(`/catalogue/${id}`);

  function handleImageUpload(file: File) {
    if (flowerId) {
      void dispatch(overrideFlowerImage({ flowerId, file }));
    }
  }

  function handleAddSupplier(name: string, wholesalePrice: number | null) {
    if (flowerId) {
      void dispatch(addFlowerSupplier({ flowerId, name, wholesalePrice }));
    }
  }

  function handleUpdateSupplier(id: string, name: string, wholesalePrice: number | null) {
    if (flowerId) {
      void dispatch(updateFlowerSupplier({ flowerId, id, name, wholesalePrice }));
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
      onBack={handleBack}
      onImageUpload={handleImageUpload}
      onAddSupplier={handleAddSupplier}
      onUpdateSupplier={handleUpdateSupplier}
      onRemoveSupplier={handleRemoveSupplier}
      onCareSave={handleCareSave}
      onNotesSave={handleNotesSave}
      onFlowerSelect={handleFlowerSelect}
    />
  );
}
