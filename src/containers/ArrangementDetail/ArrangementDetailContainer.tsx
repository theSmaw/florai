import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectArrangementById,
  selectLoadArrangementsStatus,
  selectUploadImageStatus,
  selectUpdateNotesStatus,
} from '../../stores/arrangements/selectors';
import { loadArrangements } from '../../stores/arrangements/asyncActions/loadArrangements';
import { uploadArrangementImage } from '../../stores/arrangements/asyncActions/uploadArrangementImage';
import { updateArrangementNotes } from '../../stores/arrangements/asyncActions/updateArrangementNotes';
import { selectFlowersList, selectLoadFlowersStatus } from '../../stores/flowers/selectors';
import { loadFlowers } from '../../stores/flowers/asyncActions/loadFlowers';
import type { AppDispatch } from '../../stores/store';
import { ArrangementDetail } from '../../components/ArrangementDetail/ArrangementDetail';

export function ArrangementDetailContainer() {
  const { arrangementId } = useParams<{ arrangementId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const locationState = useLocation().state as { backLabel?: string } | null;
  const backLabel = locationState?.backLabel ?? 'Arrangements';

  const flowers = useSelector(selectFlowersList);
  const arrangementsLoadStatus = useSelector(selectLoadArrangementsStatus);
  const flowersLoadStatus = useSelector(selectLoadFlowersStatus);

  const uploadStatus = useSelector(selectUploadImageStatus);
  const uploadingImage = uploadStatus.status === 'pending';
  const uploadError = uploadStatus.status === 'rejected' ? uploadStatus.errorMessage : null;

  const notesStatus = useSelector(selectUpdateNotesStatus);
  const savingNotes = notesStatus.status === 'pending';
  const saveNotesError = notesStatus.status === 'rejected' ? notesStatus.errorMessage : null;

  const arrangement = useSelector(selectArrangementById(arrangementId ?? ''));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (arrangementsLoadStatus.status === 'idle') {
      void dispatch(loadArrangements());
    }
    if (flowersLoadStatus.status === 'idle') {
      const promise = dispatch(loadFlowers());
      return () => promise.abort();
    }
    return undefined;
  }, [dispatch]);

  const handleBack = () =>
    locationState?.backLabel ? navigate(-1) : navigate('/arrangements');

  function handleImageUpload(file: File) {
    if (arrangementId) {
      void dispatch(uploadArrangementImage({ arrangementId, file }));
    }
  }

  function handleNotesSave(notes: string) {
    if (arrangementId) {
      void dispatch(updateArrangementNotes({ arrangementId, notes }));
    }
  }

  function handleFlowerSelect(flowerId: string) {
    navigate(`/catalogue/${flowerId}`, {
      state: { backLabel: arrangement?.name ?? 'Arrangement' },
    });
  }

  if (!arrangement) {
    return null;
  }

  return (
    <ArrangementDetail
      arrangement={arrangement}
      flowers={flowers}
      backLabel={backLabel}
      onBack={handleBack}
      onImageUpload={handleImageUpload}
      uploadingImage={uploadingImage}
      uploadError={uploadError}
      onNotesSave={handleNotesSave}
      savingNotes={savingNotes}
      saveNotesError={saveNotesError}
      onFlowerSelect={handleFlowerSelect}
    />
  );
}
