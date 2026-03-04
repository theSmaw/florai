// FlowerDetail container
// Connects the Redux store to the FlowerDetail component.
// Handles navigation and resolves the flower from the URL param.
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectFlowersList, selectLoadFlowersStatus } from '../../stores/flowers/selectors';
import { loadFlowers } from '../../stores/flowers/asyncActions/loadFlowers';
import { overrideFlowerImage } from '../../stores/flowers/asyncActions/overrideFlowerImage';
import { selectIsAuthenticated } from '../../stores/auth/selectors';
import type { AppDispatch, RootState } from '../../stores/store';
import { FlowerDetail } from '../../components/FlowerDetail/FlowerDetail';

export function FlowerDetailContainer() {
  const { flowerId } = useParams<{ flowerId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const flowers = useSelector(selectFlowersList);
  const loadStatus = useSelector(selectLoadFlowersStatus);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const uploadingImage =
    useSelector((state: RootState) => state.flowers.overrideImageStatus.status) === 'pending';

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

  function handleImageUpload(file: File) {
    if (flowerId) {
      void dispatch(overrideFlowerImage({ flowerId, file }));
    }
  }

  if (!flower) {
    return null;
  }

  return (
    <FlowerDetail
      flower={flower}
      complementaryFlowers={complementaryFlowers}
      isAuthenticated={isAuthenticated}
      uploadingImage={uploadingImage}
      onBack={handleBack}
      onImageUpload={handleImageUpload}
    />
  );
}
