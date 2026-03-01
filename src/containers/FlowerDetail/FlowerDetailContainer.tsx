// FlowerDetail container
// Connects the Redux store to the FlowerDetail component.
// Handles navigation and resolves the flower from the URL param.
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectFlowersList, selectLoadFlowersStatus } from '../../stores/flowers/selectors';
import { loadFlowers } from '../../stores/flowers/asyncActions/loadFlowers';
import type { AppDispatch } from '../../stores/store';
import { FlowerDetail } from '../../components/FlowerDetail/FlowerDetail';

export function FlowerDetailContainer() {
  const { flowerId } = useParams<{ flowerId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const flowers = useSelector(selectFlowersList);
  const loadStatus = useSelector(selectLoadFlowersStatus);

  // Ensure flowers are loaded if this page is visited directly via URL
  useEffect(() => {
    if (loadStatus.status === 'idle') {
      const promise = dispatch(loadFlowers());
      return () => promise.abort();
    }
    return undefined;
  }, [dispatch, loadStatus.status]);

  const flower = flowers.find((f) => f.id === flowerId) ?? null;
  const complementaryFlowers = flower
    ? flowers.filter((f) => flower.complementaryFlowerIds.includes(f.id))
    : [];

  const handleBack = () => navigate('/catalogue');

  if (!flower) {
    return null;
  }

  return (
    <FlowerDetail
      flower={flower}
      complementaryFlowers={complementaryFlowers}
      onBack={handleBack}
    />
  );
}
